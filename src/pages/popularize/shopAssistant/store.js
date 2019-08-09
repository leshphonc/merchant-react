import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable statisticsInfo = {}

  @observable selectValues = []

  @observable staffList = []

  @observable scanList = []

  @observable scanListPage = 1

  @observable scanListSize = 10

  @observable scanListTotal = null

  @observable saleList = []

  @observable saleListPage = 1

  @observable saleListSize = 10

  @observable saleListTotal = null

  @observable fansList = []

  @observable fansListPage = 1

  @observable fansListSize = 10

  @observable fansListTotal = null

  @action
  fetchStatisticsInfo = async (storeId, starttime, endtime) => {
    const response = await services.fetchStatisticsInfo(storeId, starttime, endtime)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.statisticsInfo = response.data.result
      })
    }
  }

  @action
  fetchSelectValues = async () => {
    const response = await services.fetchSelectValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.selectValues = response.data.result.stroe_list
      })
    }
  }

  @action
  fetchStaffList = async storeId => {
    const response = await services.fetchStaffList(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.staffList = response.data.result
      })
    }
  }

  @action
  fetchScanList = async (id, starttime, endtime) => {
    let hasMore = true
    if (this.scanListTotal !== null) {
      hasMore = this.scanListPage * this.scanListSize < this.scanListTotal
      if (hasMore) {
        this.scanListPage += 1
      }
    }
    const response = await services.fetchScanList(
      this.scanListPage,
      this.scanListSize,
      id,
      starttime,
      endtime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.scanList
          arr.push(...response.data.result.lists)
          this.scanList = arr
          this.scanListTotal = response.data.result.total - 0
        })
      }
    }
  }

  @action
  fetchSaleList = async (id, starttime, endtime) => {
    let hasMore = true
    if (this.saleListTotal !== null) {
      hasMore = this.saleListPage * this.saleListSize < this.saleListTotal
      if (hasMore) {
        this.saleListPage += 1
      }
    }
    const response = await services.fetchSaleList(
      this.saleListPage,
      this.saleListSize,
      id,
      starttime,
      endtime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.saleList
          arr.push(...response.data.result.lists)
          this.saleList = arr
          this.saleListTotal = response.data.result.total - 0
        })
      }
    }
  }

  @action
  fetchFansList = async (id, starttime, endtime) => {
    let hasMore = true
    if (this.fansListTotal !== null) {
      hasMore = this.fansListPage * this.fansListSize < this.fansListTotal
      if (hasMore) {
        this.fansListPage += 1
      }
    }
    const response = await services.fetchFansList(
      this.fansListPage,
      this.fansListSize,
      id,
      starttime,
      endtime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.fansList
          arr.push(...response.data.result.lists)
          this.fansList = arr
          this.fansListTotal = response.data.result.total - 0
        })
      }
    }
  }
}
export default new MastSotre()
