import axios from 'axios'

export const fetchMiniProgramList = (page, size) =>
  axios.post(`/appapi.php?c=Merchantapp&a=xcx_fans&page=${page}&size=${size}`, {
    ticket: localStorage.getItem('ticket'),
  })

export const fetchPublicList = (page, size, beginTime, endTime) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=visit_list&page=${page}&size=${size}&begin_time=${beginTime}&end_time=${endTime}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchMerFansList = (page, size, beginTime, endTime) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=fans_list&page=${page}&size=${size}&begin_time=${beginTime}&end_time=${endTime}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchBuyList = (page, beginTime, endTime) =>
  axios.post(`/appapi.php?c=Merchantapp&a=getMerPayUsers`, {
    page: page,
    begin_time: beginTime,
    end_time: endTime,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchUserBuyList = (page, beginTime, endTime, uid) =>
  axios.post(`/appapi.php?c=Merchantapp&a=getUserPayLog`, {
    page: page,
    begin_time: beginTime,
    end_time: endTime,
    uid: uid,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchCardGroupList = (page, size) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=card_group&page=${page}&size=${size}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchCardGroupDetail = id =>
  axios.get('/appapi.php?c=Merchantapp&a=card_group_detail', {
    params: {
      gid: id,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchGiftVoucher = () =>
  axios.get('/appapi.php?c=Merchantapp&a=select_card_coupon', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

export const insertCardGroup = (name, des, discount, effdays, give) =>
  axios.post('/appapi.php?c=Merchantapp&a=add_card_group', {
    name,
    des,
    discount,
    effdays,
    give,
    ticket: localStorage.getItem('ticket'),
  })

export const modifyCardGroup = (name, des, discount, gid, effdays, give) =>
  axios.post('/appapi.php?c=Merchantapp&a=edit_card_group', {
    name,
    des,
    discount,
    gid,
    effdays,
    give,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchCardGroupUsers = (page, size, id) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=card_group_user_list&page=${page}&size=${size}&gid=${id}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchCardGroupUserInfo = id =>
  axios.post(`/appapi.php?c=Merchantapp&a=card_detail&id=${id}`, {
    ticket: localStorage.getItem('ticket'),
  })

export const fetchCardGroupUserInfoSelect = () =>
  axios.post('/appapi.php?c=Merchantapp&a=card_group_all', {
    ticket: localStorage.getItem('ticket'),
  })

export const modifyCardGroupUserInfo = payload => {
  const {
    id,
    uid,
    cardNo,
    group,
    status,
    balance,
    balanceNum,
    integral,
    integralNum,
  } = payload
  return axios.post('/appapi.php?c=Merchantapp&a=edit_card_detail', {
    ticket: localStorage.getItem('ticket'),
    id,
    uid,
    physical_id: cardNo,
    gid: group,
    status,
    set_money_type: balance,
    set_score_type: integral,
    set_money: balanceNum,
    set_score: integralNum,
  })
}

export const fetchExpensesRecordList = (page, size, id) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=consume_record&page=${page}&size=${size}&id=${id}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchCouponList = (page, size) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=card_new_coupon&page=${page}&size=${size}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const fetchCouponCheckList = (page, size, id) =>
  axios.post(
    `/appapi.php?c=Merchantapp&a=card_new_coupon_handpull&page=${page}&size=${size}&coupon_id=${id}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const changeCouponStatus = (id, status) =>
  axios.post('/appapi.php?c=Merchantapp&a=edit_coupon', {
    ticket: localStorage.getItem('ticket'),
    coupon_id: id,
    status,
  })

export const checkCouponCode = (id, code, splice) =>
  axios.post('/appapi.php?c=Merchantapp&a=use_couponcode', {
    code: splice ? `${id}d${code}` : code,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchUserBehavior = (uid, page, size) =>
  axios.get('/appapi.php?c=Merchantapp&a=Customer_detail', {
    params: {
      uid: uid,
      page: page,
      size: size,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const getMemberCardList = page =>
  axios.get('/appapi.php?c=Merchantapp&a=card_user_list', {
    params: {
      page: page,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const createMemberCard = payload =>
  axios.post('/appapi.php?c=MemberCard&a=addMember', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

export const readMemberCardBasicInfoDetail = () =>
  axios.post('/appapi.php?c=MemberCard&a=showMemberCard', {
    ticket: localStorage.getItem('ticket'),
  })

export const memberCardBasicInfo = payload =>
  axios.post('/appapi.php?c=MemberCard&a=editMerberCard', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })
