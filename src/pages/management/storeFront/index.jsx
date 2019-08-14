import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import StoreList from './components/StoreList'
import ManagementCategory from './managementCategory'
import CategoryPanel from './categoryPanel'

const TabsOption = [{ title: '网店', value: '1' }, { title: '餐饮', value: '2' }]

@inject('storeFront')
@observer
class StoreFront extends React.Component {
  state = {
    type: '1',
  }

  componentDidMount() {
    const { storeFront } = this.props
    const { type } = this.state
    storeFront.fetchStoreList(type)
  }

  changeTab = item => {
    const { storeFront } = this.props
    storeFront.fetchStoreList(item.value)
    this.setState({
      type: item.value,
    })
  }

  render() {
    const { storeFront } = this.props
    const { type } = this.state
    return (
      <React.Fragment>
        <NavBar title="店铺管理" goBack />
        <WhiteSpace />
        <Tabs tabs={TabsOption} onChange={item => this.changeTab(item)}>
          <StoreList list={storeFront.storeList} type={type} />
          <StoreList list={storeFront.storeList} type={type} />
        </Tabs>
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/storefront" exact component={StoreFront} />
    <Route path="/management/storefront/managementCategory/:id/:type" component={ManagementCategory} />
    <Route path="/management/storefront/categoryPanel/:type" component={CategoryPanel} />
  </React.Fragment>
)
