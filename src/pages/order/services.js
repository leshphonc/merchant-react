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
