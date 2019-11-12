import React from 'react'
import { InputItem, Button, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { Container, Box, Avatar, InputBox } from './styled'
import env from '@/config/env'

@inject('login')
@observer
class Login extends React.Component {
  state = {
    account: '',
    password: '',
  }

  invokeAndroid = json => {
    if (
      navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1
    ) {
      window.android.invokeMethods(JSON.stringify(json))
    } else if (
      navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1
    ) {
      window.location.href = 'ios:' + JSON.stringify(json)
    }
  }

  submit = () => {
    const { login, history } = this.props
    const { account, password } = this.state
    login
      .login(account, password)
      .then(res => {
        if (res) {
          const json = {
            action: 'SendJPushIdToServer',
            type: 'merchant',
            uid: JSON.parse(localStorage.getItem('merchant_user')).mer_id,
            BaseUrl: window.location.origin.split('.')[1],
          }
          this.invokeAndroid(json)
          history.replace('/')
          Toast.success('欢迎回来', 2, null, false)
        }
      })
      .catch(val => {
        console.log(val)
      })
  }

  render() {
    const { account, password } = this.state
    return (
      <Container>
        <Box>
          <Avatar>
            <img src={env.logo} alt="" />
          </Avatar>
          <div
            style={{
              fontSize: 20,
              color: '#666',
              textAlign: 'center',
            }}
          >
            管理中心
          </div>
          <InputBox style={{ marginTop: 120 }}>
            <i className="iconfont">&#xe640;</i>
            <InputItem
              value={account}
              placeholder="请输入您的账号"
              style={{ background: 'transparent !important' }}
              onChange={val => this.setState({ account: val })}
            />
          </InputBox>
          <InputBox>
            <i className="iconfont">&#xe62a;</i>
            <InputItem
              type="password"
              placeholder="请输入您的密码"
              style={{ background: 'transparent !important' }}
              value={password}
              onChange={val => this.setState({ password: val })}
            />
          </InputBox>
          {/* <WingBlank>
            <Flex justify="end" style={{ marginBottom: '15vh' }}>
              <span style={{ color: '#ffb000', fontSize: 13 }}>找回密码？</span>
            </Flex>
          </WingBlank> */}
          <Button
            onClick={this.submit}
            type="primary"
            style={{ marginTop: '15vh', borderRadius: 30, fontWeight: 600 }}
          >
            登录
          </Button>
        </Box>
      </Container>
    )
  }
}

export default Login
