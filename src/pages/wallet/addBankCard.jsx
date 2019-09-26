import React from 'react'
import NavBar from '@/common/NavBar'
import { List, InputItem, Picker, Button } from 'antd-mobile'

class AddBankCard extends React.Component {
  submit = () => {
    const { history } = this.props
    history.push('/wallet/verificationCard')
  }

  render() {
    return (
      <>
        <NavBar title="添加银行卡" goBack />
        <List renderHeader="请绑定持卡人本人的银行卡">
          <InputItem clear>持卡人</InputItem>
          <Picker>
            <List.Item arrow="horizontal">证件类型</List.Item>
          </Picker>
          <InputItem clear>证件号</InputItem>
          <Picker>
            <List.Item arrow="horizontal">银行类型</List.Item>
          </Picker>
          <InputItem clear>卡号</InputItem>
          <InputItem>开户行</InputItem>
          <InputItem>大小额行号</InputItem>
          <InputItem>手机号</InputItem>
        </List>
        <Button
          type="primary"
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            marginBottom: 20,
          }}
          onClick={this.submit}
        >
          下一步
        </Button>
      </>
    )
  }
}

export default AddBankCard
