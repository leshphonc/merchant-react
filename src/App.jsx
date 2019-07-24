import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Index from '@/pages'
import Login from '@/pages/login'

export default () => (
  <BrowserRouter>
    <Route path="/" component={Index} />
    <Route path="/login" component={Login} />
  </BrowserRouter>
)
