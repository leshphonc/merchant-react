import axios from 'axios'

export const fetchStatisticsInfo = (storeId, starttime, endtime) =>
  axios.post('/appapi.php?c=Merchantapp&a=spread_date', {
    store_id: storeId,
    starttime,
    endtime,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchSelectValues = () =>
  axios.post('/appapi.php?c=Merchantapp&a=get_store', {
    ticket: localStorage.getItem('ticket'),
  })

export const fetchStaffList = storeId =>
  axios.post('/appapi.php?c=Merchantapp&a=spread_date_staff', {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchScanList = (page, size, id, starttime, endtime) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=spread_date_scan_list&page=${page}&size=${size}&id=${id}`,
    {
      starttime,
      endtime,
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchSaleList = (page, size, id, starttime, endtime) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=spread_date_sale_list&page=${page}&size=${size}&id=${id}`,
    {
      starttime,
      endtime,
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchFansList = (page, size, id) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=spread_date_fans_list&page=${page}&size=${size}&id=${id}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )
