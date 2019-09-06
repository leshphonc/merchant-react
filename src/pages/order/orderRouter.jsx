import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import RetailDetail from './retailDetail'

export default () => (
  <React.Fragment>
    <Route path="/order/retail" exact component={Retail} />
    <Route path="/order/retail/detail/:id" component={RetailDetail} />
  </React.Fragment>
)
