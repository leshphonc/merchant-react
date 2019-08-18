import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WingBlank, WhiteSpace, Icon, Flex,
} from 'antd-mobile'
import { ColorCard, CardLeft } from './styled'

@inject('member')
@observer
class Member extends React.Component {
  componentDidMount() {
    const { member } = this.props
    member.fetchFansTotal()
  }

  render() {
    const { member } = this.props
    return (
      <React.Fragment>
        <NavBar title="会员管理" goBack />
        <WingBlank>
          <WhiteSpace />
          <Link to="/management/member/miniProgram">
            <ColorCard style={{ background: 'rgb(187, 219, 156)' }}>
              <CardLeft>小程序粉丝</CardLeft>
              <Flex>
                <span style={{ verticalAlign: 'super', color: '#fff' }}>
                  {member.fansTotal.mini}
                </span>
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/publicMember">
            <ColorCard style={{ background: 'rgb(124, 214, 222)' }}>
              <CardLeft>公众号粉丝</CardLeft>
              <Flex>
                <span style={{ verticalAlign: 'super', color: '#fff' }}>
                  {member.fansTotal.public}
                </span>
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/cardGroup">
            <ColorCard style={{ background: 'rgb(255, 174, 108)' }}>
              <CardLeft>会员卡分组</CardLeft>
              <Icon type="right" color="#fff" />
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/coupon">
            <ColorCard style={{ background: 'rgb(255, 130, 131)' }}>
              <CardLeft>优惠券列表</CardLeft>
              <Icon type="right" color="#fff" />
            </ColorCard>
          </Link>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Member
