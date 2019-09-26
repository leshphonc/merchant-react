import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

import login from '@/pages/login/store'
import home from '@/pages/home/store'
import order from '@/pages/order/store'
import wallet from '@/pages/wallet/store'
import storeFront from '@/pages/management/storeFront/store'
import marketing from '@/pages/marketing/store'
import basicInformation from '@/pages/setting/basicInformation/store'
import selfManagement from '@/pages/setting/selfManagement/store'
import shopAssistant from '@/pages/popularize/shopAssistant/store'
import smartScreen from '@/pages/popularize/smartScreen/store'
import member from '@/pages/management/member/store'
import commodity from '@/pages/management/commodity/store'
import shopManager from '@/pages/management/shopManager/store'
import redEnvelop from '@/pages/popularize/redEnvelope/store'
import giftManagement from '@/pages/popularize/giftManagement/store'

class CommonStore {
  @observable openid = ''

  // 获取微信code
  @action
  getWxCode = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const url = encodeURIComponent(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${response.data.result.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
  }

  // 用code换取openid
  @action
  fetchOpenId = async code => {
    const response = await services.fetchOpenId(code)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.openid = response.data.result
      })
      return Promise.resolve(true)
    }
  }
}

const stores = {
  common: new CommonStore(),
  login,
  home,
  order,
  wallet,
  storeFront,
  marketing,
  basicInformation,
  selfManagement,
  shopAssistant,
  member,
  redEnvelop,
  commodity,
  shopManager,
  giftManagement,
  smartScreen,
}
export default stores
