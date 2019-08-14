import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class StoreFrontStore {
  @observable storeList = []

  @observable categoryList = []

  @action
  fetchStoreList = async type => {
    const response = await services.fetchStoreList(type)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeList = response.data.result.lists
      })
    }
  }

  @action
  fetchCategoryList = async (id, type) => {
    const response = await services.fetchCategoryList(id, type)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryList = response.data.result
      })
    }
  }
}

export default new StoreFrontStore()
