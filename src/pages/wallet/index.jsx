import React from 'react'
import { Link, Route } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'
import AddCredit from './addCredit'
import WalletDetail from './detail'

const { Item } = List

const Wallet = props => (
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
        onClick={() => props.history.push({
          pathname: '/wallet/addCredit',
        })
        }
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

export default () => (
  <React.Fragment>
    <Route path="/wallet" exact component={Wallet} />
    <Route path="/wallet/addCredit" component={AddCredit} />
    <Route path="/wallet/detail" component={WalletDetail} />
  </React.Fragment>
)
