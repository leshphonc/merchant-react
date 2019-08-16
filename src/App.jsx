import React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import store from '@/pages/store'
import { HashRouter, Route } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import Wallet from '@/pages/wallet'
import StoreFront from '@/pages/management/storeFront'
import Member from '@/pages/management/member'
import MiniProgram from '@/pages/management/member/miniProgram'
import PublicMember from '@/pages/management/member/publicMember'
import CardGroup from '@/pages/management/member/cardGroup'
import Coupon from '@/pages/management/member/coupon'
import Commodity from '@/pages/management/commodity'
import Group from '@/pages/management/commodity/group'
import GroupAdd from '@/pages/management/commodity/groupAdd'
import GroupEdit from '@/pages/management/commodity/groupEdit'
import GroupMealAdd from '@/pages/management/commodity/groupMealAdd'
import Reserve from '@/pages/management/commodity/reserve'
import ReserveAdd from '@/pages/management/commodity/reserveAdd'
import ReserveEdit from '@/pages/management/commodity/reserveEdit'
import Catering from '@/pages/management/commodity/catering'
import CateringAdd from '@/pages/management/commodity/cateringAdd'
import Retail from '@/pages/management/commodity/retail'
import RetailAdd from '@/pages/management/commodity/retailAdd'
import ShopManager from '@/pages/management/shopManager'
import ShopAdd from '@/pages/management/shopManager/shopAdd'
import ShopEdit from '@/pages/management/shopManager/shopEdit'
import BasicInformation from '@/pages/setting/basicInformation'
import ShopAssistant from '@/pages/popularize/shopAssistant'

import RedEnvelope from '@/pages/popularize/redEnvelope'

// mobx严格模式 生产环境使用observed 开发使用always
configure({ enforceActions: 'always' })

export default () => (
  <Provider {...store}>
    <HashRouter>
      <IconFont />
      <Route path="/" exact component={Index} />
      {/* 登录页面 */}
      <Route path="/login" component={Login} />
      {/* 钱包页面 -> wallet */}
      <Route path="/wallet" component={Wallet} />
      {/* 管理页面 -> management */}
      <Route path="/management/storefront" component={StoreFront} />
      <Route path="/management/member" exact component={Member} />
      <Route path="/management/member/miniProgram" component={MiniProgram} />
      <Route path="/management/member/publicMember" component={PublicMember} />
      <Route path="/management/member/cardGroup" component={CardGroup} />
      <Route path="/management/member/coupon" component={Coupon} />
      <Route path="/management/commodity" exact component={Commodity} />
      <Route path="/management/commodity/group" component={Group} />
      <Route path="/management/commodity/groupAdd" component={GroupAdd} />
      <Route path="/management/commodity/groupEdit" component={GroupEdit} />
      <Route path="/management/commodity/groupMealAdd" component={GroupMealAdd} />
      <Route path="/management/commodity/reserve" component={Reserve} />
      <Route path="/management/commodity/reserveAdd" component={ReserveAdd} />
      <Route path="/management/commodity/reserveEdit" component={ReserveEdit} />
      <Route path="/management/commodity/catering" component={Catering} />
      <Route path="/management/commodity/cateringAdd" component={CateringAdd} />
      <Route path="/management/commodity/retail" component={Retail} />
      <Route path="/management/commodity/retailAdd" component={RetailAdd} />
      <Route path="/management/shopManager" exact component={ShopManager} />
      <Route path="/management/shopManager/shopAdd" component={ShopAdd} />
      <Route path="/management/shopManager/shopEdit" component={ShopEdit} />
      {/* 基本信息 -> setting */}
      <Route path="/setting/basicInformation" component={BasicInformation} />
      {/* 商家推广 ->  popularize */}
      <Route path="/popularize/shopAssistant" component={ShopAssistant} />
      <Route path="/popularize/redEnvelope" component={RedEnvelope} />
    </HashRouter>
  </Provider>
)
