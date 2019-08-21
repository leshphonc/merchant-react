import axios from 'axios'

export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
  ticket: localStorage.getItem('ticket'),
})

export const fetchOpenId = code => axios.get('/appapi.php?c=MerchantPay&a=get_openid', {
  params: {
    code,
    ticket: localStorage.getItem('ticket'),
  },
})
