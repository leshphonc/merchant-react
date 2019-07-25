import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'

export default () => (
  <BrowserRouter>
    <IconFont />
    <Route path="/" component={Index} />
    <Route path="/login" component={Login} />
  </BrowserRouter>
)
