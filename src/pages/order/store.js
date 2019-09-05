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

  // 团购订单列表
  @observable groupOrderList = []

  @observable groupPage = 1

  @observable groupOrderTotal = null

  @observable groupOrderListSize = 10

  @observable groupOrderDetail = []

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

  // 获取团购订单列表
  @action
  fetchGroupOrderList = async (groupId, statu, findType, keyword) => {
    let hasMore = true
    if (this.groupOrderTotal !== null) {
      hasMore = this.groupPage * this.groupOrderListSize < this.groupOrderTotal
      if (hasMore) this.groupPage += 1
    }
    if (hasMore) {
      const response = await services.fetchGroupOrderList(
        groupId,
        this.groupPage,
        this.groupOrderListSize,
        statu,
        findType,
        keyword,
      )
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        if (hasMore) {
          runInAction(() => {
            this.groupOrderTotal = response.data.result.count - 0
            const arr = this.groupOrderList
            arr.push(...response.data.result.order_list)
            this.groupOrderList = arr
          })
        }
      } else {
        const remainder = this.groupOrderTotal % this.groupOrderListSize
        if (remainder) {
          runInAction(() => {
            this.groupOrderTotal = response.data.result.count - 0
            this.groupOrderList.splice(this.groupOrderTotal - remainder, remainder)
            const arr = this.groupOrderList
            arr.push(...response.data.result.order_list)
            this.groupOrderList = arr
          })
        }
      }
    }
  }

  // 重置团购订单列表
  @action
  resetAndFetchGroupOrderList = async (groupId, statu, findType, keyword) => {
    runInAction(() => {
      this.groupOrderList = []
      this.groupPage = 1
      this.groupOrderTotal = null
      this.fetchGroupOrderList(groupId, statu, findType, keyword)
    })
  }

  // 获取团购详情
  fetchGroupOrderDetai = async orderId => {
    const response = await services.fetchGroupOrderDetai(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupOrderDetail = response.data.result
      })
    }
  }

  // 团购快递
  modifyGroupExpress = async (expressType, expressId, orderId) => {
    const response = await services.modifyGroupExpress(expressType, expressId, orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 选择店铺
  modifyStore = async (orderId, storeId) => {
    const response = await services.modifyStore(orderId, storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new OrderStore()
