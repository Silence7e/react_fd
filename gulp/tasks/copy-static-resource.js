/**
 * Created by Changlin.
 */
'use strict';

module.exports = function(gulp, sources, dest) {
    return gulp.src(sources)
        .pipe(gulp.dest(dest));
}
