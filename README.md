# dox-foundation

Use [dox](https://github.com/visionmedia/dox) to automatically generate beautiful html documentation.

Outputted HTML is based on templates and css from [ZURB's Foundation](http://foundation.zurb.com/) and syntax highlighting is done by [Prism.js](http://prismjs.com/).

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
* *0.4.5* - Bug fixes, Multiple source folder support
* *0.4.0* - Improved project navigation, major refactor of folder code
* *0.3.0* - Support for folder parsing
* *0.2.0* - Readable output
* *0.0.1* - Initial release

## Thanks & Contributors

* Thanks to [dox-basic](https://github.com/jepso/dox-basic) for the inspiration and much of the original code.
* [@sdepold](https://github.com/sdepold)
* [@fgribreau](https://twitter.com/fgribreau)
* [@phun-ky](https://github.com/phun-kyu)

## License
Copyright (c) 2012 P'unk Avenue
Licensed under the MIT license.
