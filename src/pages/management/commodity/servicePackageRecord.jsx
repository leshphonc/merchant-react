import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { PullToRefresh, WhiteSpace, Card, Flex } from 'antd-mobile'
import EmptyPage from '@/common/Result/Empty'
import moment from 'moment'

@inject('commodity')
@observer
class ServicePackageRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      list: [],
      refreshing: false,
      height: document.documentElement.clientHeight - 54,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity, match } = this.props
    const { page } = this.state
    commodity.fetchPackageRecord(match.params.id, page).then(res => {
      this.setState({
        list: res.list,
      })
    })
  }

  mapList = () => {
    const { list } = this.state
    if (!list.length) {
      return <EmptyPage />
    }
    return list.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            thumb={item.pic}
            title={item.meal_name}
            extra={'有效天数 ' + item.day_num}
          />
          <Card.Body>
            <div>用户名称：{item.nickname}</div>
            <WhiteSpace />
            <div>联系方式：{item.phone}</div>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <div>购买数量：{item.meal_num}</div>
              </Flex.Item>
              <Flex.Item>
                <div>套餐单价：{item.unit_price}</div>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <div>实付金额：{item.pay_money}</div>
            <WhiteSpace />
            <div>
              下单时间：
              {moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <WhiteSpace />
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = () => {
    const { commodity, match } = this.props
    const { page, list } = this.state
    commodity.fetchPackageRecord(match.params.id, page + 1).then(res => {
      if (res.list.length !== 0) {
        this.setState({
          page: page + 1,
        })
      }
      this.setState({
        list: [...list, ...res.list],
      })
    })
  }
  render() {
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar title="套餐销售记录" goBack />
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
          {this.mapList()}
        </PullToRefresh>
      </>
    )
  }
}

export default ServicePackageRecord
