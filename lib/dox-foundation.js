/*!
 * Load Dependancies
 */
var fs = require('fs'),
    path = require('path'),
    jade = require('jade'),
    dox = require('dox'),
    _ = require('underscore'),
    pkg = require('../package'),
    template;

/**
 * Parser name
 */
exports.name = pkg.name;

/**
 * Parser version
 */
exports.version = pkg.version;

/**
 * Template used to produce the documentation
 */
exports.templatePath = path.resolve(__dirname, '../views/template.jade');

/**
  * Return a list of methods for the side navigation
  *
  * @param {Object} file
  * @return {Object} Object formatted for template nav helper
  * @api private
  */
function buildStructureForFile(file) {
  var names = [];
  var targetLink;

  if (file.dox.length === 0) { return false; }

  file.dox.forEach(function(method){
    if (method.ctx && !method.ignore) { names.push(method.ctx.name); }
  });

  // How deep is your love?
  // If the splitted currentFile (the file we are currently rendering) path got one folder
  // in the path or more, add ../ for each level found
  if(file.currentFile && file.currentFile.split(path.sep).length > 1 ){
    // Depth of current file
    var depth = file.currentFile.split(path.sep).length,
    // Create a prefix with n "../"
    prefix = new Array(depth).join('../');
    // Set up target link with prefix
    targetLink = prefix + file.targetFile;
  } else {
    // Link does not have to be altered
    targetLink = file.targetFile;
  }

  return {
    source: {
      full: file.sourceFile,
      dir: path.dirname(file.sourceFile),
      file: path.basename(file.sourceFile)
    },
    target: file.targetFile,
    methods: names,
    link : targetLink
  };
}

/**
 * Parse source code to produce documentation
 */
exports.render = function(file, files, options){
    options          = options || { title: 'Documentation' };
    file.dox         = file.dox.filter(exports.shouldPass);
    options.comments = file.dox;
    template         = fs.readFileSync(exports.templatePath).toString();

    if (files) {
      options.subTitle = file.sourceFile;
      options.currentFile = file.sourceFile;
      options.structure = [];

      files.forEach(function(f){
        f.currentFile = file.targetFile;
        options.structure.push(buildStructureForFile(f));
      });
    } else {
      options.structure = new Array(buildStructureForFile(file));
    }

    return jade.compile(template, { filename:exports.templatePath })(options);
};

/**
 * Test if a method should be ignored or not
 *
 * @param  {Object} method
 * @return {Boolean} true if the method is not private nor must be ignored
 * @api private
 */
exports.shouldPass = function(method){
  if(method.isPrivate){return false;}
  if(method.ignore){return false;}

  return method.tags.filter(function(tag){
    return tag.type === "private" || tag.type === "ignore";
  }).length === 0;
};

/*
 * Create an array of all the right files in the source dir
 */
exports.collectFiles = function(source, options, callback) {

  var dirtyFiles = [],
      ignore  = options.ignore || [],
      files   = [];

  // If more paths are given with the --source flag
  if(source.split(',').length > 1){
    var dirtyPaths = source.split(',');

    dirtyPaths.forEach(function(dirtyPath){
      dirtyFiles = dirtyFiles.concat(require('walkdir').sync(path.resolve(process.cwd(), dirtyPath),{follow_symlinks:true}));
    });
  }
  // Just one path given with the --source flag
  else {
    source  = path.resolve(process.cwd(), source);
    dirtyFiles = require('walkdir').sync(source,{follow_symlinks:true}); // tee hee!
  }

  dirtyFiles.forEach(function(file){
    file = path.relative(process.cwd(), file);

    var doNotIgnore = _.all(ignore, function(d){
      // return true if no part of the path is in the ignore list
      return (file.indexOf(d) === -1);
    });

    if ((file.substr(-2) === 'js') && doNotIgnore) {
      files.push(file);
    }
  });
  console.log(files)
  return files;
};

/*
 * Dox all the files found by collectFiles
 */
exports.doxFiles = function(source, target, options, files) {
  var source_to_return;
  files = files.map(function(file) {

    try {
      // If more paths are given with the --source flag
      if(source.split(',').length >= 1){
        var tmpSource = source.split(',');

        tmpSource.forEach(function(s){
          if(file.indexOf(s) !== -1){
            source_to_return = s;
          }

        });
      } else {
        source_to_return = source;
      }

      var content = fs.readFileSync(file).toString();

      return {
        sourceFile: file,
        targetFile: path.relative(process.cwd(),target) + path.sep + file + '.html',
        dox:        dox.parseComments(content, options)
      };

    } catch(e) { console.log(e); }
  });

  return files;
};
