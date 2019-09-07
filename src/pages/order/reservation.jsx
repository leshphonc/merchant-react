import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import {
  SearchBar,
  Picker,
  WingBlank,
  WhiteSpace,
  Card,
  Flex,
  PullToRefresh,
  DatePicker,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'
import moment from 'moment'

const SearchType = [
  {
    label: '订单编号',
    value: 'order_id',
  },
  {
    label: '订单流水号',
    value: 'orderid',
  },
  {
    label: '第三方支付流水号',
    value: 'third_id',
  },
  {
    label: '客户名称',
    value: 'name',
  },
  {
    label: '客户电话',
    value: 'phone',
  },
]

const PayType = [
  {
    label: '全部方式',
    value: '',
  },
  {
    label: '微信支付',
    value: 'weixin',
  },
  {
    label: '余额支付',
    value: 'balance',
  },
]

@inject('order')
@observer
class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: '',
      startTimeLabel: '开始时间',
      endTime: '',
      endTimeLabel: '结束时间',
      payType: '全部方式',
      payTypeValue: '',
      refreshing: false,
      searchtypeLabel: '订单编号',
      searchtype: 'order_id',
      keyword: '',
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { order } = this.props
    const { reservationOrderList } = order
    const {
      height, payTypeValue, searchtype, startTime, endTime, keyword,
    } = this.state
    if (!reservationOrderList.length) order.fetchReservationOrderList(payTypeValue, searchtype, startTime, endTime, keyword)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { order, history } = this.props
    return order.reservationOrderList.map(item => (
      <React.Fragment key={item.order_id}>
        <Card onClick={() => history.push(`/order/reservation/detail/${item.order_id}`)}>
          <Card.Header
            style={{ fontSize: 13, color: '#999' }}
            title={`预定时间：${item.appoint_date}`}
            extra={item.appoint_type === '1' ? '上门服务' : '到店服务'}
          />
          <Card.Body style={{ color: '#666', fontSize: 12 }}>
            <Flex>
              <div style={{ minWidth: 75 }}>预定人:</div>
              <div>
                {item.nickname} {item.phone}
              </div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>预定项目:</div>
              <div>{item.appoint_name}</div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>服务地址:</div>
              <div>{item.store_adress}</div>
            </Flex>
            <WhiteSpace />
            <Flex align="start">
              <div style={{ minWidth: 75 }}>订单总价:</div>
              <div>
                {item.product_id > 0 ? item.product_price : item.appoint_price} (
                {item.service_status > 0 ? '已支付' : '未支付'})
              </div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>下单时间:</div>
              <div>{item.order_time}</div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>服务状态:</div>
              <div>{this.serviceStatus(item)}</div>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  serviceStatus = item => {
    if (item.paid === '0') {
      if (item.service_status === '0') {
        if (item.supply_status === '1') return '未服务'
        if (item.supply_status === '2') return '服务中'
        if (item.supply_status === '3') return '已服务'
      } else if (item.service_status === '1') {
        return '已服务'
      } else if (item.service_status === '2') {
        return '已评价'
      }
    } else if (item.paid === '1') {
      if (item.service_status === '0') {
        if (item.supply_status === '1') return '未服务'
        if (item.supply_status === '2') return '服务中'
        if (item.supply_status === '3') return '已服务'
      } else if (item.service_status === '1') {
        return '已服务'
      } else if (item.service_status === '2') {
        return '已评价'
      } else if (item.service_status === '3') {
        return '已付款，已服务'
      }
    } else if (item.paid === '2') {
      return '已退款'
    } else if (item.paid === '3') {
      return '用户已取消'
    } else {
      return '订单异常'
    }
  }

  findSearchTypeLabelAndFetch = value => {
    const { order } = this.props
    const {
      payTypeValue, startTime, endTime, keyword,
    } = this.state
    const result = SearchType.find(item => item.value === value[0])
    this.setState({
      searchtypeLabel: result.label,
      searchtype: result.value,
    })
    order.resetAndFetchReservationOrderList(payTypeValue, result.value, startTime, endTime, keyword)
  }

  findPayLabelAndFetch = value => {
    const { order } = this.props
    const {
      startTime, endTime, searchtype, keyword,
    } = this.state
    const result = PayType.find(item => item.value === value[0])
    this.setState({
      payType: result.label,
      payTypeValue: result.value,
    })
    order.resetAndFetchReservationOrderList(result.value, searchtype, startTime, endTime, keyword)
  }

  changeStartTime = val => {
    const { order } = this.props
    const {
      payTypeValue, searchtype, endTime, keyword,
    } = this.state
    this.setState({
      startTime: moment(val).format('YYYY-MM-DD'),
      startTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order.resetAndFetchReservationOrderList(
      payTypeValue,
      searchtype,
      moment(val).format('YYYY-MM-DD'),
      endTime,
      keyword,
    )
  }

  changeEndTime = val => {
    const { order } = this.props
    const {
      payTypeValue, searchtype, startTime, keyword,
    } = this.state
    this.setState({
      endTime: moment(val).format('YYYY-MM-DD'),
      endTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order.resetAndFetchReservationOrderList(
      payTypeValue,
      searchtype,
      startTime,
      moment(val).format('YYYY-MM-DD'),
      keyword,
    )
  }

  loadMore = async () => {
    const { order } = this.props
    const {
      payTypeValue, searchtype, startTime, endTime, keyword,
    } = this.state
    this.setState({ refreshing: true })
    await order.fetchReservationOrderList(payTypeValue, searchtype, startTime, endTime, keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { order } = this.props
    const {
      startTime,
      startTimeLabel,
      endTime,
      endTimeLabel,
      payType,
      refreshing,
      height,
      payTypeValue,
      searchtype,
      searchtypeLabel,
      keyword,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="预定订单" goBack />
        <SearchBar
          placeholder={searchtypeLabel}
          value={keyword}
          onChange={val => this.setState({ keyword: val })}
          onSubmit={val => order.resetAndFetchReservationOrderList(
            payTypeValue,
            searchtype,
            startTime,
            endTime,
            val,
          )
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={SearchType}
              cols={1}
              value={[searchtype]}
              onChange={val => this.findSearchTypeLabelAndFetch(val)}
            >
              <div>
                <span>搜索条件：{searchtypeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={PayType}
              cols={1}
              value={[payTypeValue]}
              onChange={val => this.findPayLabelAndFetch(val)}
            >
              <div>
                <span>{payType}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker mode="date" onChange={this.changeStartTime}>
              <div>
                <span>{startTimeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker mode="date" onChange={this.changeEndTime}>
              <div>
                <span>{endTimeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
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

export default Reservation
