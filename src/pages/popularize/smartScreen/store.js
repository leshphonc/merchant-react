import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class SmartScreenStore {
  @observable iMax = []

  @observable charData = {}

  @action
  fetchIMax = async () => {
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    const response = await services.fetchIMax(mer_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.iMax = response.data.result
      })
    }
  }

  // 获取进店人数，展示echarts
  @action
  fetchUserCome = async () => {
    const response = await services.fetchUserCome()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response.data)
    }
  }
}

export default new SmartScreenStore()
