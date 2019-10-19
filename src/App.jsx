import React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import store from '@/pages/store'
import { HashRouter, Route, Switch } from 'react-router-dom'
import IconFont from '@/assets/iconfont/iconfont'
import Index from '@/pages'
import Login from '@/pages/login'
import Order from '@/pages/order/orderRouter'
import Wallet from '@/pages/wallet'
import StoreFront from '@/pages/management/storeFront'
import Member from '@/pages/management/member'
import MiniProgram from '@/pages/management/member/miniProgram'
import PublicMember from '@/pages/management/member/publicMember'
import CardGroup from '@/pages/management/member/cardGroup'
import Coupon from '@/pages/management/member/coupon'
import Commodity from '@/pages/management/commodity'
import ShopManager from '@/pages/management/shopManager'
import SmartScreen from '@/pages/popularize/smartScreen'
import Distribution from '@/pages/popularize/distribution'
import BasicInformation from '@/pages/setting/basicInformation'
import SelfManagement from '@/pages/setting/selfManagement'
import UploadSingleImg from '@/common/UploadImg/Single'
import UploadMultipleImg from '@/common/UploadImg/Multiple'
import CoordinatePicker from '@/common/CoordinatePicker'

import ShopAssistant from '@/pages/popularize/shopAssistant'
import RedEnvelope from '@/pages/popularize/redEnvelope'
import GiftManagement from '@/pages/popularize/giftManagement'
import Specification from '@/common/Specification'
import NotFound from '@/common/NotFound'

// mobx严格模式 生产环境使用observed 开发使用always
configure({ enforceActions: 'always' })

export default () => (
  <Provider {...store}>
    <HashRouter>
      <IconFont />
      <Switch>
        {/* 首页 */}
        <Route path="/" exact component={Index} />
        {/* 登录页面 */}
        <Route path="/login" component={Login} />
        {/* 订单页面 */}
        <Route path="/order" component={Order} />
        {/* 钱包页面 -> wallet */}
        <Route path="/wallet" component={Wallet} />
        {/* 管理页面 -> management */}
        <Route path="/management/storefront" component={StoreFront} />
        <Route path="/management/member" exact component={Member} />
        <Route path="/management/member/miniProgram" component={MiniProgram} />
        <Route
          path="/management/member/publicMember"
          component={PublicMember}
        />
        <Route path="/management/member/cardGroup" component={CardGroup} />
        <Route path="/management/member/coupon" component={Coupon} />
        <Route path="/management/commodity" component={Commodity} />
        <Route path="/management/shopManager" component={ShopManager} />
        {/* 基本信息 -> setting */}
        <Route path="/setting/basicInformation" component={BasicInformation} />
        <Route path="/setting/selfManagement" component={SelfManagement} />
        {/* 商家推广 ->  popularize */}
        <Route path="/popularize/shopAssistant" component={ShopAssistant} />
        <Route path="/popularize/redEnvelope" component={RedEnvelope} />
        <Route path="/popularize/giftManagement" component={GiftManagement} />
        <Route path="/popularize/smartScreen" component={SmartScreen} />
        <Route path="/popularize/distribution" component={Distribution} />
        {/* 上传图片页面 */}
        <Route
          path="/uploadSingleImg/:title/:key/:ratio?"
          component={UploadSingleImg}
        />
        <Route
          path="/uploadMultipleImg/:title/:key/:ratio"
          component={UploadMultipleImg}
        />
        {/* 坐标拾取页面 */}
        <Route
          path="/coordinatePicker/:lng?/:lat?"
          component={CoordinatePicker}
        />
        {/* 规格属性 */}
        <Route path="/specification" component={Specification} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>
)
