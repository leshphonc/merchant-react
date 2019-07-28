import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import StoreFront from '@/pages/management/storeFront'
import ManagementCategory from '@/pages/management/storeFront/managementCategory'
import CategoryPanel from '@/pages/management/storeFront/categoryPanel'
import BasicInformation from '@/pages/setting/basicInformation'

export default () => (
  <BrowserRouter>
    <IconFont />
    <Route path="/" exact component={Index} />
    {/* 登录页面 */}
    <Route path="/login" component={Login} />
    {/* 管理页面 -> management */}
    <Route path="/management/storefront" exact component={StoreFront} />
    <Route path="/management/storefront/managementCategory" component={ManagementCategory} />
    <Route path="/management/storefront/categoryPanel" component={CategoryPanel} />
    {/* 基本信息 -> setting */}
    <Route path="/setting/basicInformation" component={BasicInformation} />
  </BrowserRouter>
)
