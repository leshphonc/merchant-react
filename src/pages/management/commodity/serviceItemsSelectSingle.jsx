import React from 'react'
import NavBar from '@/common/NavBar'
import { List, Checkbox, Button, PullToRefresh } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Utils from '@/utils/index'

const CheckboxItem = Checkbox.CheckboxItem

@inject('commodity')
@observer
class ServiceItemsSelectSingle extends React.Component {
  state = {
    refreshing: false,
    selected: [],
  }
  componentDidMount() {
    const { commodity } = this.props
    commodity.resetAndFetchSingle()
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      const arr = []
      cacheData.project_data.forEach(item => {
        arr.push(item.appoint_id)
      })
      this.setState({
        selected: arr,
      })
    }
  }

  mapList = () => {
    const { commodity } = this.props
    const { selected } = this.state
    return commodity.singleServiceList.map(i => {
      const item = selected.find(item => {
        return item === i.appoint_id
      })
      return (
        <CheckboxItem
          key={i.appoint_id}
          checked={!!item}
          multipleLine
          onChange={() => this.onChange(i.appoint_id)}
        >
          {i.appoint_name}
          <List.Item.Brief>¥ {i.old_price}</List.Item.Brief>
        </CheckboxItem>
      )
    })
  }

  onChange = id => {
    const { selected } = this.state
    const index = selected.indexOf(id)
    if (index > -1) {
      const arr = selected
      arr.splice(index, 1)
      this.setState({
        selected: [...arr],
      })
    } else {
      this.setState({
        selected: [...selected, id],
      })
    }
  }

  save = () => {
    const { commodity, history } = this.props
    const { selected } = this.state
    const cacheData = Utils.getCacheData()
    const arr = []
    commodity.singleServiceList.forEach(item => {
      if (selected.indexOf(item.appoint_id) > -1) {
        let before = cacheData.project_data.find(
          obj => obj.appoint_id === item.appoint_id,
        )
        before = before || {}
        arr.push({
          appoint_id: item.appoint_id,
          name: item.appoint_name,
          day_num: before.day_num || 30,
          meal_num: before.meal_num || 1,
          type: 0,
          img: item.pic || before.img,
        })
      }
    })
    Utils.cacheItemToData('project_data', arr)
    history.goBack()
  }

  loadMore = async () => {
    const { commodity } = this.props
    this.setState({ refreshing: true })
    await commodity.fetchSingle(true)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <div>
        <NavBar
          title="选择服务项目"
          goBack
          right={
            <Button
              onClick={this.save}
              size="small"
              type="ghost"
              style={{ color: '#fff', border: '1px solid #fff' }}
            >
              保存
            </Button>
          }
        />
        <PullToRefresh
          ref={this.refresh}
          refreshing={refreshing}
          style={{
            height,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.loadMore}
        >
          <List>{this.mapList()}</List>
        </PullToRefresh>
      </div>
    )
  }
}

export default ServiceItemsSelectSingle
