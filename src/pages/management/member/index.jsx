import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WingBlank, WhiteSpace, Icon, Flex } from 'antd-mobile'
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
          <Link to="/management/member/publicMember">
            <ColorCard style={{ background: 'rgb(153, 213, 222)' }}>
              <CardLeft>在线访问用户</CardLeft>
              <Flex>
                <span
                  style={{
                    verticalAlign: 'super',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                >
                  {member.fansTotal.public}
                </span>
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/publicMember">
            <ColorCard style={{ background: 'rgb(204, 222, 124)' }}>
              <CardLeft>到店用户</CardLeft>
              <Flex>
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/publicMember">
            <ColorCard style={{ background: 'rgb(222, 190, 124)' }}>
              <CardLeft>消费用户</CardLeft>
              <Flex>
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/merchantMember">
            <ColorCard style={{ background: 'rgb(255, 174, 108)' }}>
              <CardLeft>绑定粉丝</CardLeft>
              <Icon type="right" color="#fff" />
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/cardGroup">
            <ColorCard style={{ background: 'rgb(238, 145, 198)' }}>
              <CardLeft>领卡会员</CardLeft>
              <Icon type="right" color="#fff" />
            </ColorCard>
          </Link>
          <WhiteSpace />
          <Link to="/management/member/coupon">
            <ColorCard style={{ background: 'rgb(255, 130, 131)' }}>
              <CardLeft>领券会员</CardLeft>
              <Icon type="right" color="#fff" />
            </ColorCard>
          </Link>
          <WhiteSpace />
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Member
