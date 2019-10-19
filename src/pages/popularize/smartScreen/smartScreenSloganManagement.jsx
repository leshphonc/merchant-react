import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  SegmentedControl,
  WingBlank,
  List,
  Button,
} from 'antd-mobile'

class SmartScreenSloganManagement extends React.Component {
  state = {
    cur: 0,
  }
  mapList = () => {
    const { cur } = this.state
    if (cur === 0) {
      return this.mapGlobal()
    } else {
      return this.mapSp()
    }
  }

  mapGlobal = () => {
    const { history } = this.props
    return (
      <List.Item
        arrow="horizontal"
        extra="修改"
        onClick={() => {
          history.push(`/popularize/smartScreen/smartScreenSloganCRU/${1}`)
        }}
      >
        见面语1
        <List.Item.Brief>见面语播报详细内容</List.Item.Brief>
      </List.Item>
    )
  }

  mapSp = () => {
    const { history } = this.props
    return (
      <List.Item
        thumb={require('@/assets/image/avatar.jpeg')}
        arrow="horizontal"
        extra="配置特殊见面语"
        onClick={() => {
          history.push('/popularize/smartScreen/smartScreenShopAssistantSlogan')
        }}
      >
        员工1
      </List.Item>
    )
  }

  render() {
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
              >
                添加
              </Button>
            ) : null
          }
        ></NavBar>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <SegmentedControl
            selectedIndex={cur}
            onChange={e => {
              console.log(e.nativeEvent.selectedSegmentIndex)
              this.setState({
                cur: e.nativeEvent.selectedSegmentIndex,
              })
            }}
            values={['全局见面语', '员工特殊见面语']}
          />
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <List>{this.mapList()}</List>
      </>
    )
  }
}

export default SmartScreenSloganManagement
