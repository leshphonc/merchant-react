import React from 'react'
import { WingBlank, Button } from 'antd-mobile'
import { Paper } from '@/styled'
import { withRouter } from 'react-router-dom'

@withRouter
class Bank extends React.Component {
  state = {
    cur: 1,
  }

  componentDidMount() {}

  render() {
    const { history } = this.props
    const { cur } = this.state
    return (
      <>
        <WingBlank>
          {cur === 1 ? (
            <Paper style={{ textAlign: 'center', boxShadow: 'none', borderRadius: 10 }}>
              <div style={{ fontSize: 14, color: '#ababab', marginTop: 15, marginBottom: 30 }}>
                您还没有绑定银行卡
              </div>
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                onClick={() => history.push('/wallet/addBankCard')}
              >
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
                <div
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
                <div style={{ display: 'inline-block', marginLeft: 10 }}>
                  <div style={{ fontSize: 20 }}>中国平安银行</div>
                  <div style={{ fontSize: 12, fontWeight: 100 }}>储蓄卡</div>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 8,
                    fontSize: 12,
                    textDecoration: 'underline',
                    letterSpacing: '0.5px',
                    fontWeight: 100,
                  }}
                >
                  解除绑定
                </span>
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
                <span style={{ verticalAlign: 'middle' }}>2849</span>
              </div>
            </Paper>
          )}
        </WingBlank>
      </>
    )
  }
}

export default Bank
