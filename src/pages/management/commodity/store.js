import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable groupList = []

  @observable groupListPage = 1

  @observable groupListSize = 10

  @observable groupListTotal = null

  @observable groupDetail = []

  @observable shopList = []

  @observable groupCatFir = []

  @observable groupCatSec = []

  @observable reserveList = []

  @observable reserveListPage = 1

  @observable reserveListSize = 10

  @observable reserveListTotal = null

  @observable reserveCategoryOption = []

  @observable takeAwayDetail = {}

  @observable takeAwayList = []

  @observable takeAwayListPage = 1

  @observable takeAwayListSize = 10

  @observable takeAwayListTotal = null

  @observable eCommerceDetail = {}

  // 所有商铺列表
  @observable storeValues = []

  // 商品下所属分类
  @observable categoryValues = []

  @observable cardGroupAll = []

  @observable eCommerceList = []

  @observable eCommerceListPage = 1

  @observable eCommerceListSize = 10

  @observable eCommerceListTotal = null

  @observable takeAwayDelete = {}

  @observable takeAwayStand = {}

  @observable eCommerceDelete = {}

  @observable cacheStore = {}

  @observable userLevels = []

  @observable giftVoucher = []

  @observable goodsCategory = []

  @observable expressLists = []

  @observable expressDetail = {}

  @observable retailDelete = []

  @observable appointDetail = []

  @observable workerList = []

  @observable levelList = []

  @observable groupPackage = []

  @action
  fetchGroupList = async keyword => {
    let hasMore = true
    if (this.groupListTotal !== null) {
      hasMore = this.groupListPage * this.groupListSize < this.groupListTotal
      if (hasMore) {
        this.groupListPage += 1
      }
    }
    const response = await services.fetchGroupList(this.groupListPage, this.groupListSize, keyword)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.groupList
          arr.push(...response.data.result.lists)
          this.groupList = arr
          this.groupListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.groupListTotal % this.groupListSize
        if (remainder) {
          runInAction(() => {
            this.groupList.splice(this.groupListTotal - remainder, remainder)
            const arr = this.groupList
            arr.push(...response.data.result.lists)
            this.groupList = arr
            this.groupListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchGroupList = keyword => {
    runInAction(() => {
      this.groupList = []
      this.groupListPage = 1
      this.groupListTotal = null
      this.fetchGroupList(keyword)
    })
  }

  @action
  resetAndFetchReserveList = keyword => {
    runInAction(() => {
      this.reserveList = []
      this.reserveListPage = 1
      this.reserveListTotal = null
      this.fetchReserveList(keyword)
    })
  }

  @action
  fetchGroupMealAdd = async (title, description) => {
    await services.fetchGroupMealAdd(title, description)
  }

  @action
  fetchReserveList = async keyword => {
    let hasMore = true
    if (this.reserveListTotal !== null) {
      hasMore = this.reserveListPage * this.reserveListSize < this.reserveListTotal
      if (hasMore) {
        this.reserveListPage += 1
      }
    }
    const response = await services.fetchReserveList(
      this.reserveListPage,
      this.reserveListSize,
      keyword,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.reserveList
          arr.push(...response.data.result.lists)
          this.reserveList = arr
          this.reserveListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.reserveListTotal % this.reserveListSize
        if (remainder) {
          runInAction(() => {
            this.reserveList.splice(this.reserveListTotal - remainder, remainder)
            const arr = this.reserveList
            arr.push(...response.data.result.lists)
            this.reserveList = arr
            this.reserveListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchReserveCategoryOption = async () => {
    const response = await services.fetchReserveCategoryOption()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.reserveCategoryOption = response.data.result
      })
    }
  }

  @action
  insertReserve = async payload => {
    const response = await services.insertReserve(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyReserve = async payload => {
    const response = await services.modifyReserve(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchReserveDetail = async id => {
    const response = await services.fetchReserveDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.appointDetail = response.data.result
      })
    }
  }

  @action
  fetchTakeAwayList = async (storeId, str) => {
    let hasMore = true
    if (this.takeAwayListTotal !== null) {
      hasMore = this.takeAwayListPage * this.takeAwayListSize < this.takeAwayListTotal
      if (hasMore) {
        this.takeAwayListPage += 1
      }
    }
    const response = await services.fetchTakeAwayList(
      this.takeAwayListPage,
      this.takeAwayListSize,
      storeId,
      str,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.takeAwayList
          arr.push(...response.data.result.lists)
          this.takeAwayList = arr
          this.takeAwayListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.takeAwayListTotal % this.takeAwayListSize
        if (remainder) {
          runInAction(() => {
            this.takeAwayList.splice(this.takeAwayListTotal - remainder, remainder)
            const arr = this.takeAwayList
            arr.push(...response.data.result.lists)
            this.takeAwayList = arr
            this.takeAwayListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchTakeAwayList = async (id, str) => {
    runInAction(() => {
      this.takeAwayList = []
      this.takeAwayListPage = 1
      this.takeAwayListTotal = null
      this.fetchTakeAwayList(id, str)
    })
  }

  @action
  searchTakeAwayList = async (id, keyword) => {
    const response = await services.fetchTakeAwayList(1, this.takeAwayListSize, id, keyword)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.takeAwayList = response.data.result.lists
        this.takeAwayListTotal = response.data.result.total - 0
      })
    }
  }

  @action
  fetchTakeAwayDetail = async (id, goodid) => {
    const response = await services.fetchTakeAwayDetail(id, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.takeAwayDetail = response.data.result
      })
    }
  }

  @action
  fetchGroupDetail = async goodid => {
    const response = await services.fetchGroupDetail(goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupDetail = response.data.result
      })
    }
  }

  @action
  fetchShopList = async (appointType, showAll) => {
    const response = await services.fetchShopList(appointType, showAll)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        const shopList = response.data.result.store_list
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

  @action
  fetchGroupCat = async catfid => {
    const response = await services.fetchGroupCat(catfid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (!catfid) {
          this.groupCatFir = response.data.result
        } else {
          this.groupCatSec = response.data.result
        }
      })
    }
  }

  @action
  addTakeAway = async payload => {
    const response = await services.addTakeAway(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyTakeAway = async payload => {
    const response = await services.modifyTakeAway(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // @action
  // fetchECommerceLists = async name => {
  //   const response = await services.fetchECommerceLists(name)
  //   if (response.data.errorCode === ErrorCode.SUCCESS) {
  //     runInAction(() => {
  //       this.eCommerceLists = response.data.result
  //     })
  //   }
  // }

  @action
  fetchECommerceList = async (storeId, str) => {
    let hasMore = true
    if (this.eCommerceListTotal !== null) {
      hasMore = this.eCommerceListPage * this.eCommerceListSize < this.eCommerceListTotal
      if (hasMore) {
        this.eCommerceListPage += 1
      }
    }
    const response = await services.fetchECommerceList(
      this.eCommerceListPage,
      this.eCommerceListSize,
      storeId,
      str,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.eCommerceList
          arr.push(...response.data.result.lists)
          this.eCommerceList = arr
          this.eCommerceListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.eCommerceListTotal % this.eCommerceListSize
        if (remainder) {
          runInAction(() => {
            this.eCommerceList.splice(this.eCommerceListTotal - remainder, remainder)
            const arr = this.eCommerceList
            arr.push(...response.data.result.lists)
            this.eCommerceList = arr
            this.eCommerceListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchECommerceList = async (id, str) => {
    runInAction(() => {
      this.eCommerceList = []
      this.eCommerceListPage = 1
      this.eCommerceListTotal = null
      this.fetchECommerceList(id, str)
    })
  }

  @action
  searchECommerceList = async (id, keyword) => {
    const response = await services.fetchECommerceList(1, this.eCommerceListSize, id, keyword)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceList = response.data.result.lists
        this.eCommerceListTotal = response.data.result.total - 0
      })
    }
  }

  @action
  fetchECommerceDetail = async (id, goodid) => {
    const response = await services.fetchECommerceDetail(id, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceDetail = response.data.result
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

  @action
  modifyECommerce = async payload => {
    const response = await services.modifyECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  goodsSpread = async payload => {
    const response = await services.goodsSpread(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  goodsDiscounts = async payload => {
    const response = await services.goodsDiscounts(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchTakeAwayDelete = async (storeId, mealId) => {
    const response = await services.fetchTakeAwayDelete(storeId, mealId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  takeAwayStandStatus = async (storeId, mealId, status) => {
    const responst = await services.takeAwayStandStatus(storeId, mealId, status)
    if (responst.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchECommerceDelete = async (storeId, goodsId) => {
    const response = await services.fetchECommerceDelete(storeId, goodsId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  changeECommerceStand = async (storeId, goodsId, status) => {
    const response = await services.changeECommerceStand(storeId, goodsId, status)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.eCommerceList.forEach((item, index) => {
        if (item.goods_id === goodsId) {
          runInAction(() => {
            const now = `${status}` !== '1' ? '0' : '1'
            this.eCommerceList[index].status = now
          })
        }
      })
      return Promise.resolve(true)
    }
  }

  @action
  fetchUserLevel = async (storeId, goodid) => {
    const response = await services.fetchUserLevel(storeId, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.userLevels = response.data.result
      })
    }
  }

  @action
  fetchCategoryValues = async storeId => {
    const response = await services.fetchCategoryValues(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.categoryValues = response.data.result
      })
    }
  }

  @action
  fetchStoreValues = async (type, show) => {
    const response = await services.fetchStoreValues(type, show)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeValues = response.data.result
      })
    }
  }

  @action
  fetchCardGroupAll = async () => {
    const response = await services.fetchCardGroupAll()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cardGroupAll = response.data.result
      })
    }
  }

  // 优惠券
  @action
  fetchGiftVoucher = async () => {
    const response = await services.fetchGiftVoucher()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftVoucher = response.data.result
      })
    }
  }

  // // 商城商品分类
  // @action
  // fetchGoodsSort = async storeId => {
  //   const response = await services.fetchGoodsSort(storeId)
  //   if (response.data.errorCode === ErrorCode.SUCCESS) {
  //     runInAction(() => {
  //       this.goodsSort = response.data.result
  //     })
  //   }
  // }

  // 商城商品分类
  @action
  fetchGoodsCategory = async () => {
    const response = await services.fetchGoodsCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.goodsCategory = response.data.result
      })
    }
  }

  // 运费模板列表
  @action
  fetchExpressLists = async () => {
    const response = await services.fetchExpressLists()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressLists = response.data.result
      })
    }
  }

  @action
  fetchExpressDetail = async tid => {
    const response = await services.fetchExpressDetail(tid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressDetail = response.data.result
      })
    }
  }

  @action
  fetchAddGroup = async groupAddDetail => {
    const response = await services.fetchAddGroup(groupAddDetail)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  addExpress = async payload => {
    const response = await services.addExpress(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchEditGroup = async (groupEditDetail, id) => {
    const response = await services.fetchEditGroup(groupEditDetail, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editExpress = async payload => {
    const response = await services.editExpress(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchGetWorker = async storeId => {
    const response = await services.fetchGetWorker(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response.data)
    }
  }

  @action
  getLevelList = async () => {
    const response = await services.getLevelList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.levelList = response.data.result
      })
    }
  }

  @action
  groupSpreadEdit = async payload => {
    const response = await services.groupSpreadEdit(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  appointSpreadEdit = async payload => {
    const response = await services.appointSpreadEdit(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchGroupPackege = async () => {
    const response = await services.fetchGroupPackege()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupPackage = response.data.result
      })
    }
  }

  @action
  addGroupPackage = async payload => {
    const response = await services.addGroupPackage(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editAppointDis = async payload => {
    const response = await services.editAppointDis(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editGroupDis = async payload => {
    const response = await services.editGroupDis(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new MastSotre()
