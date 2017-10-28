module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
      sourceType: 'module'
  },
  env: {
      browser: true,
      node: true,
      es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
      'html'
  ],
  // check if imports actually resolve
  'settings': {
      'import/resolver': {
          'webpack': {
            // 使用webpack
              'config': 'build/webpack.base.conf.js'
          }
      }
  },
  // add your custom rules here
  // eslint 规则配置
  //it is base on https://github.com/vuejs/eslint-config-vue
  'rules': {
    // 强制getter/setter在object中成对
      'accessor-pairs': 2,
      // 强制箭头函数的箭头前后使用一致的空格
      'arrow-spacing': [2, { 'before': true, 'after': true }],
      // 强制在单行代码块中使用一致的空格
      'block-spacing': [2, 'always'],
      // 强制在代码块中使用一致的大括号风格
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      // 强制使用骆驼拼写法命名约定
      'camelcase': [0, { 'properties': 'always' }],
      // 要求或禁止末尾逗号
      'comma-dangle': [2, 'never'],
      // 强制在逗号周围使用空格
      'comma-spacing': [2, { 'before': false, 'after': true }],
      // 强制使用一致的逗号风格
      'comma-style': [2, 'last'],
      // 要求在构造函数中有 super() 的调用
      'constructor-super': 2,
      // 在块区域前后时刻保留大括号
      'curly': [2, 'multi-line'],
      // 选项 "property" 要求点操作符和属性放在同一行。
      'dot-location': [2, 'property'],
      // 要求或禁止文件末尾存在空行
      'eol-last': 2,
      // 使用类型安全的 === 和 !== 操作符代替 == 和 != 操作符是一个很好的实践
      'eqeqeq': [2, 'allow-null'],
      // 强制 generator 函数中 * 号周围使用一致的空格
      'generator-star-spacing': [2, { 'before': true, 'after': true }],
      // 强制回调错误处理
      'handle-callback-err': [2, '^(err|error)$' ],
      // 强制使用一致的缩进
      'indent': [2, 2, { 'SwitchCase': 1 }],
      // 强制在 JSX 属性中一致地使用双引号或单引号
      'jsx-quotes': [2, 'prefer-single'],
      // 强制在对象字面量的属性中键和值之间使用一致的间距
      'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
      // 强制在关键字前后使用一致的空格
      'keyword-spacing': [2, { 'before': true, 'after': true }],
      // 需要构造函数名以大写开头
      'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],
      // 调用一个没有参数的构造函数时需要括号 var person = new Person()
      'new-parens': 2,
      // disallow Array constructors Array(500) | new Array(someOtherArray.length)
      'no-array-constructor': 2,
      /**
       * 禁用 caller/callee
       * 不推荐写法：
       * function foo(n) {
       *  if (n <= 0) {
       *    return;
       *  }
       *  arguments.callee(n - 1);
       * }
       * [1,2,3,4,5].map(function (n) {
       *  return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
       * });
       * 推荐做法：
       * function foo(n) {
       *  if (n <= 0) {
       *    return;
       *  }
       *  foo(n - 1);
       * }
       * [1,2,3,4,5].map(function factorial (n) {
       *  return !(n > 1) ? 1 : factorial(n - 1) * n;
       * });
       */
      'no-caller': 2,
      // 进制使用console，关闭
      'no-console': 'off',
      // 不允许重新分配类成员
      'no-class-assign': 2,
      // 不允许修改类中声明的变量
      'no-cond-assign': 2,
      // 不允许重新分配常量变量
      'no-const-assign': 2,
      // disallow control characters in regular expressions
      'no-control-regex': 2,
      // 不允许删除变量
      'no-delete-var': 2,
      // 在函数定义中不允许重复的变量
      'no-dupe-args': 2,
      // 不允许重复的类成员
      'no-dupe-class-members': 2,
      // 对象中不允许重复的键名
      'no-dupe-keys': 2,
      // 不允许重复的case标签
      'no-duplicate-case': 2,
      // 不允许有空字符串类的正则
      'no-empty-character-class': 2,
      // 不允许空的结构模式
      'no-empty-pattern': 2,
      // 禁用eval
      'no-eval': 2,
      'no-ex-assign': 2,
      // 不允许扩展原生对象
      'no-extend-native': 2,
      // 进制不必要的bind调用
      'no-extra-bind': 2,
      // 进制不必要的布尔数据类型转换
      'no-extra-boolean-cast': 2,
      // 避免不必要的括号
      'no-extra-parens': [2, 'functions'],
      // Disallow Case Statement Fallthrough
      'no-fallthrough': 2,
      // Disallow Floating Decimals
      'no-floating-decimal': 2,
      // 不允许重复的function声明
      'no-func-assign': 2,
      // 不允许使用隐式的evel调用
      'no-implied-eval': 2,
      // disallow variable or function declarations in nested blocks
      'no-inner-declarations': [2, 'functions'],
      // 不允许无效的正则表达式
      'no-invalid-regexp': 2,
      // disallow irregular whitespace
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }],
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [2, { 'max': 1 }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 2,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [2, { 'defaultAssignment': false }],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'one-var': [2, { 'initialized': 'never' }],
      'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'semi': [2, 'always'],
      'semi-spacing': [2, { 'before': false, 'after': true }],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
      'spaced-comment': [2, 'always', { 'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'object-curly-spacing': [2, 'always', { objectsInObjects: false }],
      'array-bracket-spacing': [2, 'never']
  }
}
