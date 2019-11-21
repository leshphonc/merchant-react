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

  @observable minPrice = 0

  @observable bankAps = []

  @observable bankApsPage = 1

  @observable bankApsTotal = null

  @observable bankAccount = []

  @observable serviceCharge = ''

  @observable codeLock = ''

  @observable withDrawList = []

  @observable withDrawListPage = 1

  @observable withDrawListSize = 10

  @observable withDrawListTotal = null

  @observable userConfig = []

  @action
  getWxCode = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const url = encodeURIComponent(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${response.data.result.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
  }

  @action
  getUID = async id => {
    const response = await services.getUID(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
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
  createOrderForApp = async money => {
    const response = await services.createOrder(money)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve({
        order_id: response.data.result.order_id,
        order_type: response.data.result.type,
      })
    }
  }

  @action
  fetchWithdrawRecord = async type => {
    let hasMore = true
    if (this.withdrawRecordListTotal !== null) {
      hasMore =
        this.withdrawRecordListPage * this.withdrawRecordListSize <
        this.withdrawRecordListTotal
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
        const remainder =
          this.withdrawRecordListTotal % this.withdrawRecordListSize
        if (remainder) {
          runInAction(() => {
            this.withdrawRecordList.splice(
              this.withdrawRecordListTotal - remainder,
              remainder,
            )
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
      hasMore =
        this.addCreditListPage * this.addCreditListSize <
        this.addCreditListTotal
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
            this.addCreditList.splice(
              this.addCreditListTotal - remainder,
              remainder,
            )
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

  // 获取账户可提现信息
  @action
  fetchMinPrice = async () => {
    const response = await services.fetchMinPrice()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        const min = response.data.result.find(
          item => item.name === 'min_withdraw_money',
        )
        const service = response.data.result.find(
          item => item.name === 'company_pay_mer_percent',
        )
        this.minPrice = min ? min.value : 0
        this.serviceCharge = service ? service.value : 0
      })
    }
  }

  @action
  fetchBankAps = async (bank, province, city, key) => {
    if (this.bankApsPage * 10 > this.bankApsTotal) {
      return false
    }
    runInAction(() => {
      this.bankApsPage = this.bankApsPage - 0 + 1
    })
    const response = await services.fetchBankAps(
      this.bankApsPage,
      bank,
      province,
      city,
      key,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        const arr = this.bankAps
        arr.push(...response.data.result.record)
        this.bankAps = arr
        this.bankApsPage = this.bankApsPage + 1
        this.bankApsTotal = response.data.result.totalcount
      })
    }
  }

  @action
  resetAndFetchBankAps = async (bank, province, city, key) => {
    const response = await services.fetchBankAps(1, bank, province, city, key)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.bankAps = response.data.result.record
        this.bankApsPage = response.data.result.page
        this.bankApsTotal = response.data.result.totalcount
      })
    }
  }

  // 绑定银行卡获取手机验证码
  @action
  bindBankCard = async payload => {
    const response = await services.bindBankCard(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 输入验证码
  @action
  verCode = async payload => {
    const response = await services.verCode(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 解绑银行卡
  @action
  unBindBank = async () => {
    const response = await services.unBindBank()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 银行创建账户
  @action
  createAccount = async () => {
    const response = await services.createAccount()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取银行卡可提现余额
  @action
  fetchBankBalance = async () => {
    const response = await services.fetchBankBalance()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.bankAccount = response.data.result.AcctArray
      })
    }
  }

  // 获取提现验证码
  @action
  getBankWithDrawCode = async real => {
    const response = await services.getBankWithDrawCode(real)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.codeLock = response.data.result
      })
    }
  }

  // 银行卡提现
  @action
  bankWithDraw = async payload => {
    const response = await services.bankWithDraw(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 银行卡提现记录
  @action
  fetchWithDrawRecord = async first => {
    if (first) {
      runInAction(() => {
        this.withDrawListPage = 1
      })
    } else if (this.withDrawListPage * 10 < this.withDrawListTotal) {
      runInAction(() => {
        this.withDrawListPage += 1
      })
    } else {
      return false
    }
    const response = await services.fetchWithDrawRecord(this.withDrawListPage)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (this.withDrawListPage === 1) {
          this.withDrawList = response.data.result.list
          this.withDrawListTotal = response.data.result.count
        } else {
          const list = this.withDrawList
          this.withDrawList = [...list, ...response.data.result.list]
          this.withDrawListTotal = response.data.result.count
        }
      })
    }
  }

  // 获取平安权限
  @action
  getUserConfig = async () => {
    const response = await services.getUserConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.userConfig = response.data.result
      })
    }
  }
}

export default new WalletStore()
