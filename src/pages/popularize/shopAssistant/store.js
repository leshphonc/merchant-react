import { observable, computed, action } from 'mobx'

class MastSotre {
  @observable list

  @computed
  get getList() {
    return this.list.filter(v => v.id !== 1)
  }

  @action
  addList = obj => this.list.push(obj)

  constructor() {
    this.list = [
      {
        name: '香蕉',
        id: 0,
      },
      {
        name: '苹果',
        id: 1,
      },
      {
        name: '西瓜',
        id: 2,
      },
    ]
  }
}
export default new MastSotre()
