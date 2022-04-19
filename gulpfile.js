const { src, dest, series, parallel, watch } = require('gulp');

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const imagemin = require("gulp-imagemin");
const webp = require('imagemin-webp');
const extReplace = require("gulp-ext-replace");
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist']);
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'));
}

const fonts = () => {
	return src('./src/fonts/**')
		.pipe(dest('dist/fonts/'))
}

const styles = () => {
  return src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'));
};

const images = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/*.svg',
    ])
    .pipe(dest('dist/images'));
};

const webpImages = () => {
  return src([
      'src/images/*/*.jpg',
      'src/images/*/*.jpeg',
      'src/images/*/*.png',
    ])
    .pipe(imagemin([
      webp({
        quality: 75
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(dest('dist/images'));
};

const scripts = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  })
  watch('src/**/*.html', htmlMinify);
  watch('src/styles/**', styles);
  watch('src/images/svg/**/*.svg', svgSprites);
  watch('src/images/svg/**', images);
  watch('src/js/**/*.js', scripts);
  watch('src/resources/**', resources);
};


exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.webpImages = webpImages;

exports.default = series(clean, parallel(resources, fonts, htmlMinify, scripts, svgSprites, images, webpImages), styles, watchFiles);


// Build-версия

const stylesBuild = () => {
  return src('src/styles/**/*.css')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('dist'));
};

const htmlMinifyBuild = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'));
};

const imagesMinify = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/*.svg',
    ])
    .pipe(image())
    .pipe(dest('dist/images'));
};

const scriptsBuild = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js',
    ])
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
    .on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('dist'));
};

exports.build = series(clean, parallel(resources, fonts, htmlMinifyBuild, scriptsBuild, svgSprites, imagesMinify, webpImages), stylesBuild);
