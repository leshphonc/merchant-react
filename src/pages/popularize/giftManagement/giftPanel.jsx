import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, InputItem, WingBlank, Button, Toast,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

@createForm()
@inject('giftManagement')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { giftManagement, match, form } = this.props
    console.log(this.props)
    if (!match.params.giftId) return
    giftManagement.fetchGetGiftDetail(match.params.giftId).then(() => {
      const { getGiftDetail } = giftManagement
      form.setFieldsValue({
        ...getGiftDetail,
      })
    })
  }

  submit = () => {
    const {
      giftManagement, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      // if (error) {
      //   Toast.info('请输入完整信息')
      //   return
      // }
      const obj = {
        ...value,
      }
      console.log(value)
      console.log(obj)
      if (match.params.giftId) {
        console.log(match.params.giftId)
        giftManagement
          .modifyGift({ ...obj, id: match.params.giftId })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        giftManagement.addGift({ ...obj }).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}礼品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('gift_name', {
              rules: [{ required: true }],
            })}
            placeholder="请填写礼品名称"
          >
           礼品名称
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
