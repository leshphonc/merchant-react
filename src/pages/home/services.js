import axios from 'axios'

export const fetchEchartData = date => axios.get('/appapi.php?c=Merchantapp&a=shop_list', {
  params: {
    date,
    ticket: localStorage.getItem('ticket'),
  },
})
