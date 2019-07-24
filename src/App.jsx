import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '@/pages/login'

export default () => (
  <BrowserRouter>
    <Route path="/login" component={Login} />
  </BrowserRouter>
)
