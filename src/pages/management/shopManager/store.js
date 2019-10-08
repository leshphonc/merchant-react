import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable staffList = []

  @observable staffDetail = {}

  @observable staffType = []

  @observable businessList = []

  @observable eCommerceValues = []

  @observable classify = []

  @observable classifyDetail = {}

  @observable getStaffRule = []

  @observable getSelStaffRule = []

  // 店员列表
  @action
  fetchStaffList = async () => {
    const response = await services.fetchStaffList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.staffList = response.data.result
      })
    }
  }

  // 店员删除
  @action
  fetchStaffDelete = async staffId => {
    await services.fetchStaffDelete(staffId)
  }

  @action
  fetchStaffDetail = async (storeId, staffId) => {
    const response = await services.fetchStaffDetail(storeId, staffId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.staffDetail = response.data.result
      })
    }
  }

  // 店员添加
  @action
  addECommerce = async payload => {
    const response = await services.addECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 店员编辑
  @action
  modifyECommerce = async payload => {
    const response = await services.modifyECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 店员类型
  fetchStaffType = async () => {
    const response = await services.fetchStaffType()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.staffType = response.data.result
      })
    }
  }

  // 所属连锁机构
  fetchBusinessList = async () => {
    const response = await services.fetchBusinessList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.businessList = response.data.result
      })
    }
  }

  // 商品店铺
  @action
  fetchECommerceValues = async () => {
    const response = await services.fetchECommerceValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceValues = response.data.result.store_list
      })
    }
  }

  // 管理分类列表
  fetchClassify = async () => {
    const response = await services.fetchClassify()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.classify = response.data.result
      })
    }
  }

  // 管理分类添加
  @action
  addClassify = async payload => {
    const response = await services.addClassify(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 管理分类编辑
  @action
  modifyClassify = async payload => {
    const response = await services.modifyClassify(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 分类详情
  @action
  fetchClassifyDetail = async id => {
    const response = await services.fetchClassifyDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.classifyDetail = response.data.result
      })
    }
  }

  // 分类删除
  @action
  fetchClassifyDelete = async id => {
    await services.fetchClassifyDelete(id)
  }

  // 调岗
  @action
  fetchRelocationPost = async (storeId, staffId) => {
    await services.fetchRelocationPost(storeId, staffId)
  }

  @action
  fetchGetStaffRule = async storeId => {
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    const response = await services.fetchGetStaffRule(storeId, mer_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getStaffRule = response.data.result
      })
    }
  }

  @action
  fetchGetSelStaffRule = async staffId => {
    const response = await services.fetchGetSelStaffRule(staffId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getSelStaffRule = response.data.result
      })
    }
  }

  @action
  setStaffRule = async payload => {
    const response = await services.setStaffRule(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}
export default new MastSotre()
