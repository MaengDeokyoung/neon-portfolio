var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');


var path = {
    src: {
        root: 'src/',
    },
    dest: {
        root: 'src/lib/',
    }
};

var scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle: 'expanded',
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType: "tab",
    /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth: 1,
    /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6,
    /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
};

const SOURCES = [
    // Component handler
    'src/lib/neon-style/js/ui_handler.js',
    /*'src/lib/neon-style/js/ResizeObserver.js',*/
    // Polyfills/dependencies
    //'src/third_party/**/*.js',
    // Base components
    'src/lib/neon-style/js/neon_border.js',
];

gulp.task('build-js', function() {
    return gulp.src(SOURCES)
        .pipe(sourcemaps.init())
        // Concatenate Scripts
        .pipe(concat('opus.js'))
        .pipe(gulp.dest('src/lib/js'))
        // Minify Scripts
        .pipe(uglify())
        .pipe(concat('opus.min.js'))
        // Write Source Maps
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/lib/js'))
});

// building sass to css (compressing & minifying)
gulp.task('build-sass', function(){

    gulp.src([path.src.root + 'lib/neon-style/sass/neon_style.scss'])
    // 소스맵 초기화
        .pipe(sourcemaps.init())
        // scss 함수에 옵션값을 설정, scss 작성시 watch가 멈추지 않도록 logError를 설정
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(concat('opus.css'))
        // .pipe(rename(''))
        // 소스맵 사용
        .pipe(sourcemaps.write())
        // 코드 난독화
        // .pipe(uglify())
        // dest 설정
        .pipe(gulp.dest(path.dest.root + 'css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.dest.root + 'css/'))

});

gulp.task('default', ['build-sass', 'build-js']);
