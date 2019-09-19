import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class HomeStore {
  @observable echartData = []

  @observable indexData = {}

  @observable storeList = []

  @action
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

  @action
  fetchIndexData = async () => {
    const response = await services.fetchIndexData()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.indexData = response.data.result
      })
    }
  }

  @action
  fetchStoreList = async id => {
    const response = await services.fetchStoreList(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeList = response.data.result.store_list
      })
    }
  }
}

export default new HomeStore()
