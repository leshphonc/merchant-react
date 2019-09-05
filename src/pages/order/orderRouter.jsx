import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import GroupList from './groupList'
import GroupOrderDetail from './groupOrderDeteail'

export default () => (
  <React.Fragment>
    <Route path="/order/retail" extra component={Retail} />
    <Route path="/order/groupList/:groupId" component={GroupList} />
    <Route path="/order/groupOrderDetail/:orderId" component={GroupOrderDetail} />
  </React.Fragment>
)
