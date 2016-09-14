var path = require('path'),
	gulp = require('gulp'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	uglify = require('gulp-uglify'),
	exorcist = require('exorcist'),
	changed = require('gulp-changed'),
	less = require('gulp-less'),
	serve = require('gulp-serve'),
	livereload = require('gulp-livereload'),
	cleanCss = require('gulp-clean-css'),
	autoprefix = require('gulp-autoprefixer'),
	lrload = require('livereactload'),
	nodeNotifier = require('node-notifier'),
	notify = require('gulp-notify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sourceDir = 'lib/',
	buildDir = 'www/',
	vendorLibs = [
		'classnames',
		'chart.js',
		'events',
		'flux',
		'jwt-decode',
		'lodash',
		'moment',
		'react',
		'react-addons-css-transition-group',
		'react-chartjs-2',
		'react-dom',
		'react-owl-carousel',
		'react-router',
		'react-sticky',
		'react-tap-event-plugin',
		'scroll-js',
		'uuid',
		'whatwg-fetch'
	],
	mapfile = 'js/app.js.map';

// Error handler
function handleError(err) {
	console.log('\033[1;37;41m[ERROR!] ' + err.message + '\033[49m');
	nodeNotifier.notify({
		title: 'COMPILE ERROR',
		message: 'Your file did not compile:\n' + err.message,
		sound: true
	});

	this.emit('end');
}

gulp.task('styles', function(){
	return gulp.src(sourceDir + 'less/main.less')
		.pipe(less().on('error', handleError))
		.pipe(autoprefix({browsers: ['last 2 versions', 'not ie <= 8']}))
		.pipe(cleanCss({keepSpecialComments: 0, processImport: false}).on('error', handleError))
		.pipe(gulp.dest(buildDir + 'css/'))
		.pipe(notify(function(file){return 'CSS Compiled'}));
});

gulp.task('styles-live', function(){
	return gulp.src(sourceDir + 'less/main.less')
		.pipe(less().on('error', handleError))
		.pipe(autoprefix({browsers: ['last 2 versions', 'not ie <= 8']}))
		.pipe(cleanCss({keepSpecialComments: 0, processImport: false}).on('error', handleError))
		.pipe(gulp.dest(buildDir + 'css/'))
		.pipe(notify(function(file){return 'CSS Compiled'}))
		.pipe(livereload({ auto: false }));
});

gulp.task('html', function(){
	return gulp.src(sourceDir + '**.html')
		.pipe(changed(buildDir))
		.pipe(gulp.dest(buildDir))
		.pipe(notify(function(file){return 'HTML Updated'}));
});

gulp.task('images', function(){
	return gulp.src(sourceDir + 'img/**')
		.pipe(changed(buildDir))
		.pipe(gulp.dest(buildDir + 'img'))
		.pipe(notify(function(file){return 'Images Updated'}));
});

function devBundler(watch, live) {
	var bPlugins = [];

	if(watch) bPlugins.push([watchify, {ignoreWatch: true}]);
	if(live) bPlugins.push(lrload);

	var b = browserify({
				entries: sourceDir + 'scripts/app.js',
				debug: process.env.NODE_ENV !== 'production',
				plugin: bPlugins,
				cache: {},
				packageCache: {}
			})
			.transform('babelify', {
				presets: ['es2015', 'react'],
				plugins: live ? ['transform-object-rest-spread', ["react-transform",
                    {
                        "transforms": [{
                            "transform": "livereactload/babel-transform",
                            "imports": ["react"]
                        }]
                    }
                ]] : ['transform-object-rest-spread']
			})
			.transform('folderify')
			.transform('uglifyify');

	// Mark all the vendor libraries as external dependencies
	for (var i = 0; i < vendorLibs.length; i++) {
		if(typeof vendorLibs[i] === 'string') {
			b.external(vendorLibs[i]);
		} else {
			b.external(vendorLibs[i].expose);
		}
	}

	// Require the appropriate config based on environment
	if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa') {
		b.require('./lib/scripts/config.js', {expose: 'config'});
	} else {
		b.require('./lib/scripts/config-dev.js', {expose: 'config'});
	}

	if(watch) b.on('update', rebundle);

	b.on('error', handleError);

	rebundle();

	function rebundle(){
		var bundle = b.bundle();

		if(!live) bundle = bundle.pipe(exorcist(path.join(__dirname, buildDir, mapfile)));

		return bundle.pipe(source('js/app.js'))
				.pipe(buffer())
				.pipe(gulp.dest(buildDir))
				.pipe(notify(function(file){return 'App JS Updated'}));
	}
}

function bundle() {
	var b = browserify({
				entries: sourceDir + 'scripts/app.js',
				debug: process.env.NODE_ENV !== 'production',
				plugin: [],
				cache: {},
				packageCache: {}
			})
			.transform('babelify', {
				presets: ['es2015', 'react'],
				plugins: ['transform-object-rest-spread']
			})
			.transform('folderify')
			.transform('uglifyify');

	// Mark all the vendor libraries as external dependencies
	for (var i = 0; i < vendorLibs.length; i++) {
		if(typeof vendorLibs[i] === 'string') {
			b.external(vendorLibs[i]);
		} else {
			b.external(vendorLibs[i].expose);
		}
	}

	// Require the appropriate config based on environment
	if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa') {
		b.require('./lib/scripts/config.js', {expose: 'config'});
	} else {
		b.require('./lib/scripts/config-dev.js', {expose: 'config'});
	}

	b = b.bundle();

	if(process.env.NODE_ENV !== 'production') b = b.pipe(exorcist(path.join(__dirname, buildDir, mapfile)));

	return b.on('error', handleError)
			.pipe(source('js/app.js'))
			.pipe(buffer())
			.pipe(gulp.dest(buildDir))
			.pipe(notify(function(file){return 'App JS Updated'}));
}


