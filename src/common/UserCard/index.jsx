import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, Flex } from 'antd-mobile'
import { Container, Avatar, Content, Wallet, Setting } from './styled'

export default () => (
  <Container>
    <WingBlank>
      <Flex>
        <Avatar>
          <img src={require('../../assets/image/avatar.jpeg')} alt="" />
        </Avatar>
        <Content>
          <div>Hi, desing Kevin 欢迎回来！</div>
          <div>账户余额（元）</div>
          <Flex justify="between">
            <div>116688.88</div>
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
