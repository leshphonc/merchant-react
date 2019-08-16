import React from 'react'
import NavBar from '@/common/NavBar'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Picker, Toast,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
// import ModifyPicture from './modify/picture'

const shops = [
  [
    {
      label: '卢卡斯的积分',
      value: '2013',
    },
    {
      label: '周末不能使用',
      value: '2014',
    },
    {
      label: '是快乐的角色的画风',
      value: '2015',
    },
  ],
]
class ShopEdit extends React.Component {
  state = {
    shopsValue: ['2015'],
    hasError: false,
    value: '',
  }

  onErrorClick = () => {
    // if (this.state.hasError) {
    Toast.info('Please enter 11 digits')
    // }
  }

  onChange = value => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      })
    } else {
      this.setState({
        hasError: false,
      })
    }
    this.setState({
      value,
    })
  }

  render() {
    const { shopsValue, value, hasError } = this.state
    return (
      <React.Fragment>
        <NavBar title="编辑店员" goBack />
        <form>
          <List>
            <InputItem placeholder="请填写员工账号" disabled>
              员工账号
            </InputItem>
            <InputItem
              type="phone"
              placeholder="请填写员工手机号"
              error={hasError}
              onErrorClick={this.onErrorClick}
              onChange={this.onChange}
              value={value}
            >
              员工手机号
            </InputItem>

            <InputItem placeholder="请填写员工姓名">员工姓名</InputItem>
            <InputItem placeholder="请填写初始密码">初始密码</InputItem>
            <Picker
              disabled
              data={shops}
              cascade={false}
              extra="请选择"
              value={shopsValue}
              onChange={v => {
                this.setState({
                  shopsValue: v,
                })
              }}
            >
              <List.Item arrow="horizontal">选择店铺</List.Item>
            </Picker>
            <WingBlank style={{ padding: '10px 0' }}>
              <Button type="primary" style={{ color: '#333', fontWeight: 'bold' }}>
                确定
              </Button>
            </WingBlank>
          </List>
        </form>
      </React.Fragment>
    )
  }
}
export default ShopEdit
