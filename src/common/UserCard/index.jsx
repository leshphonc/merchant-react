import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { WingBlank, Flex } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import {
  Container, Avatar, Content, Wallet, Setting,
} from './styled'

@withRouter
@inject('home')
@observer
class UserCard extends React.Component {
  render() {
    const { home, history } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const userName = userInfo ? userInfo.name : '未登录'
    const { avatar } = userInfo || {}
    return (
      <Container>
        <WingBlank>
          <Flex>
            <Avatar>
              <img src={avatar || require('../../assets/image/default_avatar.png')} alt="" />
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
              <Setting onClick={() => history.push('/login')}>
                <i className="iconfont">&#xe637;</i>
              </Setting>
            </Content>
          </Flex>
        </WingBlank>
      </Container>
    )
  }
}

export default UserCard
