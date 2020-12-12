var gulp = require("gulp"),
  lastRun = gulp.lastRun, //配合src使用，可以跳过上一次任务处理后没有发生改变的文件
  util = require("gulp-util"),
  del = require("del"),
  livereload = require("gulp-livereload"),
  extReplace = require("gulp-ext-replace"),
  htmlmin = require("gulp-htmlmin"),
  less = require("gulp-less"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  pxtorem = require("postcss-pxtorem"),
  cssnano = require("cssnano"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  jpegRecompress = require("imagemin-jpeg-recompress"),
  pngQuant = require("imagemin-pngquant"),
  svgo = require("imagemin-svgo"),
  gifsicle = require("imagemin-gifsicle"),
  webp = require("imagemin-webp");
/**
 * 压缩HTML文件
 */
function minifyHTML() {
  var src = "src/**/*.html", //src及其子目录下所有html文件
    dest = "dist";
  return gulp.src(src, { since: lastRun(minifyHTML) }) //读取文件
    .pipe(htmlmin({ //压缩文件
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(dest)) //处理后的文件输出到指定目录
    .pipe(livereload()); //告诉livereload插件，重新加载浏览器
}
gulp.task(minifyHTML);

/**编译less文件并使用postcss（添加浏览器厂商前缀，转为rem，压缩css */
function buildCSS() {
  var src = "src/less/main.less",
    dest = "dist/css";
  return gulp.src(src, { since: lastRun(buildCSS) })
    .pipe(less()) //编译less，转为css
    .on("error", function(err) {
      util.log(err); //gulp-util插件，记录错误信息到控制台
      this.emit("end");
    })
    .pipe(postcss([
      autoprefixer({
        //还可以使用.browserslistrc文件设置 
        //或者在package.json文件中设置browserList属性
        overrideBrowserslist: [
          'last 4 versions'
        ]
      }),
      pxtorem(), //将px单位转为rem单位
      cssnano() //压缩css
    ]))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

gulp.task(buildCSS);

/**丑化脚本 */
function uglifyJS() {
  var src = 'src/js/**/*.js',
    dest = 'dist/js';
  return gulp.src(src, { since: lastRun(uglifyJS) })
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

gulp.task(uglifyJS);

/**脚本连接任务 */
function concatJS() {
  var src = ["dist/**/*.js", "!dist/js/scripts.js"], //使用已丑化的js文件，排除生成的文件
    dest = "dist/js",
    concatScript = "scripts.js";
  return gulp.src(src, { since: lastRun(concatJS) })
    .pipe(concat(concatScript)) //使用gulp-concat,传入生成的文件名
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}
gulp.task(concatJS);

/* 使用imagemin优化PNG、JPEG、SVG、GIF */
function imageminMain() {
  var src = "src/img/**/*.{png,jpg,svg,gif}",
    dest = "dist/img";
  return gulp.src(src, { since: lastRun(imageminMain) })
    .pipe(imagemin([
      jpegRecompress({
        max: 80 //设置最大输出质量为80
      }),
      pngQuant({
        quality: [0.45, 0.90] //设置质量范围为45%-90%
      }),
      gifsicle(),
      svgo()
    ]))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

gulp.task(imageminMain);

function imageminWebP() {
  var src = "src/img/**/*.{jpg,png}",
    dest = "dist/img";
  return gulp.src(src, { since: lastRun(imageminWebP) })
    .pipe(imagemin([
      webp({
        quality: 65 //设置质量为65%
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

gulp.task(imageminWebP);

//监听任务
function watch() {
  livereload.listen(); //告诉LiveReload监听文件更改（需要下载浏览器插件Live Load）
  gulp.watch("src/**/*.html", minifyHTML); //html文件修改时运行minifyHTML任务
  gulp.watch("src/**/*.less", buildCSS); //监听less文件修改
  gulp.watch("src/**/*.js", gulp.series(uglifyJS, concatJS)); //监听js文件修改，串行执行js文件压缩及拼接
  gulp.watch("src/**/*.{png,svg,jpg,gif}", gulp.parallel(imageminMain, imageminWebP)); //监听图片文件，修改时并行执行图片压缩和生成webp格式图片

}

gulp.task("default", watch); //绑定watch为默认任务，当前目录下执行gulp就会执行

//绑定构建任务(先执行清除再重新构建)
gulp.task("build", gulp.series(clean,
  gulp.parallel(
    minifyHTML, buildCSS, imageminMain, imageminWebP,
    gulp.series(uglifyJS, concatJS)
  )
));

/* 清除任务（删除的文件gulp重新构建时不会删除） */
function clean() {
  return del(["dist"]); //删除dist文件夹(可以是多个)
}
gulp.task(clean);