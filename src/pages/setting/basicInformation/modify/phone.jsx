import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Button,
} from 'antd-mobile'

@inject('basicInformation')
@observer
class ModifyPhone extends React.Component {
  state = {
    phone: null,
  }

  componentDidMount() {
    const { history } = this.props
    this.setState({
      phone: history.location.state.value,
    })
  }

  submit = async () => {
    const { history, basicInformation } = this.props
    const { phone } = this.state
    await basicInformation.modifyPhone(phone)
    history.goBack()
  }

  render() {
    const { phone } = this.state
    return (
      <React.Fragment>
        <NavBar title="联系电话" goBack />
        <WhiteSpace />
        <List renderFooter="一个手机号只能作为一个账号的登录名，一个手机号最多可以被6个账号绑定">
          <InputItem
            placeholder="请输入您的手机号"
            type="phone"
            value={phone}
            onChange={val => this.setState({ phone: val })}
          >
            手机号
          </InputItem>
        </List>
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定修改
        </Button>
      </React.Fragment>
    )
  }
}

export default ModifyPhone
