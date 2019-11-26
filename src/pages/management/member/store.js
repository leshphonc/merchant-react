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

  @observable publicListTotalNum = null

  @observable publicListSize = 10

  @observable publicListTotal = null

  @observable merFansList = []

  @observable merFansListPage = 1

  @observable merFansListTotalNum = null

  @observable merFansListSize = 10

  @observable merFansListTotal = null

  @observable userBuyList = []

  @observable userBuysListPage = 1

  @observable userBuyListTotalNum = null

  @observable userBuyListSize = 10

  @observable userBuyListTotal = null

  @observable userBehaviorList = []

  @observable uuserBehaviorListPage = 1

  @observable userBehaviorListTotalNum = null

  @observable userBehaviorListSize = 10

  @observable userBehaviorListTotal = null

  @observable buyFansList = []

  @observable buyFansListPage = 1

  @observable buyFansListTotalNum = null

  @observable buyFansListSize = 10

  @observable buyFansListTotal = null

  @observable cardGroupList = []

  @observable cardGroupListPage = 1

  @observable cardGroupListSize = 10

  @observable cardGroupListTotal = null

  @observable cardGroupDetail = {}

  @observable giftVoucher = []

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

  @observable fansTotal = []

  @action
  fetchMiniProgramList = async () => {
    let hasMore = true
    if (this.miniProgramListTotal !== null) {
      hasMore =
        this.miniProgramListPage * this.miniProgramListSize <
        this.miniProgramListTotal
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
            this.miniProgramList.splice(
              this.miniProgramListTotal - remainder,
              remainder,
            )
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
  resetFetchPublicList = async (beginTime, endTime) => {
    runInAction(() => {
      this.publicList = []
      this.publicListPage = 1
      this.publicListTotalNum = null
      this.publicListSize = 10
      this.publicListTotal = null
    })
    await this.fetchPublicList(beginTime, endTime)
  }

  @action
  fetchPublicList = async (beginTime, endTime) => {
    let hasMore = true
    if (this.publicListTotal !== null) {
      hasMore = this.publicListPage * this.publicListSize < this.publicListTotal
      if (hasMore) {
        this.publicListPage += 1
      }
    }
    const response = await services.fetchPublicList(
      this.publicListPage,
      this.publicListSize,
      beginTime,
      endTime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.publicList
          this.publicListTotalNum = response.data.result.total
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
      hasMore =
        this.cardGroupListPage * this.cardGroupListSize <
        this.cardGroupListTotal
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
            this.cardGroupList.splice(
              this.cardGroupListTotal - remainder,
              remainder,
            )
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
  resetCardGroupList = () => {
    runInAction(() => {
      this.cardGroupList = []
      this.cardGroupListPage = 1
      this.cardGroupListTotal = null
    })
  }

  @action
  operatingCardGroup = async (
    groupname,
    comment,
    discount,
    effdays,
    give,
    id,
  ) => {
    if (id) {
      const response = await services.modifyCardGroup(
        groupname,
        comment,
        discount,
        id,
        effdays,
        give,
      )
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
        return Promise.resolve(true)
      }
    } else {
      const response = await services.insertCardGroup(
        groupname,
        comment,
        discount,
        effdays,
        give,
      )
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        return Promise.resolve(true)
      }
    }
  }

  @action
  fetchCardGroupDetail = async id => {
    const response = await services.fetchCardGroupDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cardGroupDetail = response.data.result
      })
    }
  }

  @action
  fetchGiftVoucher = async () => {
    const response = await services.fetchGiftVoucher()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftVoucher = response.data.result
      })
    }
  }

  @action
  fetchCardGroupUsers = async id => {
    let hasMore = true
    if (this.cardGroupUsersListTotal !== null) {
      hasMore =
        this.cardGroupUsersListPage * this.cardGroupUsersListSize <
        this.cardGroupUsersListTotal
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
        const remainder =
          this.cardGroupUsersListTotal % this.cardGroupUsersListSize
        if (remainder) {
          runInAction(() => {
            this.cardGroupUsersList.splice(
              this.cardGroupUsersListTotal - remainder,
              remainder,
            )
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
      hasMore =
        this.expensesRecordListPage * this.expensesRecordListSize <
        this.expensesRecordListTotal
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
        const remainder =
          this.expensesRecordListTotal % this.expensesRecordListSize
        if (remainder) {
          runInAction(() => {
            this.expensesRecordList.splice(
              this.expensesRecordListTotal - remainder,
              remainder,
            )
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
    const response = await services.fetchCouponList(
      this.couponListPage,
      this.couponListSize,
    )
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
      hasMore =
        this.couponCheckListPage * this.couponCheckListSize <
        this.couponCheckListTotal
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
            this.couponCheckList.splice(
              this.couponCheckListTotal - remainder,
              remainder,
            )
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
  ResetCouponCheckList = async () => {
    runInAction(() => {
      this.couponCheckList = []
      this.couponCheckListPage = 1
      this.couponCheckListTotal = null
    })
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
  checkCouponCode = async (id, code, splice) => {
    const response = await services.checkCouponCode(id, code, splice)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.couponCheckList.forEach((item, index) => {
        if (splice) {
          if (item.id === id) {
            runInAction(() => {
              this.couponCheckList[index].is_use = '1'
            })
          }
        } else {
          const realId = code.split('d')[0]
          if (item.id === realId) {
            runInAction(() => {
              this.couponCheckList[index].is_use = '1'
            })
          }
        }
      })
      return Promise.resolve(true)
    }
  }

  @action
  fetchFansTotal = async (beginTime, endTime) => {
    const response = await services.fetchMiniProgramList(1, 10)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const response2 = await services.fetchPublicList(
        1,
        10,
        beginTime,
        endTime,
      )
      if (response2.data.errorCode === ErrorCode.SUCCESS) {
        const response3 = await services.fetchMerFansList(
          1,
          10,
          beginTime,
          endTime,
        )
        if (response3.data.errorCode === ErrorCode.SUCCESS) {
          const response4 = await services.fetchBuyList(1, beginTime, endTime)
          if (response4.data.errorCode === ErrorCode.SUCCESS) {
            runInAction(() => {
              this.fansTotal = {
                mini: response.data.result.total,
                public: response2.data.result.total,
                merTotal: response3.data.result.total,
                saleTotal: response4.data.result.total,
              }
            })
          }
        }
      }
    }
  }
  @action
  resetFetchMerFansList = async (beginTime, endTime) => {
    runInAction(() => {
      this.merFansList = []
      this.merFansListPage = 1
      this.merFansListTotalNum = null
      this.merFansListSize = 10
      this.merFansListTotal = null
    })
    await this.fetchMerFansList(beginTime, endTime)
  }

  @action
  fetchMerFansList = async (beginTime, endTime) => {
    let hasMore = true
    if (this.merFansListTotal !== null) {
      hasMore =
        this.merFansListPage * this.merFansListSize < this.merFansListTotal
      if (hasMore) {
        this.merFansListPage += 1
      }
    }
    const response = await services.fetchMerFansList(
      this.merFansListPage,
      this.merFansListSize,
      beginTime,
      endTime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.merFansList
          this.merFansListTotalNum = response.data.result.total
          arr.push(...response.data.result.list)
          this.merFansList = arr
          this.merFansListTotal = response.data.result.total - 0
        })
      }
    }
  }

  // 重置消费用户列表
  @action
  resetFetchBuyList = async (beginTime, endTime) => {
    runInAction(() => {
      this.buyFansList = []
      this.buyFansListPage = 1
      this.buyFansListTotalNum = null
      this.buyFansListSize = 10
      this.buyFansListTotal = null
    })
    await this.fetchBuyList(beginTime, endTime)
  }

  // 消费用户列表
  @action
  fetchBuyList = async (beginTime, endTime) => {
    let hasMore = true
    if (this.buyFansListTotal !== null) {
      hasMore =
        this.buyFansListPage * this.buyFansListSize < this.buyFansListTotalNum
      if (hasMore) {
        this.buyFansListPage += 1
      }
    }
    const response = await services.fetchBuyList(
      this.buyFansListPage,
      // this.buyFansListSize,
      beginTime,
      endTime,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.buyFansList
          this.buyFansListTotalNum = response.data.result.total
          arr.push(...response.data.result.lists)
          this.buyFansList = arr
          this.buyFansListTotal = response.data.result.total - 0
        })
      }
    }
  }

  // 重置用户消费列表
  @action
  resetFetchUserBuyList = async (beginTime, endTime, uid) => {
    runInAction(() => {
      this.userBuyList = []
      this.userBuysListPage = 1
      this.userBuyListTotalNum = null
      this.userBuyListSize = 10
      this.userBuyListTotal = null
    })
    await this.fetchUserBuyList(beginTime, endTime, uid)
  }

  // 用户消费列表
  @action
  fetchUserBuyList = async (beginTime, endTime, uid) => {
    let hasMore = true
    if (this.userBuyListTotal !== null) {
      hasMore =
        this.userBuysListPage * this.userBuyListSize < this.userBuyListTotalNum
      if (hasMore) {
        this.userBuysListPage += 1
      }
    }
    const response = await services.fetchUserBuyList(
      this.userBuysListPage,
      // this.buyFansListSize,
      beginTime,
      endTime,
      uid,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.userBuyList
          this.userBuyListTotalNum = response.data.result.total
          arr.push(...response.data.result.lists)
          this.userBuyList = arr
          this.userBuyListTotal = response.data.result.total - 0
        })
      }
    }
  }

  // 重置用户行为
  @action
  resetFetchUserBehavior = async uid => {
    runInAction(() => {
      this.userBehaviorList = []
      this.uuserBehaviorListPage = 1
      this.userBehaviorListTotalNum = null
      this.userBehaviorListSize = 10
      this.userBehaviorListTotal = null
    })
    await this.fetchUserBehavior(uid)
  }

  // 获取用户行为
  @action
  fetchUserBehavior = async uid => {
    let hasMore = true
    if (this.userBehaviorListTotal !== null) {
      hasMore =
        this.uuserBehaviorListPage * this.userBehaviorListSize <
        this.userBehaviorListTotalNum
      if (hasMore) {
        this.uuserBehaviorListPage += 1
      }
    }
    const response = await services.fetchUserBehavior(
      uid,
      this.uuserBehaviorListPage,
      this.userBehaviorListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.userBehaviorList
          this.userBehaviorListTotalNum = response.data.result.total
          arr.push(...response.data.result.behavior_list)
          this.userBehaviorList = arr
          this.userBehaviorListTotal = response.data.result.total - 0
        })
      }
    }
  }

  // 领卡会员列表
  @action
  getMemberCardList = async page => {
    return new Promise(async resolve => {
      const response = await services.getMemberCardList(page)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  @action
  createMemberCard = async payload => {
    return new Promise(async resolve => {
      const response = await services.createMemberCard(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  readMemberCardBasicInfoDetail = async () => {
    return new Promise(async resolve => {
      const response = await services.readMemberCardBasicInfoDetail()
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  @action
  memberCardBasicInfo = async payload => {
    return new Promise(async resolve => {
      const response = await services.memberCardBasicInfo(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  updateCardBasicInfo = async payload => {
    return new Promise(async resolve => {
      const response = await services.updateCardBasicInfo(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  updateCardOtherInfo = async payload => {
    return new Promise(async resolve => {
      const response = await services.updateCardOtherInfo(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  updateCardWxInfo = async payload => {
    return new Promise(async resolve => {
      const response = await services.updateCardWxInfo(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  getMemberCardRecord = async (id, page = 1) => {
    return new Promise(async resolve => {
      const response = await services.getMemberCardRecord(id, page)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  @action
  readCouponDetail = async id => {
    return new Promise(async resolve => {
      const response = await services.readCouponDetail(id)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  @action
  updateCoupon = async payload => {
    return new Promise(async resolve => {
      const response = await services.updateCoupon(payload)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve()
      }
    })
  }

  @action
  getColorList = async () => {
    return new Promise(async resolve => {
      const response = await services.getColorList()
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  @action
  getCategoryList = async () => {
    return new Promise(async resolve => {
      const response = await services.getCategoryList()
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }
}

export default new MemberStore()
