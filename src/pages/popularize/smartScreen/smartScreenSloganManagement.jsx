import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  SegmentedControl,
  WingBlank,
  List,
  Button,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('smartScreen')
@observer
class SmartScreenSloganManagement extends React.Component {
  state = {
    cur: 0,
    spList: [],
  }

  componentDidMount() {
    const { smartScreen, match } = this.props
    smartScreen.getSlogan({
      imax_id: match.params.id,
      type: 2,
      is_staff: 0,
      flag: true,
    })
  }

  mapList = () => {
    const { cur } = this.state
    if (cur === 0) {
      return this.mapGlobal()
    }
    return this.mapSp()
  }

  mapGlobal = () => {
    const { history, smartScreen, match } = this.props
    return smartScreen.sloganList.map(item => {
      return (
        <List.Item
          arrow="horizontal"
          extra="修改"
          onClick={() => {
            history.push(
              `/popularize/smartScreen/smartScreenSloganCRU/2/${match.params.id}/0/${item.id}`,
            )
          }}
          key={item.id}
        >
          {item.title}
          <List.Item.Brief>{item.context}</List.Item.Brief>
        </List.Item>
      )
    })
  }

  mapSp = () => {
    const { history, match } = this.props
    const { spList } = this.state
    return spList.map(item => {
      return (
        <List.Item
          arrow="horizontal"
          extra="配置见面语"
          onClick={() => {
            history.push(
              `/popularize/smartScreen/smartScreenShopAssistantSlogan/${match.params.id}/${item.value}`,
            )
          }}
          key={item.value}
        >
          {item.label}
        </List.Item>
      )
    })
  }

  render() {
    const { match, history } = this.props
    const { cur } = this.state
    return (
      <>
        <NavBar
          title="见面语配置"
          goBack
          right={
            cur === 0 ? (
              <Button
                type="ghost"
                size="small"
                style={{ color: '#fff', fontSize: 16 }}
                onClick={() => {
                  history.push(
                    `/popularize/smartScreen/smartScreenSloganCRU/2/${match.params.id}/0`,
                  )
                }}
              >
                添加
              </Button>
            ) : null
          }
        />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            selectedIndex={cur}
            onChange={e => {
              this.setState({
                cur: e.nativeEvent.selectedSegmentIndex,
              })
              if (e.nativeEvent.selectedSegmentIndex === 1) {
                const { smartScreen, match } = this.props
                smartScreen.getWorker(match.params.id).then(res => {
                  this.setState({
                    spList: res,
                  })
                })
              }
            }}
            values={['统一见面语', '指定见面语']}
          />
        </WingBlank>
        <WhiteSpace />
        <List>{this.mapList()}</List>
      </>
    )
  }
}

export default SmartScreenSloganManagement
