import React from 'react'
import NavBar from '@/common/NavBar'
import { List } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@inject('order')
@observer
class ArrivalDetail extends React.Component {
  state = {
    data: {
      store: {},
      order: {},
    },
  }
  componentDidMount() {
    const { order, match } = this.props
    order.fetchArrivalOrderDetail(match.params.id).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <>
        <NavBar title="到店消费详情" goBack />
        <List>
          <List.Item thumb={data.store.image}>{data.store.name}</List.Item>
          <List.Item extra={'应收总额 ¥' + data.order.price}>
            订单¥{data.order.price} 优惠-¥{data.order.discount_price}
          </List.Item>
        </List>
        <List renderHeader="订单信息">
          <List.Item extra={data.order.order_id}>订单编号</List.Item>
        </List>
        <List renderHeader="支付信息">
          <List.Item
            extra={moment(data.order.pay_time * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          >
            支付时间
          </List.Item>
          <List.Item extra={data.order.pay_type_str}>支付方式</List.Item>
          <List.Item extra={'¥' + data.order.price}>应收总额</List.Item>

          {data.order.no_discount_money > 0 ? (
            <List.Item extra={'¥' + data.order.no_discount_money}>
              不可优惠金额
              <List.Item.Brief>不可优惠金额不参与优惠</List.Item.Brief>
            </List.Item>
          ) : null}

          {data.order.card_price > 0 ? (
            <List.Item extra={'-¥' + data.order.card_price}>
              商家优惠券
            </List.Item>
          ) : null}
          {data.order.coupon_price > 0 ? (
            <List.Item extra={'-¥' + data.order.coupon_price}>
              系统优惠券
            </List.Item>
          ) : null}
          {data.order.score_deducte > 0 ? (
            <List.Item extra={'-¥' + data.order.score_deducte}>
              积分抵扣
            </List.Item>
          ) : null}
          {data.order.card_give_money > 0 ? (
            <List.Item extra={'-¥' + data.order.card_give_money}>
              会员卡赠送余额支付
            </List.Item>
          ) : null}
          {data.order.merchant_balance > 0 ? (
            <List.Item extra={'-¥' + data.order.merchant_balance}>
              商家余额支付
            </List.Item>
          ) : null}
          {data.order.balance_pay > 0 ? (
            <List.Item extra={'-¥' + data.order.balance_pay}>
              系统余额支付
            </List.Item>
          ) : null}
          {data.order.payment_money > 0 ? (
            <List.Item extra={'-¥' + data.order.payment_money}>
              {data.order.pay_type_str}
            </List.Item>
          ) : null}
        </List>
      </>
    )
  }
}

export default ArrivalDetail
