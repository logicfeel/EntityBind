/**
 * Web js 자동화 도구
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var package = require('./package');

var src = '';
var dist = 'dist/';

// Web 의 경우 로딩 순서 관련 있음
var paths = {
	js: [
        // 폴리심 + 확장
        'src/object-implement.js', 'src/array-is_array.slim.js',
        // 공통 유틸리티
        'src/utils.js', 'src/observer.js',
        // 인터페이스
        'src/i-object.js', 'src/i-marshal.js', 'src/i-control*.js',
        'src/i-collection.js', 'src/i-collection-property.js', 'src/i-collection-control.js',
        // 컬렉션
        'src/collection-base.js', 'src/collection-array.js', 'src/collection-property.js',
        // 메타 최상위
        'src/meta-object.js', 'src/meta-element.js', 'src/meta-complex.js', 
        // Entity
        'src/entity-item.js', 'src/entity-row.js', 'src/entity-base.js', 'src/entity-table.js', 
        'src/entity-view.js', 'src/entity-set.js', 
        // Bind
        'src/bind-base.js', 'src/bind-command.js', 'src/bind-model.js', 
        'src/bind-command-view.js', 'src/bind-command-internal.js', 'src/bind-command-*.js',
        'src/bind-*.js'

    ],
	scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};


gulp.task('auto', function () {
	return gulp.src(paths.js)
		.pipe(concat('auto-meta-' + package.version + '.js'))
		.pipe(gulp.dest(dist));
});

gulp.task('auto-min', function () {
    return gulp.src(paths.js)
        .pipe(uglify())
		.pipe(concat('auto-meta-' + package.version + '.min.js'))
		.pipe(gulp.dest(dist));
});

gulp.task('auto-html', function () {
    return gulp.src(paths.js)
        .pipe(minifyhtml())
		.pipe(concat('auto-meta-' + package.version + '.html.js'))
		.pipe(gulp.dest(dist));
});

// gulp.task('default', gulp.series['auto']);
// exports.default = 'combine-js';
