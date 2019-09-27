import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, SegmentedControl, WingBlank } from 'antd-mobile'
import AddCredit from './addCredit'
import WithDraw from './withDraw'
import WalletDetail from './detail'
import Bank from './bank'
import AddBankCard from './addBankCard'
import VerificationCard from './verificationCard'
import SearchBankAps from './searchBankAps'

const { Item } = List

class Wallet extends React.Component {
  state = {
    cur: '系统余额账户',
  }

  render() {
    const { history } = this.props
    const { cur } = this.state
    return (
      <React.Fragment>
        <NavBar title="充值" goBack="/" />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            values={['系统余额账户', '平安提现账户']}
            onValueChange={val => this.setState({
              cur: val,
            })
            }
          />
        </WingBlank>
        <WhiteSpace />
        <WhiteSpace />
        {cur === '系统余额账户' ? (
          <List>
            <Item
              onClick={() => history.push({
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
              onClick={() => history.push({
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
              onClick={() => history.push({
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
        ) : (
          <Bank />
        )}
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/wallet" exact component={Wallet} />
    <Route path="/wallet/addCredit" component={AddCredit} />
    <Route path="/wallet/withDraw" component={WithDraw} />
    <Route path="/wallet/detail" component={WalletDetail} />
    <Route path="/wallet/addBankCard" component={AddBankCard} />
    <Route path="/wallet/verificationCard" component={VerificationCard} />
    <Route path="/wallet/searchBankAps" component={SearchBankAps} />
  </React.Fragment>
)
