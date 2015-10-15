var browserify  = require('browserify'),
    gulp        = require('gulp'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence');

// Transform code for browser support
gulp.task('browserify', function() {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './rdf2html.js'
  });

  return b.bundle()
    .pipe(source('rdf2html.js'))
    .pipe(buffer())
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/'));
});

// Copy required dist files from sub-modules
gulp.task('sub-dist', function() {
  return gulp.src('node_modules/leaflet/dist/**')
    .pipe(gulp.dest('./dist/'));
});

// Create a dist folder with all required public assets
gulp.task('dist', function(callback) {
  runSequence(
    'browserify',
    'sub-dist',
    function (error) {
      if (error) {
        console.log(error.message);
      }
      callback(error);
    });
});

