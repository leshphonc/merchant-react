import React from 'react'
import { InputItem, Button, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { Container, Box } from './styled'

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
    login.login(account, password).then(() => {
      history.push('/')
      Toast.success('欢迎回来', 2, null, false)
    })
  }

  render() {
    const { login } = this.props
    const { account, password } = this.state
    console.log(login)
    return (
      <Container>
        <Box>
          <InputItem
            value={account}
            onChange={val => this.setState({ account: val })}
          />
          <InputItem
            type="password"
            value={password}
            onChange={val => this.setState({ password: val })}
          />
          <Button onClick={this.submit}>btn</Button>
          {JSON.stringify(login.list)}
        </Box>
      </Container>
    )
  }
}

export default Login
