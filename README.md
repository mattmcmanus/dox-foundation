# dox-foundation

[![Dependency Status](https://gemnasium.com/punkave/dox-foundation.png)](https://gemnasium.com/punkave/dox-foundation)

Use [dox](https://github.com/visionmedia/dox) to automatically generate beautiful html documentation.

Outputted HTML is based on templates and css from [ZURB's Foundation](http://foundation.zurb.com/) and syntax highlighting is done by [Prism.js](http://prismjs.com/).

## Example time!

See <http://dox-foundation-demo.herokuapp.com/> ([source](https://github.com/tlvince/dox-foundation-demo)) for an interactive demo, ran against Express.

![A little sneak](http://i.cloudup.com/q9XWQ9B7qk.png)

## Installation
Install the module with: `npm install dox-foundation -g`

## Documentation
```
$ dox-foundation --help

  Usage: dox-foundation [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -r, --raw                   output "raw" comments, leaving the markdown intact
    -d, --debug                 output parsed comments for debugging
    -t, --title <string>        The title of the library or program you are generating code for (eg: Express). Overrides default of "Documentation"
    -s, --source <source>       The folder(s) which should be parsed. Multiple folders should be comma separated
    -i, --ignore <directories>  Comma seperated list of directories to ignore. Overrides default of test, public, static, views, templates
    -T, --target <target>       The folder which will contain the results. Default: <process.cwd()>/docs
    --template <jade template>  The jade template file to use

  Examples:

    # stdin
    $ dox-foundation > myfile.html

    # operates over stdio
    $ dox-foundation --title "myFile documentation" < myfile.js > myfile.html

    # parse a whole folder
    $ dox-foundation --source lib --target docs
```

## [Release History](https://github.com/punkave/dox-foundation/releases)

## Thanks & Contributors

* Thanks to [dox-basic](https://github.com/jepso/dox-basic) for the inspiration and much of the original code.
* [@sdepold](https://github.com/sdepold)
* [@fgribreau](https://twitter.com/fgribreau)
* [@phun-ky](https://github.com/phun-kyu)

## License
Copyright (c) 2012 P'unk Avenue
Licensed under the MIT license.
