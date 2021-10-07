const gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

// Tache de connexion
function connect() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/css/*.css", css);
    gulp.watch("src/js/*.cs", js);
    gulp.watch("./*.html").on("change", browserSync.reload)
}


// Tache CSS
function css() {
    return gulp.src("src/css/*.css")
        .pipe(prefix("last 2 versions"))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
};

// Tache JS
function js() {
    return gulp.src("src/js/*js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("app.js"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());

}

//Tache img
function images() {
    return gulp.src("src/img/*.+(png|jpg|gif|svg)")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
};

gulp.task("default", gulp.parallel(css, js, images, connect));