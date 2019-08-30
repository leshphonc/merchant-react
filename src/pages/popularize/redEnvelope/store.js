import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class RedEnvelopStore {
  @observable redEnvelopList = []

  @observable redEnvelopListPage = 1

  @observable redEnvelopListSize = 10

  @observable redEnvelopListTotal = null

  @observable getList = []

  @observable getListPage = 1

  @observable getListSize = 10

  @observable getListTotal = null

  @observable getRedPacket = {}


  @action
  fetchRedEnvelopList = async () => {
    let hasMore = true
    if (this.redEnvelopListTotal !== null) {
      hasMore = this.redEnvelopListPage * this.redEnvelopListSize < this.redEnvelopListTotal
      if (hasMore) {
        this.redEnvelopListPage += 1
      }
    }
    const response = await services.fetchRedEnvelopList(
      this.redEnvelopListPage,
      this.redEnvelopListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.redEnvelopList
          arr.push(...response.data.result.lists)
          this.redEnvelopList = arr
          this.redEnvelopListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.redEnvelopListTotal % this.redEnvelopListSize
        if (remainder) {
          runInAction(() => {
            this.redEnvelopList.splice(this.redEnvelopListTotal - remainder, remainder)
            const arr = this.redEnvelopList
            arr.push(...response.data.result.lists)
            this.redEnvelopList = arr
            this.redEnvelopListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchGetList = async id => {
    let hasMore = true
    // debugger
    if (this.getListTotal !== null) {
      hasMore = this.getListPage * this.getListSize < this.getListTotal
      if (hasMore) {
        this.getListPage += 1
      }
    }
    const response = await services.fetchGetList(
      this.getListPage,
      this.getListSize,
      id,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.getList
          arr.push(...response.data.result.lists)
          this.getList = arr
          this.getListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.getListTotal % this.getListSize
        if (remainder) {
          runInAction(() => {
            this.getList.splice(this.getListTotal - remainder, remainder)
            const arr = this.getList
            arr.push(...response.data.result.lists)
            this.getList = arr
            this.getListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchPacketDel = async id => {
    await services.fetchPacketDel(id)
  }

  @action
  fetchFabu = async id => {
    await services.fetchFabu(id)
  }

  @action
  fetchGetRedPacket = async id => {
    const response = await services.fetchGetRedPacket(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getRedPacket = response.data.result
      })
    }
  }

  @action
  addPacket = async payload => {
    const response = await services.addPacket(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyPacket = async payload => {
    const response = await services.modifyPacket(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new RedEnvelopStore()
