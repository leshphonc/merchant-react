import axios from 'axios'

// 礼品列表
export const fetchGetGift = (page, size, str) => axios.get('/appapi.php?c=Merchantapp&a=giftpro', {
  params: {
    page,
    size,
    keyword: str,
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
export const fetchGiftOrder = (page, size, giftId) => axios.get('/appapi.php?c=Merchantapp&a=gift_order', {
  params: {
    page,
    size,
    gift_id: giftId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 金币商城详情
export const fetchGiftOrderDetail = orderId => axios.get('/appapi.php?c=Merchantapp&a=gift_order_detail', {
  params: {
    order_id: orderId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 添加礼品
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

// 编辑礼品
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

// 商盟
export const fetchMarket = id => axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 店铺列表
export const fetchShopList = () => axios.get('/appapi.php?c=Merchantapp&a=get_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 发货选择快递
export const fetchExpressList = orderId => axios.post('/appapi.php?c=Merchantapp&a=getGiftExpress', {
  order_id: orderId,
  ticket: localStorage.getItem('ticket'),
})

// 发货详情列表
export const fetchExpress = orderId => axios.post('/appapi.php?c=Merchantapp&a=getGiftExpress', {
  order_id: orderId,
  ticket: localStorage.getItem('ticket'),
})

// 确认发货
export const modifyExpress = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=giftExpress', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const checkCouponCode = (orderId, giftPass) => axios.post('/appapi.php?c=Merchantapp&a=gift_verify', {
  // code: splice ? `${id}d${code}` : code,
  gift_pass: giftPass,
  order_id: orderId,
  ticket: localStorage.getItem('ticket'),
})

export const fecthGiftPassArray = orderId => axios.post('/appapi.php?c=Merchantapp&a=gift_pass_array', {
  order_id: orderId,
  ticket: localStorage.getItem('ticket'),
})

export const fecthGiftArrayVerify = (orderId, giftPass) => axios.post('/appapi.php?c=Merchantapp&a=gift_array_verify', {
  order_id: orderId,
  gift_pass: giftPass,
  ticket: localStorage.getItem('ticket'),
})
