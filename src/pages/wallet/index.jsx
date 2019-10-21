import React from 'react'
import { Route, Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, SegmentedControl, WingBlank } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import AddCredit from './addCredit'
import WithDraw from './withDraw'
import WalletDetail from './detail'
import Bank from './bank'
import AddBankCard from './addBankCard'
import VerificationCard from './verificationCard'
import SearchBankAps from './searchBankAps'
import Utils from '@/utils'
import BankWithDraw from './bankWithDraw'
import BankWithDrawRecord from './bankWithDrawRecord'

const { Item } = List

@inject('wallet')
@observer
class Wallet extends React.Component {
  state = {
    cur: '系统余额账户',
    index: 0,
    auth: false,
  }

  componentDidMount() {
    const { wallet } = this.props
    wallet.getUserConfig().then(() => {
      const auth = wallet.userConfig.find(
        item => item.name === 'open_user_spread' && item.value === '1',
      )
      this.setState({
        auth,
      })
    })
    const curBar = sessionStorage.getItem('curBar') || '系统余额账户'
    this.setState({
      cur: curBar,
      index: curBar === '系统余额账户' ? 0 : 1,
    })
    Utils.clearCacheData()
  }

  render() {
    const { history } = this.props
    const { cur, index, auth } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="充值"
          goBack="/"
          right={
            cur === '平安提现账户' ? (
              <Link style={{ color: '#fff' }} to="/wallet/bankWithDrawRecord">
                提现记录
              </Link>
            ) : null
          }
        />
        <WhiteSpace />
        {auth ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank>
              <SegmentedControl
                selectedIndex={index}
                values={['系统余额账户', '平安提现账户']}
                onValueChange={val => {
                  sessionStorage.setItem('curBar', val)
                  this.setState({
                    cur: val,
                    index: val === '系统余额账户' ? 0 : 1,
                  })
                }}
              />
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
          </React.Fragment>
        ) : null}
        {cur === '系统余额账户' ? (
          <List>
            <Item
              onClick={() =>
                history.push({
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
              onClick={() =>
                history.push({
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
              onClick={() =>
                history.push({
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
    <Route path="/wallet/bankWithDraw" component={BankWithDraw} />
    <Route path="/wallet/bankWithDrawRecord" component={BankWithDrawRecord} />
  </React.Fragment>
)
