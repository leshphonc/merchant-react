import axios from 'axios'

export const login = (account, pwd) => {
  return axios.post('/appapi.php?c=Merchantapp&a=login', {
    account,
    pwd,
  })
}

export const logout = () => {
  return axios.get('/appapi.php?c=Merchantapp&a=login')
}
