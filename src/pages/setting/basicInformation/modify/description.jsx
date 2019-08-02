import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, TextareaItem, Button,
} from 'antd-mobile'

export default () => (
  <React.Fragment>
    <NavBar title="商户描述" goBack />
    <WhiteSpace />
    <List renderFooter="简要描述您的经营类型、范围等">
      <TextareaItem placeholder="请输入商户描述" rows={6} />
    </List>
    <Button
      type="primary"
      style={{
        position: 'fixed',
        bottom: 20,
        width: '90%',
        left: '5%',
      }}
    >
      确定修改
    </Button>
  </React.Fragment>
)
