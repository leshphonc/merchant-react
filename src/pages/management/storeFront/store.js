import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class StoreFrontStore {
  @observable storeList = []

  @observable categoryList = []

  @observable categoryDetail = {}

  @observable storeDiscountList = []

  @observable storeDiscountDetail = {}

  @observable storeDetail = {}

  @observable cacheStore = {}

  @observable provinceOption = []

  @observable cityOption = []

  @observable areaOption = []

  @observable circleOption = []

  @action
  fetchStoreList = async type => {
    const response = await services.fetchStoreList(type)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeList = response.data.result.lists
      })
    }
  }

  @action
  fetchCategoryList = async (id, type) => {
    const response = await services.fetchCategoryList(id, type)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryList = response.data.result
      })
    }
  }

  @action
  fetchCategoryDetail = async (id, type, stid) => {
    const response = await services.fetchCategoryDetail(id, type, stid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryDetail = response.data.result
      })
    }
  }

  @action
  addCategory = async payload => {
    const response = await services.addCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyCategory = async payload => {
    const response = await services.addCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  deleteCategory = async (storeId, type, id) => {
    const response = await services.deleteCategory(storeId, type, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchStoreDiscountList = async id => {
    const response = await services.fetchStoreDiscountList(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDiscountList = response.data.result
      })
    }
  }

  @action
  fetchStoreDiscountDetail = async (id, cid) => {
    const response = await services.fetchStoreDiscountDetail(id, cid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDiscountDetail = response.data.result
      })
    }
  }

  @action
  addStoreDiscount = async payload => {
    const response = await services.addStoreDiscount(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyStoreDiscount = async payload => {
    const response = await services.modifyStoreDiscount(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchStoreDetail = async id => {
    const response = await services.fetchStoreDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDetail = response.data.result
      })
    }
  }

  @action
  cacheStoreDetail = async data => {
    this.cacheStore = data
  }

  @action
  saveLngLatAddress = async (lng, lat, address) => {
    this.cacheStore = {
      ...this.cacheStore,
      long: lng,
      lat,
      adress: address,
    }
  }

  @action
  fetchProvince = async () => {
    const response = await services.fetchProvince()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.provinceOption = response.data.result
      })
    }
  }

  @action
  fetchCity = async id => {
    const response = await services.fetchCity(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cityOption = response.data.result
      })
    }
  }

  @action
  fetchArea = async id => {
    const response = await services.fetchArea(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.areaOption = response.data.result
      })
    }
  }

  @action
  fetchCircle = async id => {
    const response = await services.fetchCircle(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.circleOption = response.data.result
      })
    }
  }
}

export default new StoreFrontStore()
