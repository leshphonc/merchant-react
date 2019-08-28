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
import ShopManager from '@/pages/management/shopManager'
import BasicInformation from '@/pages/setting/basicInformation'
import ShopAssistant from '@/pages/popularize/shopAssistant'
import UploadSingleImg from '@/common/UploadImg/Single'
import UploadMultipleImg from '@/common/UploadImg/Multiple'
import CoordinatePicker from '@/common/CoordinatePicker'

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
      <Route path="/management/commodity" component={Commodity} />
      <Route path="/management/shopManager" component={ShopManager} />
      {/* 基本信息 -> setting */}
      <Route path="/setting/basicInformation" component={BasicInformation} />
      {/* 商家推广 ->  popularize */}
      <Route path="/popularize/shopAssistant" component={ShopAssistant} />
      <Route path="/popularize/redEnvelope" component={RedEnvelope} />
      {/* 上传图片页面 */}
      <Route path="/uploadSingleImg/:title/:key/:ratio" component={UploadSingleImg} />
      <Route path="/uploadMultipleImg/:title/:key/:ratio" component={UploadMultipleImg} />
      {/* 坐标拾取页面 */}
      <Route path="/coordinatePicker/:lng?/:lat?" component={CoordinatePicker} />
    </HashRouter>
  </Provider>
)
