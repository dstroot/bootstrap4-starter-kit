/* exported dotenv */

// Install: you must install gulp both globally *and* locally.
// Make sure you `$ npm install -g gulp`

/**
 * Dependencies
 */

const $ = require('gulp-load-plugins')({ lazy: true });
const os = require('os');
const del = require('del');
const gulp = require('gulp');
const { exec } = require('child_process');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

require('dotenv').load({ silent: true });

// const stripLine   = require('gulp-strip-line');
const runSequence = require('run-sequence');

/**
 * Banner
 */

const pkg = require('./package.json');

const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  '',
].join('\n');

const jqueryCheck = [
  'if (typeof jQuery === \'undefined\') {',
  '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\');',
  '}',
  '',
].join('\n');

const jqueryVersionCheck = [
  '+function ($) {',
  '  var version = $.fn.jquery.split(\' \')[0].split(\'.\');',
  '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {',
  '    throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery version 1.9.1 or higher\');',
  '  }',
  '}(jQuery);',
  '',
  '+function ($) {',
  '',
].join('\n');

const footer = '\n\n}(jQuery);';

/**
 * Paths
 */

const paths = {
  clean: [
    'public/js/**/*.js',
    'public/js/**/*.map',
    'public/js/**/*.min.js',
    'public/lib/bootstrap/js/dist/**/*.js',
    'public/lib/bootstrap/js/dist/**/*.js.map',
    'public/lib/popper.js/**/*',
    'public/lib/animate.css/**/*',
    'public/lib/chart.js/**/*',
    'public/lib/numeral/**/*',
    'public/css/**/*.css',
    'public/css/**/*.min.css',
    'public/css/**/*.map',
    'public/css/**/*.min.map',
  ],
  es6: [
    'public/lib/bootstrap/js/src/*.js',
  ],
  js: [

    // Enable/disable as needed but only turn on
    // .js that is needed on *every* page. No bloat!
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/bootstrap/js/dist/alert.js',
    'node_modules/bootstrap/js/dist/button.js',
    'node_modules/bootstrap/js/dist/carousel.js',
    'node_modules/bootstrap/js/dist/collapse.js',
    'node_modules/bootstrap/js/dist/dropdown.js',
    'node_modules/bootstrap/js/dist/modal.js',
    'node_modules/bootstrap/js/dist/scrollspy.js',
    'node_modules/bootstrap/js/dist/tab.js',
    'node_modules/bootstrap/js/dist/tooltip.js',
    'node_modules/bootstrap/js/dist/popover.js',

    // 'public/lib/app/app.js'
  ],
  lint: [
    'server/bin/*',
    // 'test/**/*.js',
    // 'server/routes/**/*.js',
    // 'server/models/**/*.js',
    // 'server/app.js',
    // 'server/config.js',
    'gulpfile.js',
  ],
  scss: [
    'scss/main.scss',
  ],
};

/**
 * Clean
 */

gulp.task('clean', () => {
  return del(paths.clean);
});


/**
 * Copy
 */

gulp.task('copy', () => {
  // popper
  gulp.src('./node_modules/popper.js/dist/umd/popper.min.*')
    .pipe(gulp.dest('./public/lib/popper.js'));

  // animate.css
  gulp.src('./node_modules/animate.css/animate.min.css')
    .pipe(gulp.dest('./public/lib/animate.css'));

  // chart.js
  gulp.src('./node_modules/chart.js/dist/*.*')
    .pipe(gulp.dest('./public/lib/chart.js'));

  // numeral
  gulp.src('./node_modules/numeral/min/*.*')
    .pipe(gulp.dest('./public/lib/numeral'));
});


/**
 * Process CSS
 */

gulp.task('styles', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano({
      preset: 'default',
    }),
  ];

  return gulp.src(paths.scss)               // Read in scss files
    .pipe($.sass()
      .on('error', $.sass.logError))        // Compile scss files
    .pipe($.header(banner, { pkg }))        // Add banner
    .pipe($.rename({ suffix: '.min' }))     // Add .min suffix
    .pipe($.size({ title: 'CSS:' }))        // What size are we at?
    .pipe($.sourcemaps.init())
    .pipe($.postcss(plugins))               // Process CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))        // Save CSS here
    .pipe($.livereload());                  // Initiate a reload
});

