module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  // 全局变量在此处加入生命，避免eslint校验
  globals: {
    // 'BMap': true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'eqeqeq': 0, // 剔除必须使用全等
    'space-before-function-paren': [0, 'always'] // 函数定义时括号前面要不要有空格
  },
};
