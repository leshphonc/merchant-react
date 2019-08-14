import axios from 'axios'

export const fetchStoreList = type => axios.get('/appapi.php?c=Merchantapp&a=shop_list', {
  params: {
    store_type: type,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchCategoryList = (id, type) => axios.get('/appapi.php?c=Merchantapp&a=sortlist', {
  params: {
    store_id: id,
    store_type: type,
    ticket: localStorage.getItem('ticket'),
  },
})
