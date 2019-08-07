import React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import store from '@/pages/store'
import { BrowserRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import Wallet from '@/pages/wallet'
import WalletDetail from '@/pages/wallet/detail'
import StoreFront from '@/pages/management/storeFront'
import Member from '@/pages/management/member'
import MiniProgram from '@/pages/management/member/miniProgram'
import PublicMember from '@/pages/management/member/publicMember'
import Coupon from '@/pages/management/member/coupon'
import Commodity from '@/pages/management/commodity'
import Group from '@/pages/management/commodity/group'
import Reserve from '@/pages/management/commodity/reserve'
import Catering from '@/pages/management/commodity/catering'
import Retail from '@/pages/management/commodity/retail'
import RetailAdd from '@/pages/management/commodity/retailAdd'
import ManagementCategory from '@/pages/management/storeFront/managementCategory'
import CategoryPanel from '@/pages/management/storeFront/categoryPanel'
import BasicInformation from '@/pages/setting/basicInformation'
import ShopAssistant from '@/pages/popularize/shopAssistant'
import List from '@/pages/popularize/shopAssistant/list'
import ScanList from '@/pages/popularize/shopAssistant/scanList'
import SaleList from '@/pages/popularize/shopAssistant/saleList'
import FansList from '@/pages/popularize/shopAssistant/fansList'


configure({ enforceActions: 'always' })

export default () => (
  <Provider {...store}>
    <BrowserRouter>
      <IconFont />
      <Route path="/" exact component={Index} />
      {/* 登录页面 */}
      <Route path="/login" component={Login} />
      {/* 钱包页面 -> wallet */}
      <Route path="/wallet" exact component={Wallet} />
      <Route path="/wallet/detail" component={WalletDetail} />
      {/* 管理页面 -> management */}
      <Route path="/management/storefront" exact component={StoreFront} />
      <Route path="/management/storefront/managementCategory" component={ManagementCategory} />
      <Route path="/management/storefront/categoryPanel" component={CategoryPanel} />
      <Route path="/management/member" exact component={Member} />
      <Route path="/management/member/miniProgram" component={MiniProgram} />
      <Route path="/management/member/publicMember" component={PublicMember} />
      <Route path="/management/member/coupon" component={Coupon} />
      <Route path="/management/commodity" exact component={Commodity} />
      <Route path="/management/commodity/group" component={Group} />
      <Route path="/management/commodity/reserve" component={Reserve} />
      <Route path="/management/commodity/catering" component={Catering} />
      <Route path="/management/commodity/retail" component={Retail} />
      <Route path="/management/commodity/retailAdd" component={RetailAdd} />
      {/* 基本信息 -> setting */}
      <Route path="/setting/basicInformation" component={BasicInformation} />
      {/* 商家推广 ->  popularize */}
      <Route path="/popularize/shopAssistant" exact component={ShopAssistant} />
      <Route path="/popularize/shopAssistant/list" component={List} />
      <Route path="/popularize/shopAssistant/scanList" component={ScanList} />
      <Route path="/popularize/shopAssistant/saleList" component={SaleList} />
      <Route path="/popularize/shopAssistant/fansList" component={FansList} />
    </BrowserRouter>
  </Provider>
)
