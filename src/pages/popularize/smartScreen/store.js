import { observable, action, runInAction } from 'mobx'
import { Toast } from 'antd-mobile'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class SmartScreenStore {
  @observable iMax = []

  @observable charData = {}

  @observable scanMemberList = []

  @observable viewTimeList = []

  @observable purchaseNumList = []

  @observable promotionInfo = []

  @observable echartData = []

  @observable storeMer = []

  @observable smartScreenList = []

  @observable promotionList = []

  @observable imaxSlogan = {}

  @observable sloganList = []

  @observable sloganListPage = 1

  @observable sloganListTotal = 0

  @observable sloganDetail = {}

  @action
  fetchIMax = async () => {
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    const response = await services.fetchIMax(mer_id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.iMax = response.data.result
      })
    }
  }

  // 获取进店人数，展示echarts
  @action
  fetchUserCome = async () => {
    const response = await services.fetchUserCome()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response.data)
    }
  }

  @action
  fetchStoreMer = async () => {
    const response = await services.fetchStoreMer()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.storeMer = response.data.result
      })
    }
  }

  // 获取扫码人数
  @action
  fetchScanMember = async () => {
    const response = await services.fetchScanMember()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.scanMemberList = response.data.result.list
      })
    }
  }

  // 获取浏览时长
  @action
  fetchViewTime = async () => {
    const response = await services.fetchViewTime()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.viewTimeList = response.data.result.list
      })
    }
  }

  // 获取购买用户列表
  @action
  fetchPurchaseNum = async () => {
    const response = await services.fetchPurchaseNum()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.purchaseNumList = response.data.result.list
      })
    }
  }

  @action
  fetchEchartData = async (type, date, search, id) => {
    if (date === '二级筛选') {
      date = ''
    }
    const response = await services.fetchEchartData(type, date, search, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.echartData = response.data.result
      })
    }
  }

  // 获取本店智能屏列表
  @action
  fetchLocalSmartScreen = async () => {
    const response = await services.fetchLocalSmartScreen()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.smartScreenList = response.data.result
      })
    }
  }

  // 查看本店屏幕推广列表
  @action
  fetchPromotionList = async (id, status) => {
    const response = await services.fetchPromotionList(id, status)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.promotionList = response.data.result
      })
    }
  }

  // 上传推广内容
  @action
  insertPromotionList = async payload => {
    const response = await services.insertPromotionList(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑推广内容
  @action
  modifyPromotionInfo = async payload => {
    const response = await services.modifyPromotionInfo(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取推广内容详情
  @action
  fetchPromotionInfo = async id => {
    const response = await services.fetchPromotionInfo(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.promotionInfo = response.data.result
        // console.log(this.promotionInfo)
      })
    }
  }

  // 修改上下架状态
  @action
  changeStatus = async (id, storeId, cur) => {
    const response = await services.changeStatus(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchPromotionList(storeId, cur).then(() => {
        Toast.success('状态修改成功', 1)
      })
    }
  }

  // 删除推广内容
  @action
  usingPromotion = async (id, storeId, cur) => {
    const response = await services.usingPromotion(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.fetchPromotionList(storeId, cur).then(() => {
        Toast.success('状态修改成功', 1)
      })
    }
  }

  // 获取智能屏广告语
  @action
  fetchImaxSlogan = async id => {
    const response = await services.fetchImaxSlogan(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.imaxSlogan = response.data.result
      })
    }
  }

  // 修改智能屏广告语
  @action
  upDateSlogan = async (id, txt) => {
    const response = await services.upDateSlogan(id, txt)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取见面语
  @action
  getSlogan = async ({ flag, ...payload }) => {
    if (flag) {
      runInAction(() => {
        this.sloganList = []
        this.sloganListPage = 1
        this.sloganListTotal = 0
      })
    } else {
      if (this.sloganListPage * 10 < this.sloganListTotal) {
        runInAction(() => {
          this.sloganListPage += 1
        })
      } else {
        return false
      }
    }
    const response = await services.getSlogan({
      page: this.sloganListPage,
      ...payload,
    })
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.sloganList = [...this.sloganList, ...response.data.result.data]
        this.sloganListTotal = response.data.result.total
      })
    }
  }

  // 见面语详情
  @action
  getSloganDetail = async id => {
    const response = await services.getSloganDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.sloganDetail = response.data.result
      })
    }
  }

  // 新增见面语
  @action
  createSlogan = async payload => {
    const response = await services.createSlogan(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 编辑见面语
  @action
  updateSlogan = async payload => {
    const response = await services.updateSlogan(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // 获取员工列表
  @action
  getWorker = async id => {
    const response = await services.getWorker(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(response.data.result)
    }
  }
}

export default new SmartScreenStore()
