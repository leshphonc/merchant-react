import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MemberStore {
  @observable miniProgramList = []

  @observable miniProgramListPage = 1

  @observable miniProgramListSize = 10

  @observable miniProgramListTotal = null

  @observable publicList = []

  @observable publicListPage = 1

  @observable publicListSize = 10

  @observable publicListTotal = null

  @observable cardGroupList = []

  @observable cardGroupListPage = 1

  @observable cardGroupListSize = 10

  @observable cardGroupListTotal = null

  @observable cardGroupUsersList = []

  @observable cardGroupUsersListPage = 1

  @observable cardGroupUsersListSize = 10

  @observable cardGroupUsersListTotal = null

  @observable cardGroupUserInfo = {}

  @observable cardGroupUserInfoSelect = []

  @observable expensesRecordList = []

  @observable expensesRecordListPage = 1

  @observable expensesRecordListSize = 10

  @observable expensesRecordListTotal = null

  @observable couponList = []

  @observable couponListPage = 1

  @observable couponListSize = 10

  @observable couponListTotal = null

  @observable couponCategory = {}

  @observable couponPlatform = {}

  @observable couponCheckList = []

  @observable couponCheckListPage = 1

  @observable couponCheckListSize = 10

  @observable couponCheckListTotal = null

  @action
  fetchMiniProgramList = async () => {
    let hasMore = true
    if (this.miniProgramListTotal !== null) {
      hasMore = this.miniProgramListPage * this.miniProgramListSize < this.miniProgramListTotal
      if (hasMore) {
        this.miniProgramListPage += 1
      }
    }
    const response = await services.fetchMiniProgramList(
      this.miniProgramListPage,
      this.miniProgramListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.miniProgramList
          arr.push(...response.data.result.lists)
          this.miniProgramList = arr
          this.miniProgramListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.miniProgramListTotal % this.miniProgramListSize
        if (remainder) {
          runInAction(() => {
            this.miniProgramList.splice(this.miniProgramListTotal - remainder, remainder)
            const arr = this.miniProgramList
            arr.push(...response.data.result.lists)
            this.miniProgramList = arr
            this.miniProgramListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchPublicList = async () => {
    let hasMore = true
    if (this.publicListTotal !== null) {
      hasMore = this.publicListPage * this.publicListSize < this.publicListTotal
      if (hasMore) {
        this.publicListPage += 1
      }
    }
    const response = await services.fetchPublicList(this.publicListPage, this.publicListSize)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.publicList
          arr.push(...response.data.result.lists)
          this.publicList = arr
          this.publicListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.publicListTotal % this.publicListSize
        if (remainder) {
          runInAction(() => {
            this.publicList.splice(this.publicListTotal - remainder, remainder)
            const arr = this.publicList
            arr.push(...response.data.result.lists)
            this.publicList = arr
            this.publicListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchCardGroupList = async () => {
    let hasMore = true
    if (this.cardGroupListTotal !== null) {
      hasMore = this.cardGroupListPage * this.cardGroupListSize < this.cardGroupListTotal
      if (hasMore) {
        this.cardGroupListPage += 1
      }
    }
    const response = await services.fetchCardGroupList(
      this.cardGroupListPage,
      this.cardGroupListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.cardGroupList
          arr.push(...response.data.result.lists)
          this.cardGroupList = arr
          this.cardGroupListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.cardGroupListTotal % this.cardGroupListSize
        if (remainder) {
          runInAction(() => {
            this.cardGroupList.splice(this.cardGroupListTotal - remainder, remainder)
            const arr = this.cardGroupList
            arr.push(...response.data.result.lists)
            this.cardGroupList = arr
            this.cardGroupListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  operatingCardGroup = async (groupname, comment, discount, id) => {
    if (id) {
      const response = await services.modifyCardGroup(groupname, comment, discount, id)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        this.cardGroupList.forEach((item, index) => {
          if (item.id === id) {
            runInAction(() => {
              this.cardGroupList[index].name = groupname
              this.cardGroupList[index].des = comment
              this.cardGroupList[index].discount = discount
            })
          }
        })
      }
    } else {
      await services.insertCardGroup(groupname, comment, discount)
    }
  }

  @action
  fetchCardGroupUsers = async id => {
    let hasMore = true
    if (this.cardGroupUsersListTotal !== null) {
      hasMore = this.cardGroupUsersListPage * this.cardGroupUsersListSize < this.cardGroupUsersListTotal
      if (hasMore) {
        this.cardGroupUsersListPage += 1
      }
    }
    const response = await services.fetchCardGroupUsers(
      this.cardGroupUsersListPage,
      this.cardGroupUsersListSize,
      id,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.cardGroupUsersList
          arr.push(...response.data.result.lists)
          this.cardGroupUsersList = arr
          this.cardGroupUsersListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.cardGroupUsersListTotal % this.cardGroupUsersListSize
        if (remainder) {
          runInAction(() => {
            this.cardGroupUsersList.splice(this.cardGroupUsersListTotal - remainder, remainder)
            const arr = this.cardGroupUsersList
            arr.push(...response.data.result.lists)
            this.cardGroupUsersList = arr
            this.cardGroupUsersListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchCardGroupUserInfo = async id => {
    const response = await services.fetchCardGroupUserInfo(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cardGroupUserInfo = response.data.result
      })
    }
  }

  @action
  fetchCardGroupUserInfoSelect = async () => {
    const response = await services.fetchCardGroupUserInfoSelect()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cardGroupUserInfoSelect = response.data.result
      })
    }
  }

  @action
  modifyCardGroupUserInfo = async payload => {
    await services.modifyCardGroupUserInfo(payload)
  }

  @action
  fetchExpensesRecordList = async id => {
    let hasMore = true
    if (this.expensesRecordListTotal !== null) {
      hasMore = this.expensesRecordListPage * this.expensesRecordListSize < this.expensesRecordListTotal
      if (hasMore) {
        this.expensesRecordListPage += 1
      }
    }
    const response = await services.fetchExpensesRecordList(
      this.expensesRecordListPage,
      this.expensesRecordListSize,
      id,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.expensesRecordList
          arr.push(...response.data.result.lists)
          this.expensesRecordList = arr
          this.expensesRecordListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.expensesRecordListTotal % this.expensesRecordListSize
        if (remainder) {
          runInAction(() => {
            this.expensesRecordList.splice(this.expensesRecordListTotal - remainder, remainder)
            const arr = this.expensesRecordList
            arr.push(...response.data.result.lists)
            this.expensesRecordList = arr
            this.expensesRecordListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchCouponList = async () => {
    let hasMore = true
    if (this.couponListTotal !== null) {
      hasMore = this.couponListPage * this.couponListSize < this.couponListTotal
      if (hasMore) {
        this.couponListPage += 1
      }
    }
    const response = await services.fetchCouponList(this.couponListPage, this.couponListSize)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.couponList
          arr.push(...response.data.result.lists)
          this.couponList = arr
          this.couponListTotal = response.data.result.total - 0
          this.couponCategory = response.data.result.category
          this.couponPlatform = response.data.result.platform
        })
      } else {
        const remainder = this.couponListTotal % this.couponListSize
        if (remainder) {
          runInAction(() => {
            this.couponList.splice(this.couponListTotal - remainder, remainder)
            const arr = this.couponList
            arr.push(...response.data.result.lists)
            this.couponList = arr
            this.couponListTotal = response.data.result.total - 0
            this.couponCategory = response.data.result.category
            this.couponPlatform = response.data.result.platform
          })
        }
      }
    }
  }

  @action
  fetchCouponCheckList = async id => {
    let hasMore = true
    if (this.couponCheckListTotal !== null) {
      hasMore = this.couponCheckListPage * this.couponCheckListSize < this.couponCheckListTotal
      if (hasMore) {
        this.couponCheckListPage += 1
      }
    }
    const response = await services.fetchCouponCheckList(
      this.couponCheckListPage,
      this.couponCheckListSize,
      id,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.couponCheckList
          arr.push(...response.data.result.lists)
          this.couponCheckList = arr
          this.couponCheckListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.couponCheckListTotal % this.couponCheckListSize
        if (remainder) {
          runInAction(() => {
            this.couponCheckList.splice(this.couponCheckListTotal - remainder, remainder)
            const arr = this.couponCheckList
            arr.push(...response.data.result.lists)
            this.couponCheckList = arr
            this.couponCheckListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  changeCouponStatus = async (id, status) => {
    const response = await services.changeCouponStatus(id, status)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.couponList.forEach((item, index) => {
        if (item.coupon_id === id) {
          runInAction(() => {
            this.couponList[index].status = status !== '0' ? '1' : '0'
          })
        }
      })
    }
  }

  @action
  checkCouponCode = async (id, code) => {
    const response = await services.checkCouponCode(id, code)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.couponCheckList.forEach((item, index) => {
        if (item.id === id) {
          runInAction(() => {
            this.couponCheckList[index].is_use = '1'
          })
        }
      })
    }
  }
}

export default new MemberStore()
