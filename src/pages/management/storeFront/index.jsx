import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, WingBlank, Card, Flex, Button,
} from 'antd-mobile'
import StorePanel from './storePanel'
import CoordinatePicker from './modify/coordinate'
import StoreFrontBusiness from './storeFrontBusiness'
import CategoryManagement from './categoryManagement'
import CategoryPanel from './categoryPanel'
import StoreDiscount from './storeDiscount'
import StoreDiscountPanel from './storeDiscountPanel'
import DiningInformation from './diningInformation'
import { StoreStatus } from '@/config/constant'
import { PrimaryTag } from '@/styled'
import Utils from '@/utils'

@inject('storeFront')
@observer
class StoreFront extends React.Component {
  componentDidMount() {
    const { storeFront } = this.props
    storeFront.fetchStoreList()
    Utils.clearCacheData()
  }

  mapList = () => {
    const { storeFront, history } = this.props
    const { storeList } = storeFront
    return storeList.map(item => (
      <React.Fragment key={item.store_id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.name}
              </span>
            }
            thumb={item.shop_logo}
            extra={
              <span style={{ color: StoreStatus[item.status].color }}>
                {StoreStatus[item.status].label}
              </span>
            }
          />
          <Card.Body>
            <Flex>
              {item.have_mall === '1' ? (
                <PrimaryTag style={{ marginRight: 5 }}>电商</PrimaryTag>
              ) : null}
              {item.have_peisong === '1' ? (
                <PrimaryTag style={{ marginRight: 5 }}>外卖</PrimaryTag>
              ) : null}
              {item.have_meal === '1' ? (
                <PrimaryTag style={{ marginRight: 5 }}>餐饮</PrimaryTag>
              ) : null}
              {item.have_hotel === '1' ? (
                <PrimaryTag style={{ marginRight: 5 }}>酒店</PrimaryTag>
              ) : null}
              {item.have_auto_parts === '1' ? (
                <PrimaryTag style={{ marginRight: 5 }}> 汽配</PrimaryTag>
              ) : null}
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <Flex>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/management/storefront/storePanel/编辑/${item.store_id}`)
                    }
                  >
                    基础信息
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/management/storefront/storeFrontBusiness/${item.store_id}`)
                    }
                  >
                    业务信息
                  </Button>
                </Flex.Item>
              </Flex>
            }
          />
          <WhiteSpace />
        </Card>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
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
        <WingBlank size="sm">{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/storefront" exact component={StoreFront} />
    <Route path="/management/storefront/storePanel/:str/:id?" component={StorePanel} />
    <Route
      path="/management/storefront/coordinatePicker/:lng?/:lat?"
      component={CoordinatePicker}
    />
    <Route path="/management/storefront/storeFrontBusiness/:id" component={StoreFrontBusiness} />
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
    <Route path="/management/storefront/diningInformation" component={DiningInformation} />
  </React.Fragment>
)
