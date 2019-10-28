import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WingBlank,
  WhiteSpace,
  Card,
  PullToRefresh,
  Flex,
  DatePicker,
} from 'antd-mobile'
import moment from 'moment'
import UserBehavior from './userBehavior'
import { FilterBox } from '@/styled'

@inject('member')
@observer
class UserSaleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      // eslint-disable-next-line react/no-unused-state
      beginTime: moment(new Date(new Date() - 30 * 24 * 3600 * 1000)).format(
        'YYYY-MM-DD',
      ),
      // eslint-disable-next-line react/no-unused-state
      endTime: moment(new Date()).format('YYYY-MM-DD'),
      userBuyListTotalNum: 0,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member, match } = this.props
    // const { couponCheckList } = member
    const { height, beginTime, endTime } = this.state

    member
      .resetFetchUserBuyList(beginTime, endTime, match.params.uid)
      .then(() => {
        const { userBuyListTotalNum } = member
        this.setState({
          userBuyListTotalNum,
        })
      })
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { userBuyList } = member
    return userBuyList.map((item, index) => (
      <React.Fragment key={index}>
        <Card>
          <Card.Header
            thumb={item.avatar}
            thumbStyle={{ width: 50, height: 50 }}
            title={item.order_name ? item.order_name : '优惠买单'}
          />
          <Card.Body style={{ fontSize: 11 }}>
            <Flex>
              <Flex.Item>
                <div>金额：{item.price || '暂无'}</div>
                <WhiteSpace />
                <div>
                  购买时间：
                  {moment(item.pay_time * 1000).format('YYYY-MM-DD H:mm:ss')}
                </div>
              </Flex.Item>
              <Flex.Item>
                <div>数量：{item.num || '暂无'}</div>
                <div style={{ visibility: 'hidden' }} />
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member, match } = this.props
    const { beginTime, endTime } = this.state
    this.setState({ refreshing: true })
    await member
      .fetchUserBuyList(beginTime, endTime, match.params.uid)
      .then(() => {
        const { userBuyListTotalNum } = member
        this.setState({
          userBuyListTotalNum,
        })
      })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  setBeiginTime = data => {
    this.setState({
      beginTime: moment(data).format('YYYY-MM-DD'),
    })
    const { member, match } = this.props
    const { endTime } = this.state
    member
      .resetFetchUserBuyList(
        moment(data).format('YYYY-MM-DD'),
        endTime,
        match.params.uid,
      )
      .then(() => {
        const { userBuyListTotalNum } = member
        this.setState({
          userBuyListTotalNum,
        })
      })
  }

  setEndTime = data => {
    this.setState({
      endTime: moment(data).format('YYYY-MM-DD'),
    })
    const { member, match } = this.props
    const { beginTime } = this.state
    member
      .resetFetchUserBuyList(
        beginTime,
        moment(data).format('YYYY-MM-DD'),
        match.params.uid,
      )
      .then(() => {
        const { userBuyListTotalNum } = member
        this.setState({
          userBuyListTotalNum,
        })
      })
  }
  render() {
    const {
      height,
      refreshing,
      beginTime,
      endTime,
      userBuyListTotalNum,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="用户消费记录" goBack />
        <WhiteSpace />
        <WingBlank>
          {/* <SegmentedControl values={['全部用户', '消费用户', '到店用户']} /> */}
          <FilterBox>
            <DatePicker mode="date" onChange={this.setBeiginTime}>
              <div>
                <span>{beginTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <span>-&nbsp;</span>
          <FilterBox>
            <DatePicker mode="date" onChange={this.setEndTime}>
              <div>
                <span>{endTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <span>-&nbsp;</span>
          <FilterBox>
            <span>
              共{userBuyListTotalNum.length === 0 ? 0 : userBuyListTotalNum}
              条记录
            </span>
          </FilterBox>
        </WingBlank>
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
          <WhiteSpace />
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route
      path="/management/member/userSaleList/:uid"
      exact
      component={UserSaleList}
    />
    <Route
      path="/management/member/userBehavior/:uid"
      exact
      component={UserBehavior}
    />
  </React.Fragment>
)
