import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import RetailDetail from './retailDetail'
import Reservation from './reservation'
import ReservationDetail from './reservationDetail'

export default () => (
  <React.Fragment>
    <Route path="/order/retail" exact component={Retail} />
    <Route path="/order/retail/detail/:id" component={RetailDetail} />
    <Route path="/order/reservation" exact component={Reservation} />
    <Route path="/order/reservation/detail/:id" component={ReservationDetail} />
  </React.Fragment>
)
