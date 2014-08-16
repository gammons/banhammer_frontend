var gulp = require('gulp')
  , gutil = require('gulp-util')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , paths;

paths = {
  assets: 'src/assets/**/*',
  css:    'src/css/*.css', 
  libs:   [
    'src/bower_components/phaser-official/build/phaser.min.js'
  ],
  js:     ['src/js/**/*.js'],
  ts:     ['src/ts/**/*.ts'],
  dist:   './dist/'
};

var ts = require('gulp-type');

var tsProject = ts.createProject({
  declarationFiles: false,
  noExternalResolve: true
});

gulp.task('scripts', function() {
  var tsResult = gulp.src(paths.ts).pipe(ts(tsProject));
  //tsResult.dts.pipe(gulp.dest('release/definitions'));
  return tsResult.js.pipe(gulp.dest('./src/js'));

});
gulp.task('watch', ['scripts'], function() {
  gulp.watch('lib/*.ts', ['scripts']);
});

// gulp.task('compile-ts', function(){
//   gulp.src(paths.ts)
//     .pipe(typescript())
//     .pipe(gulp.dest(paths.dist + 'js'))
// });
//
// gulp.task('compile-ts-dev', function(){
//   gulp.src(paths.ts)
//     .pipe(typescript())
//     .pipe(gulp.dest('./src/js'));
// });


gulp.task('clean', function () {
  gulp.src(paths.dist, {read: false})
    .pipe(clean({force: true}))
    .on('error', gutil.log);
});

gulp.task('copy', function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('uglify', ['lint'], function () {
  var srcs = [paths.libs[0], paths.js[0]];

  gulp.src(srcs)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', function () {
 gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', function() {
  gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', function() {
  gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(['./src/index.html', paths.css, paths.ts], ['scripts', 'html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['clean', 'copy', 'compile-ts', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);

