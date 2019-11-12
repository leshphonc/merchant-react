import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import GroupList from './groupList'
import GroupOrderDetail from './groupOrderDeteail'
import RetailDetail from './retailDetail'
import Reservation from './reservation'
import ReservationDetail from './reservationDetail'
import Arrival from './arrival'
import ArrivalDetail from './arrivalDetail'
import ECommerce from './eCommerce'
import ECommerceDetail from './eCommerceDetail'
import Service from './service'
import ServiceDetail from './serviceDetail'
import Package from './package'
import PackageDetail from './packageDetail'

export default () => (
  <React.Fragment>
    <Route path="/order/groupList/:groupId" component={GroupList} />
    <Route
      path="/order/groupOrderDetail/:orderId"
      component={GroupOrderDetail}
    />
    <Route path="/order/retail" exact component={Retail} />
    <Route path="/order/retail/detail/:id" component={RetailDetail} />
    <Route path="/order/reservation" exact component={Reservation} />
    <Route path="/order/reservation/detail/:id" component={ReservationDetail} />
    <Route path="/order/arrival" exact component={Arrival} />
    <Route path="/order/arrival/detail/:id" component={ArrivalDetail} />
    <Route path="/order/eCommerce" exact component={ECommerce} />
    <Route
      path="/order/eCommerce/detail/:id"
      exact
      component={ECommerceDetail}
    />
    <Route path="/order/service" exact component={Service} />
    <Route path="/order/service/detail/:id" exact component={ServiceDetail} />
    <Route path="/order/package" exact component={Package} />
    <Route path="/order/package/detail/:id" exact component={PackageDetail} />
  </React.Fragment>
)
