import axios from 'axios'

export const fetchStoreList = type => axios.get('/appapi.php?c=Merchantapp&a=shop_list', {
  params: {
    store_type: type,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchCategoryList = (id, type) => axios.get('/appapi.php?c=Merchantapp&a=sortlist', {
  params: {
    store_id: id,
    store_type: type,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchCategoryDetail = (id, type, stid) => axios.get('/appapi.php?c=Merchantapp&a=sort_detail', {
  params: {
    store_id: id,
    store_type: type,
    stid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addCategory = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=sort_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const deleteCategory = (storeId, type, id) => axios.post('/appapi.php?c=Merchantapp&a=mstdel', {
  store_id: storeId,
  store_type: type,
  item_id: id,
  ticket: localStorage.getItem('ticket'),
})

export const fetchStoreDiscountList = id => axios.get('/appapi.php?c=Merchantapp&a=discount', {
  params: {
    store_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchStoreDiscountDetail = (id, cid) => axios.get('/appapi.php?c=Merchantapp&a=get_discount', {
  params: {
    id: cid,
    store_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addStoreDiscount = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=add_discount', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyStoreDiscount = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=edit_discount', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const fetchStoreDetail = id => axios.get('/appapi.php?c=Merchantapp&a=store_details', {
  params: {
    store_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchProvince = () => axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchCity = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchArea = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})
export const fetchCircle = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})
