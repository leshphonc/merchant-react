import { observable, action, runInAction } from 'mobx'
import * as services from './services'

class BasicInformationSotre {
  @observable basicInfo

  @observable categoryOption

  @action
  fetchBasicInfo = async () => {
    const response = await services.fetchBasicInfo()
    if (response.data.errorCode === 0) {
      runInAction(() => {
        this.basicInfo = response.data.result.now_merchant
      })
    }
  }

  @action
  fetchCategory = async () => {
    const response = await services.fetchCategory()
    if (response.data.errorCode === 0) {
      runInAction(() => {
        this.categoryOption = response.data.result
      })
    }
  }

  constructor() {
    this.basicInfo = {}
    this.categoryOption = {}
  }
}
export default new BasicInformationSotre()
