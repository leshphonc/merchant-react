import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class BasicInformationSotre {
  @observable basicInfo

  @observable categoryOption

  @observable asyncCascadeValue = []

  @observable provinceOption = []

  @observable cityOption = []

  @observable areaOption = []

  @observable pickLists = []

  @observable pickListsPage = 1

  @observable pickListsSize = 10

  @observable pickListsTotal = null

  @observable pickAddressDetail = {}

  @action
  fetchPickLists = async id => {
    let hasMore = true
    if (this.pickListsTotal !== null) {
      hasMore = this.pickListsPage * this.pickListsSize < this.pickListsTotal
      if (hasMore) {
        this.pickListsPage += 1
      }
    }
    const response = await services.fetchPickLists(this.pickListsPage, this.pickListsSize, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.pickLists
          arr.push(...response.data.result)
          this.pickLists = arr
          this.pickListsTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.pickListsTotal % this.pickListsSize
        if (remainder) {
          runInAction(() => {
            this.pickLists.splice(this.pickListsTotal - remainder, remainder)
            const arr = this.pickLists
            arr.push(...response.data.result)
            this.pickLists = arr
            this.pickListsTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndfetchPickLists = async () => {
    runInAction(() => {
      this.pickLists = []
      this.pickListsPage = 1
      this.pickListsTotal = null
    })
  }

  // @action
  // fetchPickLists = async id => {
  //   const response = await services.fetchPickLists(id)
  //   if (response.data.errorCode === ErrorCode.SUCCESS) {
  //     runInAction(() => {
  //       this.pickLists = response.data.result
  //     })
  //   }
  // }

  @action
  fetchSeePickPwd = async id => {
    await services.fetchSeePickPwd(id)
  }

  @action
  fetchPickAddressDel = async id => {
    await services.fetchPickAddressDel(id)
  }

  @action
  fetchPickAddressDetail = async id => {
    const response = await services.fetchPickAddressDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.pickAddressDetail = response.data.result
      })
    }
  }

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
  modifyCoordinate = async (lng, lat) => {
    await services.modifyCoordinate(lng, lat)
  }

  // @action
  // modifyCategory = async arr => {
  //   if (!(arr[0] === this.basicInfo.cat_fid)) {
  //     const response = await services.updateInfo('cat_fid', arr[0])
  //     if (response.data.errorCode === ErrorCode.SUCCESS) {
  //       runInAction(() => {
  //         const val = arr[0]
  //         this.basicInfo.cat_fid = val
  //       })
  //     }
  //   }
  //   if (!(arr[1] === this.basicInfo.cat_id)) {
  //     const response = await services.updateInfo('cat_id', arr[1])
  //     if (response.data.errorCode === ErrorCode.SUCCESS) {
  //       runInAction(() => {
  //         const val = arr[1]
  //         this.basicInfo.cat_id = val
  //       })
  //     }
  //   }
  // }

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
  modifyAddress = async address => {
    await services.updateInfo('adress', address)
  }

  constructor() {
    this.basicInfo = {}
    this.categoryOption = []
  }

   // 省市区级联
   @action
   fetchCascadeOption = async (provinceId, cityId, areaId) => {
     const asyncCascadeValue = [provinceId]
     const province = await services.fetchProvince()
     if (province.data.errorCode === ErrorCode.SUCCESS) {
       const city = await services.fetchCity(provinceId)
       if (city.data.errorCode === ErrorCode.SUCCESS) {
         const area = await services.fetchArea(cityId)
         if (area.data.errorCode === ErrorCode.SUCCESS) {
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

  // 获取省下的市区并且合并到现有对象
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

  // 获取省下的地区并且合并到现有对象
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

  // 省份列表
  @action
  fetchProvince = async () => {
    const response = await services.fetchProvince()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.provinceOption = response.data.result
      })
    }
  }

  // 市区列表
  @action
  fetchCity = async id => {
    const response = await services.fetchCity(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cityOption = response.data.result
      })
    }
  }

  // 区域列表
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
  addECommerce = async payload => {
    const response = await services.addECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑
  @action
  modifyECommerce = async payload => {
    const response = await services.modifyECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}
export default new BasicInformationSotre()
