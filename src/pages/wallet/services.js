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

export const fetchWithdrawRecord = (page, size, type) => axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_records', {
  params: {
    page,
    size,
    type,
    ticket: localStorage.getItem('ticket'),
  },
})
export const fetchAddCreditRecord = (page, size) => axios.get('/appapi.php?c=Merchantapp&a=money_merrecharge_list', {
  params: {
    page,
    size,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchIncomeRecord = (page, size, type, storeId, beginTime, endTime) => axios.get('/appapi.php?c=Merchantapp&a=money_income_list', {
  params: {
    page,
    size,
    type,
    store_id: storeId,
    begin_time: beginTime,
    end_time: endTime,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchIncomeCategoryList = () => axios.get('/appapi.php?c=Merchantapp&a=get_alias_c_name3', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchIncomeStoreList = () => axios.get('/appapi.php?c=Merchantapp&a=get_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchWithDrawInfo = () => axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_info', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const withDraw = payload => axios.post('/appapi.php?c=Merchantapp&a=money_withdraw', {
  withdraw_type: payload.receiptValue,
  name: payload.name,
  money: payload.amount,
  weixin_account: payload.accountValue,
  info: payload.remark,
  card_username: payload.cardUserName,
  card_number: payload.cardNumber,
  bank: payload.bank,
  invoice: payload.invoice,
  ticket: localStorage.getItem('ticket'),
})

export const fetchMinPrice = () => axios.get('/appapi.php?c=Merchantapp&a=get_config', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})
