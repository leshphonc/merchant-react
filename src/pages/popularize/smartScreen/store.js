import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class SmartScreenStore {
  @observable iMax = []

  @observable charData = {}

  @observable echartData = []

  @observable storeMer = []

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

  @action
  fetchStoreMer = async () => {
    const response = await services.fetchStoreMer()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeMer = response.data.result
      })
    }
  }

  fetchEchartData = async (type, date, search, id) => {
    if (date === '二级筛选') {
      date = ''
    }
    const response = await services.fetchEchartData(type, date, search, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.echartData = response.data.result
      })
    }
  }
}

export default new SmartScreenStore()
