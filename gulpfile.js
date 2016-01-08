var gulp = require('gulp');
var connect = require('gulp-connect');

// 处理 js
gulp.task('script', function () {
	return gulp.src('./src/public/js/*.js')
		    .pipe(connect.reload());
});

// 处理 html
gulp.task('html', function () {
    return gulp.src(['./src/index.html'])
            .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src(['./src/public/css/*.css'])
            .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'src/',
        port: 8080,
        livereload: true
    });
});

gulp.task('watch', function () {
	gulp.watch(['./src/index.html'], ['html']);
	gulp.watch(['./src/public/css/*.css'], ['css']);
	gulp.watch(['./src/public/js/*.js'], ['script']);
});

gulp.task('default', ['connect', 'watch']);