import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'
import { TextBox } from './styled'

const { Item } = List

export default props => (
  <div>
    <NavBar title="店铺管理" goBack />
    <WhiteSpace />
    <List>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/group')
        }}
      >
        <TextBox>团购商品</TextBox>
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/reserve')
        }}
      >
        <TextBox>预定商品</TextBox>
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/catering')
        }}
      >
        <TextBox>餐饮商品</TextBox>
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/retail')
        }}
      >
        <TextBox>零售商品</TextBox>
      </Item>
    </List>
  </div>
)
