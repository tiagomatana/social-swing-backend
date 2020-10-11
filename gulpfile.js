const minify = require('gulp-minify');
const gulp = require('gulp')
const run = require('gulp-run');
gulp.task('compress', function() {
    return gulp.src(['app/**/*.js'])
        .pipe(minify({
            ext:{
                src:'-min.js',
                min:'.js'
            },
            noSource: true,
            ignoreFiles: [ '-min.js']
        }))
        .pipe(gulp.dest('dist/app')) && gulp.src(['index.js', 'package.json'])
        .pipe(minify({
            ext:{
                src:'-min.js',
                min:'.js'
            },
            noSource: true,
            ignoreFiles: [ '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});
