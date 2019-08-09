import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'

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
          <List.Item arrow="horizontal" extra={item.count} onClick={() => {}}>
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
        <NavBar title="订单列表" goBack />
        <WhiteSpace />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default Order
