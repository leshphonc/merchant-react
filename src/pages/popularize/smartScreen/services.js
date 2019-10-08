import axios from 'axios'

// 获取智能屏list
export const fetchIMax = id => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_imax', {
  params: {
    mer_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取进店人数
export const fetchUserCome = () => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=user_come_in', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 查看我的推广列表
export const fetchPromotionList = payload => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_pushad_by_mer', {
  params: {
    ...payload,
  },
})

// 获取店铺
export const fetchStoreMer = () => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_store_by_mer', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 上传推广内容
export const insertPromotionList = payload => axios.post('/Appapi.php?g=Appapi&c=Ai_imax&a=pushad_add_by_mer', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 获取推广内容
export const fetchPromotionInfo = payload => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_pushad_info', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 编辑推广内容
export const modifyPromotionInfo = payload => axios.post('/Appapi.php?g=Appapi&c=Ai_imax&a= pushad_edit_by_mer', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 获取扫码人数
export const fetchScanMember = payload => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_scan', {
  params: {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取浏览时长
export const fetchViewTime = payload => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_wait', {
  params: {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取购买用户列表
export const fetchPurchaseNum = payload => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_buy', {
  params: {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  },
})

// 切换echart日期数据
export const fetchEchartData = (type, date, search, id) => axios.get(`/appapi.php?c=Merchantapp&a=${search}`, {
  params: {
    date_type: type,
    date,
    mer_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})
