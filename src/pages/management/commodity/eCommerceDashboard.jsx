import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import { Flex, Icon, WingBlank, WhiteSpace } from 'antd-mobile'
import { ColorCard, CardLeft } from '@/styled'

class ECommerceDashboard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <NavBar title="电商商品管理" goBack />
        <WhiteSpace size="lg" />
        <WingBlank>
          <Link to="/management/commodity/eCommerceCategory">
            <ColorCard style={{ background: 'rgb(187, 219, 156)' }}>
              <CardLeft>电商分类</CardLeft>
              <Flex>
                <span style={{ verticalAlign: 'super', color: '#fff' }} />
                <Icon type="right" color="#fff" />
              </Flex>
            </ColorCard>
          </Link>
          <WhiteSpace size="lg" />
          <Link to="/management/commodity/eCommerce">
            <ColorCard style={{ background: 'rgb(124, 214, 222)' }}>
              <CardLeft>电商商品（创建商品前请先创建分类）</CardLeft>
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

export default ECommerceDashboard
