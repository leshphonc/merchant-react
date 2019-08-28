import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, WhiteSpace } from 'antd-mobile'
import Utils from '@/utils'

@inject('storeFront')
@observer
class StoreFrontBusiness extends React.Component {
  componentDidMount() {
    Utils.clearCacheData()
    console.log(123)
  }

  render() {
    const { match, history } = this.props
    return (
      <React.Fragment>
        <NavBar title="商铺业务信息" goBack />
        <WhiteSpace />
        <List>
          {match.params.mall - 0 ? (
            <List.Item
              arrow="horizontal"
              onClick={() => history.push(
                `/management/storefront/storeFrontBusiness/ECommercePanel/${match.params.id}`,
              )
              }
            >
              电商配置
            </List.Item>
          ) : null}
          {match.params.peisong - 0 ? (
            <List.Item
              arrow="horizontal"
              onClick={() => history.push(
                `/management/storefront/storeFrontBusiness/TakeawayPanel/${match.params.id}`,
              )
              }
            >
              外卖配置
            </List.Item>
          ) : null}
        </List>
      </React.Fragment>
    )
  }
}

export default StoreFrontBusiness
