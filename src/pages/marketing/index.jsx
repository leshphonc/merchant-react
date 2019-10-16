import React from 'react'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List, Toast } from 'antd-mobile'

@inject('marketing')
@observer
class Marketing extends React.Component {
  componentDidMount() {
    const { marketing } = this.props
    marketing.fetchMarketingList()
  }

  mapList = () => {
    const { marketing } = this.props
    const { marketingList } = marketing
    return marketingList.map(item => (
      <React.Fragment key={item.id}>
        <List>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              Toast.info('手机端暂未开放此功能，请登录电脑端后台进行操作')
            }}
          >
            {item.name}
          </List.Item>
        </List>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <div style={{ marginBottom: 50 }}>
        <WhiteSpace />
        <List renderHeader="营销活动列表" />
        <WhiteSpace />
        {this.mapList()}
      </div>
    )
  }
}

export default Marketing
