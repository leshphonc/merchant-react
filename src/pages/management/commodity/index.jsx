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
        <Link
          to={{
            pathname: '/management/commodity/group',
            state: '团购',
          }}
        >
          <Item arrow="horizontal" onClick={() => {}}>团购商品</Item>
        </Link>
        <Item arrow="horizontal" onClick={() => {}}>团购商品</Item>
        <Item arrow="horizontal" onClick={() => {}}>预定商品</Item>
        <Item arrow="horizontal" onClick={() => {}}>餐饮商品</Item>
        <Item arrow="horizontal" onClick={() => {}}>零售商品</Item>
      </List>
    </div>
  )
}
