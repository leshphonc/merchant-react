import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List,
  WhiteSpace,
  InputItem,
  TextareaItem,
  DatePicker,
  Button,
  WingBlank,
} from 'antd-mobile'
import { createForm } from 'rc-form'

@createForm()
class SmartScreenSloganCRU extends React.Component {
  submit = () => {
    const { form } = this.props
    form.validateFields((error, value) => {
      if (error) {
        console.log(error)
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <>
        <NavBar title="编辑见面语" goBack></NavBar>
        <WhiteSpace></WhiteSpace>
        <List renderFooter="已播报4次">
          <InputItem placeholder="请输入见面语名称">见面语名称</InputItem>
          <TextareaItem
            title="见面语内容"
            rows={4}
            count={200}
            placeholder="请输入见面语播报内容"
          ></TextareaItem>
          <DatePicker
            {...getFieldProps('start_time', {
              rules: [{ required: true }],
            })}
          >
            <List.Item arrow="horizontal">播报开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
            })}
          >
            <List.Item arrow="horizontal">播报结束时间</List.Item>
          </DatePicker>
          <InputItem placeholder="此条语音总播报次数">播报次数</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={this.submit}>
            确定
          </Button>
        </WingBlank>
      </>
    )
  }
}

export default SmartScreenSloganCRU
