import axios from 'axios'

// 获取微信配置
export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
  ticket: localStorage.getItem('ticket'),
})

// 用code换取openid
export const fetchOpenId = code => axios.get('/appapi.php?c=MerchantPay&a=get_openid', {
  params: {
    code,
    ticket: localStorage.getItem('ticket'),
  },
})
