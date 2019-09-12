import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank } from 'antd-mobile'

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar title="提示" goBack />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>手机端暂未开放此功能，请登录电脑端后台进行操作</WingBlank>
      </React.Fragment>
    )
  }
}

export default NotFound
