import axios from 'axios'

export const login = (account, pwd) => axios.post('/appapi.php?c=Merchantapp&a=login', {
  // 'Device-Id': 'wx',
  account,
  pwd,
})

export const logout = () => axios.get('/appapi.php?c=Merchantapp&a=login')

export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
  ticket: localStorage.getItem('ticket'),
})

// 获取别名
export const fetchAliasList = () => axios.get('/appapi.php?c=Merchantapp&a=get_config_alias', {
  params: {
    ticket: localStorage.getItem('ticket'),
  }
})
