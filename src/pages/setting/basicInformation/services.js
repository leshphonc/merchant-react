import axios from 'axios'

export const fetchBasicInfo = () =>
  axios.post('/appapi.php?c=Merchantapp&a=merchant', {
    ticket: localStorage.getItem('ticket'),
  })

export const fetchCategory = () =>
  axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
    ticket: localStorage.getItem('ticket'),
  })

export const updateInfo = (key, value) =>
  axios.post('/appapi.php?c=Merchantapp&a=modify_merchant', {
    [key]: value,
    ticket: localStorage.getItem('ticket'),
  })

export const modifyCoordinate = (lng, lat) =>
  axios.post('/appapi.php?c=Merchantapp&a=modify_merchant', {
    long: lng,
    lat,
    ticket: localStorage.getItem('ticket'),
  })

export const wxBind = openid =>
  axios.post(`/appapi.php?c=Merchantapp&a=bind&openid=${openid}`, {
    ticket: localStorage.getItem('ticket'),
  })
