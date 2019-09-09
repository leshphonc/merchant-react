import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, Picker, WingBlank, Button, InputItem, Toast,
} from 'antd-mobile'
import { createForm } from 'rc-form'

@createForm()
@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { giftManagement, match, form } = this.props
    giftManagement.fetchExpressList(match.params.orderId)
    giftManagement.fetchGiftOrderDetail(match.params.orderId)
    giftManagement.fetchExpress(match.params.orderId).then(() => {
      const { express } = giftManagement
      form.setFieldsValue({
        express_id: express.express_id,
        express_number: [express.express_number],
      })
    })
  }

  submit = () => {
    const {
      giftManagement, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        express_id: value.express_id,
        express_number: value.express_number[0],
      }
      giftManagement.modifyExpress({ ...obj, order_id: match.params.orderId }).then(res => {
        if (res) {
          Toast.success('发货成功', 1, () => {
            giftManagement.resetAndFetchGiftOrderList()
            history.goBack()
          })
        }
      })
    })
  }

  render() {
    const { giftManagement, form } = this.props
    const { getFieldProps } = form
    const { expressList } = giftManagement
    return (
      <React.Fragment>
        <NavBar title="发货详情" goBack />
        <List renderHeader="快递信息">
          <Picker
            {...getFieldProps('express_number', {
              rules: [{ required: true }],
            })}
            data={expressList}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择快递</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('express_id', {
              rules: [{ required: true }],
            })}
            placeholder="请填写快递单号"
          >
            快递单号
          </InputItem>
        </List>
        <WingBlank style={{ padding: '10px 0' }}>
          <Button
            type="primary"
            style={{ color: '#333', fontWeight: 'bold' }}
            onClick={this.submit}
          >
            确定
          </Button>
        </WingBlank>
      </React.Fragment>
    )
  }
}
export default OressGoods
