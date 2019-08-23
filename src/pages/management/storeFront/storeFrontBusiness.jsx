import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List } from 'antd-mobile'

@inject('storeFront')
@observer
class StoreFrontBusiness extends React.Component {
  componentDidMount() {
    const { storeFront, match } = this.props
    console.log(match)
    // storeFront.fetchBusinessList(match.params.id)
  }

  mapList = () => {
    const { storeFront } = this.props
    const { storeBusiness } = storeFront
    return storeBusiness.map(item => <List.Item key={item.id}>123</List.Item>)
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="商铺业务信息" goBack />
        <List>{this.mapList()}</List>
      </React.Fragment>
    )
  }
}

export default StoreFrontBusiness
