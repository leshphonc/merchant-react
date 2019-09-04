import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, TextareaItem, Toast,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
// import ModifyPicture from './modify/picture'
import { createForm } from 'rc-form'
import { SizeBox } from './styled'

@createForm()
@inject('commodity')
@observer
class GroupMealAdd extends React.Component {
  state = {
    title: '',
    description: '',
  }

  submit = () => {
    const { commodity, form, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      console.log(value)
      commodity
        .addGroupPackage({ title: value.title, description: value.description })
        .then(res => {
          if (res) Toast.success('添加成功', 1, () => history.goBack())
        })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title="添加套餐设置" goBack />
        <form>
          <List>
            <InputItem
              placeholder="请填写商品名称"
              {...getFieldProps('title', {
                rules: [{ required: true }],
              })}
            >
              商品标题
            </InputItem>
            <SizeBox>
              <List>
                <TextareaItem
                  title="商品简介"
                  placeholder="请填写商品简介"
                  {...getFieldProps('description', {
                    rules: [{ required: false }],
                  })}
                  rows={5}
                  count={100}
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
