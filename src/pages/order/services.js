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

// 获取团购订单列表
export const fetchGroupOrderList = (groupId, pages, sizes, statu, findType, keyword) => axios.get('/appapi.php?c=Merchantapp&a=group_order', {
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

// 获取团购详情
export const fetchGroupOrderDetai = orderId => axios.get('/appapi.php?c=Merchantapp&a=group_order_detail', {
  params: {
    order_id: orderId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 选择店铺
export const modifyStore = (orderId, storeId) => axios.post('/appapi.php?c=Merchantapp&a=order_store_id', {
  order_id: orderId,
  store_id: storeId,
  ticket: localStorage.getItem('ticket'),
})

// 团购快递
export const modifyGroupExpress = (expressType, expressId, orderId) => axios.post('/appapi.php?c=Merchantapp&a=group_express', {
  express_type: expressType,
  express_id: expressId,
  order_id: orderId,
  ticket: localStorage.getItem('ticket'),
})
