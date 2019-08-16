import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, TextareaItem,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
// import ModifyPicture from './modify/picture'
import { SizeBox } from './styled'

@inject('commodity')
@observer
class GroupMealAdd extends React.Component {
  state = {
    title: '',
    description: '',
  }

  submit = () => {
    const { title, description } = this.state
    const { commodity } = this.props
    console.log(title)
    console.log(description)
    commodity.fetchGroupMealAdd(title, description)
    this.setState({ title: '', description: '' })
  }

  render() {
    const { title, description } = this.state
    return (
      <React.Fragment>
        <NavBar title="添加套餐设置" goBack />
        <form>
          <List>
            <InputItem
              placeholder="请填写商品名称"
              value={title}
              onChange={e => {
                this.setState({
                  title: e,
                })
              }}
            >
              商品标题
            </InputItem>
            <SizeBox>
              <List>
                <TextareaItem
                  title="商品简介"
                  placeholder="请填写商品简介"
                  rows={5}
                  count={100}
                  value={description}
                  onChange={e => {
                    this.setState({
                      description: e,
                    })
                  }}
                />
              </List>
            </SizeBox>
            <WingBlank style={{ padding: '10px 0' }}>
              <Button
                type="primary"
                style={{ color: '#333', fontWeight: 'bold' }}
                onClick={this.submit}
              >
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
