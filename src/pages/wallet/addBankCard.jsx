import React from 'react'
import NavBar from '@/common/NavBar'
import { List, InputItem, Picker, Button, Toast } from 'antd-mobile'
import { CardType } from '@/config/constant'
import { createForm } from 'rc-form'
import Utils from '@/utils'

@createForm()
class AddBankCard extends React.Component {
  state = {
    _CardType: [],
    khh: '',
    cnapsbranchid: '',
  }

  componentDidMount() {
    const { form } = this.props
    const keys = Object.keys(CardType)
    const cardList = []
    keys.forEach(item => {
      cardList.push({
        value: item,
        label: CardType[item],
      })
    })
    this.setState({
      _CardType: cardList,
    })
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      form.setFieldsValue({
        ...cacheData,
      })
      this.setState({
        khh: cacheData.acctopenbranchnameLabel,
        cnapsbranchid: cacheData.acctopenbranchname,
      })
      Utils.clearCacheData()
    }
  }

  goBankAps = () => {
    const { form, history } = this.props
    const formData = form.getFieldsValue()
    Utils.cacheData(formData)
    history.push('/wallet/searchBankAps')
  }

  submit = () => {
    const { history, form } = this.props
    const { cnapsbranchid, khh } = this.state
    form.validateFields(error => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const formData = form.getFieldsValue()
      formData.cnapsbranchid = cnapsbranchid
      formData.acctopenbranchname = khh
      Utils.cacheData(formData)
      history.push('/wallet/verificationCard')
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { _CardType, khh } = this.state
    return (
      <>
        <NavBar title="添加银行卡" goBack />
        <List renderHeader="请绑定持卡人本人的银行卡">
          <InputItem
            {...getFieldProps('membername', {
              rules: [{ required: true }],
            })}
            clear
          >
            持卡人
          </InputItem>
          <Picker
            {...getFieldProps('memberglobaltype', {
              rules: [{ required: true }],
              initialValue: ['1'],
            })}
            data={_CardType}
            cols={1}
          >
            <List.Item arrow="horizontal">证件类型</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('memberglobalid', {
              rules: [{ required: true }],
            })}
            clear
          >
            证件号
          </InputItem>
          <Picker
            {...getFieldProps('banktype', {
              rules: [{ required: true }],
            })}
            data={[
              {
                label: '平安银行',
                value: '1',
              },
              {
                label: '其他银行',
                value: '2',
              },
            ]}
            cols={1}
          >
            <List.Item arrow="horizontal">选择银行</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('memberacctno', {
              rules: [{ required: true }],
            })}
            maxLength="23"
            type="bankCard"
            clear
          >
            卡号
          </InputItem>
          <List.Item
            arrow="horizontal"
            extra={!khh ? '查询选择' : khh}
            onClick={() => this.goBankAps()}
          >
            开户行
          </List.Item>
          <InputItem
            {...getFieldProps('mobile', {
              rules: [{ required: true }],
            })}
            type="phone"
            clear
          >
            手机号
          </InputItem>
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
