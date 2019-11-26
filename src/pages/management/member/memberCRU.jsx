import React from 'react'
import { observer, inject } from 'mobx-react'
import { List, InputItem, Picker, Toast } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import { createForm } from 'rc-form'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(
  window.navigator.userAgent,
)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  }
}

@createForm()
@inject('member')
@observer
class MemberCRU extends React.Component {
  _submit = () => {
    const { form, member, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      console.log(value)
      value.status = value.status[0]
      member.createMemberCard(value).then(() => {
        Toast.success('操作成功', 1, () => {
          history.goBack()
        })
      })
    })
  }
  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    const type = match.params.str
    return (
      <div>
        <NavBar
          title={`${type}会员`}
          goBack
          right={<div onClick={this._submit}>保存</div>}
        />
        <List>
          <InputItem
            {...getFieldProps('physical_id', {
              rules: [{ required: true }],
            })}
            placeholder="请填写实体卡号"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            实体卡号
          </InputItem>
          <InputItem
            {...getFieldProps('card_money_give', {
              rules: [{ required: true }],
              initialValue: '0',
            })}
            type="momey"
            placeholder="请填写余额初始值"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            余额初始值
          </InputItem>
          <InputItem
            {...getFieldProps('card_score', {
              rules: [{ required: true }],
              initialValue: '0',
            })}
            type="momey"
            placeholder="请填写金币初始值"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            金币初始值
          </InputItem>
          <InputItem
            {...getFieldProps('truename', {
              rules: [{ required: true }],
            })}
            placeholder="请填写会员姓名"
            clear
          >
            会员姓名
          </InputItem>
          <InputItem
            {...getFieldProps('Id_card', {
              rules: [{ required: true }],
            })}
            type="number"
            placeholder="请填写会员身份证"
            clear
          >
            会员身份证
          </InputItem>
          <Picker
            {...getFieldProps('status', {
              rules: [{ required: true }],
              initialValue: ['1'],
            })}
            data={[
              {
                label: '正常',
                value: '1',
              },
              {
                label: '禁止',
                value: '0',
              },
            ]}
            cols={1}
            extra="请选择状态"
          >
            <List.Item arrow="horizontal">状态</List.Item>
          </Picker>
        </List>
      </div>
    )
  }
}

export default MemberCRU
