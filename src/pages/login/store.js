import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class LoginSotre {
  @observable wxConfig = null

  @action
  login = async (account, password) => {
    const response = await services.login(account, password)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      localStorage.setItem('ticket', response.data.result.ticket)
      localStorage.setItem('merchant_user', JSON.stringify(response.data.result.user))
      sessionStorage.setItem('currentTab', 'home')
      const response2 = await services.getWxConfig()
      if (response2.data.errorCode === ErrorCode.SUCCESS) {
        runInAction(() => {
          this.wxConfig = response2.data.result
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response2.data.result.appId, // 必填，公众号的唯一标识
            timestamp: response2.data.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: response2.data.result.nonceStr, // 必填，生成签名的随机串
            signature: response2.data.result.signature, // 必填，签名
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'scanQRCode',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getLocation',
              'openLocation',
              'getNetworkType',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'translateVoice',
              'requireSoterBiometricAuthentication',
              'getSupportSoter',
              'addCard',
              'chooseCard',
              'openCard',
              'hideAllNonBaseMenuItem',
              'chooseWXPay',
            ], // 必填，需要使用的JS接口列表
          })
        })
      }
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  }

  @action
  logout = async (account, password) => {
    const response = await services.login(account, password)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      localStorage.removeItem('ticket', response.data.result.ticket)
      localStorage.removeItem('merchant_user', JSON.stringify(response.data.result.user))
    }
  }
}
export default new LoginSotre()
