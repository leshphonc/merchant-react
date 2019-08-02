import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Button,
} from 'antd-mobile'

export default () => (
  <React.Fragment>
    <NavBar title="联系电话" goBack />
    <WhiteSpace />
    <List renderFooter="一个手机号只能作为一个账号的登录名，一个手机号最多可以被6个账号绑定">
      <InputItem placeholder="请输入您的手机号" type="phone">
          手机号
      </InputItem>
    </List>
    <Button
      type="primary"
      style={{
        position: 'fixed', bottom: 20, width: '90%', left: '5%',
      }}
    >
        确定修改
    </Button>
  </React.Fragment>
)
