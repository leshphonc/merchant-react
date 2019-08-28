import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable getGift = []

  @observable getGiftPage = 1

  @observable getGiftSize = 10

  @observable getGiftTotal = null

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
          const arr = this.scanList
          arr.push(...response.data.result.lists)
          this.scanList = arr
          this.getGiftTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.getGiftTotal % this.getGiftSize
        if (remainder) {
          runInAction(() => {
            this.scanList.splice(this.getGiftTotal - remainder, remainder)
            const arr = this.scanList
            arr.push(...response.data.result.lists)
            this.scanList = arr
            this.getGiftTotal = response.data.result.total - 0
          })
        }
      }
    }
  }
}
export default new MastSotre()
