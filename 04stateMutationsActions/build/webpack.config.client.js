const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')//帮助合并config文件
const ExtractPlugin = require('extract-text-webpack-plugin')  //抽离css文件
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config;
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,//热加载 修改某个页面，就只重新渲染这个页面  增加 config.plugins.push
  historyApiFallback: {
    index: '/public/index.html'
  }
  // open:true  默认打开浏览器
  // historyFallback:{}
}
const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',  //帮助调试
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            /*{
              loader:'css-loader',
              options:{
                  module:true,
                  localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
              }
            },*/
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        },
      ]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({  //抽离稳定的内库文件
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({  //webpack新的模块
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
