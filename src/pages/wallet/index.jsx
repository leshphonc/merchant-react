import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'
import AddCredit from './addCredit'
import WithDraw from './withDraw'
import WalletDetail from './detail'

const { Item } = List

const Wallet = props => (
  <React.Fragment>
    <NavBar title="充值" goBack="/" />
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
        onClick={() => props.history.push({
          pathname: '/wallet/withDraw',
        })
        }
        thumb={
          <i className="iconfont" style={{ fontSize: 22 }}>
            &#xe603;
          </i>
        }
        arrow="horizontal"
      >
        提现
      </Item>
      <Item
        onClick={() => props.history.push({
          pathname: '/wallet/detail',
        })
        }
        thumb={
          <i className="iconfont" style={{ fontSize: 18, marginLeft: 2 }}>
            &#xe601;
          </i>
        }
        arrow="horizontal"
      >
        账户明细
      </Item>
    </List>
  </React.Fragment>
)

export default () => (
  <React.Fragment>
    <Route path="/wallet" exact component={Wallet} />
    <Route path="/wallet/addCredit" component={AddCredit} />
    <Route path="/wallet/withDraw" component={WithDraw} />
    <Route path="/wallet/detail" component={WalletDetail} />
  </React.Fragment>
)
