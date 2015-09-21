# gulp-easy

Npm package for fast and easy compile js, less and other files with gulp.

## Install

npm install --save-dev gulp gulp-easy

## Tasks and production mode

Module gulp-easy export two public tasks:
- `default` for developer (with watch and without compress);
- `production` for production builds.

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
        dest: './app/dest',
        less: {
        }
    })
    .less('less/index.less', 'public/app.css', {
        minifycss: {
            compatibility: 'ie7'
        }
    })
```

Full default config:

```js
    {
        dest: 'public', // destination folder
        name: 'app', // default destination file name
        compress: null, // auto, `true` in production
        watch: null, // auto, `false` in production
        js: { // config for `js()` method
            browserify: {}, // browserify config
            transforms: [stringify] // browserify transforms
        },
        less: { // config for `less()` method
            minifycss: { // `gulp-minify-css` config
                compatibility: 'ie9'
            }
        }
    }
```

## Examples of gulpfile.js file

Most minimalistic gulp file. Default file name is `app`, default destination dir is `public`.
The task performs:
1. Compile `less/index.less` file with it imports to css `public/app.css`.
2. Concat and compile as common js all javascript files from folder `js` to file `public/app.js`.
3. Copy all files from folder `images` (recursive) to folder `public/images`.

```js
require('gulp-easy')
    .less('less/index.less')
    .js('js/*.js')
    .files('images/**/*', 'public/images/')
```

Normal gulp file without defaults.
The task performs:
1. Concat and compile less files `less/header.less`, `less/header.less` to css `app/public/style.css`. Destination folder specified in config.
2. Compile as common js file `js/index.js` to file `app/public/lib/main.js`.

```js
require('gulp-easy')
    .config({
        dest: 'app/public'
    })
    .less(['less/header.less', 'less/main.less'], 'style.css')
    .js('js/index.js', 'app/public/lib/main.js')
```