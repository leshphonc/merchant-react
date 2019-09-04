import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class OrderStore {
  // 订单种类列表
  @observable orderList = []

  // 零售订单列表
  @observable shopOrderList = []

  // 团购订单列表
  @observable groupOrderList = []

  @observable groupPage = 1

  @observable groupOrderTotal = null

  // 获取订单种类列表
  @action
  fetchOrderList = async () => {
    const response = await services.fetchOrderList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.orderList = response.data.result
      })
    }
  }

  // 获取零售订单列表
  @action
  fetchShopOrderList = async () => {
    const response = await services.fetchShopOrderList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.shopOrderList = response.data.result
      })
    }
  }

  // 获取团购订单列表
  @action
  fetchGroupOrderList = async groupId => {
    let hasMore = true
    if (this.groupOrderTotal !== null) {
      hasMore = this.groupPage < this.groupOrderTotal
      if (hasMore) this.groupPage += 1
    }
    if (hasMore) {
      const response = await services.fetchGroupOrderList(groupId, this.groupPage, 10)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        runInAction(() => {
          const arr = this.groupOrderList
          arr.push(...response.data.result.lists)
          this.groupOrderList = arr
        })
      }
    }
  }
}

export default new OrderStore()
