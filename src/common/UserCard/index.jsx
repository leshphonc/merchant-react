import React from 'react'
import { withRouter } from 'react-router-dom'
import { WingBlank, Flex } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@withRouter
@inject('home')
@observer
class UserCard extends React.Component {
  render() {
    const { home, history } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const userName = userInfo ? userInfo.name : '未登录'
    const { avatar } = userInfo || {}
    return (
      <div style={{ paddingTop: 10, background: '#fff' }}>
        <WingBlank size="md">
          <Flex>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={avatar || require('../../assets/image/default_avatar.png')}
                alt=""
                width="48"
                height="48"
                style={{ borderRadius: 48 }}
              />
            </div>
            <div style={{ flex: 4, paddingLeft: 12, fontSize: 14 }}>
              {userInfo ? `Hi , ${userName} 欢迎回来！` : '未登录'}
            </div>
            <div
              style={{
                flex: 1,
                color: '#7B7B7B',
                fontSize: 12,
                textAlign: 'right',
                paddingRight: 5,
              }}
              onClick={() => {
                history.push('/login')
              }}
            >
              退出
            </div>
          </Flex>
        </WingBlank>

        <WingBlank size="md">
          <div
            style={{
              background: '#00A29A',
              height: 94,
              borderRadius: 8,
              boxShadow: '0 3px 6px 0 rgba(114,162,164, 1)',
              margin: '10px 0',
            }}
          >
            <Flex style={{ color: '#fff' }}>
              <Flex.Item
                style={{
                  paddingLeft: 26,
                  paddingTop: 16,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                  }}
                >
                  {home.indexData.allmoney || 0}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    color: '#F0F0F2',
                    fontWeight: 'lighter',
                  }}
                >
                  账户余额(元)
                </div>
              </Flex.Item>
              <Flex.Item
                style={{
                  position: 'relative',
                  height: 80,
                }}
                onClick={() => {
                  history.push('/wallet')
                }}
              >
                <div style={{ position: 'absolute', bottom: 1, right: 90 }}>
                  充值
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 22,
                    background: '#007B81',
                    padding: '2px 10px 1px',
                    boxSizing: 'border-box',
                    borderRadius: 10,
                  }}
                >
                  提现
                </div>
              </Flex.Item>
            </Flex>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default UserCard
