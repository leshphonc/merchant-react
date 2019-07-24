const {
  override, addWebpackAlias, addWebpackExternals, addBabelPlugins,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackExternals({
    BMap: 'BMap',
  }),
  ...addBabelPlugins(
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['import', { libraryName: 'antd-mobile', style: 'css' }],
  ),
)
