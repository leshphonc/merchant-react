/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  addWebpackAlias,
  addWebpackExternals,
  addBabelPlugins,
  addLessLoader,
} = require('customize-cra')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
const { theme } = require('./package.json')

const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find(plugin => plugin.constructor.name === pluginName)

const overrideProcessEnv = value => config => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
  const processEnv = plugin.definitions['process.env'] || {}

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  }

  return config
}

const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false // 去掉map文件
    if (config.plugins) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerHost: '127.0.0.1',
          analyzerPort: 8889,
          reportFilename: 'report.html',
          defaultSizes: 'parsed',
          openAnalyzer: true,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info',
        }),
        new UglifyJsPlugin({
          sourceMap: false,
        }),
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8,
        }),
      )
    }
    const splitChunksConfig = config.optimization.splitChunks
    if (config.entry && config.entry instanceof Array) {
      config.entry = {
        main: config.entry,
        vendor: [
          'react',
          'react-dom',
          'react-router-dom',
          'mobx',
          'mobx-react',
          'moment',
          'react-router',
          'echarts',
          'wangeditor',
          'cropperjs',
        ],
      }
    } else if (config.entry && typeof config.entry === 'object') {
      config.entry.vendor = [
        'react',
        'react-dom',
        'react-router-dom',
        'mobx',
        'mobx-react',
        'moment',
        'react-router',
        'echarts',
        'wangeditor',
        'cropperjs',
      ]
    }

    Object.assign(splitChunksConfig, {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
          chunks: 'all',
        },
      },
    })
  }
  return config
}

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackExternals({
    BMap: 'BMap',
  }),
  ...addBabelPlugins(
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['import', { libraryName: 'antd-mobile', style: true }],
  ),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }),
  addCustomize(),
  overrideProcessEnv({
    TEST: JSON.stringify('testenv'),
  }),
)
