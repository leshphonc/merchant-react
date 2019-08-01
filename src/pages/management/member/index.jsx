import React from 'react'
import NavBar from '@/common/NavBar'
import { WingBlank, WhiteSpace, Icon } from 'antd-mobile'
import { ColorCard, CardLeft } from './styled'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="会员管理" goBack />
      <WingBlank>
        <WhiteSpace />
        <ColorCard style={{ background: 'rgb(187, 219, 156)' }}>
          <CardLeft>小程序粉丝</CardLeft>
          <Icon type="right" color="#fff" />
        </ColorCard>
        <WhiteSpace />
        <ColorCard style={{ background: 'rgb(124, 214, 222)' }}>
          <CardLeft>公众号粉丝</CardLeft>
          <Icon type="right" color="#fff" />
        </ColorCard>
        <WhiteSpace />
        <ColorCard style={{ background: 'rgb(255, 174, 108)' }}>
          <CardLeft>会员卡分组</CardLeft>
          <Icon type="right" color="#fff" />
        </ColorCard>
        <WhiteSpace />
        <ColorCard style={{ background: 'rgb(255, 130, 131)' }}>
          <CardLeft>优惠券列表</CardLeft>
          <Icon type="right" color="#fff" />
        </ColorCard>
      </WingBlank>
    </React.Fragment>
  )
}
