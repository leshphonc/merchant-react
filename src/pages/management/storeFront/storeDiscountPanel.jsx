import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, InputItem, WhiteSpace, Picker, Button, Toast,
} from 'antd-mobile'

const TypeOptions = [{ label: '新单', value: '0' }, { label: '满减', value: '1' }]
const StatusOptions = [{ label: '停用', value: '0' }, { label: '启用', value: '1' }]

@inject('storeFront')
@observer
class StoreDiscountPanel extends React.Component {
  state = {
    condition: '',
    amount: '',
    typeValue: '0',
    statusValue: '0',
  }

  componentDidMount() {
    const { storeFront, match } = this.props
    if (!match.params.cid) return
    storeFront.fetchStoreDiscountDetail(match.params.id, match.params.cid).then(() => {
      const { storeDiscountDetail } = storeFront
      this.setState({
        condition: storeDiscountDetail.full_money,
        amount: storeDiscountDetail.reduce_money,
        typeValue: storeDiscountDetail.type,
        statusValue: storeDiscountDetail.status,
      })
    })
  }

  submit = () => {
    const { storeFront, match, history } = this.props
    const {
      condition, amount, typeValue, statusValue,
    } = this.state
    if (!condition && !amount) return
    if (match.params.cid) {
      storeFront
        .modifyStoreDiscount({
          id: match.params.cid,
          store_id: match.params.id,
          type: typeValue,
          full_money: condition,
          reduce_money: amount,
          status: statusValue,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    } else {
      storeFront
        .addStoreDiscount({
          store_id: match.params.id,
          type: typeValue,
          full_money: condition,
          reduce_money: amount,
          status: statusValue,
        })
        .then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
    }
  }

  render() {
    const { match } = this.props
    const {
      condition, amount, typeValue, statusValue,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}店铺优惠`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="请输入满足条件的金额"
            value={condition}
            onChange={val => this.setState({
              condition: val,
            })
            }
          >
            优惠条件
          </InputItem>
          <InputItem
            placeholder="请输入可优惠的金额"
            value={amount}
            onChange={val => this.setState({
              amount: val,
            })
            }
          >
            优惠的金额
          </InputItem>
          <Picker
            data={TypeOptions}
            cols={1}
            value={[typeValue]}
            onChange={val => this.setState({
              typeValue: val[0],
            })
            }
          >
            <List.Item arrow="horizontal">优惠类型</List.Item>
          </Picker>
          <Picker
            data={StatusOptions}
            cols={1}
            value={[statusValue]}
            onChange={val => this.setState({
              statusValue: val[0],
            })
            }
          >
            <List.Item arrow="horizontal">使用状态</List.Item>
          </Picker>
        </List>
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定
        </Button>
      </React.Fragment>
    )
  }
}

export default StoreDiscountPanel
