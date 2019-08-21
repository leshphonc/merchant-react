import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'
import utils from '@/utils'

class WalletStore {
  @observable wxConfig = {}

  @observable withdrawRecordList = []

  @observable withdrawRecordListPage = 1

  @observable withdrawRecordListSize = 10

  @observable withdrawRecordListTotal = null

  @observable addCreditList = []

  @observable addCreditListPage = 1

  @observable addCreditListSize = 10

  @observable addCreditListTotal = null

  @observable incomeList = []

  @observable incomeListPage = 1

  @observable incomeListSize = 10

  @observable incomeListTotal = null

  @observable incomeCategory = []

  @observable incomeStore = []

  @observable withDrawInfo = {}

  @action
  getWxCode = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const url = encodeURIComponent(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        response.data.result.appId
      }&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
  }

  @action
  createOrder = async money => {
    const response = await services.createOrder(money)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const code = utils.getUrlParam('code')
      const response2 = await services.checkOrder(
        response.data.result.order_id,
        response.data.result.type,
        code,
      )
      if (response2.data.errorCode === ErrorCode.SUCCESS) {
        if (response2.data.result.openid) {
          sessionStorage.setItem('openid', response2.data.result.openid)
        }
        const response3 = await services.goPay(
          response.data.result.order_id,
          response.data.result.type,
          'weixin',
          response2.data.result.openid || sessionStorage.getItem('openid'),
        )
        if (response3.data.errorCode === ErrorCode.SUCCESS) {
          runInAction(() => {
            this.wxConfig = response3.data.result.weixin_param
          })
        }
      }
    }
  }

  @action
  fetchWithdrawRecord = async type => {
    let hasMore = true
    if (this.withdrawRecordListTotal !== null) {
      hasMore = this.withdrawRecordListPage * this.withdrawRecordListSize < this.withdrawRecordListTotal
      if (hasMore) {
        this.withdrawRecordListPage += 1
      }
    }
    const response = await services.fetchWithdrawRecord(
      this.withdrawRecordListPage,
      this.withdrawRecordListSize,
      type,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.withdrawRecordList
          arr.push(...response.data.result.lists)
          this.withdrawRecordList = arr
          this.withdrawRecordListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.withdrawRecordListTotal % this.withdrawRecordListSize
        if (remainder) {
          runInAction(() => {
            this.withdrawRecordList.splice(this.withdrawRecordListTotal - remainder, remainder)
            const arr = this.withdrawRecordList
            arr.push(...response.data.result.lists)
            this.withdrawRecordList = arr
            this.withdrawRecordListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchWithdrawRecord = type => {
    runInAction(() => {
      this.withdrawRecordList = []
      this.withdrawRecordListPage = 1
      this.withdrawRecordListTotal = null
      this.fetchWithdrawRecord(type)
    })
  }

  @action
  fetchAddCreditRecord = async () => {
    let hasMore = true
    if (this.addCreditListTotal !== null) {
      hasMore = this.addCreditListPage * this.addCreditListSize < this.addCreditListTotal
      if (hasMore) {
        this.addCreditListPage += 1
      }
    }
    const response = await services.fetchAddCreditRecord(
      this.addCreditListPage,
      this.addCreditListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.addCreditList
          arr.push(...response.data.result.lists)
          this.addCreditList = arr
          this.addCreditListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.addCreditListTotal % this.addCreditListSize
        if (remainder) {
          runInAction(() => {
            this.addCreditList.splice(this.addCreditListTotal - remainder, remainder)
            const arr = this.addCreditList
            arr.push(...response.data.result.lists)
            this.addCreditList = arr
            this.addCreditListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchIncomeRecord = async (type, id, start, end) => {
    let hasMore = true
    if (this.incomeListTotal !== null) {
      hasMore = this.incomeListPage * this.incomeListSize < this.incomeListTotal
      if (hasMore) {
        this.incomeListPage += 1
      }
    }
    const response = await services.fetchIncomeRecord(
      this.incomeListPage,
      this.incomeListSize,
      type,
      id,
      start,
      end,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.incomeList
          arr.push(...response.data.result.lists)
          this.incomeList = arr
          this.incomeListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.incomeListTotal % this.incomeListSize
        if (remainder) {
          runInAction(() => {
            this.incomeList.splice(this.incomeListTotal - remainder, remainder)
            const arr = this.incomeList
            arr.push(...response.data.result.lists)
            this.incomeList = arr
            this.incomeListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchIncomeRecord = (type, id, start, end) => {
    runInAction(() => {
      this.incomeList = []
      this.incomeListPage = 1
      this.incomeListTotal = null
      this.fetchIncomeRecord(type, id, start, end)
    })
  }

  @action
  fetchIncomeCategoryList = async () => {
    const response = await services.fetchIncomeCategoryList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.incomeCategory = response.data.result
      })
    }
  }

  @action
  fetchIncomeStoreList = async () => {
    const response = await services.fetchIncomeStoreList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.incomeStore = response.data.result.store_list
      })
    }
  }

  @action
  fetchWithDrawInfo = async () => {
    const response = await services.fetchWithDrawInfo()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.withDrawInfo = response.data.result
      })
    }
  }

  @action
  withDraw = async payload => {
    const response = await services.withDraw(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new WalletStore()
