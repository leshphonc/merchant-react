import React from 'react'
import { Button } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'

@inject('login')
@observer
class Login extends React.Component {
  render() {
    console.log(this.props)
    console.log(action)
    return (
      <div>
        <Button>btn</Button>
        login
      </div>
    )
  }
}

export default Login
