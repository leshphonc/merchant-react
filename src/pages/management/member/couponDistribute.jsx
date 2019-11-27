import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import { SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'
import CouponGroupDistribute from './components/CouponGroupDistribute'
import CouponSingleDistribute from './components/CouponSingleDistribute'
import CouponDistributeAll from './components/CouponDistributeAll'
import CouponDistributeRecord from './components/CouponDistributeRecord'

@inject('member')
@observer
class CouponDistribute extends React.Component {
  state = {
    cur: '分组派发',
    index: 0,
  }
  componentDidMount() {
    const { member } = this.props
    member.getCouponGroupList().then(res => {
      console.log(res)
    })
  }
  onChange = e => {
    this.setState({
      cur: e.nativeEvent.value,
      index: e.nativeEvent.selectedSegmentIndex,
    })
  }

  render() {
    const { cur, index } = this.state
    return (
      <div>
        <NavBar title="优惠券派发" goBack />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            selectedIndex={index}
            onChange={this.onChange}
            values={['分组派发', '个人派发', '全部派发', '派发记录']}
          />
          {cur === '分组派发' ? <CouponGroupDistribute /> : null}
          {cur === '个人派发' ? <CouponSingleDistribute /> : null}
          {cur === '全部派发' ? <CouponDistributeAll /> : null}
          {cur === '派发记录' ? <CouponDistributeRecord /> : null}
        </WingBlank>
      </div>
    )
  }
}

export default CouponDistribute
