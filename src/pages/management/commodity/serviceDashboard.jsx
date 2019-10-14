import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import { Flex, Icon, WingBlank, WhiteSpace } from 'antd-mobile'
import { ColorCard, CardLeft } from '@/styled'

class ServiceDashboard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <NavBar title="服务项目管理" goBack />
        <WhiteSpace size="lg" />
        <WingBlank>
          <Link to="/management/commodity/serviceCategory">
            <ColorCard style={{ background: 'rgb(187, 219, 156)' }}>
              <CardLeft>分类管理</CardLeft>
              <Flex>
                <span style={{ verticalAlign: 'super', color: '#fff' }} />
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace size="lg" />
          <Link to="/management/commodity/serviceItems">
            <ColorCard style={{ background: 'rgb(124, 214, 222)' }}>
              <CardLeft>服务项目</CardLeft>
              <Flex>
                <span style={{ verticalAlign: 'super', color: '#fff' }} />
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
        </WingBlank>
      </>
    )
  }
}

export default ServiceDashboard
