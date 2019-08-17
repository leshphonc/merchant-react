import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable groupList = []

  @observable groupListPage = 1

  @observable groupListSize = 10

  @observable groupListTotal = null

  @observable reserveList = []

  @observable reserveListPage = 1

  @observable reserveListSize = 10

  @observable reserveListTotal = null

  @observable cateringDetail = {}

  @observable cateringList = []

  @observable cateringListPage = 1

  @observable cateringListSize = 10

  @observable cateringListTotal = null

  @observable retailDetail = {}

  @observable retailValues = []

  @observable retailList = []

  @observable retailListPage = 1

  @observable retailListSize = 10

  @observable retailListTotal = null

  @observable cateringValues = []

  @observable cateringMeal = []

  @observable cateringDelete = {}

  @observable cateringStand = {}

  @observable retailDelete = {}

  @action
  fetchGroupList = async () => {
    let hasMore = true
    if (this.groupListTotal !== null) {
      hasMore = this.groupListPage * this.groupListSize < this.groupListTotal
      if (hasMore) {
        this.groupListPage += 1
      }
    }
    const response = await services.fetchGroupList(this.groupListPage, this.groupListSize)
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
  fetchGroupMealAdd = async (title, description) => {
    await services.fetchGroupMealAdd(title, description)
  }

  @action
  fetchReserveList = async () => {
    let hasMore = true
    if (this.reserveListTotal !== null) {
      hasMore = this.reserveListPage * this.reserveListSize < this.reserveListTotal
      if (hasMore) {
        this.reserveListPage += 1
      }
    }
    const response = await services.fetchReserveList(this.reserveListPage, this.reserveListSize)
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
  fetchCateringList = async storeId => {
    let hasMore = true
    if (this.cateringListTotal !== null) {
      hasMore = this.cateringListPage * this.cateringListSize < this.cateringListTotal
      if (hasMore) {
        this.cateringListPage += 1
      }
    }
    const response = await services.fetchCateringList(
      this.cateringListPage,
      this.cateringListSize,
      storeId,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.cateringList
          arr.push(...response.data.result.lists)
          this.cateringList = arr
          this.cateringListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.cateringListTotal % this.cateringListSize
        if (remainder) {
          runInAction(() => {
            this.cateringList.splice(this.cateringListTotal - remainder, remainder)
            const arr = this.cateringList
            arr.push(...response.data.result.lists)
            this.cateringList = arr
            this.cateringListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchCateringDetail = async (id, goodid) => {
    const response = await services.fetchCateringDetail(id, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringDetail = response.data.result
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
    const response = await services.modifyCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchRetailList = async storeId => {
    let hasMore = true
    if (this.retailListTotal !== null) {
      hasMore = this.retailListPage * this.retailListSize < this.retailListTotal
      if (hasMore) {
        this.retailListPage += 1
      }
    }
    const response = await services.fetchRetailList(
      this.retailListPage,
      this.retailListSize,
      storeId,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.retailList
          arr.push(...response.data.result.lists)
          this.retailList = arr
          this.retailListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.retailListTotal % this.retailListSize
        if (remainder) {
          runInAction(() => {
            this.retailList.splice(this.retailListTotal - remainder, remainder)
            const arr = this.retailList
            arr.push(...response.data.result.lists)
            this.retailList = arr
            this.retailListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchRetailDetail = async (id, goodid) => {
    const response = await services.fetchRetailDetail(id, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.retailDetail = response.data.result
      })
    }
  }

  @action
  addRetail = async payload => {
    const response = await services.addRetail(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyRetail = async payload => {
    const response = await services.modifyRetail(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchCateringMeal = async storeId => {
    const response = await services.fetchCateringMeal(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringMeal = response.data.result
      })
    }
  }

  @action
  fetchCateringValues = async () => {
    const response = await services.fetchCateringValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringValues = response.data.result
      })
    }
  }

  @action
  fetchCateringDelete = async (storeId, mealId) => {
    await services.fetchCateringDelete(storeId, mealId)
  }

  @action
  fetchCateringStand = async (storeId, mealId, status) => {
    await services.fetchCateringStand(storeId, mealId, status)
  }

  @action
  fetchRetailDelete = async (storeId, goodsId) => {
    await services.fetchRetailDelete(storeId, goodsId)
  }

  @action
  fetchRetailStand = async (storeId, goodsId, status) => {
    await services.fetchRetailStand(storeId, goodsId, status)
  }

  @action
  fetchRetailValues = async () => {
    const response = await services.fetchRetailValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.retailValues = response.data.result
      })
    }
  }
}
export default new MastSotre()
