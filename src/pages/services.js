import axios from 'axios'

// 获取微信配置
export const getWxConfig = () =>
  axios.post('/appapi.php?c=Config&a=wx_config', {
    ticket: localStorage.getItem('ticket'),
  })

// 用code换取openid
export const fetchOpenId = code =>
  axios.get('/appapi.php?c=MerchantPay&a=get_openid', {
    params: {
      code,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 省份
export const fetchProvince = () =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 市区
export const fetchCity = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 地区
export const fetchArea = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })
// 商圈
export const fetchCircle = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 商盟
export const fetchMarket = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })
