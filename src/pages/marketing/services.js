import axios from 'axios'

export const fetchMarketingList = () => axios.post('/appapi.php?c=Merchantapp&a=marketing', {
  ticket: localStorage.getItem('ticket'),
})
