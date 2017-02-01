const gulp = require('gulp');
const babel = require('gulp-babel');
require('gulp-lint-tasks');

const source = ['src/**/*.js', 'src/**/*.jsx'];

gulp.task('build', () => (
  gulp.src(source)
    .pipe(babel())
    .pipe(gulp.dest('build/'))
));

gulp.task('default', ['lint', 'build'], () => {
  gulp.watch(source, ['lint', 'build']);
});
