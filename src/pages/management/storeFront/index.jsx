import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace } from 'antd-mobile'
import StoreList from './components/StoreList'
import CategoryManagement from './categoryManagement'
import CategoryPanel from './categoryPanel'
import StoreDiscount from './storeDiscount'
import StoreDiscountPanel from './storeDiscountPanel'
import StorePanel from './storePanel'
import CoordinatePicker from './modify/coordinate'
import DiningInformation from './diningInformation'

// const TabsOption = [{ title: '网店', value: '1' }, { title: '餐饮', value: '2' }]

@inject('storeFront')
@observer
class StoreFront extends React.Component {
  componentDidMount() {
    const { storeFront } = this.props
    const type = sessionStorage.getItem('storeType') || '1'
    storeFront.fetchStoreList(type)
  }

  changeTab = item => {
    const { storeFront } = this.props
    storeFront.fetchStoreList(item.value)
    sessionStorage.setItem('storeType', item.value)
  }

  render() {
    const { storeFront } = this.props
    const type = sessionStorage.getItem('storeType') || '1'
    return (
      <React.Fragment>
        <NavBar
          title="店铺管理"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/storefront/storePanel/添加">
              添加店铺
            </Link>
          }
        />
        <WhiteSpace />
        {/* <Tabs tabs={TabsOption} initialPage={type - 1} onChange={item => this.changeTab(item)}>
          <StoreList list={storeFront.storeList} type={type} />
          <StoreList list={storeFront.storeList} type={type} />
        </Tabs> */}
        <StoreList list={storeFront.storeList} type={type} />
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/storefront" exact component={StoreFront} />
    <Route
      path="/management/storefront/categoryManagement/:id/:type"
      component={CategoryManagement}
    />
    <Route
      path="/management/storefront/categoryPanel/:str/:id/:type/:stid?"
      component={CategoryPanel}
    />
    <Route path="/management/storefront/storeDiscount/:id" component={StoreDiscount} />
    <Route
      path="/management/storefront/storeDiscountPanel/:str/:id/:cid?"
      component={StoreDiscountPanel}
    />
    <Route path="/management/storefront/storePanel/:str/:id?" component={StorePanel} />
    <Route
      path="/management/storefront/coordinatePicker/:lng?/:lat?"
      component={CoordinatePicker}
    />
    <Route path="/management/storefront/diningInformation" component={DiningInformation} />
  </React.Fragment>
)
