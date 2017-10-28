require('./check-versions')();

process.env.NODE_ENV = 'production';

// 一个很棒的nodejs的命令行环境的loading效果,及状态显示
const ora = require('ora');
// rimfaf是rm -rf的npm包
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

var spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.env_config+ ' mode...' )
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) {
    throw err;
  }
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) {
      throw err;
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete. \n'));
    console.log(chalk.yellow(
      ' Tip: build files are meant to be served over an HTTP server. \n' +
      ' Opening index.html over file:// won\'t work.\n'
    ))
  })
});
