import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  
  @font-face {
    font-family: 'iconfont';  /* project id 1315086 */
    src: url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.eot');
    src: url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.woff') format('woff'),
    url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1315086_4t70y48yg9l.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
