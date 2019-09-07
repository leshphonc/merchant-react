import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Toast } from 'antd-mobile'

@withRouter
@inject('order')
@observer
class Order extends React.Component {
  componentDidMount() {
    const { order } = this.props
    order.fetchOrderList()
  }

  mapList = () => {
    const { order } = this.props
    const { orderList } = order
    return orderList.map(item => (
      <React.Fragment key={item.name}>
        <List>
          <List.Item
            arrow="horizontal"
            extra={item.count}
            onClick={() => {
              if (item.name === '零售订单') {
                const { history } = this.props
                history.push('/order/retail')
                return false
              }
              if (item.name === '预定订单') {
                const { history } = this.props
                history.push('/order/reservation')
                return false
              }
              Toast.info('暂无权限，请联系管理员')
            }}
          >
            {item.name}
          </List.Item>
        </List>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="订单列表" />
        <WhiteSpace />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default Order
