import axios from 'axios'

export const login = (account, pwd) => axios.post('/appapi.php?c=Merchantapp&a=login', {
  account,
  pwd,
})

export const logout = () => axios.get('/appapi.php?c=Merchantapp&a=login')

export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
  ticket: localStorage.getItem('ticket'),
})
