/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      // 同设置根节点字体大小的值，作为计算基数
      rootValue: 32,
      exclude: /(node_module)/,
      mediaQuery: false,
    }),
  ],
};
