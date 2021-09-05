module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 官方eslint规则 https://github.com/vuejs/eslint-config-vue
  // 爱彼迎前端规范 https://github.com/libertyAlone/airbnb-javascript-style-guide-cn
  /* 
    "off" 或者 0  关闭规则关闭
    "warn" 或者 1  在打开的规则作为警告（不影响退出代码）
    "error" 或者 2  把规则作为一个错误（退出代码触发时为1） 
  */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 使用字面语法创建对象
    'no-new-object': 2,
    // 使用对象方法的简写形式
    'object-shorthand': 2,
    // 只对非法标识符的属性使用引号
    'quote-props': [2, 'as-needed'],
    // 使用字面量语法创建数组
    'no-array-constructor': 2,
    // 在数组方法的回调函数中使用return.如果函数体只有一条返回没有副作用的声明则可以省略return
    'array-callback-return': 1,
    // 动态构建字符串时使用模板字符串而不是拼接
    'prefer-template': 2,
    'template-curly-spacing': [2, 'never'],
    // 不要在字符串中使用不必要的转义字符
    'no-useless-escape': 2,
    // 使用具名函数表达式而非函数声明
    'func-style': [2, 'declaration', { allowArrowFunctions: true }],
    // 用圆括号包裹自执行匿名函数
    'wrap-iife': [2, 'any'],
    'space-before-blocks': 2,
    // 当你必须使用函数表达式（传递匿名函数）时，使用箭头函数标记.
    'prefer-arrow-callback': 2,
    'arrow-body-style': [2, 'as-needed'],
    // 避免把箭头函数语法 (=>) 和比较运算符 (<=, >=)弄混
    'no-confusing-arrow': 2,
    // 注意有隐式返回函数体的箭头函数的位置.
    'implicit-arrow-linebreak': [2, 'beside'],
    // 避免类成员重复.
    'no-dupe-class-members': 2,
    // 命名对象，函数和实例时使用驼峰风格.
    camelcase: 2,
    // 仅当命名构造函数或类的时候使用帕斯卡风格.
    'new-cap': 2
  }
}
