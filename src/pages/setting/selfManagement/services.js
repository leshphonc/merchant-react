import axios from 'axios'

export const fetchBasicInfo = () => axios.post('/appapi.php?c=Merchantapp&a=merchant', {
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

export const fetchCategory = () => axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
  ticket: localStorage.getItem('ticket'),
})

// 省份
export const fetchProvince = () => axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 市区
export const fetchCity = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 地区
export const fetchArea = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 自提点列表
export const fetchPickLists = (page, size, id) => axios.get('/appapi.php?c=Merchantapp&a=pick_lists', {
  params: {
    page,
    size,
    pick_addr_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchSeePickPwd = id => axios.get('/appapi.php?c=Merchantapp&a=get_pick_addr_merid', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 删除
export const fetchPickAddressDel = id => axios.get('/appapi.php?c=Merchantapp&a=pick_address_del', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 自提点列表详情
export const fetchPickAddressDetail = id => axios.get('/appapi.php?c=Merchantapp&a=pick_address_detail', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 自提点密钥
export const fetchChangePicPwd = id => axios.post('/appapi.php?c=Merchantapp&a=change_pic_pwd', {
  pick_id: id,
  ticket: localStorage.getItem('ticket'),
})

// 添加
export const addECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=pick_address_edit', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 编辑
export const modifyECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=pick_address_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}
