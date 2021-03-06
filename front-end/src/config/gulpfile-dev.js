/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const {
  src,
  dest,
  series,
  parallel,
  watch,
} = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const proxy = require("http-proxy-middleware");

const devPath = "../../dev";

// copyhtml
function copyhtml() {
  return src("../*.html")
    .pipe(dest(devPath))
    .pipe(connect.reload());
}

// copylibs
function copylibs() {
  return src("../libs/**/*")
    .pipe(dest(`${devPath}/libs`));
}

// copylibs
function copyassets() {
  return src("../assets**/*")
    .pipe(dest(`${devPath}/`));
}

// 编译sass
function packSCSS() {
  return src("../styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(`${devPath}/styles`))
    .pipe(connect.reload());
}

// JS模块化
function packJS() {
  return src("../scripts/*.js")
    .pipe(webpack({
      mode: "development",
      entry: {
        app: "../scripts/app.js",
        login: "../scripts/login.js",
        register: "../scripts/register.js",
      },
      output: {
        path: path.resolve(__dirname, devPath),
        filename: "[name].js",
      },
      module: {
        rules: [{
          test: /\.html$/,
          loader: "string-loader",
        },
        {
          test: /\.art$/,
          loader: "art-template-loader",
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        ],
      },
    }))
    .pipe(dest(`${devPath}/scripts`))
    .pipe(connect.reload());
}

// 启动server
function gulpServer() {
  return connect.server({
    name: "Dist App",
    root: devPath,
    port: 9000,
    host: "localhost",
    livereload: true,
    middleware: () => [
      proxy("/api", {
        target: "http://localhost:4000",
        changeOrigin: true,

      }),
    ],
  });
}

// watch
function watchFiles() {
  watch("../*.html", series(copyhtml));
  watch("../libs/*", series(copylibs));
  watch("../**/*", series(packJS));
  watch("../**/*.scss", series(packSCSS));
  watch("../assets/*", series(copyassets));
}

// eslint-disable-next-line max-len
exports.default = series(parallel(copyhtml, copyassets, copylibs, packSCSS, packJS), parallel(gulpServer, watchFiles));
