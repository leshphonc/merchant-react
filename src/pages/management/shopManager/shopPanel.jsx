import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Picker, Toast,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

const seasons = [{ label: '能', value: '1' }, { label: '不能', value: '0' }]
@createForm()
@inject('shopManager')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // shopsValue: ['2015'],
      // hasError: false,
    }
  }

  componentDidMount() {
    const { shopManager, match, form } = this.props
    console.log(this.props)
    shopManager.fetchStaffType(match.params.id)
    shopManager.fetchRetailValues()
    shopManager.fetchBusinessList(match.params.id)
    if (!match.params.id) return
    shopManager.fetchStaffDetail(match.params.id, match.params.staffId).then(() => {
      const { staffDetail } = shopManager
      form.setFieldsValue({
        ...staffDetail,
        is_change: [staffDetail.is_change],
        business_id: [staffDetail.business_id],
        type: [staffDetail.type],
      })
    })
  }

  submit = () => {
    const {
      shopManager, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      console.log(value)
      const obj = {
        ...value,
        is_change: value.is_change[0],
        type: value.type[0],
      }
      console.log(value)
      console.log(obj)
      if (match.params.id) {
        console.log(match.params.id)
        shopManager
          .addRetail({ ...obj, store_id: match.params.id, staff_id: match.params.staffId })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        console.log(value.store_id[0])
        shopManager.modifyRetail({ ...obj, store_id: value.store_id[0] }).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  render() {
    const { match, form, shopManager } = this.props
    const { staffType, businessList, retailValues } = shopManager
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}店员`} goBack />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请填写员工姓名"
          >
            姓名
          </InputItem>
          <Picker
            {...getFieldProps('type', {
              rules: [{ required: true }],
            })}
            data={staffType}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">店员类型</List.Item>
          </Picker>
          {match.params.id ? (
            <InputItem
              {...getFieldProps('username', {
                rules: [{ required: true }],
              })}
              placeholder="请填写员工账号"
              disabled
            >
              账号
            </InputItem>
          ) : (
            <InputItem
              {...getFieldProps('username', {
                rules: [{ required: true }],
              })}
              placeholder="请填写员工账号"
            >
              账号
            </InputItem>
          )}
          <InputItem
            {...getFieldProps('password', {
              rules: [{ required: true }],
            })}
            placeholder="请填写密码"
            type="password"
          >
            密码
          </InputItem>
          <InputItem
            {...getFieldProps('tel', {
              rules: [{ required: true }],
            })}
            maxLength="11"
            placeholder="请填写员工手机号"
          >
            手机号
          </InputItem>
          {match.params.id ? (
            ''
          ) : (
            <Picker
              {...getFieldProps('store_id', {
                rules: [{ required: true }],
              })}
              data={retailValues}
              cols={1}
              extra="请选择"
            >
              <List.Item arrow="horizontal">选择店铺</List.Item>
            </Picker>
          )}
          <Picker
            {...getFieldProps('is_change', {
              rules: [{ required: true }],
            })}
            data={seasons}
            cols={1}
          >
            <List.Item arrow="horizontal">能否修改订单价格</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('business_id', {
              rules: [{ required: false }],
            })}
            data={businessList}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">所属LBS商家连锁机构</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('spread_rato', {
              rules: [{ required: false }],
            })}
            extra="%"
            labelNumber={7}
            placeholder="请填写分佣比例"
          >
            推广用户分佣比例
          </InputItem>
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={this.submit}
            >
              确定
            </Button>
          </WingBlank>
        </List>
      </React.Fragment>
    )
  }
}
export default RetailAdd
