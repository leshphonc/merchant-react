import React from 'react'
import NavBar from '@/common/NavBar'
import { List } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { TextBox } from './styled'

const { Item } = List
export default () => (
  <div>
    <NavBar title="店铺管理" goBack />
    <List>
      <Link to="/management/commodity/group">
        <Item arrow="horizontal">
          <TextBox>团购商品</TextBox>
        </Item>
      </Link>
      <Link to="/management/commodity/reserve">
        <Item arrow="horizontal">
          <TextBox>预定商品</TextBox>
        </Item>
      </Link>
      <Link to="/management/commodity/catering">
        <Item arrow="horizontal">
          <TextBox>餐饮商品</TextBox>
        </Item>
      </Link>
      <Link to="/management/commodity/retail">
        <Item arrow="horizontal">
          <TextBox>零售商品</TextBox>
        </Item>
      </Link>
    </List>
  </div>
)
