const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const paths = require('./path');

const { src, build, publicSrc } = paths;

const sassLoadConfig = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: () => {
          const plugin = [autoprefixer(), pxtorem({
            rootValue: 100,
            propList: [
              '*',
              '!min-width',
              '!border',
              '!border-left',
              '!border-right',
              '!border-top',
              '!border-bottom',
            ],
            selectorBlackList: [
              'no_rem',
            ],
          })];
          return plugin;
        },
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions: {
        outputStyle: 'compressed',
      },
    },
  },
];

module.exports = {
  entry: [`${src}/index.tsx`],
  output: {
    path: build,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicSrc,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'drx-main-server micro fe',
      favicon: 'favicon.ico',
      template: `${src}/index.ejs`,
      filename: 'index.html', // output file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: sassLoadConfig,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 3 * 1024,
              name: 'images/[name]__[hash:5].[ext]',
              publicPath: publicSrc,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]__[hash:5].[ext]',
              publicPath: publicSrc,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /(node_modules)/,
      },
    ],
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.json', '.js', '.css', '.scss'],
    alias: {
      '@': src,
      assets: publicSrc,
    },
  },
  devServer: {
    open: true,
    port: 8080,
  },
};
