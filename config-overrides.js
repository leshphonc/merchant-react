const {
  override, addWebpackAlias, addWebpackExternals, addBabelPlugin,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackExternals({
    BMap: 'BMap',
  }),
  addBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: true }]),
)
