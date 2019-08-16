import React from 'react'
import NavBar from '@/common/NavBar'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Picker,
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
class ShopAdd extends React.Component {
  state = {
    shopsValue: '',
  }

  render() {
    const { shopsValue } = this.state
    return (
      <React.Fragment>
        <NavBar title="添加店员" goBack />
        <form>
          <List>
            <InputItem placeholder="请填写员工手机号">员工手机号</InputItem>
            <InputItem placeholder="请填写员工姓名">员工姓名</InputItem>
            <InputItem placeholder="请填写员工账号">员工账号</InputItem>
            <InputItem placeholder="请填写初始密码">初始密码</InputItem>
            <Picker
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
                添加
              </Button>
            </WingBlank>
          </List>
        </form>
      </React.Fragment>
    )
  }
}
export default ShopAdd
