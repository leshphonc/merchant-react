import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { WhiteSpace, List } from 'antd-mobile'
import ECommerce from './eCommerce'
import Reserve from './reserve'
import Group from './group'
import Service from './service'
import ServiceSpread from './serviceSpread'
import Package from './package'
import PackageSpread from './packageSpread'

class Index extends React.Component {
  componentDidMount() {}

  render() {
    const { history } = this.props
    return (
      <>
        <NavBar title="推广佣金设置" goBack />
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
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/fwgl.png')}
            onClick={() => history.push('/popularize/distribution/service')}
          >
            服务
          </List.Item>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/tcgl.png')}
            onClick={() => history.push('/popularize/distribution/package')}
          >
            套餐
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
    {/* 电商 */}
    <Route
      path="/popularize/distribution/eCommerce"
      exact
      component={ECommerce}
    />
    {/* 预定 */}
    <Route path="/popularize/distribution/reserve" exact component={Reserve} />
    {/* 团购 */}
    <Route path="/popularize/distribution/group" exact component={Group} />
    {/* 服务 */}
    <Route path="/popularize/distribution/service" exact component={Service} />
    <Route
      path="/popularize/distribution/serviceSpread/:id"
      exact
      component={ServiceSpread}
    />
    {/* 套餐 */}
    <Route path="/popularize/distribution/package" exact component={Package} />
    <Route
      path="/popularize/distribution/packageSpread/:id"
      exact
      component={PackageSpread}
    />
  </React.Fragment>
)
