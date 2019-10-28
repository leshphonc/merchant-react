import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class StoreFrontStore {
  @observable storeList = []

  @observable storeDetail = {}

  @observable cacheStore = {}

  @observable storeBusiness = []

  @observable categoryList = []

  @observable categoryDetail = {}

  @observable storeDiscountList = []

  @observable storeDiscountDetail = {}

  @observable cascadeOption = []

  @observable asyncCascadeValue = []

  @observable provinceOption = []

  @observable cityOption = []

  @observable areaOption = []

  @observable circleOption = []

  @observable marketOption = []

  @observable eCommerceDetail = {}

  @observable takeawayDetail = {}

  @observable qrCode = ''

  @observable allCategory = []

  @observable authFiles = []

  @observable authStatus = '0'

  @observable levelOption = []

  @observable storeCommodityForSale = []

  @observable storeCommodityForSalePage = 1

  @observable storePackageForSale = []

  @observable storePackageForSalePage = 1

  @observable unBindstoreCommodityForSale = []

  @observable unBindstoreCommodityForSalePage = 1

  @observable unBindstorePackageForSale = []

  @observable unBindstorePackageForSalePage = 1

  @observable storeECommerceForSale = []

  @observable storeECommerceForSalePage = 1

  @observable unBindstoreECommerceForSale = []

  @observable unBindstoreECommerceForSalePage = 1

  // 商铺列表
  @action
  fetchStoreList = async () => {
    const response = await services.fetchStoreList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeList = response.data.result
      })
    }
  }

  // 商铺详情
  @action
  fetchStoreDetail = async id => {
    const response = await services.fetchStoreDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDetail = response.data.result
      })
    }
  }

  // 新增商铺
  @action
  insertStoreFront = async payload => {
    const response = await services.insertStoreFront(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑商铺
  @action
  modifyStoreFront = async payload => {
    const response = await services.modifyStoreFront(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 商铺业务列表
  @action
  fetchBusinessList = async id => {
    const response = await services.fetchBusinessList(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeBusiness = response.data.result
      })
    }
  }

  // 获取店铺全部分类
  @action
  fetchAllCategory = async () => {
    const response = await services.fetchAllCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.allCategory = response.data.result
      })
    }
  }

  // 分类列表
  @action
  fetchCategoryList = async (id, type) => {
    const response = await services.fetchCategoryList(id, type)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryList = response.data.result
      })
    }
  }

  // 分类详情
  @action
  fetchCategoryDetail = async (id, type, stid) => {
    const response = await services.fetchCategoryDetail(id, type, stid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryDetail = response.data.result
      })
    }
  }

  // 新增分类
  @action
  addCategory = async payload => {
    const response = await services.addCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑分类
  @action
  modifyCategory = async payload => {
    const response = await services.addCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 删除分类
  @action
  deleteCategory = async (storeId, type, id) => {
    const response = await services.deleteCategory(storeId, type, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 商铺优惠列表
  @action
  fetchStoreDiscountList = async id => {
    const response = await services.fetchStoreDiscountList(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDiscountList = response.data.result
      })
    }
  }

  // 商铺优惠详情
  @action
  fetchStoreDiscountDetail = async (id, cid) => {
    const response = await services.fetchStoreDiscountDetail(id, cid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeDiscountDetail = response.data.result
      })
    }
  }

  // 新增商铺优惠
  @action
  addStoreDiscount = async payload => {
    const response = await services.addStoreDiscount(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑商铺优惠
  @action
  modifyStoreDiscount = async payload => {
    const response = await services.modifyStoreDiscount(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 缓存编辑商铺信息
  @action
  cacheStoreDetail = async data => {
    this.cacheStore = data
  }

  // 暂存地图获取到的信息
  @action
  saveLngLatAddress = async (lng, lat) => {
    this.cacheStore = {
      ...this.cacheStore,
      long: lng,
      lat,
      // adress: address,
    }
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
        return Promise.resolve([
          provinceId,
          cityId,
          response.data.result[0].value,
        ])
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

  // 商圈列表
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

  // 重置商圈
  @action
  resetCircle = () => {
    this.circleOption = []
  }

  // 商盟
  @action
  fetchMarket = async id => {
    const response = await services.fetchMarket(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.marketOption = response.data.result
      })
    }
  }

  // 电商详情配置获取
  @action
  fetchECommerceDetail = async id => {
    const response = await services.fetchECommerceDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceDetail = response.data.result
      })
    }
  }

  // 电商详情配置编辑
  @action
  modifyECommerceDetail = async payload => {
    const response = await services.modifyECommerceDetail(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceDetail = {}
      })
      return Promise.resolve(true)
    }
  }

  // 外卖详情配置获取
  @action
  fetchTakeawayDetail = async id => {
    const response = await services.fetchTakeawayDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.takeawayDetail = response.data.result
      })
    }
  }

  // 外卖详情配置编辑
  @action
  modifyTakeawayDetail = async payload => {
    const response = await services.modifyTakeawayDetail(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.takeawayDetail = {}
      })
      return Promise.resolve(true)
    }
  }

  // 克隆商品
  @action
  cloneCommodity = async (id, ids) => {
    const response = await services.cloneCommodity(id, ids)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取二维码
  @action
  fetchQrcode = async id => {
    const response = await services.fetchQrcode(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.qrCode = response.data.result
      })
    }
  }

  // 获取商铺资质
  @action
  fetchAuthFiles = async id => {
    const response = await services.fetchAuthFiles(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.authFiles = response.data.result.auth_files
        this.authStatus = response.data.result.auth
      })
    }
  }

  // 商铺资质修改
  @action
  modifyAuth = async (id, files) => {
    const response = await services.modifyAuth(id, files)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取会员等级
  @action
  fetchLevel = async () => {
    const response = await services.fetchLevel()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.levelOption = response.data.result
      })
    }
  }

  // 商铺在售服务
  @action
  getStoreCommodityForSale = async (id, flag) => {
    if (flag) {
      runInAction(() => {
        this.storeCommodityForSalePage += 1
      })
    }
    const response = await services.getStoreCommodityForSale(
      id,
      this.storeCommodityForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.storeCommodityForSale = [
            ...this.storeCommodityForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.storeCommodityForSalePage -= 1
          }
        } else {
          this.storeCommodityForSale = response.data.result
        }
      })
    }
  }

  // 商铺在售套餐
  @action
  getStorePackageForSale = async (id, flag) => {
    runInAction(() => {
      if (flag) {
        this.storePackageForSalePage += 1
      }
    })
    const response = await services.getStorePackageForSale(
      id,
      this.storePackageForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.storePackageForSale = [
            ...this.storePackageForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.storePackageForSalePage -= 1
          }
        } else {
          this.storePackageForSale = response.data.result
        }
      })
    }
  }

  // 商铺在售电商产品
  @action
  getStoreECommerceForSale = async (id, flag) => {
    runInAction(() => {
      if (flag) {
        this.storeECommerceForSalePage += 1
      }
    })
    const response = await services.getStoreECommerceForSale(
      id,
      this.storeECommerceForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.storeECommerceForSale = [
            ...this.storeECommerceForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.storeECommerceForSalePage -= 1
          }
        } else {
          this.storeECommerceForSale = response.data.result
        }
      })
    }
  }

  // 获取店铺未绑定服务
  @action
  getUnBindStoreCommodityForSale = async (id, flag) => {
    runInAction(() => {
      if (flag) {
        this.unBindstoreCommodityForSalePage += 1
      }
    })
    const response = await services.getUnBindStoreCommodityForSale(
      id,
      this.unBindstoreCommodityForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.unBindstoreCommodityForSale = [
            ...this.unBindstoreCommodityForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.unBindstoreCommodityForSalePage -= 1
          }
        } else {
          this.unBindstoreCommodityForSale = response.data.result
        }
      })
    }
  }

  // 获取店铺未绑定套餐
  @action
  getUnBindStorePackageForSale = async (id, flag) => {
    runInAction(() => {
      if (flag) {
        this.unBindstorePackageForSalePage += 1
      }
    })
    const response = await services.getUnBindStorePackageForSale(
      id,
      this.unBindstorePackageForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.unBindstorePackageForSale = [
            ...this.unBindstorePackageForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.unBindstorePackageForSalePage -= 1
          }
        } else {
          this.unBindstorePackageForSale = response.data.result
        }
      })
    }
  }

  // 获取店铺未绑定电商产品
  @action
  getUnBindStoreECommerceForSale = async (id, flag) => {
    runInAction(() => {
      if (flag) {
        this.unBindstoreECommerceForSalePage += 1
      }
    })
    const response = await services.getUnBindStoreECommerceForSale(
      id,
      this.unBindstoreECommerceForSalePage,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.unBindstoreECommerceForSale = [
            ...this.unBindstoreECommerceForSale,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.unBindstoreECommerceForSalePage -= 1
          }
        } else {
          this.unBindstoreECommerceForSale = response.data.result
        }
      })
    }
  }

  // 商铺绑定服务
  @action
  bindStoreCommodity = async (id, ids) => {
    const response = await services.bindStoreCommodity(id, ids)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 商铺绑定套餐
  @action
  bindStorePackage = async (id, ids) => {
    const response = await services.bindStorePackage(id, ids)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 商铺绑定电商产品
  @action
  bindECommerce = async (id, ids) => {
    const response = await services.bindECommerce(id, ids)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 解绑店铺服务
  @action
  unBindCommodity = async (id, cid) => {
    const response = await services.unBindCommodity(id, cid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 解绑店铺套餐
  @action
  unBindPackage = async (id, cid) => {
    const response = await services.unBindPackage(id, cid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 解绑店铺电商产品
  @action
  unbindECommerce = async (id, cid) => {
    const response = await services.unbindECommerce(id, cid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 是否使用桌号标识
  @action
  getNoUseStation = async (store_id, order_no) => {
    const response = await services.getNoUseStation(store_id, order_no)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }

  // 没有使用的标识
  @action
  changeOnOff = async (type, store_id) => {
    const response = await services.changeOnOff(type, store_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }

  // 添加编辑开单工位标识
  @action
  createStation = async (type, store_id, name, id) => {
    const response = await services.createStation(type, store_id, name, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }

  // 店铺标识的状态
  @action
  getStationFlag = async store_id => {
    const response = await services.getStationFlag(store_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }

  // 获取标识列表
  @action
  getNowStation = async store_id => {
    const response = await services.getNowStation(store_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }
}

export default new StoreFrontStore()
