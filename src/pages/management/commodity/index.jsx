import React from 'react'
import NavBar from '@/common/NavBar'
import { List } from 'antd-mobile'
import { Link } from 'react-router-dom'

const { Item } = List
export default () => {
  return (
    <div>
      <NavBar
        title="店铺管理"
        goBack
      />
      <List>
        <Link to="/management/commodity/group">
          <Item arrow="horizontal">团购商品</Item>
        </Link>
        <Link to="/management/commodity/reserve">
          <Item arrow="horizontal">预定商品</Item>
        </Link>
        <Link to="/management/commodity/catering">
          <Item arrow="horizontal">餐饮商品</Item>
        </Link>
        <Link to="/management/commodity/retail">
          <Item arrow="horizontal">零售商品</Item>
        </Link>
      </List>
    </div>
  )
}
