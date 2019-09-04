import React from 'react'
import NavBar from '@/common/NavBar'
import {
  SearchBar, Picker, WingBlank, WhiteSpace, Card,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'
// import { toJS } from 'mobx'

@inject('order')
@observer
class GroupList extends React.Component {
  state = {
    orderName: '全部订单',
  }

  componentDidMount() {
    const { match, order } = this.props
    order.fetchGroupOrderList(match.params.groupId)
  }

  mapList = () => {
    const { order } = this.props
    const { groupOrderList } = order
    return groupOrderList.map((item, index) => (
      <React.Fragment key={index}>
        <Card>
          <Card.Header title={item.s_name}></Card.Header>
          <Card.Body>
            <div>订单号：{item.real_orderid}</div>
            <div>
              <span>订单数量：</span>
              <span>订单类型：</span>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    ))
    // return (
    //   <React.Fragment>
    //     <Card>
    //       <Card.Header title="1"></Card.Header>
    //     </Card>
    //   </React.Fragment>
    // )
  }

  render() {
    const { orderName } = this.state
    return (
      <React.Fragment>
        <NavBar title="团购订单" goBack />
        <SearchBar placeholder="客户姓名/联系电话" />
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

export default GroupList
