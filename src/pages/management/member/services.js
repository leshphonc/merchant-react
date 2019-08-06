import axios from 'axios'

export const fetchMiniProgramList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=xcx_fans&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

export const fetchPublicList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=fans_list&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})
