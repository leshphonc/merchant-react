import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import FansList from '@/common/FansList'
import { PublicMemberList } from '@/config/list'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="公众号粉丝" goBack />
      <WhiteSpace />
      <FansList list={PublicMemberList} bottom />
    </React.Fragment>
  )
}
