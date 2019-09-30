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

// 获取店铺
export const fetchStoreMer = () => axios.get('/Appapi.php?g=Appapi&c=Ai_imax&a=get_store_by_mer', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchEchartData = (type, date, search, id) => axios.get(`/appapi.php?c=Merchantapp&a=${search}`, {
  params: {
    date_type: type,
    date,
    mer_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})
