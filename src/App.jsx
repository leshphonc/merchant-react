import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import StoreFront from '@/pages/management/storeFront'
import Commodity from '@/pages/management/commodity'
import Group from '@/pages/management/commodity/group'
import ManagementCategory from '@/pages/management/storeFront/managementCategory'
import CategoryPanel from '@/pages/management/storeFront/categoryPanel'
import BasicInformation from '@/pages/setting/basicInformation'
import ShopAssistant from '@/pages/popularize/shopAssistant'

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
    <Route path="/management/commodity" exact component={Commodity} />
    <Route path="/management/commodity/group" component={Group} />
    {/* 基本信息 -> setting */}
    <Route path="/setting/basicInformation" component={BasicInformation} />
    {/* 商家推广 ->  popularize */}
    <Route path="/popularize/shopAssistant" component={ShopAssistant} />
  </BrowserRouter>
)
