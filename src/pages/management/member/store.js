import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MemberStore {
  @observable miniProgramList

  @observable miniProgramListPage

  @observable miniProgramListSize

  @observable miniProgramListTotal

  @observable publicList

  @observable publicListPage

  @observable publicListSize

  @observable publicListTotal

  @observable cardGroupList

  @observable cardGroupListPage

  @observable cardGroupListSize

  @observable cardGroupListTotal

  @observable couponList

  @observable couponListPage

  @observable couponListSize

  @observable couponListTotal

  @observable couponCategory

  @observable couponPlatform

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
      }
    }
  }

  constructor() {
    this.miniProgramList = []
    this.miniProgramListPage = 1
    this.miniProgramListSize = 10
    this.miniProgramListTotal = null

    this.publicList = []
    this.publicListPage = 1
    this.publicListSize = 10
    this.publicListTotal = null

    this.cardGroupList = []
    this.cardGroupListPage = 1
    this.cardGroupListSize = 10
    this.cardGroupListTotal = null

    this.couponList = []
    this.couponListPage = 1
    this.couponListSize = 10
    this.couponListTotal = null
    this.couponCategory = {}
    this.couponPlatform = {}
  }
}

export default new MemberStore()
