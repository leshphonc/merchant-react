import { observable, action } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class HomeStore {
  @observable echartData = []

  @action
  fetchEchartData = async date => {
    const response = await services.fetchEchartData(date)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response)
    }
  }
}

export default new HomeStore()
