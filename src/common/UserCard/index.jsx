import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, Flex } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import {
  Container, Avatar, Content, Wallet, Setting,
} from './styled'

@inject('home')
@observer
class UserCard extends React.Component {
  componentDidMount() {
    const { home } = this.props
    home.fetchIndexData()
  }

  render() {
    const { home } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const userName = userInfo ? userInfo.name : '未登录'
    return (
      <Container>
        <WingBlank>
          <Flex>
            <Avatar>
              <img src={require('../../assets/image/avatar.jpeg')} alt="" />
            </Avatar>
            <Content>
              <div>{userInfo ? `Hi , ${userName} 欢迎回来！` : '未登录'}</div>
              <div>账户余额（元）</div>
              <Flex justify="between">
                <div>{home.indexData.allmoney || 0}</div>
                <Link to="/wallet">
                  <Wallet>充值 | 提现</Wallet>
                </Link>
              </Flex>
              <Setting>
                <i className="iconfont">&#xe606;</i>
              </Setting>
            </Content>
          </Flex>
        </WingBlank>
      </Container>
    )
  }
}

export default UserCard
