const gulp = require('gulp');
const babel = require("gulp-babel");
require('gulp-dev-tasks');

const source = ['src/**/*.js', 'src/**/*.jsx'];

gulp.task('build', function() {
  return gulp.src(source)
    .pipe(babel({presets: ['es2015', 'react', 'stage-1']}))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['lint', 'build'], function() {
  gulp.watch(source, ['lint', 'build']);
});
