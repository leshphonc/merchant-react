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

  @observable expressList = []

  // 团购订单列表
  @observable groupOrderList = []

  @observable groupPage = 1

  @observable groupOrderTotal = null

  @observable groupOrderListSize = 10

  @observable groupOrderDetail = []

  @observable groupOrderPass = []

  // 预约订单列表
  @observable reservationOrderList = []

  @observable reservationOrderListPage = 1

  @observable reservationOrderListSize = 10

  @observable reservationOrderListTotal = null

  @observable reservationOrderDetail = {}

  @observable reservationCount = 0

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
  fetchShopOrderList = async (status, paytype, searchtype, stime, etime, keyword) => {
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
      stime,
      etime,
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
  resetAndFetchShopOrderList = async (status, paytype, searchtype, stime, etime, keyword) => {
    runInAction(() => {
      this.shopOrderList = []
      this.shopOrderListPage = 1
      this.shopOrderListTotal = null
    })
    await this.fetchShopOrderList(status, paytype, searchtype, stime, etime, keyword)
  }

  // 获取团购订单列表
  @action
  // eslint-disable-next-line camelcase
  fetchGroupOrderList = async (groupId, statu, findType, keyword, is_new) => {
    let hasMore = true
    // eslint-disable-next-line camelcase
    if (is_new) {
      this.shopOrderList = []
      this.shopOrderListPage = 1
      this.shopOrderListTotal = null
      hasMore = true
    } else if (this.groupOrderTotal !== null) {
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
    })
    await this.fetchGroupOrderList(groupId, statu, findType, keyword)
  }

  // 获取团购详情
  @action
  fetchGroupOrderDetai = async orderId => {
    const response = await services.fetchGroupOrderDetai(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupOrderDetail = response.data.result
      })
    }
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

  // 团购快递
  @action
  modifyGroupExpress = async (expressType, expressId, orderId, storeId) => {
    const response = await services.modifyGroupExpress(expressType, expressId, orderId, storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 团购获取核销码
  @action
  fecthGroupPassArray = async orderId => {
    const response = await services.fecthGroupPassArray(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupOrderPass = response.data.result
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

  // 团购全部核销
  @action
  verificGroupAll = async (orderId, storeId) => {
    const response = await services.verificGroupAll(orderId, storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 团购单个核销
  @action
  verificGroup = async (orderId, groupPass) => {
    const response = await services.verificGroup(orderId, groupPass)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 选择店铺
  @action
  modifyStore = async (orderId, storeId) => {
    const response = await services.modifyStore(orderId, storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 选择自提点
  @action
  pickerAddress = async (id, pickId) => {
    const response = await services.pickerAddress(id, pickId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchShopOrderDetail(id)
    }
  }

  // 发货到自提
  @action
  shipToSelfLifting = async id => {
    const response = await services.shipToSelfLifting(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchShopOrderDetail(id)
    }
  }

  // 确认消费
  @action
  confirmConsumption = async id => {
    const response = await services.confirmConsumption(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchShopOrderDetail(id)
    }
  }

  // 扫码确认消费
  @action
  scanCode = async id => {
    const response = await services.scanCode(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      await this.fetchShopOrderDetail(id)
      return Promise.resolve(true)
    }
  }

  // 取消订单
  @action
  cancelOrder = async id => {
    const response = await services.cancelOrder(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchShopOrderDetail(id)
    }
  }

  // 获取物流配送信息
  @action
  fetchExpressList = async id => {
    const response = await services.fetchExpressList(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressList = response.data.result
      })
    }
  }

  // 发货
  @action
  sendOrder = async (orderId, no, expressId) => {
    const response = await services.sendOrder(orderId, no, expressId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      await this.fetchShopOrderDetail(orderId)
      return Promise.resolve(true)
    }
  }

  // 获取预定订单列表
  @action
  fetchReservationOrderList = async (paytype, searchtype, startTime, endTime, keyword) => {
    let hasMore = true
    if (this.reservationOrderListTotal !== null) {
      hasMore = this.reservationOrderListPage * this.reservationOrderListSize < this.reservationOrderListTotal
      if (hasMore) {
        this.reservationOrderListPage += 1
      }
    }
    const response = await services.fetchReservationOrderList(
      this.reservationOrderListPage,
      this.reservationOrderListSize,
      paytype,
      searchtype,
      startTime,
      endTime,
      keyword,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.reservationOrderList
          arr.push(...response.data.result.lists)
          this.reservationOrderList = arr
          this.reservationOrderListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.reservationOrderListTotal % this.reservationOrderListSize
        if (remainder) {
          runInAction(() => {
            this.reservationOrderList.splice(this.reservationOrderListTotal - remainder, remainder)
            const arr = this.reservationOrderList
            arr.push(...response.data.result.lists)
            this.reservationOrderList = arr
            this.reservationOrderListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  // 重置页数请求预定订单列表
  @action
  resetAndFetchReservationOrderList = async (paytype, searchtype, startTime, endTime, keyword) => {
    runInAction(() => {
      this.reservationOrderList = []
      this.reservationOrderListPage = 1
      this.reservationOrderListTotal = null
    })
    await this.fetchReservationOrderList(paytype, searchtype, startTime, endTime, keyword)
  }

  // 获取预定订单详情
  @action
  fetchReservationOrderDetail = async id => {
    const response = await services.fetchReservationOrderDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.reservationOrderDetail = response.data.result
      })
    }
  }

  // 预定派单
  @action
  orderHandle = async (orderId, workerId) => {
    const response = await services.orderHandle(orderId, workerId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      await this.fetchReservationOrderDetail(orderId)
      return Promise.resolve(true)
    }
  }

  // 验证订单
  @action
  verifyHandle = async (orderId, workerId, payType, psw) => {
    const response = await services.verifyHandle(orderId, workerId, payType, psw)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      await this.fetchReservationOrderDetail(orderId)
      return Promise.resolve(true)
    }
  }

  // 单独获取预定订单数量
  @action
  fetchReservationOrderListCount = async () => {
    const response = await services.fetchReservationOrderListCount()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.reservationCount = response.data.result.total
      })
    }
  }
}

export default new OrderStore()
