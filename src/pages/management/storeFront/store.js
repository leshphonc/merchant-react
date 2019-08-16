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

  @observable cascadeOption = []

  @observable asyncCascadeValue = []

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
    console.log(data)
    this.cacheStore = data
  }

  @action
  saveLngLatAddress = async (lng, lat) => {
    this.cacheStore = {
      ...this.cacheStore,
      long: lng,
      lat,
      // adress: address,
    }
  }

  @action
  fetchCascadeOption = async (provinceId, cityId, areaId) => {
    const asyncCascadeValue = [provinceId]
    const province = await services.fetchProvince()
    if (province.data.errorCode === ErrorCode.SUCCESS) {
      const city = await services.fetchCity(provinceId)
      if (city.data.errorCode === ErrorCode.SUCCESS) {
        const area = await services.fetchArea(cityId)
        if (area.data.errorCode === ErrorCode.SUCCESS) {
          const circle = await services.fetchCircle(areaId)
          if (circle.data.errorCode === ErrorCode.SUCCESS) {
            runInAction(() => {
              this.circleOption = circle.data.result
            })
          }
          const provinceData = province.data.result
          const cityData = city.data.result
          const areaData = area.data.result
          cityData.forEach(item => {
            if (item.value === cityId) {
              item.children = areaData
            }
          })
          provinceData.forEach(item => {
            if (item.value === provinceId) {
              item.children = cityData
            }
          })
          runInAction(() => {
            if (cityData.length) {
              asyncCascadeValue.push(cityId)
              if (areaData.length) asyncCascadeValue.push(areaId)
            }
            this.cascadeOption = provinceData
            this.asyncCascadeValue = asyncCascadeValue
          })
        }
      }
    }
  }

  @action
  fetchCityAndConcat = async provinceId => {
    let cityId = ''
    let areaId = ''
    const city = await services.fetchCity(provinceId)
    if (city.data.errorCode === ErrorCode.SUCCESS) {
      this.cascadeOption.forEach(async item => {
        if (item.value === provinceId) {
          runInAction(() => {
            item.children = city.data.result
          })
        }
      })
    }
    if (city.data.result.length) {
      cityId = city.data.result[0].value
      const area = await services.fetchArea(city.data.result[0].value)
      if (area.data.errorCode === ErrorCode.SUCCESS) {
        if (area.data.result.length) {
          areaId = area.data.result[0].value
          this.cascadeOption.forEach(async item => {
            if (item.value === provinceId) {
              runInAction(() => {
                item.children[0].children = area.data.result
              })
            }
          })
        }
      }
    }
    if (areaId) {
      return Promise.resolve([provinceId, cityId, areaId])
    }
    if (cityId) {
      return Promise.resolve([provinceId, cityId])
    }
    return Promise.resolve([provinceId])
  }

  @action
  fetchAreaAndConcat = async (provinceId, cityId) => {
    const response = await services.fetchArea(cityId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cascadeOption.forEach(item => {
          if (item.value === provinceId) {
            item.children.forEach(childItem => {
              if (childItem.value === cityId) {
                childItem.children = response.data.result
              }
            })
          }
        })
      })
      if (response.data.result.length) {
        return Promise.resolve([provinceId, cityId, response.data.result[0].value])
      }
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
    this.circleOption = []
    const response = await services.fetchCircle(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.circleOption = response.data.result
      })
    }
  }

  @action
  resetCircle = () => {
    this.circleOption = []
  }

  @action
  insertStoreFront = async payload => {
    const response = await services.insertStoreFront(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyStoreFront = async payload => {
    const response = await services.modifyStoreFront(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new StoreFrontStore()
