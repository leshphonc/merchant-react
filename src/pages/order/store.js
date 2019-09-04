import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class OrderStore {
  // 订单种类列表
  @observable orderList = []

  // 零售订单列表
  @observable shopOrderList = []

  @observable shopOrderListPage = 1

  @observable shopOrderListSize = 10

  @observable shopOrderListTotal = null

  @observable shopOrderStatus = []

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
  fetchShopOrderList = async (status, paytype, searchtype, keyword) => {
    let hasMore = true
    if (this.shopOrderListTotal !== null) {
      hasMore = this.shopOrderListPage * this.shopOrderListSize < this.shopOrderListTotal
      if (hasMore) {
        this.shopOrderListPage += 1
      }
    }
    const response = await services.fetchShopOrderList(
      this.shopOrderListPage,
      this.shopOrderListSize,
      status,
      paytype,
      searchtype,
      keyword,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.shopOrderList
          arr.push(...response.data.result.lists)
          this.shopOrderList = arr
          this.shopOrderListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.shopOrderListTotal % this.shopOrderListSize
        if (remainder) {
          runInAction(() => {
            this.shopOrderList.splice(this.shopOrderListTotal - remainder, remainder)
            const arr = this.shopOrderList
            arr.push(...response.data.result.lists)
            this.shopOrderList = arr
            this.shopOrderListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  // 获取零售订单状态
  @action
  fetchShopOrderStatus = async () => {
    const response = await services.fetchShopOrderStatus()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.shopOrderStatus = response.data.result
      })
    }
  }

  // 重置页数请求零售列表
  @action
  resetAndFetchShopOrderList = async (status, paytype, searchtype, keyword) => {
    runInAction(() => {
      this.shopOrderList = []
      this.shopOrderListPage = 1
      this.shopOrderListTotal = null
      this.fetchShopOrderList(status, paytype, searchtype, keyword)
    })
  }
}

export default new OrderStore()
