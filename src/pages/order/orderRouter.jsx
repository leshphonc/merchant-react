import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'

export default () => (
  <React.Fragment>
    <Route path="/order/retail" extra component={Retail} />
  </React.Fragment>
)
