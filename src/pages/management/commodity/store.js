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

  @observable scoreOpen = 0

  @observable dhbOpen = 0

  @observable showThree = 0

  @observable openUserSpread = 0

  @observable serviceCategory = []

  @observable serviceCategoryChild = {
    project: [],
    twoCate: [],
  }

  @observable singleServiceList = []

  @observable singleServiceListPage = 1

  @observable singleServiceDetail = {}

  @observable packageList = []

  @observable packageListPage = 1

  @observable packageDetail = []

  @observable serviceOfPackage = []

  @observable packageRecordList = 0

  @observable packageRecordListPage = 1

  @observable singleRecordList = 0

  @observable singleRecordListPage = 1

  @observable noBindProject = []

  @observable noBindProjectPage = 1

  @observable shopCategory = []

  @observable shopCategoryChild = {
    project: [],
    twoCate: [],
  }

  @observable shopCategoryDetail = {}

  @observable shopCategorySecond = []

  @action
  fetchGroupList = async keyword => {
    let hasMore = true
    if (this.groupListTotal !== null) {
      hasMore = this.groupListPage * this.groupListSize < this.groupListTotal
      if (hasMore) {
        this.groupListPage += 1
      }
    }
    const response = await services.fetchGroupList(
      this.groupListPage,
      this.groupListSize,
      keyword,
    )
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
  resetAndFetchGroupList = async keyword => {
    runInAction(() => {
      this.groupList = []
      this.groupListPage = 1
      this.groupListTotal = null
    })
    await this.fetchGroupList(keyword)
  }

  @action
  resetAndFetchReserveList = async keyword => {
    runInAction(() => {
      this.reserveList = []
      this.reserveListPage = 1
      this.reserveListTotal = null
    })
    await this.fetchReserveList(keyword)
  }

  @action
  fetchGroupMealAdd = async (title, description) => {
    await services.fetchGroupMealAdd(title, description)
  }

  @action
  fetchReserveList = async keyword => {
    let hasMore = true
    if (this.reserveListTotal !== null) {
      hasMore =
        this.reserveListPage * this.reserveListSize < this.reserveListTotal
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
            this.reserveList.splice(
              this.reserveListTotal - remainder,
              remainder,
            )
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
      hasMore =
        this.takeAwayListPage * this.takeAwayListSize < this.takeAwayListTotal
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
            this.takeAwayList.splice(
              this.takeAwayListTotal - remainder,
              remainder,
            )
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
    })
    await this.fetchTakeAwayList(id, str)
  }

  @action
  searchTakeAwayList = async (id, keyword) => {
    const response = await services.fetchTakeAwayList(
      1,
      this.takeAwayListSize,
      id,
      keyword,
    )
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
        shopList.splice(0, 1)
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

  @action
  fetchECommerceList = async (storeId, str) => {
    let hasMore = true
    if (this.eCommerceListTotal !== null) {
      hasMore =
        this.eCommerceListPage * this.eCommerceListSize <
        this.eCommerceListTotal
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
            this.eCommerceList.splice(
              this.eCommerceListTotal - remainder,
              remainder,
            )
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
    })
    await this.fetchECommerceList(id, str)
  }

  @action
  searchECommerceList = async (id, keyword) => {
    const response = await services.fetchECommerceList(
      1,
      this.eCommerceListSize,
      id,
      keyword,
    )
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
  modifyECommerceE = async payload => {
    const response = await services.modifyECommerceE(payload)
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
    const response = await services.changeECommerceStand(
      storeId,
      goodsId,
      status,
    )
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
  fetchStoreValuesE = async (type, show) => {
    const response = await services.fetchStoreValuesE(type, show)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeValues = response.data.result
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

  @action
  fetchCardGroupAllE = async () => {
    const response = await services.fetchCardGroupAllE()
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

  // 优惠券
  @action
  fetchGiftVoucherE = async () => {
    const response = await services.fetchGiftVoucherE()
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

  // 积分兑换币是否开启
  @action
  fetchscoreAndDhb = async () => {
    const response = await services.fetchscoreAndDhb()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.scoreOpen = response.data.result.now_merchant.score_open
        this.dhbOpen = response.data.result.now_merchant.dhb_open
        this.showThree = response.data.result.now_merchant.show_three
      })
    }
  }
  // 积分兑换币是否开启
  @action
  fetchscoreAndDhbE = async () => {
    const response = await services.fetchscoreAndDhbE()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.scoreOpen = response.data.result.now_merchant.score_open
        this.dhbOpen = response.data.result.now_merchant.dhb_open
        this.showThree = response.data.result.now_merchant.show_three
      })
    }
  }

  // 三级分佣
  @action
  fetchShowCommission = async () => {
    const response = await services.fetchShowCommission()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.openUserSpread = response.data.result[0].value
      })
    }
  }

  // 获取服务项目的分类
  @action
  fetchServiceCategory = async () => {
    const response = await services.fetchServiceCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.serviceCategory = response.data.result
      })
    }
  }

  // 新增一级分类
  @action
  createFirstCategory = async value => {
    const response = await services.createFirstCategory(value)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchServiceCategory()
    }
  }

  // 编辑一级分类
  @action
  modifyFirstCategory = async payload => {
    const response = await services.modifyFirstCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchServiceCategory()
    }
  }

  // 删除一级分类
  @action
  deleteFirstCategory = async id => {
    const response = await services.deleteFirstCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 新增二级分类
  @action
  createSecondCategory = async (value, id) => {
    const response = await services.createSecondCategory(value)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchCategoryChild(id)
    }
  }

  // 编辑二级分类
  @action
  modifySecondCategory = async (payload, id) => {
    const response = await services.modifySecondCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchCategoryChild(id)
    }
  }

  // 删除二级分类
  @action
  deleteSecondCategory = async id => {
    const response = await services.deleteSecondCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 查询分类下的内容
  @action
  fetchCategoryChild = async id => {
    const response = await services.fetchCategoryChild(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.serviceCategoryChild = response.data.result
      })
    }
  }

  // 解除服务分类绑定
  @action
  unbindCategory = async id => {
    const response = await services.unbindCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 解除电商分类绑定
  @action
  unbindCategoryE = async id => {
    const response = await services.unbindCategoryE(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  resetAndFetchSingle = async () => {
    runInAction(() => {
      this.singleServiceList = []
      this.singleServiceListPage = 1
    })
    await this.fetchSingle()
  }

  // 查询服务项目
  @action
  fetchSingle = async flag => {
    if (flag) {
      runInAction(() => {
        this.singleServiceListPage += 1
      })
    }
    const response = await services.fetchSingle(this.singleServiceListPage)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.singleServiceList = [
            ...this.singleServiceList,
            ...response.data.result,
          ]
          if (response.data.result.length === 0) {
            this.singleServiceListPage -= 1
          }
        } else {
          this.singleServiceList = response.data.result
        }
      })
    }
  }

  // 添加服务项目
  @action
  addSingleService = async payload => {
    console.log('action', payload)
    const response = await services.addSingleService(payload)
    console.log(response)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 查询服务项目详情
  @action
  fetchSingleServiceDetail = async id => {
    const response = await services.fetchSingleServiceDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.singleServiceDetail = response.data.result
      })
    }
  }

  // 删除单个服务项目
  @action
  deleteSingleService = async id => {
    const response = await services.deleteSingleService(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取套餐列表
  @action
  fetchPackage = async flag => {
    if (flag) {
      runInAction(() => {
        this.packageListPage += 1
      })
    }
    const response = await services.fetchPackage(this.packageListPage)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.packageList = [...this.packageList, ...response.data.result]
          if (response.data.result.length === 0) {
            this.packageListPage -= 1
          }
        } else {
          this.packageList = response.data.result
        }
      })
    }
  }

  // 添加套餐
  @action
  addPackage = async payload => {
    const response = await services.addPackage(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 删除套餐
  @action
  deletePackage = async id => {
    const response = await services.deletePackage(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 查询套餐详情
  @action
  fetchPackageDetail = async id => {
    const response = await services.fetchPackageDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.packageDetail = response.data.result
      })
    }
  }

  // 获取套餐下的项目
  @action
  fetchServiceOfPackage = async id => {
    const response = await services.fetchServiceOfPackage(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.serviceOfPackage = response.data.result
      })
    }
  }

  // 编辑套餐
  @action
  modifyPackage = async payload => {
    const response = await services.modifyPackage(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取套餐销售记录
  @action
  fetchPackageRecord = async (id, page) => {
    return new Promise(async resolve => {
      const response = await services.fetchPackageRecord(id, page)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  // 获取项目销售记录
  @action
  fetchSingleRecord = async (id, page) => {
    return new Promise(async resolve => {
      const response = await services.fetchSingleRecord(id, page)
      if (response.data.errorCode === ErrorCode.SUCCESS) {
        resolve(response.data.result)
      }
    })
  }

  // 获取未被绑定的项目
  @action
  fetchNoBindProject = async () => {
    const response = await services.fetchNoBindProject()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.noBindProject = response.data.result
      })
    }
  }

  // 获取未被绑定的项目
  @action
  fetchNoBindProjectE = async flag => {
    if (flag) {
      runInAction(() => {
        this.noBindProjectPage += 1
      })
    }
    const response = await services.fetchNoBindProjectE(this.noBindProjectPage)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (flag) {
          this.noBindProject = [...this.noBindProject, ...response.data.result]
          if (response.data.result.length === 0) {
            this.noBindProjectPage -= 1
          }
        } else {
          this.noBindProject = response.data.result
        }
      })
    }
  }

  // 绑定服务到指定分类下
  @action
  bindProjectToCategory = async (appId, id) => {
    const response = await services.bindProjectToCategory(appId, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 绑定电商到指定分类下
  @action
  bindProjectToCategoryE = async (gid, id) => {
    const response = await services.bindProjectToCategoryE(gid, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取零售电商一级分类
  @action
  fetchShopCategory = async () => {
    const response = await services.fetchShopCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        const { result } = response.data
        result.forEach(item => {
          item.label = item.sort_name
          item.value = item.sort_id
        })
        this.shopCategory = result
      })
    }
  }

  // 添加编辑零售电商一级分类
  @action
  modifyShopFirstCategory = async payload => {
    const response = await services.modifyShopFirstCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 删除零售电商一级分类
  @action
  deleteShopFirstCategory = async id => {
    const response = await services.deleteShopFirstCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取零售电商二级分类
  @action
  fetchShopSecondCategory = async id => {
    const response = await services.fetchShopSecondCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.shopCategoryChild = response.data.result
        this.shopCategorySecond = response.data.result.twoCate.map(item => ({
          label: item.sort_name,
          value: item.sort_id,
        }))
      })
    }
  }

  // 添加编辑零售电商二级分类
  @action
  modifyShopSecondCategory = async payload => {
    const response = await services.modifyShopSecondCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取零售电商分类详情
  @action
  fetchShopCategoryDetail = async id => {
    const response = await services.fetchShopCategoryDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.shopCategoryDetail = response.data.result
      })
    }
  }

  // 删除零售电商二级分类
  @action
  deleteShopSecondCategory = async id => {
    const response = await services.deleteShopSecondCategory(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new MastSotre()
