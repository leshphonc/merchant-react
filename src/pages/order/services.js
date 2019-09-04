import axios from 'axios'

// 获取订单种类列表
export const fetchOrderList = () => axios.post('/appapi.php?c=Merchantapp&a=order_list_all', {
  ticket: localStorage.getItem('ticket'),
})

// 获取零售订单列表
export const fetchShopOrderList = () => axios.post('/appapi.php?c=Merchantapp&a=shop_order', {
  ticket: localStorage.getItem('ticket'),
})
