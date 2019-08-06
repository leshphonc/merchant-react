import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, Button, PullToRefresh } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import { ListItem, ItemTop, ItemBottom } from './styled'

@inject('member')
@observer
class Coupon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member } = this.props
    const { height } = this.state
    member.fetchCouponList()
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapPlatform = platform => {
    const { member } = this.props
    const { couponPlatform } = member
    if (platform) {
      return platform.map(item => couponPlatform[item])
    }
    return '暂无'
  }

  mapList = () => {
    const { member } = this.props
    const { couponList, couponCategory } = member
    return couponList.map(item => (
      <ListItem key={item.coupon_id}>
        <ItemTop>
          <img className="avatar" src={item.img} alt="" />
          <div className="top-content">
            <div className="content-left" style={{ flex: 1 }}>
              <div>id：{item.coupon_id}</div>
              <div>使用类别：{couponCategory[item.cate_name]}</div>
              <div>使用系统：{this.mapPlatform(item.platform)}</div>
            </div>
            <div className="content-right" style={{ flex: 1 }}>
              <div>名称：{item.name}</div>
              <div>使用分类：{item.cate_id}</div>
              <div className="hide">hide</div>
            </div>
          </div>
        </ItemTop>
        <ItemBottom>
          <div>总数：{item.num}</div>
          <WhiteSpace />
          <div>
            起始时间：{moment(item.start_time * 1000).format('YYYY-MM-DD')} -{' '}
            {moment(item.end_time * 1000).format('YYYY-MM-DD')}
          </div>
          <WhiteSpace />
          <div>
            满减条件：满 {item.order_money} 减 {item.discount}
          </div>
          <WhiteSpace />
          <div className="bottom-feature">
            <Button type="primary" size="small">
              已领取{item.had_pull}张
            </Button>
            {item.status === '1' ? (
              <Button type="primary" size="small">
                启用
              </Button>
            ) : null}
            {item.status === '2' ? (
              <Button type="primary" size="small">
                超过期限
              </Button>
            ) : null}
            {item.status === '3' ? (
              <Button type="primary" size="small">
                领完了
              </Button>
            ) : null}
            {item.status !== '1' && item.status !== '2' && item.status !== '3' ? (
              <Button type="primary" size="small">
                关闭
              </Button>
            ) : null}
          </div>
        </ItemBottom>
      </ListItem>
    ))
  }

  loadMore = async () => {
    const { member } = this.props
    this.setState({ refreshing: true })
    await member.fetchCouponList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar title="优惠券列表" goBack />
        <WhiteSpace />
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
      </React.Fragment>
    )
  }
}

export default Coupon
