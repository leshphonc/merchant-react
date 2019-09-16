import axios from 'axios'

export const fetchEchartData = (type, date, search, id) => axios.get(`/appapi.php?c=Merchantapp&a=${search}`, {
  params: {
    date_type: type,
    date,
    store_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchIndexData = () => axios.get('/appapi.php?c=Merchantapp&a=index', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchStoreList = id => axios.get('/appapi.php?c=Merchantapp&a=get_store', {
  params: {
    store_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})
