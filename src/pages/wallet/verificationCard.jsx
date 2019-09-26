import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, InputItem, Button, Modal } from 'antd-mobile'

class VerificationCard extends React.Component {
  state = {
    cur: 1,
    time: 60,
  }

  getCode = () => {
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

  submit = () => {
    const { history } = this.props
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

  render() {
    const { cur, time } = this.state
    return (
      <>
        <NavBar title="验证银行卡信息" goBack />
        <WhiteSpace />
        {cur === 1 ? (
          <>
            <List>
              <List.Item extra="平安银行" align="top">
                银行卡
                <List.Item.Brief>219923912939129399</List.Item.Brief>
              </List.Item>
              <InputItem placeholder="银行使用的预留手机号码">手机号</InputItem>
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
              获取短信验证码
            </Button>
          </>
        ) : (
          <>
            <List renderHeader="已发送至手机号189****2910">
              <InputItem
                placeholder="短信验证码"
                extra={
                  time === 0 ? (
                    <Button size="small" type="primary">
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
