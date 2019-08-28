import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable getGift = []

  @observable getGiftPage = 1

  @observable getGiftSize = 10

  @observable getGiftTotal = null

  @observable getGiftDetail = {}

  @action
  fetchGetGift = async () => {
    let hasMore = true
    if (this.getGiftTotal !== null) {
      hasMore = this.getGiftPage * this.getGiftSize < this.getGiftTotal
      if (hasMore) {
        this.getGiftPage += 1
      }
    }
    const response = await services.fetchGetGift(this.getGiftPage, this.getGiftSize)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.getGift
          arr.push(...response.data.result.lists)
          this.getGift = arr
          this.getGiftTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.getGiftTotal % this.getGiftSize
        if (remainder) {
          runInAction(() => {
            this.getGift.splice(this.getGiftTotal - remainder, remainder)
            const arr = this.getGift
            arr.push(...response.data.result.lists)
            this.getGift = arr
            this.getGiftTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  addGift = async payload => {
    const response = await services.addGift(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyGift = async payload => {
    const response = await services.modifyGift(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchGetGiftDetail = async giftId => {
    const response = await services.fetchGetGiftDetail(giftId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getGiftDetail = response.data.result
      })
    }
  }
}
export default new MastSotre()
