import axios from 'axios'

// 礼品列表
export const fetchGetGift = (page, size) => axios.get('/appapi.php?c=Merchantapp&a=giftpro', {
  params: {
    page,
    size,
    ticket: localStorage.getItem('ticket'),
  },
})

// 金币商城分类
export const fetchGiftCategory = catFid => axios.get('/appapi.php?c=Merchantapp&a=gift_category', {
  params: {
    cat_fid: catFid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchGiftCategorylist = catFid => axios.post('/appapi.php?c=Merchantapp&a=gift_category', {
  cat_fid: catFid,
  ticket: localStorage.getItem('ticket'),
})

// 金币商城订单
export const fetchGiftOrder = () => axios.get('/appapi.php?c=Merchantapp&a=gift_order', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 金币商城详情
export const fetchGiftOrderDetail = () => axios.get('/appapi.php?c=Merchantapp&a=gift_order_detail', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const addGift = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=add_gift', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyGift = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=edit_gift', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 获取
export const fetchGetGiftDetail = giftId => axios.get('/appapi.php?c=Merchantapp&a=get_gift_detail', {
  params: {
    gift_id: giftId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 删除
export const fetchDelGift = giftId => axios.post('/appapi.php?c=Merchantapp&a=del_gift', {
  gift_id: giftId,
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
// 商圈
export const fetchCircle = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})
