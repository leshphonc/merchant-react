import axios from 'axios'

export const fetchGetGift = () => axios.get('/appapi.php?c=Merchantapp&a=add_gift', {
  ticket: localStorage.getItem('ticket'),
})

export const fetchSelectValues = () => axios.post('/appapi.php?c=Merchantapp&a=get_stor', {
  ticket: localStorage.getItem('ticket'),
})
