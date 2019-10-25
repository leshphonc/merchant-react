import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Button, PullToRefresh } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('smartScreen')
@observer
class SmartScreenCustomerSlogan extends React.Component {
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
      imax_id: match.params.id,
      type: 1,
      flag: true,
    })
  }

  mapList = () => {
    const { smartScreen, history, match } = this.props
    return smartScreen.sloganList.map(item => {
      return (
        <List.Item
          key={item.id}
          arrow="horizontal"
          extra="修改"
          onClick={() => {
            history.push(
              `/popularize/smartScreen/smartScreenSloganCRU/1/${match.params.id}/0/${item.id}`,
            )
          }}
        >
          {item.title}
          <List.Item.Brief>{item.context}</List.Item.Brief>
        </List.Item>
      )
    })
  }

  loadMore = () => {
    const { smartScreen, match } = this.props
    smartScreen.getSlogan({
      imax_id: match.params.id,
      type: 1,
    })
  }

  render() {
    const { history, match } = this.props
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar
          title="顾客见面配置"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={() =>
                history.push(
                  `/popularize/smartScreen/smartScreenSloganCRU/1/${match.params.id}/0`,
                )
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

export default SmartScreenCustomerSlogan
