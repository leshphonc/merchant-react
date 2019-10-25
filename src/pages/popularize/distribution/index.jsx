import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { WhiteSpace, List } from 'antd-mobile'
import ECommerce from './eCommerce'
import Reserve from './reserve'
import Group from './group'

class Index extends React.Component {
  componentDidMount() {}

  render() {
    const { history } = this.props
    return (
      <>
        <NavBar title="分销商品列表" />
        <WhiteSpace />
        <List>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/dsgl.png')}
            onClick={() => history.push('/popularize/distribution/eCommerce')}
          >
            电商
          </List.Item>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/yygl.png')}
            onClick={() => history.push('/popularize/distribution/reserve')}
          >
            预定
          </List.Item>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/tggl.png')}
            onClick={() => history.push('/popularize/distribution/group')}
          >
            团购
          </List.Item>
        </List>
      </>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/popularize/distribution" exact component={Index} />
    {/* 电商产品分佣 */}
    <Route
      path="/popularize/distribution/eCommerce"
      exact
      component={ECommerce}
    />
    <Route path="/popularize/distribution/reserve" exact component={Reserve} />
    <Route path="/popularize/distribution/group" exact component={Group} />
  </React.Fragment>
)
