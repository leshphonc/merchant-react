import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List, InputItem, Button, Modal } from 'antd-mobile'
import Utils from '@/utils'

@observer
@inject('wallet')
class VerificationCard extends React.Component {
  state = {
    cur: 1,
    time: 60,
    cardNo: '',
    phone: '',
    code: '',
  }

  componentDidMount() {
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      this.setState({
        cardNo: cacheData.memberacctno,
        phone: cacheData.mobile,
      })
    }
  }

  getCode = () => {
    const { wallet } = this.props
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      wallet
        .bindBankCard({
          membername: cacheData.membername,
          memberglobaltype: cacheData.memberglobaltype[0],
          memberglobalid: cacheData.memberglobalid,
          memberacctno: cacheData.memberacctno.replace(/\s+/g, ''),
          banktype: cacheData.banktype[0],
          acctopenbranchname: cacheData.acctopenbranchnameLabel,
          mobile: cacheData.mobile.replace(/\s+/g, ''),
          cnapsbranchid: cacheData.acctopenbranchname,
        })
        .then(res => {
          if (res) {
            this.setState({ cur: 2 })
            const timer = setInterval(() => {
              const { time } = this.state
              if (time === 0) {
                clearInterval(timer)
                return false
              }
              this.setState({
                time: time - 1,
              })
            }, 1000)
          }
        })
    }
  }

  submit = () => {
    const { history, wallet } = this.props
    const { code } = this.state
    wallet.verCode(code).then(res => {
      if (res) {
        Modal.alert(
          <div>
            绑定成功
            <div style={{ marginTop: 25 }}>您已成功绑定银行卡！</div>
          </div>,
          <div style={{ marginTop: 20 }}>
            可以提现啦！
            <span style={{ marginTop: 5, color: '#367eef', marginBottom: 10 }}>立即提现</span>
          </div>,
          [{ text: '完成', onPress: () => history.push('/wallet') }],
        )
      }
    })
  }

  render() {
    const { cur, time, cardNo, phone, code } = this.state
    return (
      <>
        <NavBar title="验证银行卡信息" goBack />
        <WhiteSpace />
        {cur === 1 ? (
          <>
            <List>
              <List.Item extra="平安银行" align="top">
                银行卡
                <List.Item.Brief>{cardNo}</List.Item.Brief>
              </List.Item>
              <List.Item extra={phone}>手机号</List.Item>
            </List>
            <Button
              type="primary"
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 20,
                marginBottom: 20,
              }}
              onClick={this.getCode}
            >
              同意并验证
            </Button>
          </>
        ) : (
          <>
            <List renderHeader="已发送至手机号189****2910">
              <InputItem
                placeholder="短信验证码"
                value={code}
                onChange={val => this.setState({ code: val })}
                extra={
                  time === 0 ? (
                    <Button size="small" type="primary" onClick={this.getCode}>
                      获取
                    </Button>
                  ) : (
                    `(${time})重新获取`
                  )
                }
              >
                验证码
              </InputItem>
            </List>
            <Button
              type="primary"
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 20,
                marginBottom: 20,
              }}
              onClick={this.submit}
            >
              验证信息
            </Button>
          </>
        )}
      </>
    )
  }
}

export default VerificationCard
