import axios from 'axios'

export const fetchMiniProgramList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=xcx_fans&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

export const fetchPublicList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=fans_list&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

export const fetchCardGroupList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=card_group&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

export const fetchCouponList = (page, size) => axios.post(`/appapi.php?c=Merchantapp&a=card_new_coupon&page=${page}&size=${size}`, {
  ticket: localStorage.getItem('ticket'),
})

// 没有
export const insertCardGroup = (name, des, discount) => axios.post('/appapi.php?c=Merchantapp&a=card_new_coupon', {
  name,
  des,
  discount,
  ticket: localStorage.getItem('ticket'),
})

export const modifyCardGroup = (name, des, discount, id) => axios.post('/appapi.php?c=Merchantapp&a=card_new_coupon', {
  name,
  des,
  discount,
  id,
  ticket: localStorage.getItem('ticket'),
})

export const fetchCardGroupUsers = (page, size, id) => axios.post(
  `/appapi.php?c=Merchantapp&a=card_group_user_list&page=${page}&size=${size}&gid=${id}`,
  {
    ticket: localStorage.getItem('ticket'),
  },
)

export const fetchCardGroupUserInfo = id => axios.post(`/appapi.php?c=Merchantapp&a=card_group_detail&gid=${id}`, {
  ticket: localStorage.getItem('ticket'),
})
