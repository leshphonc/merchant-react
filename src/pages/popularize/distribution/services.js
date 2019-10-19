import axios from 'axios'

// 电商列表
export const fetchECommerceList = (page, size, storeId, str) =>
  axios.get('/appapi.php?c=Merchantapp&a=spro', {
    params: {
      page,
      size,
      store_id: storeId,
      keyword: str,
      good_type: 1,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 预定列表
export const fetchReserveList = (page, size, str) =>
  axios.get('/appapi.php?c=Merchantapp&a=apro', {
    params: {
      page,
      size,
      keyword: str,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 团购列表
export const fetchGroupList = (page, size, str) =>
  axios.get('/appapi.php?c=Merchantapp&a=gpro', {
    params: {
      page,
      size,
      keyword: str,
      ticket: localStorage.getItem('ticket'),
    },
  })
