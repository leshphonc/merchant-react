import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List } from 'antd-mobile'
import moment from 'moment'

@inject('order')
@observer
class ServiceDetail extends React.Component {
  state = {
    detail: {},
  }
  componentDidMount() {
    const { order, match } = this.props
    order.readServiceOrderDetail(match.params.id).then(res => {
      this.setState({
        detail: res,
      })
    })
  }

  statusLabel = (s_status, status) => {
    if (s_status === '1') {
      return '已服务'
    } else if (s_status === '2') {
      if (status === '2') {
        return '已取消'
      } else {
        return '待服务'
      }
    } else if (s_status === '3') {
      return '服务中'
    } else if (s_status === '4') {
      return '服务中'
    }
  }

  render() {
    const { detail } = this.state
    return (
      <div>
        <NavBar title="服务项目详情" goBack />
        <List renderHeader="订单信息">
          <List.Item extra={detail.order_no}>订单编号</List.Item>
          <List.Item
            extra={this.statusLabel(detail.service_status, detail.status)}
          >
            订单状态
          </List.Item>
          <List.Item extra={detail.name}>服务项目名称</List.Item>
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
          <List.Item extra={detail.goods_num}>购买数量</List.Item>

          <List.Item extra={detail.pay_price && `¥ ${detail.pay_price}`}>
            支付金额
          </List.Item>
        </List>
        <List renderHeader="套餐图片">
          <img src={detail.goods_img} width="100%" alt="" />
        </List>
      </div>
    )
  }
}

export default ServiceDetail
