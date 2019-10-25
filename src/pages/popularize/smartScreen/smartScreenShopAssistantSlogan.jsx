import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Button, PullToRefresh } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('smartScreen')
@observer
class SmartScreenShopAssistantSlogan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { smartScreen, match } = this.props
    smartScreen.getSlogan({
      imax_id: match.params.imax,
      type: 2,
      is_staff: match.params.id,
      flag: true,
    })
  }

  mapList = () => {
    const { history, match, smartScreen } = this.props
    return smartScreen.sloganList.map(item => {
      return (
        <List.Item
          arrow="horizontal"
          extra="修改"
          onClick={() => {
            history.push({
              pathname: `/popularize/smartScreen/smartScreenSloganCRU/2/${match.params.imax}/1/${item.id}`,
              state: {
                is_staff: match.params.id,
              },
            })
          }}
          key={item.id}
        >
          {item.title}
          <List.Item.Brief>{item.context}</List.Item.Brief>
        </List.Item>
      )
    })
  }

  render() {
    const { history, match } = this.props
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar
          title="员工见面配置"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={() =>
                history.push({
                  pathname: `/popularize/smartScreen/smartScreenSloganCRU/2/${match.params.imax}/1`,
                  state: {
                    staff_id: match.params.id,
                  },
                })
              }
            >
              添加
            </Button>
          }
        />
        <WhiteSpace />
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
          {this.mapList()}
        </PullToRefresh>
      </>
    )
  }
}

export default SmartScreenShopAssistantSlogan
