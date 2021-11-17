module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  rules: {
    // ============命名=============
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      }, // 强制使用驼峰、帕斯卡、常量大写命名  --CUSTOM
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      }, // class和interface采用帕斯卡命名(不允许下划线)
    ],
    '@typescript-eslint/interface-name-prefix': 0, // interface命名必须以I开头

    // ============空格 && 缩进=============
    indent: [
      2,
      2,
      {
        // 缩进
        FunctionDeclaration: {
          body: 1,
          parameters: 2,
        },
        SwitchCase: 1,
      },
    ],
    'eol-last': [1, 'always'], // 要求或禁止文件末尾存在空行
    'func-call-spacing': [2, 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'template-tag-spacing': [2, 'always'], // 要求或禁止在模板标记和它们的字面量之间有空格
    'spaced-comment': [
      2,
      'always',
      {
        // 要求或禁止在注释前有空白
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-infix-ops': 2, // 要求中缀操作符周围有空格
    'comma-spacing': [2, { after: true }], // 强制在逗号前后使用一致的空格
    'no-trailing-spaces': 2, // 禁用行尾空格
    'space-before-function-paren': [1, 'never'], // 要求或禁止函数圆括号之前有一个空格
    'no-multi-spaces': 2, // 禁止使用多个空格
    'object-curly-spacing': [2, 'always'], // 对象大括号旁必须有空格
    'no-unexpected-multiline': 2, // 禁止不期待的多行写法
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }], // 过长需换行时操作符的位置  --CUSTOM

    // ============符号相关=============
    'comma-style': [2, 'last'], // 逗号规则
    'comma-dangle': [2, 'always-multiline'], // 行末尾必须有逗号
    'semi-style': [2, 'last'], // 强制分号的位置
    semi: [2, 'always'], // 语句必须分号结尾
    'jsx-quotes': [2, 'prefer-double'], // JSX元素中的字符串必须使用双引号
    quotes: [2, 'single'], // 字符串必须使用单引号
    'import/order': 2, // import引入按照一定顺序,
    eqeqeq: [2, 'smart'], // 强制使用三等，除了对比null/undefined  --CUSTOM
    'no-extra-parens': 0, // 禁止不必要的括号 (as any写法会被误判)

    // ============箭头函数相关=============
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
    'no-confusing-arrow': [2, { allowParens: true }], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'arrow-spacing': [2, { before: true, after: true }],
    'arrow-body-style': [2, 'as-needed'], // 要求箭头函数体使用大括号

    // ============其他=============
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'one-var-declaration-per-line': 2, // 禁止一次性定义多个变量
    'key-spacing': [2, { afterColon: true }], // object的key的“:”之后至少有一个空格
  },
};
