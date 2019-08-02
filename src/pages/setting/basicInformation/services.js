import axios from 'axios'

export const fetchBasicInfo = () => axios.post('/appapi.php?c=Merchantapp&a=merchant', {
  ticket: localStorage.getItem('ticket'),
})

export const fetchCategory = () => axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
  ticket: localStorage.getItem('ticket'),
})
