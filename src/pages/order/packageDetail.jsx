import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List } from 'antd-mobile'
import moment from 'moment'

@inject('order')
@observer
class PackageDetail extends React.Component {
  state = {
    detail: {},
  }
  componentDidMount() {
    const { order, match } = this.props
    order.readPackageOrderDetail(match.params.id).then(res => {
      console.log(res)
      this.setState({
        detail: res,
      })
    })
  }

  render() {
    const { detail } = this.state
    return (
      <div>
        <NavBar title="套餐卡详情" goBack />
        <List renderHeader="订单信息">
          <List.Item extra={detail.order_no}>订单编号</List.Item>
          <List.Item extra={detail.nickname}>下单人</List.Item>
          <List.Item extra={detail.phone}>联系方式</List.Item>
          <List.Item
            extra={
              detail.create_time &&
              moment(detail.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            }
          >
            下单时间
          </List.Item>
          <List.Item extra={detail.unit_price && `¥ ${detail.unit_price}`}>
            单件价格
          </List.Item>
          <List.Item extra={detail.meal_num}>购买数量</List.Item>
          <List.Item extra={detail.pay_money && `¥ ${detail.pay_money}`}>
            支付金额
          </List.Item>
        </List>
        <List renderHeader="套餐图片">
          <img src={detail.pic} width="100%" alt="" />
        </List>
      </div>
    )
  }
}

export default PackageDetail
