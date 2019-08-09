import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class OrderStore {
  @observable orderList = []

  @action
  fetchOrderList = async () => {
    const response = await services.fetchOrderList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.orderList = response.data.result
      })
    }
  }
}

export default new OrderStore()
