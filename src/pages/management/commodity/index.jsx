import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'

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
        团购商品
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/reserve')
        }}
      >
        预定商品
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/catering')
        }}
      >
        餐饮商品
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          props.history.push('/management/commodity/retail')
        }}
      >
        零售商品
      </Item>
    </List>
  </div>
)
