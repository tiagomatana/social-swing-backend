const minify = require('gulp-minify');
const gulp = require('gulp')
gulp.task('compress', function() {
    return gulp.src(['app/**/*.js', 'index.js'])
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