/**
 * transpile es6
 */

gulp.task('transpile', () => {
  return gulp.src(paths.es6)                // Get es6 src files
    // .pipe(stripLine([/^(import|export)/g]))
    .pipe($.babel({
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: [
        'transform-es2015-modules-strip',
      ],
    }))                                     // transpile to es5
    .pipe(gulp.dest('./public/lib/bootstrap/js/dist'));
});

/**
 * Process Scripts
 */

gulp.task('scripts', ['transpile'], () => {
  function createErrorHandler(name) {
    return (err) => {
      console.error(`Error from, ${name}, in scripts task, ${err.toString()}`);
    };
  }

  return gulp.src(paths.js)                 // Read .js files
    .pipe($.concat('main.js'))              // Concatenate .js files
    .pipe($.header(jqueryVersionCheck))     // Add banner
    .pipe($.header(jqueryCheck))            // Add banner
    .pipe($.footer(footer))                 // Add banner
    .pipe(gulp.dest('./public/js'))         // Save main.js here
    .pipe($.rename({ suffix: '.min' }))     // Add .min suffix
    .pipe($.uglify())                       // Minify the .js
    .on('error', createErrorHandler('uglify'))
    .pipe($.header(banner, { pkg }))        // Add banner
    .pipe($.size({ title: 'JS:' }))         // What size are we at?
    .pipe(gulp.dest('./public/js'))         // Save minified .js
    .pipe($.livereload());                  // Initiate a reload
});

// /**
//  * JSHint Files
//  */
//
// gulp.task('lint', function () {
//   return gulp.src(paths.lint)               // Read .js files
//     .pipe($.jshint())                       // lint .js files
//     .pipe($.jshint.reporter('jshint-stylish'));
// });
//
// /**
//  * JSCS Files
//  */
//
// gulp.task('jscs', function () {
//   return gulp.src(paths.lint)               // Read .js files
//     .pipe($.jscs({ fix: true }))
//     .pipe($.jscs.reporter());
// });


gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(paths.lint)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe($.eslint('.eslintrc'))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe($.eslint.format());
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  // .pipe(eslint.failAfterError());
});


/**
 * Test Task
 */

gulp.task('mocha', () => {
  return gulp.src('./test/*.js', { read: false })
    .pipe($.mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit(0);
    });
});

/**
 * Instanbul Code Coverage
 */

gulp.task('test', (cb) => {
  exec('istanbul cover _mocha -- -R spec', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);  // finished task
  });
});

/**
 * Build Task
 *   - Build all the things...
 */

gulp.task('build', (cb) => {
  runSequence(
    'clean',                     // first clean
    ['copy', 'lint'],            // then lint and jscs
    ['styles', 'scripts'],       // Then styles and scripts
    // ['mocha'],
    cb,
  );
});

/**
 * Nodemon Task
 */

gulp.task('nodemon', ['build'], (cb) => {
  let called = false;
  const debug = `${pkg.name}:*`;

  $.livereload.listen();

  $.nodemon({
    script: './server/bin/www',
    verbose: false,
    env: { DEBUG: debug },
    ext: 'js',
    ignore: [
      'gulpfile.js',
      'public/',
      'server/views/',
      'scss/',
      'node_modules/',
    ],
  })
    .on('start', () => {
      setTimeout(() => {
        if (!called) {
          called = true;
          cb();
        }
      }, 3000);  // wait for start
    })
    .on('restart', () => {
      setTimeout(() => {
        $.livereload.changed('/');
      }, 3000);  // wait for restart
    });
});


/**
 * Open the browser
 */

gulp.task('open', ['nodemon'], () => {
  let browser = '';

  if (os.platform() === 'linux') {
    browser = 'google-chrome';
  } else if (os.platform() === 'darwin') {
    browser = 'google chrome';
  } else if (os.platform() === 'win32') {
    browser = 'chrome';
  }

  gulp.src('')
    .pipe($.open({ app: browser, uri: 'http://localhost:3000' }));
});


/**
 * Default Task
 */

gulp.task('default', ['open'], () => {
  gulp.watch('server/scss/**/*.scss', ['styles']);
  gulp.watch(paths.es6, ['scripts']);
  gulp.watch(paths.lint, ['lint']);
  gulp.watch('server/views/**/*.pug').on('change', $.livereload.changed);
});
