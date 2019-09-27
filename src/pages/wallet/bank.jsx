import React from 'react'
import { WingBlank, Button, Toast, Modal } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { Paper } from '@/styled'
import { withRouter } from 'react-router-dom'
import { BankIcon } from '@/config/constant'

@withRouter
@inject('basicInformation', 'wallet')
@observer
class Bank extends React.Component {
  state = {
    cur: 1,
    bankName: '',
    foot: '',
    icon: '',
  }

  componentDidMount() {
    const { basicInformation } = this.props
    basicInformation.fetchBasicInfo().then(() => {
      if (basicInformation.noUser.bank_name) {
        const name = `${basicInformation.noUser.bank_name.split('银行')[0]}银行`
        const icon = BankIcon.find(item => item.name === name).url
        this.setState({
          bankName: basicInformation.noUser.bank_name,
          foot: basicInformation.noUser.card_No.substr(
            basicInformation.noUser.card_No.length - 4,
            basicInformation.noUser.card_No.length - 1,
          ),
          icon,
          cur: 2,
        })
      } else {
        this.setState({
          cur: 1,
        })
      }
    })
  }

  bindBankCard = () => {
    const { history, basicInformation } = this.props
    if (basicInformation.noUser.uid) {
      history.push('/wallet/addBankCard')
    } else {
      Toast.info('请先在基本信息中绑定微信')
    }
  }

  unbind = () => {
    const { wallet, basicInformation } = this.props
    Modal.alert('解绑银行卡', '解除当前绑定银行卡？', [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '解绑',
        onPress: () => {
          wallet.unBindBank().then(res => {
            if (res) {
              Toast.success('解绑成功', 1, () => {
                basicInformation.fetchBasicInfo()
              })
            }
          })
        },
      },
    ])
  }

  render() {
    const { cur, bankName, foot, icon } = this.state
    return (
      <>
        <WingBlank>
          {cur === 1 ? (
            <Paper style={{ textAlign: 'center', boxShadow: 'none', borderRadius: 10 }}>
              <div style={{ fontSize: 14, color: '#ababab', marginTop: 15, marginBottom: 30 }}>
                您还没有绑定银行卡
              </div>
              <Button type="primary" style={{ marginBottom: 10 }} onClick={this.bindBankCard}>
                绑定银行卡
              </Button>
            </Paper>
          ) : (
            <Paper
              style={{
                borderRadius: 10,
                color: '#fff',
                background: 'linear-gradient(150deg, #ff8648, #e95506)',
                boxShadow: '0px 0px 4px 0px rgba(254,131,68,1)',
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={icon}
                  alt=""
                  style={{
                    width: 38,
                    height: 38,
                    background: '#fff',
                    display: 'inline-block',
                    verticalAlign: 'sub',
                    marginLeft: 6,
                    marginTop: 6,
                    borderRadius: 20,
                  }}
                />
                <div style={{ display: 'inline-block', marginLeft: 10, maxWidth: '65%' }}>
                  <div
                    style={{
                      fontSize: 20,
                      maxHeight: 26,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bankName}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 100 }}>储蓄卡</div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 8,
                    fontSize: 12,
                    textDecoration: 'underline',
                    letterSpacing: '0.5px',
                    fontWeight: 100,
                    background: 'transparent',
                    color: '#fff',
                  }}
                  type="button"
                  onClick={this.unbind}
                >
                  解除绑定
                </button>
              </div>
              <div
                style={{
                  fontSize: 18,
                  marginTop: 33,
                  marginBottom: 25,
                  textAlign: 'right',
                  marginRight: 7,
                }}
              >
                <span style={{ verticalAlign: 'sub', letterSpacing: 2 }}>****</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ verticalAlign: 'sub', letterSpacing: 2 }}>****</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ verticalAlign: 'sub', letterSpacing: 2 }}>****</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ verticalAlign: 'middle' }}>{foot}</span>
              </div>
            </Paper>
          )}
        </WingBlank>
      </>
    )
  }
}

export default Bank
