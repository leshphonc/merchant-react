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
import ECommerceDashboard from './eCommerceDashboard'
import ECommerceCategory from './eCommerceCategory'
import ECommerceSecondCategory from './eCommerceSecondCategory'
import ECommerce from './eCommerce'
import ECommercePanel from './eCommercePanel'
import ECommerceCategoryPanel from './eCommerceCategoryPanel'
import ECommerceSpread from './eCommerceSpread'
import ECommerceDiscounts from './eCommerceDiscounts'
import ECommerceDeliveryTemplate from './eCommerceDeliveryTemplate'
import ECommerceDeliveryTemplatePanel from './eCommerceDeliveryTemplatePanel'
// import ECommerceSpecification from './eCommerceSpecification'
import EditSpread from './editSpread'
import GroupDiscounts from './groupDiscounts'
import AppointDiscounts from './appointDiscounts'
import ServiceDashboard from './serviceDashboard'
import ServiceCategory from './serviceCategory'
import ServiceCategoryProject from './serviceCategoryProject'
import serviceCategorySecondCategory from './serviceCategorySecondCategory'
import ServiceItems from './serviceItems'
import ServiceItemsPanel from './serviceItemsPanel'
import ServiceItemsSelectSingle from './serviceItemsSelectSingle'
import serviceSingleRecord from './serviceSingleRecord'
import ServicePackageRecord from './servicePackageRecord'

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
            thumb={require('@/assets/image/dsgl.png')}
            onClick={() => {
              history.push('/management/commodity/eCommerceDashboard')
            }}
          >
            电商
          </Item>
          <Item
            thumb={require('@/assets/image/wmgl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/takeAway')
            }}
          >
            外卖
          </Item>
          <Item
            thumb={require('@/assets/image/cygl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('1')
            }}
          >
            餐饮
          </Item>
          <Item
            thumb={require('@/assets/image/jdgl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('1')
            }}
          >
            酒店
          </Item>
          <Item
            thumb={require('@/assets/image/yygl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/reserve')
            }}
          >
            预定
          </Item>
          <Item
            thumb={require('@/assets/image/tggl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/group')
            }}
          >
            团购
          </Item>
          <Item
            thumb={require('@/assets/image/pfgh.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('1')
            }}
          >
            批发
          </Item>
          <Item
            thumb={require('@/assets/image/qpgl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('1')
            }}
          >
            汽配
          </Item>
          <Item
            thumb={require('@/assets/image/fwgl.png')}
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/serviceDashboard')
            }}
          >
            服务
          </Item>
        </List>
      </div>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/management/commodity" exact component={Commodity} />
    {/* 团购商品 */}
    <Route path="/management/commodity/group" component={Group} />
    <Route path="/management/commodity/groupPanel/:str/:id?" component={GroupPanel} />
    {/* <Route path="/management/commodity/groupEdit" component={GroupEdit} /> */}
    <Route path="/management/commodity/groupMealAdd" component={GroupMealAdd} />
    {/* 预定商品 */}
    <Route path="/management/commodity/reserve" component={Reserve} />
    <Route path="/management/commodity/reservePanel/:str/:id?" component={reservePanel} />
    {/* <Route path="/management/commodity/reserveEdit" component={ReserveEdit} /> */}
    {/* 外卖商品 */}
    <Route path="/management/commodity/takeAway" component={TakeAway} />
    <Route
      path="/management/commodity/takeAwayPanel/:str/:id?/:goodid?"
      component={TakeAwayPanel}
    />
    {/* 电商商品 */}
    <Route path="/management/commodity/eCommerceDashboard" component={ECommerceDashboard} />
    <Route path="/management/commodity/eCommerceCategory" component={ECommerceCategory} />
    <Route
      path="/management/commodity/eCommerceSecondCategory/:id"
      component={ECommerceSecondCategory}
    />
    <Route
      path="/management/commodity/eCommerceCategoryPanel/:type/:level/:id?"
      component={ECommerceCategoryPanel}
    />

    <Route path="/management/commodity/eCommerce" component={ECommerce} />
    <Route
      path="/management/commodity/eCommercePanel/:str/:id?/:goodid?"
      component={ECommercePanel}
    />
    <Route
      path="/management/commodity/eCommerceSpread/:str/:id?/:goodid?"
      component={ECommerceSpread}
    />
    <Route path="/management/commodity/editSpread/:str/:id?" component={EditSpread} />
    <Route path="/management/commodity/groupDiscounts/:str/:id?" component={GroupDiscounts} />
    <Route path="/management/commodity/AppointDiscounts/:str/:id?" component={AppointDiscounts} />
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
    {/* 服务项目 */}
    <Route path="/management/commodity/serviceDashboard" component={ServiceDashboard} />
    <Route path="/management/commodity/serviceCategory" component={ServiceCategory} />
    <Route
      path="/management/commodity/serviceCategoryProject/:id"
      component={ServiceCategoryProject}
    />
    <Route
      path="/management/commodity/serviceCategorySecondCategory/:id"
      component={serviceCategorySecondCategory}
    />
    <Route path="/management/commodity/serviceItems" component={ServiceItems} />
    <Route
      path="/management/commodity/serviceItemsPanel/:str/:type/:id?"
      component={ServiceItemsPanel}
    />
    <Route
      path="/management/commodity/serviceItemsSelectSingle"
      component={ServiceItemsSelectSingle}
    />
    <Route path="/management/commodity/serviceSingleRecord/:id" component={serviceSingleRecord} />
    <Route path="/management/commodity/servicePackageRecord/:id" component={ServicePackageRecord} />
  </React.Fragment>
)
