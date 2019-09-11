import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable getGift = []

  @observable getGiftPage = 1

  @observable getGiftSize = 10

  @observable getGiftTotal = null

  @observable getGiftDetail = {}

  @observable giftCategory = []

  @observable giftCategorylist = []

  @observable asyncCascadeValue = []

  @observable provinceOption = []

  @observable cityOption = []

  @observable areaOption = []

  @observable circleOption = []

  @observable marketOption = []

  @observable shopList = []

  @observable giftOrder = []

  @observable giftOrderPage = 1

  @observable giftOrderSize = 10

  @observable giftOrderTotal = null

  @observable giftOrderDetail = {}

  @observable expressList = []

  @observable express = {}

  @observable giftOrderPass = []

  // 获取商品订单列表
  @action
  fetchGiftOrder = async giftId => {
    let hasMore = true
    if (this.giftOrderTotal !== null) {
      hasMore = this.giftOrderPage * this.giftOrderSize < this.giftOrderTotal
      if (hasMore) {
        this.giftOrderPage += 1
      }
    }
    const response = await services.fetchGiftOrder(this.giftOrderPage, this.giftOrderSize, giftId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.giftOrder
          arr.push(...response.data.result.lists)
          this.giftOrder = arr
          this.giftOrderTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.giftOrderTotal % this.giftOrderSize
        if (remainder) {
          runInAction(() => {
            this.giftOrder.splice(this.giftOrderTotal - remainder, remainder)
            const arr = this.giftOrder
            arr.push(...response.data.result.lists)
            this.giftOrder = arr
            this.giftOrderTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  // 获取礼品列表
  @action
  fetchGetGift = async keyword => {
    let hasMore = true
    if (this.getGiftTotal !== null) {
      hasMore = this.getGiftPage * this.getGiftSize < this.getGiftTotal
      if (hasMore) {
        this.getGiftPage += 1
      }
    }
    const response = await services.fetchGetGift(this.getGiftPage, this.getGiftSize, keyword)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.getGift
          arr.push(...response.data.result.lists)
          this.getGift = arr
          this.getGiftTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.getGiftTotal % this.getGiftSize
        if (remainder) {
          runInAction(() => {
            this.getGift.splice(this.getGiftTotal - remainder, remainder)
            const arr = this.getGift
            arr.push(...response.data.result.lists)
            this.getGift = arr
            this.getGiftTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  // 重置礼品列表
  @action
  resetAndFetchRedEnvelopList = async () => {
    runInAction(() => {
      this.getGift = []
      this.getGiftPage = 1
      this.getGiftTotal = null
    })
  }

  // 添加礼品
  @action
  addGift = async payload => {
    const response = await services.addGift(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑礼品
  @action
  modifyGift = async payload => {
    const response = await services.modifyGift(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取详情信息
  @action
  fetchGetGiftDetail = async giftId => {
    const response = await services.fetchGetGiftDetail(giftId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getGiftDetail = response.data.result
      })
    }
  }

  // 金币商城分类
  @action
  fetchGiftCategory = async catFid => {
    const response = await services.fetchGiftCategory(catFid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftCategory = response.data.result
      })
    }
  }

  @action
  fetchGiftCategorylist = async catFid => {
    const response = await services.fetchGiftCategorylist(catFid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftCategorylist = response.data.result
      })
    }
  }

  // 删除礼品
  @action
  fetchDelGift = async giftId => {
    await services.fetchDelGift(giftId)
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

  // 商盟列表
  @action
  fetchMarket = async id => {
    this.marketOption = []
    const response = await services.fetchMarket(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.marketOption = response.data.result
      })
    }
  }

  // 重置商盟
  @action
  resetMarket = () => {
    this.marketOption = []
  }

  // 重置商圈
  @action
  resetCircle = () => {
    this.circleOption = []
  }

  // 店铺列表
  @action
  fetchShopList = async appointType => {
    const response = await services.fetchShopList(appointType)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        const shopList = response.data.result.store_list
        shopList.shift(0)
        shopList.forEach(item => {
          if (item.worker_list) {
            item.worker_list.forEach(i => {
              i.value = i.merchant_worker_id
              i.label = i.name
            })
          }
        })
        this.shopList = shopList
      })
    }
  }

  // 金币商城详情
  @action
  fetchGiftOrderDetail = async orderId => {
    const response = await services.fetchGiftOrderDetail(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftOrderDetail = response.data.result
      })
    }
  }

  // 从新获取礼品列表（搜索）
  @action
  resetAndFetchGiftList = async keyword => {
    runInAction(() => {
      this.getGift = []
      this.getGiftPage = 1
      this.getGiftTotal = null
      
    })
    await this.fetchGetGift(keyword)
  }

  // 发货选择快递
  @action
  fetchExpressList = async orderId => {
    const response = await services.fetchExpressList(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressList = response.data.result.express_list
      })
    }
  }

  // 发货详情列表
  @action
  fetchExpress = async orderId => {
    const response = await services.fetchExpress(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.express = response.data.result
      })
    }
  }

  // 确认发货
  @action
  modifyExpress = async payload => {
    const response = await services.modifyExpress(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 从新获取订单详情列表
  @action
  resetAndFetchGiftOrderList = async () => {
    runInAction(() => {
      this.giftOrder = []
      this.giftOrderPage = 1
      this.giftOrderTotal = null
    })
  }

  @action
  checkCouponCode = async (orderId, giftPass) => {
    const response = await services.checkCouponCode(orderId, giftPass)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fecthGiftArrayVerify = async (orderId, giftPass) => {
    const response = await services.fecthGiftArrayVerify(orderId, giftPass)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fecthGiftPassArray = async orderId => {
    const response = await services.fecthGiftPassArray(orderId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftOrderPass = response.data.result
      })
    }
  }
}
export default new MastSotre()
