var gulp = require('gulp');
var embedTemplates = require('gulp-angular-embed-templates');
 
gulp.task('ts:build', function () {
    gulp.src('src/**/*.ts')
        .pipe(embedTemplates({sourceType:'ts'}))
        .pipe(gulp.dest('./dist'));
});