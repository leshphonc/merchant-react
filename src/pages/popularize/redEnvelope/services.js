import axios from 'axios'

export const fetchRedEnvelopList = (page, size) => axios.get('/appapi.php?c=Merchantapp&a=red_packet', {
  params: {
    page,
    size,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchGetList = (page, size, id) => axios.get('/appapi.php?c=Merchantapp&a=prize_log', {
  params: {
    page,
    size,
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchGetLists = id => axios.get('/appapi.php?c=Merchantapp&a=prize_log', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchPacketDel = id => axios.post('/appapi.php?c=Merchantapp&a=red_packet_del', {
  id,
  ticket: localStorage.getItem('ticket'),
})

export const fetchFabu = id => axios.post('/appapi.php?c=Merchantapp&a=fabu', {
  id,
  ticket: localStorage.getItem('ticket'),
})

export const fetchGetRedPacket = id => axios.get('/appapi.php?c=Merchantapp&a=get_red_packet', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addPacket = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=add_red_packet', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyPacket = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=edit_red_packet', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

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
