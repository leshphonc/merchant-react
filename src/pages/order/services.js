import axios from 'axios'

// 获取订单种类列表
export const fetchOrderList = () => axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取零售订单列表
export const fetchShopOrderList = (page, size, status, paytype, searchtype, keyword) => axios.get('/appapi.php?c=Merchantapp&a=shop_order', {
  params: {
    page,
    size,
    status,
    pay_type: paytype,
    searchtype,
    keyword,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取零售订单状态
export const fetchShopOrderStatus = () => axios.get('/appapi.php?c=Merchantapp&a=shop_status_list', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取零售订单详情
export const fetchShopOrderDetail = id => axios.get('/appapi.php?c=Merchantapp&a=shop_order_detail', {
  params: {
    order_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取自提地址
export const fetchPickAddress = id => axios.get('/appapi.php?c=Merchantapp&a=getPickAddress', {
  params: {
    order_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 选择自提地址
export const pickerAddress = (id, pickId) => axios.post('/appapi.php?c=Merchantapp&a=pick', {
  order_id: id,
  pick_id: pickId,
  ticket: localStorage.getItem('ticket'),
})

// 发货到自提点
export const shipToSelfLifting = id => axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
  order_id: id,
  status: '8',
  ticket: localStorage.getItem('ticket'),
})

// 确认消费
export const confirmConsumption = id => axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
  order_id: id,
  status: '2',
  ticket: localStorage.getItem('ticket'),
})

// 取消订单
export const cancelOrder = id => axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
  order_id: id,
  status: '5',
  ticket: localStorage.getItem('ticket'),
})

// 获取预约订单列表
export const fetchReservationOrderList = (
  page,
  size,
  paytype,
  searchtype,
  startTime,
  endTime,
  keyword,
) => axios.get('/appapi.php?c=Merchantapp&a=appoint_order_list', {
  params: {
    page,
    size,
    pay_type: paytype,
    searchtype,
    stime: startTime,
    etime: endTime,
    keyword,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取预约订单详情
export const fetchReservationOrderDetail = id => axios.get('/appapi.php?c=Merchantapp&a=appoint_order_detail', {
  params: {
    order_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 预定派单
export const orderHandle = (orderId, workerId) => axios.post('/appapi.php?c=Merchantapp&a=send_orders', {
  order_id: orderId,
  merchant_worker_id: workerId,
  ticket: localStorage.getItem('ticket'),
})

// 验证预定订单
export const verifyHandle = (orderId, workerId, payType, psw) => axios.post('/appapi.php?c=Merchantapp&a=appointVerify', {
  order_id: orderId,
  merchant_worker_id: workerId,
  merchant_pay_type: payType,
  appoint_pass: psw,
  ticket: localStorage.getItem('ticket'),
})
