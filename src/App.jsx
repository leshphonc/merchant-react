import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import BasicInformation from '@/pages/setting/basicInformation'

export default () => (
  <BrowserRouter>
    <IconFont />
    <Route path="/" exact component={Index} />
    <Route path="/login" component={Login} />
    <Route path="/setting/basicInformation" component={BasicInformation} />
  </BrowserRouter>
)
