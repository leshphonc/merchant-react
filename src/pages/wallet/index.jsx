import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'

const { Item } = List

export default () => {
  return (
    <React.Fragment>
      <NavBar
        title="充值"
        goBack
        right={
          <Link to="/wallet/detail" style={{ color: '#fff', fontSize: 14 }}>
            账户明细
          </Link>
        }
      />
      <WhiteSpace />
      <List>
        <Item
          onClick={() => {}}
          thumb={
            <i className="iconfont" style={{ fontSize: 22 }}>
              &#xe604;
            </i>
          }
          arrow="horizontal"
        >
          充值
        </Item>
        <Item
          onClick={() => {}}
          thumb={
            <i className="iconfont" style={{ fontSize: 22 }}>
              &#xe603;
            </i>
          }
          arrow="horizontal"
        >
          提现
        </Item>
      </List>
    </React.Fragment>
  )
}
