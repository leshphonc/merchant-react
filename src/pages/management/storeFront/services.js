import axios from 'axios'

// 商铺列表
export const fetchStoreList = () =>
  axios.get('/appapi.php?c=Merchantapp&a=store_lists', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })
// 商铺详情
export const fetchStoreDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=store_details', {
    params: {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })
// 新增商铺
export const insertStoreFront = payload =>
  axios.post('/appapi.php?c=Merchantapp&a=add_store', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

// 编辑商铺
export const modifyStoreFront = payload =>
  axios.post('/appapi.php?c=Merchantapp&a=edit_store', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchBusinessList = id =>
  axios.post('/appapi.php?c=Merchantapp&a=edit_store', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取店铺全部分类
export const fetchAllCategory = () =>
  axios.get('/appapi.php?c=Merchantapp&a=get_all_category', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 分类列表
export const fetchCategoryList = (id, type) =>
  axios.get('/appapi.php?c=Merchantapp&a=sortlist', {
    params: {
      store_id: id,
      store_type: type,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 分类详情
export const fetchCategoryDetail = (id, type, stid) =>
  axios.get('/appapi.php?c=Merchantapp&a=sort_detail', {
    params: {
      store_id: id,
      store_type: type,
      stid,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 新增分类或编辑分类
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

// 删除分类
export const deleteCategory = (storeId, type, id) =>
  axios.post('/appapi.php?c=Merchantapp&a=mstdel', {
    store_id: storeId,
    store_type: type,
    item_id: id,
    ticket: localStorage.getItem('ticket'),
  })

// 商铺优惠列表
export const fetchStoreDiscountList = id =>
  axios.get('/appapi.php?c=Merchantapp&a=discount', {
    params: {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 商铺优惠详情
export const fetchStoreDiscountDetail = (id, cid) =>
  axios.get('/appapi.php?c=Merchantapp&a=get_discount', {
    params: {
      id: cid,
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 新增商铺优惠
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

// 编辑商铺列表
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

// 省份
export const fetchProvince = () =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 市区
export const fetchCity = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 地区
export const fetchArea = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })
// 商圈
export const fetchCircle = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 商盟
export const fetchMarket = id =>
  axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 电商详情配置获取
export const fetchECommerceDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=shop_detail', {
    params: {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 电商详情配置编辑
export const modifyECommerceDetail = payload =>
  axios.post('/appapi.php?c=Merchantapp&a=shop_edit', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

// 外卖详情配置获取
export const fetchTakeawayDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=shop_detail', {
    params: {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 外卖详情配置编辑
export const modifyTakeawayDetail = payload =>
  axios.post('/appapi.php?c=Merchantapp&a=shop_edit', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

// 克隆商品
export const cloneCommodity = (id, ids) =>
  axios.post('/appapi.php?c=Merchantapp&a=clone_goods', {
    store_id: id,
    store_ids: ids,
    ticket: localStorage.getItem('ticket'),
  })

// 二维码
export const fetchQrcode = id =>
  axios.get('/appapi.php?c=Merchantapp&type=merchantstore&a=see_qrcode', {
    params: {
      id,
      ticket: localStorage.getItem('ticket'),
    },
  })

// 获取商铺资质
export const fetchAuthFiles = id =>
  axios.get('/appapi.php?c=Merchantapp&type=merchantstore&a=get_auth', {
    params: {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const modifyAuth = (id, files) =>
  axios.post('/appapi.php?c=Merchantapp&type=merchantstore&a=auth_edit', {
    store_id: id,
    auth_files: files,
    ticket: localStorage.getItem('ticket'),
  })

// 获取会员等级
export const fetchLevel = () =>
  axios.get('/appapi.php?c=Merchantapp&type=merchantstore&a=user_level', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

// 在售服务列表
export const getStoreCommodityForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindPro', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 在售套餐列表
export const getStorePackageForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindMeal', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 在售电商产品列表
export const getStoreECommerceForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=selBindGoods', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 获取商铺未绑定的服务
export const getUnBindStoreCommodityForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=getNoBindPro', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 店铺未绑定的套餐
export const getUnBindStorePackageForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=getNoBindMeal', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 店铺未绑定的电商产品
export const getUnBindStoreECommerceForSale = (id, page) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=selNoBindOnlineGoods', {
    store_id: id,
    page,
    ticket: localStorage.getItem('ticket'),
  })

// 商铺绑定服务
export const bindStoreCommodity = (id, ids) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=storebindPro', {
    store_id: id,
    appoint_ids: ids,
    ticket: localStorage.getItem('ticket'),
  })

// 商铺绑定套餐
export const bindStorePackage = (id, ids) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=storeBindMeal', {
    store_id: id,
    meal_ids: ids,
    ticket: localStorage.getItem('ticket'),
  })

// 绑定在售电商产品
export const bindECommerce = (id, ids) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=onlineGoodsBindStore', {
    store_id: id,
    goods_ids: ids,
    ticket: localStorage.getItem('ticket'),
  })

// 解绑店铺服务
export const unBindCommodity = (id, cid) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=delBindPro', {
    store_id: id,
    id: cid,
    ticket: localStorage.getItem('ticket'),
  })

// 解绑店铺套餐
export const unBindPackage = (id, cid) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=delBindMeal', {
    store_id: id,
    id: cid,
    ticket: localStorage.getItem('ticket'),
  })

// 解绑店铺电商产品
export const unbindECommerce = (id, cid) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=goodsDelBindStore', {
    store_id: id,
    goods_id: cid,
    ticket: localStorage.getItem('ticket'),
  })

// 是否使用桌号标识
export const getNoUseStation = (store_id, order_no) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=getNoUseStation', {
    store_id,
    order_no,
    ticket: localStorage.getItem('ticket'),
  })

// 标识开关
export const changeOnOff = (type, store_id) =>
  axios.post('/appapi.php?c=SpaceMerchant&a=onOffStore', {
    type,
    store_id,
    ticket: localStorage.getItem('ticket'),
  })

// 添加编辑开单工位标识
export const createStation = (type, store_id, name, id) => {
  return axios.post('/appapi.php?c=SpaceMerchant&a=addStation', {
    type,
    store_id,
    name,
    id,
    ticket: localStorage.getItem('ticket'),
  })
}

// 店铺标识的状态
export const getStationFlag = store_id => {
  return axios.post('/appapi.php?c=SpaceMerchant&a=getStationFlag', {
    store_id,
    ticket: localStorage.getItem('ticket'),
  })
}

export const getNowStation = store_id => {
  return axios.post('/appapi.php?c=SpaceMerchant&a=getNowStation', {
    store_id,
    ticket: localStorage.getItem('ticket'),
  })
}
