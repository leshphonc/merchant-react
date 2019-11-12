import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import {
  WingBlank,
  WhiteSpace,
  PullToRefresh,
  Picker,
  Card,
  Flex,
  DatePicker,
  SearchBar,
} from 'antd-mobile'
import { FilterBox } from '@/styled'
import moment from 'moment'

const SearchType = [
  {
    label: '订单号',
    value: 'oid',
  },
  {
    label: '用户电话',
    value: 'dh',
  },
  {
    label: '用户姓名',
    value: 'xm',
  },
]

@inject('order')
@observer
class Package extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: '',
      startTimeLabel: '开始时间',
      endTime: '',
      endTimeLabel: '结束时间',
      keyword: '',
      searchtype: 'oid',
      searchtypeLabel: '订单号',
      refreshing: false,
      list: [],
      page: 1,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { order } = this.props
    const { height } = this.state
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
    order.getPackageOrderList().then(res => {
      this.setState({
        list: res.list,
      })
    })
  }

  mapList = () => {
    const { history } = this.props
    const { list } = this.state
    return list.map(item => {
      return (
        <React.Fragment key={item.id}>
          <Card
            onClick={() => history.push(`/order/package/detail/${item.id}`)}
          >
            <Card.Header
              thumb={item.pic}
              title={item.meal_name}
              extra={`${item.day_num}天有效期`}
            />
            <Card.Body>
              <div className="font-label">
                订单编号：<span className="font-value">{item.order_no}</span>
              </div>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <div className="font-label">
                    下单人：
                    <span className="font-value">{item.nickname}</span>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className="font-label">
                    联系方式：
                    <span className="font-value">{item.phone}</span>
                  </div>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <div className="font-label">
                    总价：<span className="font-value">{item.old_price}</span>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className="font-label">
                    购买数量：
                    <span className="font-value">{item.meal_num}</span>
                  </div>
                </Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
          <WhiteSpace />
        </React.Fragment>
      )
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

  findSearchTypeLabelAndFetch = value => {
    const { order } = this.props
    const { startTime, endTime, keyword } = this.state
    const result = SearchType.find(item => item.value === value[0])
    this.setState({
      searchtypeLabel: result.label,
      searchtype: result.value,
    })
    order
      .getPackageOrderList({
        searchtype: result.value,
        stime: startTime,
        etime: endTime,
        keyword,
      })
      .then(res => {
        this.setState({
          list: res.list,
        })
      })
  }

  changeStartTime = val => {
    const { order } = this.props
    const { searchtype, endTime, keyword } = this.state
    this.setState({
      startTime: moment(val).format('YYYY-MM-DD'),
      startTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order
      .getPackageOrderList({
        searchtype,
        stime: moment(val).format('YYYY-MM-DD'),
        etime: endTime,
        keyword,
      })
      .then(res => {
        this.setState({
          list: res.list,
        })
      })
  }

  changeEndTime = val => {
    const { order } = this.props
    const { searchtype, startTime, keyword } = this.state
    this.setState({
      endTime: moment(val).format('YYYY-MM-DD'),
      endTimeLabel: moment(val).format('YYYY-MM-DD'),
    })
    order
      .getPackageOrderList({
        searchtype,
        stime: startTime,
        etime: moment(val).format('YYYY-MM-DD'),
        keyword,
      })
      .then(res => {
        this.setState({
          list: res.list,
        })
      })
  }

  loadMore = async () => {
    const { order } = this.props
    const { list, page, searchtype, startTime, endTime, keyword } = this.state
    this.setState({ refreshing: true })
    await order
      .getPackageOrderList({
        page: page + 1,
        searchtype: searchtype,
        stime: startTime,
        etime: endTime,
        keyword,
      })
      .then(res => {
        this.setState({
          list: [...list, ...res.list],
          refreshing: false,
        })
        if (res.list.length !== 0) {
          this.setState({
            page: page + 1,
          })
        }
      })
  }

  render() {
    const { order } = this.props
    const {
      refreshing,
      height,
      searchtype,
      searchtypeLabel,
      startTime,
      startTimeLabel,
      endTime,
      endTimeLabel,
      keyword,
    } = this.state
    return (
      <div>
        <NavBar title="套餐卡订单" goBack />
        <SearchBar
          placeholder={searchtypeLabel}
          value={keyword}
          onChange={val => {
            this.setState({ keyword: val })
            if (val.length === 0) {
              order
                .getPackageOrderList({
                  page: 1,
                  searchtype: searchtype,
                  stime: startTime,
                  etime: endTime,
                  keyword: val,
                })
                .then(res => {
                  this.setState({
                    list: res.list,
                  })
                })
            }
          }}
          onSubmit={val =>
            order
              .getPackageOrderList({
                page: 1,
                searchtype,
                stime: startTime,
                etime: endTime,
                keyword: val,
              })
              .then(res => {
                this.setState({ list: res.list })
              })
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
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
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
      </div>
    )
  }
}

export default Package
