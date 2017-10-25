// 用于在终端打印彩色文字
const chalk = require('chalk');
// 语义化版本号模块
const semver = require('semver');
const packageConfig = require('../package.json');
// shelljs模块封装了child_process,使调用系统命令更方便
const shell = require('shelljs');

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
];
if (shell.which('npm')) {
  versionRequirements.push({
    name : 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  });
}

module.exports = function () {
  var warnings = [];
  versionRequirements.forEach(function(item, i) {
    let mod = item;
    // 比较当前系统node，npm等所需环境的版本号是否与package.json中指定的版本号符合
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': '
        + chalk.red(mod.currentVersion) + ' should be '
        + chalk.green(mod.versionRequirement)
      );
    }
  }, this);

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('Admin管理系统需要更新一下模块：'));
    console.log('');
    warnings.forEach(function(warning) {
      console.log('    ' + warning);
    }, this);
    console.log('');
    process.exit(1);
  }
};

