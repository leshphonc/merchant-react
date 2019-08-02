import { action } from 'mobx'
import * as services from './services'

class LoginSotre {
  @action
  login = async (account, password) => {
    const response = await services.login(account, password)
    console.log(response)
    if (response.data.errorCode === 0) {
      localStorage.setItem('ticket', response.data.result.ticket)
      localStorage.setItem(
        'merchant_user',
        JSON.stringify(response.data.result.user),
      )
    }
  }

  @action
  logout = async (account, password) => {
    const response = await services.login(account, password)
    console.log(response)
    if (response.data.errorCode === 0) {
      localStorage.removeItem('ticket', response.data.result.ticket)
      localStorage.removeItem(
        'merchant_user',
        JSON.stringify(response.data.result.user),
      )
    }
  }
}
export default new LoginSotre()
