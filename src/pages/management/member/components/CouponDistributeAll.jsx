import React from 'react'
import { List, Checkbox, WhiteSpace, Button, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { CheckboxItem } = Checkbox
@inject('member')
@observer
class CouponDistributeAll extends React.Component {
  state = {
    couponList: [],
    coupon: [],
  }

  componentDidMount() {
    const { member } = this.props
    member.allGroupCanDistributeCouponList().then(res => {
      this.setState({
        couponList: res.coupon_list,
      })
    })
  }

  mapCouponList = () => {
    const { couponList, coupon } = this.state
    return couponList.map(item => {
      return (
        <CheckboxItem
          checked={coupon.indexOf(item.coupon_id) > -1}
          key={item.coupon_id}
          onChange={() => this.changeCoupon(item.coupon_id)}
        >
          {item.name}
        </CheckboxItem>
      )
    })
  }

  changeCoupon = id => {
    const { coupon } = this.state
    const index = coupon.indexOf(id)
    if (index > -1) {
      coupon.splice(index, 1)
      this.setState({
        coupon,
      })
    } else {
      this.setState({
        coupon: [...coupon, id],
      })
    }
  }

  distribute = () => {
    const { member } = this.props
    const { coupon } = this.state
    member
      .distributeCoupon({ all: 1, coupon_id: coupon.join(',') })
      .then(() => {
        Toast.success('派发成功', 1, () => {
          this.setState({
            coupon: [],
          })
        })
      })
  }

  render() {
    const { coupon } = this.state
    return (
      <div>
        <WhiteSpace />
        <List renderHeader="派发给所有用户" style={{ marginBottom: 47 }}>
          {this.mapCouponList()}
        </List>
        {coupon.length > 0 ? (
          <Button
            type="primary"
            onClick={this.distribute}
            style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
          >
            派发
          </Button>
        ) : null}
      </div>
    )
  }
}

export default CouponDistributeAll
