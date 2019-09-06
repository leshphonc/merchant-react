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
