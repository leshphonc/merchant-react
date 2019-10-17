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

  submit = () => {
    const { login, history } = this.props
    const { account, password } = this.state
    login
      .login(account, password)
      .then(res => {
        if (res) {
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
          <InputBox>
            <i className="iconfont">&#xe640;</i>
            <InputItem
              value={account}
              placeholder="用户名/手机号/邮箱"
              onChange={val => this.setState({ account: val })}
            />
          </InputBox>
          <InputBox>
            <i className="iconfont">&#xe62a;</i>
            <InputItem
              type="password"
              placeholder="密码"
              value={password}
              onChange={val => this.setState({ password: val })}
            />
          </InputBox>
          {/* <WingBlank>
            <Flex justify="end" style={{ marginBottom: '15vh' }}>
              <span style={{ color: '#ffb000', fontSize: 13 }}>找回密码？</span>
            </Flex>
          </WingBlank> */}
          <Button onClick={this.submit} type="primary" style={{ marginTop: '15vh' }}>
            登录
          </Button>
        </Box>
      </Container>
    )
  }
}

export default Login
