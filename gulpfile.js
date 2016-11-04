// Relase 1.0.0

// Global settings
var scss_src = './scss/**/',
    scss_dist = './css/',
    scss_prefix = 'last 5 versions';

var js_src = './js/',
    js_dist = './js/',
    js_file = 'app.js',
    js_concat_files = ['partial/libs/jquery.min.js', 'partial/main.js'];

var img_src = './img/**/',
    img_dist = './img/';

// dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cached'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    gutil = require('gulp-util'),
    rename = require("gulp-rename"),
    beepbeep = require("beepbeep");

// function to create an array of javascript files with correct paths for concatenation
function buildJS() {
    // apply js_src to js_concat_files values
    return js_concat_files.map(function (val) {
        return js_src + val;
    });
}

// Output CSS files which are minified and prefixed
// @requires gulp-autoprefixer
// @requires gulp-sass
// @requires gulp-rename
gulp.task('scss_prod', function () {
    gulp.src(scss_src + '*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: [scss_prefix]
        }))
        // optional renaming - remove if nessesary
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulp.dest(scss_dist));
});

// Output CSS files which are expanded
// @requires gulp-sass
// @requires gulp-autoprefixer
// @requires task: scss_lint
gulp.task('scss_dev', function () {
    gulp.src(scss_src + '*.scss')
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: [scss_prefix]
        }))
        .pipe(gulp.dest(scss_dist));
});

// custom scss lint reporter
// @requires beepbeep
// @requires gulp-util
// @requires task: scss_lint
var customReporter = function (file) {
    if (!file.scsslint.success) {
        if (file.scsslint.errors > 0) {
            gutil.log(gutil.colors.red(file.scsslint.errors + ' errors in ' + ' ' + file.path));
            file.scsslint.issues.forEach(function (val) {
                gutil.log(gutil.colors.blue(val.line + ':' + val.column) + ' - ' + val.reason);
            });
            beepbeep(2);
        }
        if (file.scsslint.warnings > 0) {
            gutil.log(gutil.colors.yellow(file.scsslint.warnings + ' warnings in ' + file.path));
            file.scsslint.issues.forEach(function (val) {
                gutil.log(gutil.colors.blue(val.line + ':' + val.column) + ' - ' + val.reason);
            });
        }
    }
};

// Uglify JS App file
// @requires gulp-uglify
// @requires task: js_concat
gulp.task('js_uglify', ['js_concat'], function () {
    return gulp.src([js_dist + js_file])
        .pipe(uglify({
            drop_debugger: true,
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest(js_dist));
});

// Concatenate JS files into App js file.
// @requires gulp-concat
gulp.task('js_concat', function () {
    return gulp.src(buildJS())
        .pipe(concat(js_file))
        .pipe(gulp.dest(js_dist));
});

// lint js files for errors
// @requires gulp-cached
// @requires gulp-jshint
// @requires jshint-stylish
gulp.task('js_lint', function () {
    gulp.src(buildJS())
        .pipe(cache('jslint'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// minify images
// @requires gulp-imagemin
// @requires imagemin-pngquant
gulp.task('imagemin', function () {
    return gulp.src(img_src + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(img_dist));
});

//
// Gulp tasks
//

gulp.task('watch_dev', function () {
    gulp.watch(scss_src + '*.scss', ['scss_dev']);
    gulp.watch(js_src + '**/*.js', ['js_concat', 'js_lint']);
});

gulp.task('watch_prod', function () {
    gulp.watch(scss_src + '*.scss', ['scss_prod']);
    gulp.watch(js_src + '**/*.js', ['js_concat', 'js_uglify']);
});


// gulp prod
gulp.task('prod', ['scss_prod', 'js_concat', 'js_uglify', 'imagemin']);
// gulp dev
gulp.task('dev', ['scss_dev', 'js_concat', 'js_lint', 'imagemin', 'watch_dev']);
// gulp
gulp.task('default', ['scss_dev', 'js_concat', 'js_lint', 'watch_dev']);
