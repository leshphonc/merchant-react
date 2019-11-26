import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, Button, PullToRefresh, ActionSheet } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import CouponCheck from './couponCheck'
import CouponCRU from './couponCRU'
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
    const { couponList } = member
    const { height } = this.state
    member.ResetCouponCheckList()
    if (!couponList.length) member.fetchCouponList()
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
      return platform.map(item => `${couponPlatform[item]} `)
    }
    return '暂无'
  }

  mapList = () => {
    const { member, history } = this.props
    const { couponList, couponCategory } = member
    return couponList.map(item => (
      <React.Fragment key={item.coupon_id}>
        <ListItem>
          <ItemTop>
            <img className="avatar" src={item.img} alt="" />
            <div className="top-content" style={{ flexDirection: 'column' }}>
              <div className="content-line" style={{ flex: 1 }}>
                <div>id：{item.coupon_id}</div>
                <div>使用类别：{couponCategory[item.cate_name]}</div>
              </div>
              <div className="content-line" style={{ flex: 1 }}>
                <div>名称：{item.name}</div>
                <div>使用分类：{item.cate_id}</div>
              </div>
              <div>使用系统：{this.mapPlatform(item.platform)}</div>
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
              <Button
                style={{ marginRight: 5 }}
                type="primary"
                size="small"
                onClick={() =>
                  history.push(
                    `/management/member/coupon/couponCRU/${item.coupon_id}`,
                  )
                }
              >
                编辑
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type="primary"
                size="small"
                onClick={() => {
                  history.push(
                    `/management/member/coupon/couponCheck/${item.coupon_id}`,
                  )
                }}
              >
                已领取{item.had_pull}张
              </Button>
              {item.status === '1' ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    const BUTTONS = ['启用', '禁止', 'Cancel']
                    ActionSheet.showActionSheetWithOptions(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: BUTTONS.length - 1,
                        // title: 'title',
                        message: '优惠券操作',
                        maskClosable: true,
                      },
                      async buttonIndex => {
                        let status
                        if (buttonIndex === 0) {
                          status = '1'
                        } else if (buttonIndex === 1) {
                          status = '0'
                        } else {
                          return false
                        }
                        await member.changeCouponStatus(item.coupon_id, status)
                        // await member.fetchCouponList()
                      },
                    )
                  }}
                >
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
              {item.status !== '1' &&
              item.status !== '2' &&
              item.status !== '3' ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    const BUTTONS = ['启用', '禁止', '取消']
                    ActionSheet.showActionSheetWithOptions(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: BUTTONS.length - 1,
                        // title: 'title',
                        message: '优惠券操作',
                        maskClosable: true,
                      },
                      async buttonIndex => {
                        let status
                        if (buttonIndex === 0) {
                          status = '1'
                        } else if (buttonIndex === 1) {
                          status = '0'
                        } else {
                          return false
                        }
                        await member.changeCouponStatus(item.coupon_id, status)
                        // await member.fetchCouponList()
                      },
                    )
                  }}
                >
                  禁止
                </Button>
              ) : null}
            </div>
          </ItemBottom>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
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
    const { history } = this.props
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="优惠券列表"
          goBack
          right={
            <div
              onClick={() =>
                history.push('/management/member/coupon/couponCRU')
              }
            >
              创建
            </div>
          }
        />
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
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/member/coupon" exact component={Coupon} />
    <Route
      path="/management/member/coupon/couponCheck/:id"
      component={CouponCheck}
    />
    <Route
      path="/management/member/coupon/couponCRU/:id?"
      component={CouponCRU}
    />
  </React.Fragment>
)
