import axios from 'axios'

// 团购列表
export const fetchGroupList = (page, size, keyword) => axios.get('/appapi.php?c=Merchantapp&a=gpro', {
  params: {
    page,
    size,
    keyword,
    ticket: localStorage.getItem('ticket'),
  },
})

// 添加团购套餐
export const fetchGroupMealAdd = (title, description) => axios.post('/appapi.php?c=Merchantapp&a=mpackageadd', {
  title,
  description,
  ticket: localStorage.getItem('ticket'),
})

// 预定列表
export const fetchReserveList = (page, size) => axios.get('/appapi.php?c=Merchantapp&a=apro', {
  params: {
    page,
    size,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchReserveCategoryOption = () => axios.get('/appapi.php?c=Merchantapp&a=get_all_appoint_category', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const addReserve = payload => axios.post('/appapi.php?c=Merchantapp&a=add_apponit', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

export const modifyReserve = payload => axios.post('/appapi.php?c=Merchantapp&a=edit_apponit', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 餐饮列表
export const fetchCateringList = (page, size, storeId) => axios.get('/appapi.php?c=Merchantapp&a=mpro', {
  params: {
    page,
    size,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 零售列表
export const fetchRetailList = (page, size, storeId) => axios.get('/appapi.php?c=Merchantapp&a=spro', {
  params: {
    page,
    size,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商店
export const fetchCateringValues = () => axios.get('/appapi.php?c=Merchantapp&a=select_meal_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商店分类
export const fetchCateringMeal = storeId => axios.get('/appapi.php?c=Merchantapp&a=select_meal_sort', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商品详情
export const fetchCateringDetail = (id, goodid) => axios.get('/appapi.php?c=Merchantapp&a=get_meal_detail', {
  params: {
    store_id: id,
    goods_id: goodid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addCategory = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=add_meal', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyCategory = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=edit_meal', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 零售商品详情
export const fetchRetailDetail = (id, goodid) => axios.get('/appapi.php?c=Merchantapp&a=goods_detail', {
  params: {
    store_id: id,
    goods_id: goodid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addRetail = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyRetail = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_edit', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 餐饮删除
export const fetchCateringDelete = (storeId, mealId) => axios.post('/appapi.php?c=Merchantapp&a=mdel', {
  store_id: storeId,
  meal_id: mealId,
  ticket: localStorage.getItem('ticket'),
})

// 零售商店
export const fetchRetailValues = () => axios.get('/appapi.php?c=Merchantapp&a=select_shop_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商品上、下架
export const fetchCateringStand = (storeId, mealId, status) => axios.post('/appapi.php?c=Merchantapp&a=mstatusopt', {
  store_id: storeId,
  meal_id: mealId,
  status,
  ticket: localStorage.getItem('ticket'),
})

// 零售商品上、下架
export const fetchRetailStand = (storeId, goodsId, status) => axios.post('/appapi.php?c=Merchantapp&a=goods_status', {
  store_id: storeId,
  goods_id: goodsId,
  status,
  ticket: localStorage.getItem('ticket'),
})

// 零售商店分类
export const fetchRetailMeal = storeId => axios.get('/appapi.php?c=Merchantapp&a=select_shop_sort', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 零售删除
export const fetchRetailDelete = (storeId, goodsId) => axios.post('/appapi.php?c=Merchantapp&a=goods_del', {
  store_id: storeId,
  goods_id: goodsId,
  ticket: localStorage.getItem('ticket'),
})
