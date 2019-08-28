import axios from 'axios'

export const fetchRedEnvelopList = (page, size) => axios.post(`/appaffapi.php?c=Merchantapp&a=fans_list&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

export const fetchPublicList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=fans_list&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})
