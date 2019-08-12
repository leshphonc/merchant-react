import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'
import utils from '@/utils'

class WalletStore {
  @observable wxConfig = {}

  @action
  getWxCode = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const url = encodeURIComponent(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        response.data.result.appId
      }&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
  }

  @action
  createOrder = async money => {
    const response = await services.createOrder(money)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const code = utils.getUrlParam('code')
      const response2 = await services.checkOrder(
        response.data.result.order_id,
        response.data.result.type,
        code,
      )
      if (response2.data.errorCode === ErrorCode.SUCCESS) {
        const response3 = await services.goPay(
          response.data.result.order_id,
          response.data.result.type,
          'weixin',
          response2.data.result.openid,
        )
        if (response3.data.errorCode === ErrorCode.SUCCESS) {
          runInAction(() => {
            this.wxConfig = response3.data.result.weixin_param
          })
        }
      }
    }
  }
}

export default new WalletStore()
