import axios from 'axios'

// 获取订单种类列表
export const fetchOrderList = () =>
  axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取零售订单列表
export const fetchShopOrderList = (
  page,
  size,
  status,
  paytype,
  searchtype,
  stime,
  etime,
  keyword,
) =>
  axios.get('/appapi.php?c=Merchantapp&a=shop_order', {
    params: {
      page,
      size,
      status,
      pay_type: paytype,
      searchtype,
      stime,
      etime,
      keyword,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取零售订单状态
export const fetchShopOrderStatus = () =>
  axios.get('/appapi.php?c=Merchantapp&a=shop_status_list', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取团购订单列表
export const fetchGroupOrderList = (
  groupId,
  pages,
  sizes,
  statu,
  findType,
  keyword,
) =>
  axios.get('/appapi.php?c=Merchantapp&a=group_order', {
    params: {
      group_id: groupId,
      size: sizes,
      page: pages,
      status: statu,
      find_type: findType,
      keyword,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取零售订单详情
export const fetchShopOrderDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=shop_order_detail', {
    params: {
      order_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取团购详情
export const fetchGroupOrderDetai = orderId =>
  axios.get('/appapi.php?c=Merchantapp&a=group_order_detail', {
    params: {
      order_id: orderId,
      ticket: localStorage.getItem('ticket'),
    },
  })
// 到店详情
export const fetchArrivalOrderDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=store_order_detail', {
    params: {
      order_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })
// 团购获取核销码
export const fecthGroupPassArray = orderId =>
  axios.post('/appapi.php?c=Merchantapp&a=group_pass_array', {
    order_id: orderId,
    ticket: localStorage.getItem('ticket'),
  })

// 团购快递
export const modifyGroupExpress = (expressType, expressId, orderId, storeId) =>
  axios.post('/appapi.php?c=Merchantapp&a=group_express', {
    express_type: expressType,
    express_id: expressId,
    order_id: orderId,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  })

// 团购全部核销
export const verificGroupAll = (orderId, storeId) =>
  axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
    order_id: orderId,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  })

// 团购单个核销
export const verificOneGroup = (oriderId, proupPass) =>
  axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
    order_id: oriderId,
    group_pass: proupPass,
    ticket: localStorage.getItem('ticket'),
  })

// 团购多组单个核销
export const verificGroup = (orderId, groupPass) =>
  axios.post('/appapi.php?c=Merchantapp&a=group_array_verify', {
    order_id: orderId,
    group_pass: groupPass,
    ticket: localStorage.getItem('ticket'),
  })

// 选择店铺
export const modifyStore = (orderId, storeId) =>
  axios.post('/appapi.php?c=Merchantapp&a=order_store_id', {
    order_id: orderId,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  })

// 选择自提地址
export const pickerAddress = (id, pickId) =>
  axios.post('/appapi.php?c=Merchantapp&a=pick', {
    order_id: id,
    pick_id: pickId,
    ticket: localStorage.getItem('ticket'),
  })

// 获取自提地址
export const fetchPickAddress = id =>
  axios.get('/appapi.php?c=Merchantapp&a=getPickAddress', {
    params: {
      order_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 接单
export const orders = id =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    order_id: id,
    status: '1',
    ticket: localStorage.getItem('ticket'),
  })

// 发货到自提点
export const shipToSelfLifting = id =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    order_id: id,
    status: '8',
    ticket: localStorage.getItem('ticket'),
  })

// 确认消费
export const confirmConsumption = id =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    order_id: id,
    status: '2',
    ticket: localStorage.getItem('ticket'),
  })

// 扫码确认消费
export const scanCode = id =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    order_id: id,
    status: '2',
    ticket: localStorage.getItem('ticket'),
  })

// 取消订单
export const cancelOrder = id =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    order_id: id,
    status: '5',
    ticket: localStorage.getItem('ticket'),
  })

// 获取物流配送信息
export const fetchExpressList = () =>
  axios.get('/appapi.php?c=Merchantapp&a=express_list', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 发货
export const sendOrder = (orderId, no, expressId) =>
  axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
    status: 2,
    order_id: orderId,
    express_number: no,
    express_id: expressId,
    ticket: localStorage.getItem('ticket'),
  })

// 获取预定订单列表
export const fetchReservationOrderList = (
  page,
  size,
  paytype,
  searchtype,
  startTime,
  endTime,
  keyword,
) =>
  axios.get('/appapi.php?c=Merchantapp&a=appoint_order_list', {
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

// 获取预定订单详情
export const fetchReservationOrderDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=appoint_order_detail', {
    params: {
      order_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 预定派单
export const orderHandle = (orderId, workerId) =>
  axios.post('/appapi.php?c=Merchantapp&a=send_orders', {
    order_id: orderId,
    merchant_worker_id: workerId,
    ticket: localStorage.getItem('ticket'),
  })

// 验证预定订单
export const verifyHandle = (orderId, workerId, payType, psw) =>
  axios.post('/appapi.php?c=Merchantapp&a=appointVerify', {
    order_id: orderId,
    merchant_worker_id: workerId,
    merchant_pay_type: payType,
    appoint_pass: psw,
    ticket: localStorage.getItem('ticket'),
  })

// 单独获取预定订单数量
export const fetchReservationOrderListCount = () =>
  axios.get('/appapi.php?c=Merchantapp&a=appoint_order_list', {
    params: {
      page: 1,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取到店订单列表
export const fetchArrivalList = (page, storeId, stime, etime) =>
  axios.get('/appapi.php?c=Merchantapp&a=store_order_list', {
    params: {
      page,
      size: 10,
      store_id: storeId,
      begin_time: stime,
      end_time: etime,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取到店的商铺list
export const fetchStoreList = id =>
  axios.post('/appapi.php?c=Merchantapp&a=getStoreStaff', {
    mer_id: id,
    ticket: localStorage.getItem('ticket'),
  })
