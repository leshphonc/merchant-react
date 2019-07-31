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
        <Button
          onClick={() => this.props.login.addList({ name: 'obb', id: 32 })}
        >
          btn
        </Button>
        {JSON.stringify(this.props.login.list)}
      </div>
    )
  }
}

export default Login
