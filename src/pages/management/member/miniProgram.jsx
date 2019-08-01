import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import FansList from '@/common/FansList'
import { MiniFansList } from '@/config/list'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="小程序粉丝" goBack />
      <WhiteSpace />
      <FansList list={MiniFansList} />
    </React.Fragment>
  )
}
