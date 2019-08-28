import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class RedEnvelopStore {
  @observable redEnvelopList = []

  @observable redEnvelopListPage = 1

  @observable redEnvelopListSize = 10

  @observable redEnvelopListTotal = null

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
    debugger
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
}

export default new RedEnvelopStore()
