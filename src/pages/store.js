import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

import login from '@/pages/login/store'
import home from '@/pages/home/store'
import order from '@/pages/order/store'
import wallet from '@/pages/wallet/store'
import storeFront from '@/pages/management/storeFront/store'
import marketing from '@/pages/marketing/store'
import basicInformation from '@/pages/setting/basicInformation/store'
import selfManagement from '@/pages/setting/selfManagement/store'
import shopAssistant from '@/pages/popularize/shopAssistant/store'
import smartScreen from '@/pages/popularize/smartScreen/store'
import member from '@/pages/management/member/store'
import commodity from '@/pages/management/commodity/store'
import shopManager from '@/pages/management/shopManager/store'
import redEnvelop from '@/pages/popularize/redEnvelope/store'
import giftManagement from '@/pages/popularize/giftManagement/store'

class CommonStore {
  @observable openid = ''

  @observable provinceOption = []

  @observable cityOption = []

  @observable areaOption = []

  @observable circleOption = []

  // 获取微信code
  @action
  getWxCode = async () => {
    const response = await services.getWxConfig()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      const url = encodeURIComponent(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${response.data.result.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
  }

  // 用code换取openid
  @action
  fetchOpenId = async code => {
    const response = await services.fetchOpenId(code)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.openid = response.data.result
      })
      return Promise.resolve(true)
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

  // 获取初始化3级地址数据
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
}

const stores = {
  common: new CommonStore(),
  login,
  home,
  order,
  wallet,
  storeFront,
  marketing,
  basicInformation,
  selfManagement,
  shopAssistant,
  member,
  redEnvelop,
  commodity,
  shopManager,
  giftManagement,
  smartScreen,
}
export default stores
