const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./path');

const { src, build, publicSrc } = paths;

const sassLoadConfig = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('autoprefixer'),
          require('postcss-plugin-px2rem')({
            rootValue: 32,
          }),
        ],
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
      title: 'React H5 Project',
      favicon: 'public/favicon.ico',
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
                plugins: [
                  require('autoprefixer'),
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
    historyApiFallback: true,
    open: false,
    port: 8080,
  },
};
