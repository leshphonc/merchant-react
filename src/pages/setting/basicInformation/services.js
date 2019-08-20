import axios from 'axios'

export const fetchBasicInfo = () => axios.post('/appapi.php?c=Merchantapp&a=merchant', {
  ticket: localStorage.getItem('ticket'),
})

export const fetchCategory = () => axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
  ticket: localStorage.getItem('ticket'),
})

export const updateInfo = (key, value) => axios.post('/appapi.php?c=Merchantapp&a=modify_merchant', {
  [key]: value,
  ticket: localStorage.getItem('ticket'),
})

export const modifyCoordinate = (lng, lat) => axios.post('/appapi.php?c=Merchantapp&a=modify_merchant', {
  long: lng,
  lat,
  ticket: localStorage.getItem('ticket'),
})

export const wxBind = openid => axios.post(`/appapi.php?c=Merchantapp&a=bind&openid=${openid}`, {
  ticket: localStorage.getItem('ticket'),
})

// export const getWxConfig = () => axios.post('/appapi.php?c=Config&a=wx_config', {
//   ticket: localStorage.getItem('ticket'),
// })

// export const getWxCode = appid => {
//   const URL = encodeURIComponent(window.location.origin)
//   return axios.get(
//     `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
//   )
// }

// export const wxLogin = (openid, unionid, user) => axios.post('/appapi.php?c=Login&a=weixin_login', {
//   weixin_open_id: openid,
//   weixin_union_id: unionid,
//   weixin_user: user,
//   ticket: localStorage.getItem('ticket'),
// })
