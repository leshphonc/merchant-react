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

@inject('order')
@observer
class Retail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: '',
      startTimeLabel: '开始时间',
      endTime: '',
      endTimeLabel: '结束时间',
      orderStatus: '全部',
      orderStatusValue: '-1',
      payTypeValue: '',
      refreshing: false,
      searchtypeLabel: '商品名称',
      searchtype: 'oid',
      keyword: '',
      height: document.documentElement.clientHeight,
      storeId: '',
      storeLabel: '全部店铺',
      staffId: '',
      staffLabel: '全部店员',
      goodsName: '',
      stime: '',
      etime: '',
      flag: '3',
      storeList: [],
      staffList: [],
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { order } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    const { height, storeId, staffId, goodsName, stime, etime, flag } = this.state
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
        this.setState({
          staffList,
        })
      }
    })
    order.resetAndFetchArrivalList(storeId, staffId, goodsName, stime, etime, mer_id, flag)
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
        <Card onClick={() => history.push(`/order/retail/detail/${item.order_id}`)}>
          <Card.Header
            style={{ fontSize: 13, color: '#999' }}
            title={`${item[0].order_no}`}
            extra={<div dangerouslySetInnerHTML={{ __html: item.pay_status }} />}
          />
          <Card.Body style={{ color: '#666', fontSize: 12 }}>
            <div>订单内商品：</div>
            {item.map((item2, index2) => (
              <React.Fragment key={index2}>
                <WhiteSpace />
                <WhiteSpace />
                <Flex>
                  <Flex.Item style={{ flex: 2 }}>{item2.name}</Flex.Item>
                  <Flex.Item>×{item2.goods_num}</Flex.Item>
                  <Flex.Item style={{ color: '#e93e14' }}>¥{item2.price}</Flex.Item>
                </Flex>
              </React.Fragment>
            ))}
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
    if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm === '0') {
      return '已发货'
    }
    if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm > '0') {
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
    const { storeId, staffId, goodsName, etime, flag } = this.state
    this.setState({
      stime: moment(val).format(),
      startTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    order.resetAndFetchArrivalList(
      storeId,
      staffId,
      goodsName,
      moment(val).format(),
      etime,
      mer_id,
      flag,
    )
  }

  changeEndTime = val => {
    const { order } = this.props
    const { storeId, staffId, goodsName, stime, flag } = this.state
    this.setState({
      etime: moment(val).format(),
      endTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    order.resetAndFetchArrivalList(
      storeId,
      staffId,
      goodsName,
      stime,
      moment(val).format(),
      mer_id,
      flag,
    )
  }

  findStoreAndFetch = value => {
    const { order } = this.props
    const { storeList, staffId, goodsName, stime, etime, flag } = this.state
    const result = storeList.find(item => item.value === value[0])
    this.setState({
      storeId: result.value,
      storeLabel: result.label,
    })
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    order.resetAndFetchArrivalList(value[0], staffId, goodsName, stime, etime, mer_id, flag)
  }

  findStaffAndFetch = value => {
    const { order } = this.props
    const { staffList, storeId, goodsName, stime, etime, flag } = this.state
    const result = staffList.find(item => item.value === value[0])
    this.setState({
      staffId: result.value,
      staffLabel: result.label,
    })
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    order.resetAndFetchArrivalList(storeId, value[0], goodsName, stime, etime, mer_id, flag)
  }

  loadMore = async () => {
    const { order } = this.props
    const { storeId, staffId, goodsName, stime, etime, flag } = this.state
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    this.setState({ refreshing: true })
    await order.fetchArrivalList(storeId, staffId, goodsName, stime, etime, mer_id, flag, true)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { order } = this.props
    const {
      startTimeLabel,
      endTimeLabel,
      storeId,
      storeLabel,
      staffId,
      staffLabel,
      refreshing,
      height,
      searchtypeLabel,
      goodsName,
      storeList,
      staffList,
      stime,
      etime,
      flag,
    } = this.state
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    return (
      <React.Fragment>
        <NavBar title="到店消费订单" goBack />
        <SearchBar
          placeholder={searchtypeLabel}
          value={goodsName}
          onChange={val => this.setState({ goodsName: val })}
          onSubmit={val => order.resetAndFetchArrivalList(storeId, staffId, val, stime, etime, mer_id, flag)
          }
        />
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
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={staffList}
              cols={1}
              value={[staffId]}
              onChange={val => this.findStaffAndFetch(val)}
            >
              <div>
                <span>{staffLabel}</span>
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

export default Retail
