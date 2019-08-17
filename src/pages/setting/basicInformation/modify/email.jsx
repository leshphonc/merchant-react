import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Button,
} from 'antd-mobile'

@inject('basicInformation')
@observer
class ModifyEmail extends React.Component {
  state = {
    email: null,
  }

  componentDidMount() {
    const { match } = this.props
    this.setState({
      email: match.params.value,
    })
  }

  submit = async () => {
    const { history, basicInformation } = this.props
    const { email } = this.state
    await basicInformation.modifyEmail(email)
    history.goBack()
  }

  render() {
    const { email } = this.state
    return (
      <React.Fragment>
        <NavBar title="商家邮箱" goBack />
        <WhiteSpace />
        <List renderFooter="商家邮箱可以接收最新活动推送，以及账户安全反馈">
          <InputItem
            placeholder="请输入您的电子邮箱"
            type="email"
            value={email}
            onChange={val => this.setState({ email: val })}
          >
            电子邮箱
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
export default ModifyEmail
