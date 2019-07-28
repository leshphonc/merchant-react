import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  
  @font-face {
    font-family: 'iconfont';  /* project id 1315086 */
    src: url('//at.alicdn.com/t/font_1315086_o00urncvgr.eot');
    src: url('//at.alicdn.com/t/font_1315086_o00urncvgr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1315086_o00urncvgr.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1315086_o00urncvgr.woff') format('woff'),
    url('//at.alicdn.com/t/font_1315086_o00urncvgr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1315086_o00urncvgr.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`