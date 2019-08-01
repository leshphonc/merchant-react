import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import CouponList from '@/common/CouponList'
import { CouponLists } from '@/config/list'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="优惠券列表" goBack />
      <WhiteSpace />
      <CouponList list={CouponLists} bottom />
    </React.Fragment>
  )
}
