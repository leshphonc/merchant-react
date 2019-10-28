import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import {
  Picker,
  WingBlank,
  WhiteSpace,
  Card,
  PullToRefresh,
  DatePicker,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'
import moment from 'moment'

@inject('order')
@observer
class Retail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      storeId: '',
      storeLabel: '全部店铺',
      stime: '',
      startTimeLabel: '开始时间',
      etime: '',
      endTimeLabel: '结束时间',
      storeList: [],
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { order } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    const { height, storeId, stime, etime } = this.state
    order.fetchStoreList(mer_id).then(() => {
      const { needResStore } = order
      const keys = Object.keys(needResStore)
      const storeList = []
      keys.forEach(item => {
        storeList.push({
          value: item,
          label: needResStore[item][0].name,
        })
      })
      this.setState({
        storeList,
      })
      if (keys.length) {
        const staffList = []
        needResStore[keys[0]].forEach(item => {
          staffList.push({
            value: item.staff_id,
            label: item.staff_name,
          })
        })
      }
    })
    order.resetAndFetchArrivalList(storeId, stime, etime)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { order, history } = this.props
    return order.ArrivalList.map((item, index) => (
      <React.Fragment key={index}>
        <Card
          onClick={() => history.push(`/order/arrival/detail/${item.order_id}`)}
        >
          <Card.Header
            thumb={item.image}
            style={{ fontSize: 13, color: '#999' }}
            title={item.name}
          />
          <Card.Body style={{ color: '#666', fontSize: 12 }}>
            <div style={{ marginBottom: 5 }}>订单号：{item.order_id}</div>
            <div style={{ marginBottom: 5 }}>总价：{item.total_price}</div>
            <div style={{ marginBottom: 5 }}>实付：{item.balance_pay}</div>
            <div>
              买单时间：
              {moment(item.pay_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </Card.Body>
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  curStatus = item => {
    if (item.status === '0') {
      return '可接单'
    }
    if (item.status === '1') {
      return '可操作'
    }
    if (
      item.is_pick_in_store === '3' &&
      item.status === '2' &&
      item.user_confirm === '0'
    ) {
      return '已发货'
    }
    if (
      item.is_pick_in_store === '3' &&
      item.status === '2' &&
      item.user_confirm > '0'
    ) {
      return '已确认收货'
    }
    if (item.status === '2') {
      return '已消费'
    }
    if (item.status === '3') {
      return '已评价'
    }
    if (item.status === '4') {
      if (item.cancel_type === '7') {
        return '超时退款'
      }
      return '已退款'
    }
    if (item.status === '5') {
      if (item.cancel_type === '7') {
        return '超时取消'
      }
      return '已取消'
    }
    if (item.status === '7' && item.paid === '1') {
      return '发货到自提'
    }
    if (item.status === '8') {
      return '已发货到自提'
    }
    if (item.status === '9') {
      return '自提点接货'
    }
    if (item.status === '10') {
      return '配送中'
    }
    if (item.order_from === '6') {
      return '已取消'
    }
    return '未支付'
  }

  changeStartTime = val => {
    const { order } = this.props
    const { storeId, etime } = this.state
    this.setState({
      stime: moment(val).format('YYYY-MM-DD'),
      startTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order.resetAndFetchArrivalList(
      storeId,
      moment(val).format('YYYY-MM-DD'),
      etime,
    )
  }

  changeEndTime = val => {
    const { order } = this.props
    const { storeId, stime } = this.state
    this.setState({
      etime: moment(val).format('YYYY-MM-DD'),
      endTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order.resetAndFetchArrivalList(
      storeId,
      stime,
      moment(val).format('YYYY-MM-DD'),
    )
  }

  findStoreAndFetch = value => {
    const { order } = this.props
    const { storeList, stime, etime } = this.state
    const result = storeList.find(item => item.value === value[0])
    this.setState({
      storeId: result.value,
      storeLabel: result.label,
    })
    order.resetAndFetchArrivalList(value[0], stime, etime)
  }

  findStaffAndFetch = () => {
    const { order } = this.props
    const { storeId, stime, etime } = this.state
    order.resetAndFetchArrivalList(storeId, stime, etime)
  }

  loadMore = async () => {
    const { order } = this.props
    const { storeId, stime, etime } = this.state
    this.setState({ refreshing: true })
    await order.fetchArrivalList(storeId, stime, etime, true)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const {
      startTimeLabel,
      endTimeLabel,
      storeId,
      storeLabel,
      refreshing,
      height,
      storeList,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="到店消费订单" goBack />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={storeList}
              cols={1}
              value={[storeId]}
              onChange={val => this.findStoreAndFetch(val)}
            >
              <div>
                <span>{storeLabel}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          {/* <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={staffList}
              cols={1}
              value={[staffId]}
              onChange={val => this.findStaffAndFetch(val)}
            >
              <div>
                <span>{staffLabel}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox> */}
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker mode="date" onChange={this.changeStartTime}>
              <div>
                <span>{startTimeLabel}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker mode="date" onChange={this.changeEndTime}>
              <div>
                <span>{endTimeLabel}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
        <WingBlank size="sm">
          <PullToRefresh
            ref={this.refresh}
            refreshing={refreshing}
            style={{
              height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            onRefresh={this.loadMore}
          >
            {this.mapList()}
          </PullToRefresh>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Retail
