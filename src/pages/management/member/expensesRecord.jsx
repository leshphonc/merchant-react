import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  Card, WingBlank, WhiteSpace, Flex, PullToRefresh,
} from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'

@inject('member')
@observer
class ExpensesRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member, location } = this.props
    const { expensesRecordList } = member
    const { height } = this.state
    if (!expensesRecordList.length) member.fetchExpensesRecordList(location.state.id)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { expensesRecordList } = member
    return expensesRecordList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header title={item.desc} style={{ fontSize: 16 }} />
          <Card.Body style={{ fontSize: 11 }}>
            <Flex>
              <Flex.Item>
                <div>金额增加(元): {item.money_add}</div>
                <WhiteSpace />
                <div>积分增加(元): {item.score_add}</div>
                <WhiteSpace />
                <div>优惠券增加(元): {item.coupon_add}</div>
              </Flex.Item>
              <Flex.Item>
                <div>金额减少(元): {item.money_use}</div>
                <WhiteSpace />
                <div>积分减少(元): {item.score_use}</div>
                <WhiteSpace />
                <div>优惠券减少(元): {item.coupon_use}</div>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer extra={moment(item.time * 1000).format('YYYY-MM-DD hh:mm:ss')} />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member, location } = this.props
    this.setState({ refreshing: true })
    await member.fetchExpensesRecordList(location.state.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar title="会员消费记录" goBack />
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

export default ExpensesRecord
