import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class BasicInformationSotre {
  @observable basicInfo

  @observable categoryOption

  @observable logoUrl

  @observable imgUrl

  @action
  fetchBasicInfo = async () => {
    const response = await services.fetchBasicInfo()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.basicInfo = response.data.result.now_merchant
      })
    }
  }

  @action
  fetchCategory = async () => {
    const response = await services.fetchCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryOption = response.data.result
      })
    }
  }

  @action
  modifyPhone = async phone => {
    await services.updateInfo('phone', phone)
  }

  @action
  modifyEmail = async email => {
    await services.updateInfo('email', email)
  }

  @action
  modifyTimeout = async timeout => {
    const response = await services.updateInfo('group_express_outtime', timeout)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.basicInfo.group_express_outtime = timeout
      })
    }
  }

  @action
  modifyPermission = async permission => {
    const response = await services.updateInfo('is_offline', permission)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.basicInfo.is_offline = permission
      })
    }
  }

  @action
  modifyCategory = async arr => {
    if (!(arr[0] === this.basicInfo.cat_fid)) {
      const response = await services.updateInfo('cat_fid', arr[0])
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        runInAction(() => {
          const val = arr[0]
          this.basicInfo.cat_fid = val
        })
      }
    }
    if (!(arr[1] === this.basicInfo.cat_id)) {
      const response = await services.updateInfo('cat_id', arr[1])
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        runInAction(() => {
          const val = arr[1]
          this.basicInfo.cat_id = val
        })
      }
    }
  }

  @action
  modifyDescription = async val => {
    await services.updateInfo('txt_info', val)
  }

  @action
  modifyDetail = async html => {
    await services.updateInfo('content', html)
  }

  @action
  modifyLogoUrl = async url => {
    await services.updateInfo('service_ico', url)
  }

  @action
  modifyImgUrl = async url => {
    await services.updateInfo('pic_info', url)
  }

  @action
  getWxCode = async () => {
    const URL = decodeURIComponent(window.location.href)
    window.location.href = `http://cs.7youke.com/wap.php?c=Packapp&a=bind&referer=${URL}`
    // const response = await services.getWxCode(this.wxConfig.appId)
  }

  constructor() {
    this.basicInfo = {}
    this.categoryOption = []
    this.logoUrl = null
    this.imgUrl = null
  }
}
export default new BasicInformationSotre()
