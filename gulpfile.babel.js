import gulp from "gulp";
import sass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

const sassCompiler = gulpSass(sass)

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "assets/scss/**/*.scss"
    }
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sassCompiler())
        .pipe(autoPrefixer({
            browsers: ["last 2 versions"],
            cascade: false,
            overrideBrowserslist: [
                "defaults and supports es6-module",
                "maintained node versions"
            ]
        })).pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
    gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles])

export default dev;