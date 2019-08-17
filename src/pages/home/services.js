import axios from 'axios'

export const fetchEchartData = (type, date, search) => axios.get(`/appapi.php?c=Merchantapp&a=${search}`, {
  params: {
    date_type: type,
    date,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchIndexData = () => axios.get('/appapi.php?c=Merchantapp&a=index', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})
