import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class RedEnvelopStore {
  @observable redEnvelopList = []

  @observable redEnvelopListPage = 1

  @observable redEnvelopListSize = 10

  @observable redEnvelopListTotal = null

  @observable getList = []

  @observable getListPage = 1

  @observable getListSize = 10

  @observable getListTotal = 0

  @observable getRedPacket = {}

  @observable getLists = {}

  //获取红包广场列表
  @action
  fetchRedEnvelopList = async () => {
    let hasMore = true
    // debugger
    if (this.redEnvelopListTotal !== null) {
      hasMore = this.redEnvelopListPage * this.redEnvelopListSize < this.redEnvelopListTotal
      if (hasMore) {
        this.redEnvelopListPage += 1
      }
    }
    const response = await services.fetchRedEnvelopList(
      this.redEnvelopListPage,
      this.redEnvelopListSize,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.redEnvelopList
          arr.push(...response.data.result.lists)
          this.redEnvelopList = arr
          this.redEnvelopListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.redEnvelopListTotal % this.redEnvelopListSize
        if (remainder) {
          runInAction(() => {
            this.redEnvelopList.splice(this.redEnvelopListTotal - remainder, remainder)
            const arr = this.redEnvelopList
            arr.push(...response.data.result.lists)
            this.redEnvelopList = arr
            this.redEnvelopListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  //重置红包列表
  @action
  resetAndFetchRedEnvelopList = async () => {
    runInAction(() => {
      this.redEnvelopList = []
      this.redEnvelopListPage = 1
      this.redEnvelopListTotal = null
    })
  }

  //获取领取记录列表
  @action
  fetchGetList = async id => {
    let hasMore = true
    if (this.getListTotal !== 0) {
      hasMore = this.getListPage * this.getListSize < this.getListTotal
      if (hasMore) {
        this.getListPage += 1
      }
    }
    const response = await services.fetchGetList(this.getListPage, this.getListSize, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.getList
          arr.push(...response.data.result.lists)
          this.getList = arr
          this.getListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.getListTotal % this.getListSize
        if (remainder) {
          runInAction(() => {
            this.getList.splice(this.getListTotal - remainder, remainder)
            const arr = this.getList
            arr.push(...response.data.result.lists)
            this.getList = arr
            this.getListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  //删除红包列表
  @action
  fetchPacketDel = async id => {
    await services.fetchPacketDel(id)
  }

  // 发布红包
  @action
  fetchFabu = async id => {
    await services.fetchFabu(id)
  }

  //获取红包列表详细信息
  @action
  fetchGetRedPacket = async id => {
    const response = await services.fetchGetRedPacket(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getRedPacket = response.data.result
      })
    }
  }

  //获取领取记录头部信息
  @action
  fetchGetLists = async id => {
    const response = await services.fetchGetLists(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.getLists = response.data.result
      })
    }
  }

  // 添加红包
  @action
  addPacket = async payload => {
    const response = await services.addPacket(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  //修改红包
  @action
  modifyPacket = async payload => {
    const response = await services.modifyPacket(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
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
}

export default new RedEnvelopStore()
