import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, InputItem, Button } from 'antd-mobile'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="商家邮箱" goBack />
      <WhiteSpace />
      <List renderFooter="商家邮箱可以接收最新活动推送，以及账户安全反馈">
        <InputItem placeholder="请输入您的电子邮箱" type="email">
          电子邮箱
        </InputItem>
      </List>
      <Button
        type="primary"
        style={{ position: 'fixed', bottom: 20, width: '90%', left: '5%' }}
      >
        确定修改
      </Button>
    </React.Fragment>
  )
}
