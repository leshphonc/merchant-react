import React from 'react'
import NavBar from '@/common/NavBar'
import {
  SearchBar, Picker, WingBlank, WhiteSpace, Card,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'

@inject('order')
@observer
class Retail extends React.Component {
  state = {
    orderName: '全部订单',
  }

  componentDidMount() {
    const { order } = this.props
    order.fetchShopOrderList()
  }

  mapList = () => (
    <React.Fragment>
      <Card>
        <Card.Header title="1"></Card.Header>
      </Card>
    </React.Fragment>
  )

  render() {
    const { orderName } = this.state
    return (
      <React.Fragment>
        <NavBar title="零售订单" goBack />
        <SearchBar placeholder="订单名称" />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={[]}
              cols={1}
              value={[]}
              onChange={val => this.findCategoryLabelAndFetch(val)}
            >
              <div>
                <span>{orderName}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default Retail
