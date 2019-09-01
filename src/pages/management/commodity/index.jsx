import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List } from 'antd-mobile'
import Group from './group'
import GroupPanel from './groupPanel'
import GroupMealAdd from './groupMealAdd'
import Reserve from './reserve'
import reservePanel from './reservePanel'
// import ReserveEdit from './reserveEdit'
import TakeAway from './takeAway'
import TakeAwayPanel from './takeAwayPanel'
import ECommerce from './eCommerce'
import ECommercePanel from './eCommercePanel'
import ECommerceSpread from './eCommerceSpread'
import ECommerceDiscounts from './eCommerceDiscounts'
import ECommerceDeliveryTemplate from './eCommerceDeliveryTemplate'
import ECommerceDeliveryTemplatePanel from './eCommerceDeliveryTemplatePanel'
import CommoditySpecification from './commoditySpecification'

const { Item } = List
@inject('commodity')
@observer
class Commodity extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <NavBar title="商品管理" goBack />
        <WhiteSpace />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/group')
            }}
          >
            团购商品
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/reserve')
            }}
          >
            预定商品
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/eCommerce')
            }}
          >
            电商商品
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/takeAway')
            }}
          >
            外卖商品
          </Item>
        </List>
      </div>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/management/commodity" exact component={Commodity} />
    <Route path="/management/commodity/group" component={Group} />
    <Route path="/management/commodity/groupPanel/:str/:id?" component={GroupPanel} />
    {/* <Route path="/management/commodity/groupEdit" component={GroupEdit} /> */}
    <Route path="/management/commodity/groupMealAdd" component={GroupMealAdd} />
    <Route path="/management/commodity/reserve" component={Reserve} />
    <Route path="/management/commodity/reservePanel/:str/:id?" component={reservePanel} />
    {/* <Route path="/management/commodity/reserveEdit" component={ReserveEdit} /> */}
    <Route path="/management/commodity/takeAway" component={TakeAway} />
    <Route path="/management/commodity/takeAwayPanel/:str/:id?/:goodid?" component={TakeAwayPanel} />

    <Route path="/management/commodity/eCommerce" component={ECommerce} />
    <Route
      path="/management/commodity/eCommercePanel/:str/:id?/:goodid?"
      component={ECommercePanel}
    />
    <Route
      path="/management/commodity/eCommerceSpread/:str/:id?/:goodid?"
      component={ECommerceSpread}
    />
    <Route
      path="/management/commodity/eCommerceDiscounts/:str/:id?/:goodid?"
      component={ECommerceDiscounts}
    />
    <Route
      path="/management/commodity/eCommerceDeliveryTemplate"
      component={ECommerceDeliveryTemplate}
    />
    <Route
      path="/management/commodity/eCommerceDeliveryTemplatePanel/:id?"
      component={ECommerceDeliveryTemplatePanel}
    />
    <Route path="/management/commodity/commoditySpecification" component={CommoditySpecification} />
  </React.Fragment>
)
