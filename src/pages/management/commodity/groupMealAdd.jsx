import React from 'react'
import NavBar from '@/common/NavBar'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, TextareaItem,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
// import ModifyPicture from './modify/picture'
import { SizeBox } from './styled'

class GroupMealAdd extends React.Component {
  state = {
    // selectValue: ['2013'],
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="添加套餐设置" goBack />
        <form>
          <List>
            <InputItem placeholder="请填写商品名称">商品标题</InputItem>
            <SizeBox>
              <List>
                <TextareaItem title="商品简介" placeholder="请填写商品简介" rows={5} count={100} />
              </List>
            </SizeBox>
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
export default GroupMealAdd
