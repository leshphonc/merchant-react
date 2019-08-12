import axios from 'axios'

export const createOrder = money => axios.post('/appapi.php?c=Merchantapp&a=money_add', {
  ticket: localStorage.getItem('ticket'),
  money,
})

export const checkOrder = (id, type, code) => axios.post(`/appapi.php?c=MerchantPay&a=check&order_id=${id}&type=${type}&code=${code}`, {
  ticket: localStorage.getItem('ticket'),
})

export const goPay = (id, type, paytype, openid) => axios.post('/appapi.php?c=MerchantPay&a=go_pay', {
  order_id: id,
  order_type: type,
  pay_type: paytype,
  openId: openid,
  ticket: localStorage.getItem('ticket'),
})

export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
  ticket: localStorage.getItem('ticket'),
})
