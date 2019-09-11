import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import {
  SearchBar, Picker, WingBlank, WhiteSpace, Card, Flex, PullToRefresh,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'

const searchStatys = [
  {
    label: '全部',
    value: '-1',
  },
  {
    label: '未消费',
    value: '0',
  },
  {
    label: '已消费',
    value: '1',
  },
  {
    label: '已完成',
    value: '2',
  },
  {
    label: '已退款',
    value: '3',
  },
  {
    label: '已取消',
    value: '4',
  },
  {
    label: '部分退款',
    value: '6',
  },
  {
    label: '待发货',
    value: '99',
  },
]
const searchType = [
  {
    label: '消费密码',
    value: '1',
  },
  {
    label: '快递单号',
    value: '2',
  },
  {
    label: '订单ID',
    value: '3',
  },
  {
    label: '用户ID',
    value: '5',
  },
  {
    label: '用户昵称',
    value: '6',
  },
  {
    label: '手机号码',
    value: '7',
  },
]

const styleSpan = {
  spanLeft: {
    display: 'inline-block',
    width: '50%',
  },
  spanRight: {
    display: 'inline-block',
    width: '50%',
  },
}
@inject('order')
@observer
class GroupList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderName: '全部',
      searchName: '手机号码',
      statusValus: '-1',
      typeValue: '7',
      keyword: '',
      height: document.documentElement.clientHeight,
      refreshing: false,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { match, order } = this.props
    const {
      height, statusValus, typeValue, keyword,
    } = this.state
    order.resetAndFetchGroupOrderList(match.params.groupId, statusValus, typeValue, keyword)
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { order, history } = this.props
    const { groupOrderList } = order
    return groupOrderList.map((item, index) => {
      let typeText = ''
      let statusText1 = ''
      let statusText2 = ''
      if (item.tuan_type === '0') {
        typeText = '团购券'
      } else if (item.tuan_type === '1') {
        typeText = '代金券'
      } else {
        typeText = '实物'
      }
      if (item.type === 1) {
        statusText1 = '未消费'
      } else if (item.type === 2) {
        statusText1 = '未发货'
      } else if (item.type === 3) {
        statusText1 = '已消费'
      } else if (item.type === 4) {
        statusText1 = '已发货'
      }
      if (item.status === 1) {
        statusText2 = '已取消'
      } else if (item.status === 2) {
        statusText2 = '线下未支付'
      } else if (item.status === 3) {
        statusText2 = '已付款'
      } else if (item.status === 4) {
        statusText2 = '待评论'
      } else if (item.status === 5) {
        statusText2 = '已完成'
      } else if (item.status === 6) {
        statusText2 = '未付款'
      }
      return (
        <React.Fragment key={index}>
          <Card
            onClick={() => {
              history.push(`/order/groupOrderDetail/${item.order_id}`)
            }}
            style={{ marginBottom: '10px' }}
          >
            <Card.Header style={{ fontSize: 13, color: '#999' }} title={item.s_name}></Card.Header>
            <Card.Body style={{ color: '#666', fontSize: 12 }}>
              <Flex>
                <img src={item.pic} style={{ width: '20%', height: '20vw' }} alt="产品图片" />
                <div style={{ width: '75%', marginLeft: '5%' }}>
                  <p>
                    <span style={styleSpan.spanLeft}>总价:{item.total_money}</span>
                    <span style={styleSpan.spanRight}>数量:{item.num}</span>
                  </p>
                  <p>
                    <span style={styleSpan.spanLeft}>订单类型:</span>
                    <span style={styleSpan.spanRight}>{typeText}</span>
                  </p>
                  <p>
                    <span style={styleSpan.spanLeft}>订单状态:</span>
                    <span style={styleSpan.spanRight}>
                      {statusText1} {statusText2}
                    </span>
                  </p>
                </div>
              </Flex>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })
  }

  loadMore = async () => {
    const { match, order } = this.props
    const { statusValus, typeValue, keyword } = this.state

    this.setState({ refreshing: true })
    await order.fetchGroupOrderList(match.params.groupId, statusValus, typeValue, keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { order, match } = this.props
    const {
      orderName,
      searchName,
      statusValus,
      typeValue,
      refreshing,
      height,
      keyword,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="团购订单" goBack />
        <SearchBar
          placeholder="客户姓名/联系电话"
          onChange={e => {
            this.setState({
              keyword: e,
            })
          }}
          onSubmit={() => {
            order.resetAndFetchGroupOrderList(match.params.groupId, statusValus, typeValue, keyword)
          }}
        />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={searchStatys}
              cols={2}
              value={[statusValus]}
              onOk={e => {
                let index = ''
                searchStatys.forEach((item, i) => {
                  if (item.value === e[0]) index = i
                })
                this.setState(
                  {
                    statusValus: e[0],
                    orderName: searchStatys[index].label,
                  },
                  () => {
                    order.resetAndFetchGroupOrderList(
                      match.params.groupId,
                      e[0],
                      typeValue,
                      keyword,
                    )
                  },
                )
              }}
            >
              <div>
                <span>{orderName}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={searchType}
              cols={2}
              value={[typeValue]}
              onOk={e => {
                let index = ''
                searchType.forEach((item, i) => {
                  if (item.value === e[0]) index = i
                })
                this.setState({
                  typeValue: e[0],
                  searchName: searchType[index].label,
                })
              }}
            >
              <div>
                <span>{searchName}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
        <WingBlank size="sm">
          <PullToRefresh
            damping={60}
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

export default GroupList
