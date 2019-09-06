import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import GroupList from './groupList'
import GroupOrderDetail from './groupOrderDeteail'
import RetailDetail from './retailDetail'

export default () => (
  <React.Fragment>
    <Route path="/order/retail" extra component={Retail} />
    <Route path="/order/groupList/:groupId" component={GroupList} />
    <Route path="/order/groupOrderDetail/:orderId" component={GroupOrderDetail} />
    <Route path="/order/retail" exact component={Retail} />
    <Route path="/order/retail/detail/:id" component={RetailDetail} />
  </React.Fragment>
)
