import React from 'react'
import { List, Checkbox, Button, Modal, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { CheckboxItem } = Checkbox

@inject('member')
@observer
class CouponGroupDistribute extends React.Component {
  state = {
    userList: [],
    user: [],
    couponOpen: false,
    couponList: [],
    coupon: [],
  }
  async componentDidMount() {
    const { member } = this.props
    await member.getUserList().then(res => {
      console.log(res)
      this.setState({
        userList: res,
      })
    })
  }

  mapList = () => {
    const { userList, user } = this.state
    return userList.map(item => {
      return (
        <CheckboxItem
          checked={user.indexOf(item.id) > -1}
          key={item.id}
          onChange={() => this.changeUser(item.id)}
        >
          {item.name}
        </CheckboxItem>
      )
    })
  }

  changeUser = id => {
    const { user } = this.state
    const index = user.indexOf(id)
    if (index > -1) {
      user.splice(index, 1)
      this.setState({
        user,
      })
    } else {
      this.setState({
        user: [...user, id],
      })
    }
  }
  openModal = () => {
    const { member } = this.props
    const { user } = this.state
    member.getCouponGroupList(user.join(',')).then(res => {
      this.setState({
        couponList: res,
        couponOpen: true,
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
    const { user, coupon } = this.state
    member
      .distributeCoupon({
        card_group_id: user.join(','),
        coupon_id: coupon.join(','),
      })
      .then(() => {
        Toast.success('派发成功', 1, () => {
          this.setState({
            user: [],
            couponOpen: false,
            coupon: [],
          })
        })
      })
  }

  render() {
    const { user, couponOpen } = this.state
    console.log(user)
    return (
      <div>
        <List renderHeader="选择用户" style={{ marginBottom: 47 }}>
          {this.mapList()}
        </List>
        {user.length ? (
          <Button
            onClick={this.openModal}
            style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
            type="primary"
          >
            选择优惠券
          </Button>
        ) : null}
        <Modal
          onClose={() => {
            this.setState({
              couponOpen: false,
            })
          }}
          visible={couponOpen}
          animationType="slide-up"
          popup
        >
          <List renderHeader="选择优惠券" style={{ marginBottom: 47 }}>
            {this.mapCouponList()}
          </List>
          <Button
            type="primary"
            onClick={this.distribute}
            style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
          >
            派发
          </Button>
        </Modal>
      </div>
    )
  }
}

export default CouponGroupDistribute
