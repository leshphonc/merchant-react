import React from 'react'
import {
  List,
  Checkbox,
  WhiteSpace,
  SearchBar,
  Button,
  Modal,
  Radio,
  Toast,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { CheckboxItem } = Checkbox
const { RadioItem } = Radio
@inject('member')
@observer
class CouponDistribute extends React.Component {
  state = {
    userList: [],
    user: [],
    couponOpen: false,
    couponList: [],
    coupon: [],
  }

  componentDidMount() {
    const { member } = this.props
    member.getCouponGroupList().then(res => {
      this.setState({
        couponList: res,
      })
    })
  }

  openModal = () => {
    this.setState({
      couponOpen: true,
    })
  }

  mapUserList = () => {
    const { userList, user } = this.state
    return userList.map(item => {
      return (
        <RadioItem
          checked={user.indexOf(item.uid) > -1}
          key={item.uid}
          onChange={() => this.changeUser(item.uid)}
        >
          {item.nickname} - {item.phone}
        </RadioItem>
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

  search = value => {
    const { member } = this.props
    member.searchUserList(value).then(res => {
      this.setState({
        userList: res,
      })
    })
  }

  distribute = () => {
    const { member } = this.props
    const { user, coupon } = this.state

    member
      .distributeCouponSingle({
        uid: user.join(','),
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
    const { couponOpen, user } = this.state
    return (
      <div>
        <WhiteSpace />
        <SearchBar
          onSubmit={value => this.search(value)}
          placeholder="用户昵称或手机号"
          maxLength={8}
        />
        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 14,
            color: '#777',
          }}
        >
          请搜索用户
        </div>
        <WhiteSpace />
        <List style={{ marginBottom: 47 }}>{this.mapUserList()}</List>
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

export default CouponDistribute
