import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class HomeStore {
  @observable echartData = []

  @observable indexData = {}

  @action
  fetchEchartData = async (type, date, search) => {
    const response = await services.fetchEchartData(type, date, search)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.echartData = response.data.result
      })
    }
  }

  @action
  fetchIndexData = async () => {
    const response = await services.fetchIndexData()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.indexData = response.data.result
      })
    }
  }
}

export default new HomeStore()
