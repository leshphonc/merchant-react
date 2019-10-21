import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { Flex, WhiteSpace, InputItem, List, Button, Toast } from 'antd-mobile'

@inject('wallet')
@observer
class BankWithDraw extends React.Component {
  state = {
    time: 0,
    code: '',
    balance: '0.00',
    real: '',
    servicePer: '',
  }

  componentDidMount() {
    const { wallet } = this.props
    wallet.fetchMinPrice().then(() => {
      wallet.fetchBankBalance().then(() => {
        const balance = wallet.bankAccount[0].CashAmt
        const service = wallet.serviceCharge
        this.setState({
          balance,
          servicePer: service,
        })
      })
    })
  }

  getCode = () => {
    const { wallet } = this.props
    wallet.getBankWithDrawCode(this.calcAccount()).then(() => {
      this.setState(
        {
          time: 60,
        },
        () => {
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
        },
      )
    })
  }

  calcAccount = () => {
    const { real, servicePer } = this.state
    if (real) {
      return (
        ((real - 0) * 100 - (real - 0) * 100 * ((servicePer - 0) / 100)) / 100
      )
    }
    return '0.00'
  }

  calcService = () => {
    const { real, servicePer } = this.state
    if (real) {
      return ((real - 0) * 100 * ((servicePer - 0) / 100)) / 100
    }
    return '0.00'
  }

  withDraw = () => {
    const { wallet, history } = this.props
    const { code } = this.state
    if (!wallet.codeLock) {
      Toast.info('未获取到短信指令号，请重新获取短信验证码')
      return false
    }
    wallet
      .bankWithDraw({
        ccy: 'RMB',
        cashamt: this.calcAccount(),
        messageorderno: wallet.codeLock,
        messagecheckcode: code,
        takecashcommission: this.calcService(),
      })
      .then(res => {
        if (res) {
          Toast.success('提现成功！', 1, () => history.goBack())
        }
      })
  }

  render() {
    const { time, code, balance, real } = this.state
    return (
      <>
        <NavBar title="提现" goBack />
        <WhiteSpace />
        <Flex
          style={{
            background: '#fff',
            color: '#666',
            height: 50,
            lineHeight: '50px',
          }}
          justify="center"
          align="center"
        >
          <Flex.Item style={{ textAlign: 'center' }}>提现至</Flex.Item>
          <Flex.Item style={{ flex: 3 }}>
            <img
              src={require('@/assets/image/平安银行.png')}
              style={{ width: 40, height: 40, verticalAlign: 'middle' }}
              alt=""
            />
            <span style={{ verticalAlign: 'middle', marginLeft: 20 }}>
              中国平安银行 (5987)
            </span>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <div style={{ background: '#fff', color: '#666', padding: 15 }}>
          <div style={{ marginBottom: 10 }}>
            提现金额&nbsp;&nbsp;&nbsp;&nbsp;(可用余额 {balance} 元)
            <button
              type="button"
              style={{ marginLeft: 10, color: '#298df8' }}
              onClick={() => this.setState({ real: balance })}
            >
              全部提现
            </button>
          </div>
          <InputItem
            clear
            value={real}
            onChange={value => {
              if (value - 0 < balance - 0) {
                this.setState({ real: value })
              }
            }}
            labelNumber={2}
            style={{
              fontSize: 28,
              color: '#000',
              padding: 0,
              display: 'inline-block',
            }}
          >
            <span style={{ color: '#444', fontSize: 26 }}>¥</span>
          </InputItem>
          <div style={{ fontSize: 12, color: '#ccc', marginTop: 10 }}>
            实际到账{this.calcAccount()}元，手续费{this.calcService()}元。
          </div>
        </div>
        <List style={{ marginTop: 10 }}>
          <InputItem
            value={code}
            onChange={value =>
              this.setState({
                code: value,
              })
            }
            extra={
              time === 0 ? (
                <Button
                  size="small"
                  type="primary"
                  disabled={!real.length}
                  onClick={this.getCode}
                >
                  获取验证码
                </Button>
              ) : (
                `(${time})重新获取`
              )
            }
          >
            短信验证码
          </InputItem>
        </List>
        <Button
          type="primary"
          disabled={!(code.length >= 6)}
          style={{
            width: '90%',
            marginBottom: 20,
            position: 'absolute',
            bottom: 0,
            left: '5%',
          }}
          onClick={this.withDraw}
        >
          确认提现
        </Button>
      </>
    )
  }
}

export default BankWithDraw
