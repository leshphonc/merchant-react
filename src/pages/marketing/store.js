import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MarketingStore {
  @observable marketingList = []

  @action
  fetchMarketingList = async () => {
    const response = await services.fetchMarketingList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.marketingList = response.data.result
      })
    }
  }
}

export default new MarketingStore()
