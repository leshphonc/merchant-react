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
