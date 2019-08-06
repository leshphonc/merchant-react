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

  constructor() {
    this.miniProgramList = []
    this.miniProgramListPage = 1
    this.miniProgramListSize = 10
    this.miniProgramListTotal = null
    this.publicList = []
    this.publicListPage = 1
    this.publicListSize = 10
    this.publicListTotal = null
  }
}

export default new MemberStore()
