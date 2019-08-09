import axios from 'axios'

export const fetchOrderList = () => axios.post('/appapi.php?c=Merchantapp&a=order_list_all', {
  ticket: localStorage.getItem('ticket'),
})
