# gulp-easy

Npm package for fast and easy compile js, less and other files with gulp.

## Install

npm install --save-dev gulp gulp-easy

## Tasks and production mode

Module gulp-easy export two public tasks:
* `default` for developer (with watch and without compress);
* `production` for production builds.

Also you can append argument `--production` for production builds:

```js
node $SOURCE_DIR/node_modules/gulp/bin/gulp.js --gulpfile $SOURCE_DIR/gulpfile.js --production
```

## Configuration

Configuration in `gulp-easy` is optional, but you can set in through `config()` method:

```js
require('gulp-easy')
    .config({
        dest: './app/dest',
        less: {
            minifycss: {
                compatibility: 'ie7'
            }
        }
    })
    .less(/* ... */)
```

Also each task method (`js`, `less`, `files`, ..) have config argument for overwrite config:

```js
require('gulp-easy')
    .config({
        dest: './app/dest'
    })
    .less('less/index.less', 'public/app.css', {
        minifycss: {
            compatibility: 'ie7'
        }
    })
```

Default config (without methods configs):

```js
    {
        dest: 'public', // destination folder
        name: 'app', // default destination file name
        compress: null, // auto, `true` in production
        watch: null, // auto, `false` in production
    }
```

## Examples of gulpfile.js file

Most minimalistic gulp file. Default file name is `app`, default destination dir is `public`.
The task performs:
- Compile `less/index.less` file with it imports to css `public/app.css`.
- Concat and compile as common js all javascript files from folder `js` to file `public/app.js`.
- Copy all files from folder `images` (recursive) to folder `public/images`.

```js
require('gulp-easy')
    .less('less/index.less')
    .js('js/*.js')
    .files('images/**/*', 'public/images/')
```

Normal gulp file without defaults.
The task performs:
- Concat and compile less files `less/header.less`, `less/header.less` to css `app/public/style.css`. Destination folder specified in config.
- Compile as common js file `js/index.js` to file `app/public/lib/main.js`.
- Run custom task for copy all files from folder `images` to folder `public/images2`.

```js
require('gulp-easy')
    .config({
        dest: 'app/public'
    })
    .less(['less/header.less', 'less/main.less'], 'style.css')
    .js('js/index.js', 'app/public/lib/main.js')
    .task(function(gulp, taskName, isCompress, isWatch) {
        gulp.src(['images/*']).pipe(gulp.dest('public/images2/'));
    }, function(gulp, taskName, isCompress) {
        gulp.watch(['images/*'], [taskName]);
    })
```

## Methods api

### js(src, dest, config)

Compile javascript files to bundle
- `src`: string or array strings, glob format;
- `dest`: (optional) string file name or path to destination (output) file;
- `config`: (optional) custom configuration object. Default configuration is:

```js
{
    browserify: {}, // browserify config
    uglify: {}, // uglify config
    gzip: {}, // gzip config
    transforms: [stringify] // browserify transforms
}
```

Method do:
- compile common js code with `browserify` and it `transforms`
- write sourcemap, when `compress` is disable
- compress by `uglify`, when `compress` is enable
- create gzip file, when `compress` is enable

### less(src, dest, config)

Compile less to css
- `src`: string or array strings, glob format;
- `dest`: (optional) string file name or path to destination (output) file;
- `config`: (optional) custom configuration object. Default configuration is:

Method do:
- process less to css
- concat files to one
- minify by `minifycss` module, when `compress` is enable
- write sourcemap, when `compress` is disable
- create gzip file, when `compress` is enable

```js
{
    gzip: {}, // gzip config
    minifycss: { // `gulp-minify-css` config
        compatibility: 'ie9'
    }
}
```

### files(src, dest)

Copy files
- `src`: string or array strings, glob format;
- `dest`: (optional) string file name or path to destination (output) file;

Method do:
- copy source files to destination folder

### task(taskHandler, watchHandler)

Add custom task
- `taskHandler(gulp, taskName, isCompress, isWatch`: custom function for create gulp task;
- `watchHandler(gulp, taskName, isCompress)`: (optional) custom function for watch on sources;

Handlers arguments:
- `gulp`: gulp instance
- `taskName`: string, auto generated task name (in format `_taskXX`). Use it for run task on watch
- `isCompress`: boolean, see `compress` param in config section
- `isWatch`: boolean, see `watch` param in config section
