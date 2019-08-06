import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class LoginSotre {
  @observable wxConfig

  @action
  login = async (account, password) => {
    const response = await services.login(account, password)
    console.log(response)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      localStorage.setItem('ticket', response.data.result.ticket)
      localStorage.setItem('merchant_user', JSON.stringify(response.data.result.user))
      this.getWxConfig()
    }
  }

  @action
  logout = async (account, password) => {
    const response = await services.login(account, password)
    console.log(response)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      localStorage.removeItem('ticket', response.data.result.ticket)
      localStorage.removeItem('merchant_user', JSON.stringify(response.data.result.user))
    }
  }

  @action
  getWxConfig = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.wxConfig = response.data.result
      })
    }
  }

  constructor() {
    this.wxConfig = {}
  }
}
export default new LoginSotre()
