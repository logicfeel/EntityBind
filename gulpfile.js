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
        'src/i-bind-model.js', 'src/i-bind-model-read.js', 'src/i-bind-model-list.js',
        'src/i-bind-model-edit.js', 'src/i-bind-model-create.js',
        'src/i-bind-model-read-del.js', 'src/i-bind-model-form.js', 'src/i-bind-model-list-del.js',
        // 컬렉션
        'src/collection-base.js', 'src/collection-array.js', 'src/collection-property.js',
        'src/collection-property-object.js','src/collection-property-function.js',
        // 메타 최상위
        'src/meta-object.js', 'src/meta-element.js', 'src/meta-element-complex.js', 
        // 엔티티
        'src/entity-item.js', 'src/entity-item-dom.js','src/entity-row.js', 'src/entity-base.js', 
        'src/entity-table.js', 'src/entity-view.js', 'src/entity-set.js', 
        // 바인드
        'src/bind-base.js', 'src/bind-command.js', 'src/bind-model.js', 'src/bind-command-ajax.js', 
        'src/bind-command-ajax-edit.js', 'src/bind-command-ajax-lookup.js', 
        'src/bind-model-ajax.js', 
        'src/bind-model-ajax-create.js', 
        'src/bind-model-ajax-read.js', 'src/bind-model-ajax-read-del.js', 
        'src/bind-model-ajax-list.js', 'src/bind-model-ajax-list-del.js', 
        'src/bind-model-ajax-edit.js', 'src/bind-model-ajax-form.js'
    ],
    task: 'task/*.task.js',
    // task: ['task/Collection.ArrayCollection.task.js', 'task/Main.task.js'],     // 임시 테스트
    scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};


gulp.task('auto', function () {
	return gulp.src(paths.js)
		.pipe(concat('auto-meta-' + package.version + '.js'))
		.pipe(gulp.dest(dist));
});

gulp.task('auto-zip', function () {
    return gulp.src(paths.js)
        .pipe(uglify())
		.pipe(concat('auto-meta-' + package.version + '.zip.js'))
		.pipe(gulp.dest(dist));
});

gulp.task('auto-min', function () {
    return gulp.src(paths.js)
        .pipe(minifyhtml())
		.pipe(concat('auto-meta-' + package.version + '.min.js'))
		.pipe(gulp.dest(dist));
});

gulp.task('task', function () {
	return gulp.src(paths.task)
		.pipe(concat('auto-meta-' + package.version + '.task.js'))
		.pipe(gulp.dest(dist));
});

// gulp.task('default', gulp.series['auto']);
// exports.default = 'combine-js';