// Task that will set the environment to production priod to any build tasks
gulp.task('set-production', function(){
	return process.env.NODE_ENV = 'production';
});

gulp.task('vendor-dev', function(){
	var b = browserify({
			transform: [
				'browserify-shim'
			]
		});

	b.require(vendorLibs);

	return b.bundle().on('error', handleError)
		.pipe(source('js/vendor.js'))
		.pipe(buffer())
		.pipe(gulp.dest(buildDir))
		.pipe(notify(function(file){return 'Dev Vendor JS Compiled'}));
});

gulp.task('vendor', function(){
	var b = browserify({
			transform: [
				'browserify-shim',
				'uglifyify'
			]
		});

	b.require(vendorLibs);

	return b.bundle().on('error', handleError)
		.pipe(source('js/vendor.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(buildDir))
		.pipe(notify(function(file){return 'Vendor JS Compiled'}));
});

gulp.task('build', ['set-production', 'styles', 'html', 'images', 'vendor'], bundle);
gulp.task('build-dev', ['styles', 'html', 'images', 'vendor-dev'], bundle);
gulp.task('build-css', ['set-production', 'styles']);
gulp.task('build-js', ['set-production', 'vendor'], bundle);

gulp.task('live', function(){
	devBundler(true, true);
	serve('www')();

	livereload.listen();

	gulp.watch(sourceDir + 'less/*.less', ['styles-live']);
	gulp.watch(sourceDir + '**.html', ['html']);
	gulp.watch(sourceDir + 'img/**', ['images']);

	console.log('\033[36m Watching Assets\033[39m');
});

gulp.task('default', function(){
	devBundler(true);

	gulp.watch(sourceDir + 'less/*.less', ['styles']);
	gulp.watch(sourceDir + '**.html', ['html']);
	gulp.watch(sourceDir + 'img/**', ['images']);

	console.log('\033[36m Watching Assets\033[39m');
});
