import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class DistributionSotre {
  @observable eCommerceList = []

  @observable reserveList = []

  @observable groupList = []

  @action
  getECommerceList = async () => {
    const response = await services.getECommerceList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchReserveList = async () => {
    const response = await services.fetchReserveList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchGroupList = async () => {
    const response = await services.fetchGroupList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}
export default new DistributionSotre()
