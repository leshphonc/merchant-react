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

  @observable shopOrderDetail = {}

  @observable pickAddress = []

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

  // 重置页数请求零售订单列表
  @action
  resetAndFetchShopOrderList = async (status, paytype, searchtype, keyword) => {
    runInAction(() => {
      this.shopOrderList = []
      this.shopOrderListPage = 1
      this.shopOrderListTotal = null
      this.fetchShopOrderList(status, paytype, searchtype, keyword)
    })
  }

  // 获取零售订单详情
  @action
  fetchShopOrderDetail = async id => {
    const response = await services.fetchShopOrderDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.shopOrderDetail = response.data.result
      })
    }
  }

  // 活动自提地址
  @action
  fetchPickAddress = async id => {
    const response = await services.fetchPickAddress(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.pickAddress = response.data.result.pick_list
      })
    }
  }

  @action
  pickerAddress = async (id, pickId) => {
    const response = await services.pickerAddress(id, pickId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response.data)
    }
  }
}

export default new OrderStore()
