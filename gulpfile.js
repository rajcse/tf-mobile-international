var path = require('path'),
	gulp = require('gulp'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	uglify = require('gulp-uglify'),
	exorcist = require('exorcist'),
	changed = require('gulp-changed'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	autoprefix = require('gulp-autoprefixer'),
	nodeNotifier = require('node-notifier'),
	notify = require('gulp-notify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sourceDir = 'lib/',
	buildDir = 'www/',
	vendorLibs = [
		'lodash',
		'react',
		'react-dom',
		'react-router',
		'flux',
		'events',
		'whatwg-fetch',
		'jwt-decode'
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
		.pipe(minifyCss({keepSpecialComments: 0, processImport: false}).on('error', handleError))
		.pipe(gulp.dest(buildDir + 'css/'))
		.pipe(notify(function(file){return 'CSS Compiled'}));
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

var b = browserify({
			entries: sourceDir + 'scripts/app.js',
			extensions: ['.jsx'],
			debug: true,
			paths: ['./node_modules'],
			plugin: [watchify],
			cache: {},
			packageCache: {}
		})
		.transform('babelify', {presets: ['es2015', 'react']})
		.transform('uglifyify');

// Mark all the vendor libraries as external dependencies
for (var i = 0; i < vendorLibs.length; i++) {
	if(typeof vendorLibs[i] === 'string') {
		b.external(vendorLibs[i]);
	} else {
		b.external(vendorLibs[i].expose);
	}
}

function bWatch() {
	b = watchify(b, {ignoreWatch: true});

	b.on('update', bundle);
}


function bundle(){
	return b.bundle()
			.on('error', handleError)
			.pipe(exorcist(path.join(__dirname, buildDir, mapfile)))
			.pipe(source('js/app.js'))
			.pipe(buffer())
			.pipe(gulp.dest(buildDir))
			.pipe(notify(function(file){return 'App JS Updated'}));
}

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

gulp.task('build', ['styles', 'html', 'images', 'vendor'], bundle);
gulp.task('build-css', ['styles']);
gulp.task('build-js', bundle);

gulp.task('default', function(){
	bWatch();
	bundle();
	gulp.watch(sourceDir + 'less/*.less', ['styles']);
	gulp.watch(sourceDir + '**.html', ['html']);
	gulp.watch(sourceDir + 'img/**', ['images']);

	console.log('\033[36m Watching Assets\033[39m');
});
