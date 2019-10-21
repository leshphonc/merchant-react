import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, WingBlank, Card, Flex, Button } from 'antd-mobile'
import StorePanel from './storePanel'
import CoordinatePicker from './modify/coordinate'
import StoreFrontBusiness from './storeFrontBusiness'
import ECommercePanel from './eCommercePanel'
import TakeawayPanel from './takeawayPanel'
import CloneCommodity from './components/CloneCommodity'
import CategoryManagement from './categoryManagement'
import CategoryPanel from './categoryPanel'
import StoreDiscount from './storeDiscount'
import StoreDiscountPanel from './storeDiscountPanel'
import DiningInformation from './diningInformation'
import StoreFrontQualification from './storeFrontQualification'
import StoreFrontCommodityList from './storeFrontCommodityList'
import StoreFrontPackageList from './storeFrontPackageList'
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
              <Flex
                direction="column"
                justify="start"
                align="start"
                style={{ marginLeft: 10 }}
              >
                <span style={{ width: 200 }} className="ellipsis">
                  {item.name}
                </span>
                <WhiteSpace />
                <Flex>
                  {item.have_service === '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      标准
                    </PrimaryTag>
                  ) : null}
                  {item.have_mall === '1' && item.have_service !== '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      电商
                    </PrimaryTag>
                  ) : null}
                  {item.have_peisong === '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      外卖
                    </PrimaryTag>
                  ) : null}
                  {item.have_meal === '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      餐饮
                    </PrimaryTag>
                  ) : null}
                  {item.have_hotel === '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      酒店
                    </PrimaryTag>
                  ) : null}
                  {item.have_auto_parts === '1' ? (
                    <PrimaryTag
                      style={{
                        marginRight: 5,
                        color: '#999',
                        borderColor: '#999',
                        fontSize: 13,
                      }}
                    >
                      汽配
                    </PrimaryTag>
                  ) : null}
                </Flex>
              </Flex>
            }
            thumb={item.shop_logo}
            extra={
              <span style={{ color: StoreStatus[item.status].color }}>
                {StoreStatus[item.status].label}
              </span>
            }
          />
          <Card.Footer
            content={
              <React.Fragment>
                <Flex>
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        history.push(
                          `/management/storefront/storePanel/编辑/${item.store_id}`,
                        )
                      }
                    >
                      基础信息
                    </Button>
                  </Flex.Item>
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        history.push(
                          `/management/storefront/storeFrontBusiness/${item.store_id}/${item.have_mall}/${item.have_peisong}`,
                        )
                      }
                    >
                      业务信息
                    </Button>
                  </Flex.Item>
                  {item.have_mall === '1' || item.have_peisong === '1' ? (
                    <Flex.Item>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                          history.push(
                            `/management/storefront/qualification/${item.store_id}`,
                          )
                        }
                      >
                        资质审核
                      </Button>
                    </Flex.Item>
                  ) : null}
                </Flex>
                <WhiteSpace size="sm" />
                <Flex>
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        history.push(
                          `/management/storefront/storeFrontCommodityList/${item.store_id}`,
                        )
                      }
                    >
                      在售服务
                    </Button>
                  </Flex.Item>
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        history.push(
                          `/management/storefront/storeFrontPackageList/${item.store_id}`,
                        )
                      }
                    >
                      在售套餐
                    </Button>
                  </Flex.Item>
                </Flex>
              </React.Fragment>
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
            <Link
              style={{ color: '#fff' }}
              to="/management/storefront/storePanel/添加"
            >
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
    {/* 店铺基本信息编辑 */}
    <Route
      path="/management/storefront/storePanel/:str/:id?"
      component={StorePanel}
    />
    {/* 店铺服务列表 */}
    <Route
      path="/management/storefront/storeFrontCommodityList/:id"
      component={StoreFrontCommodityList}
    />
    {/* 店铺套餐列表 */}
    <Route
      path="/management/storefront/storeFrontPackageList/:id"
      component={StoreFrontPackageList}
    />
    {/* 坐标拾取 */}
    <Route
      path="/management/storefront/coordinatePicker/:lng?/:lat?"
      component={CoordinatePicker}
    />
    {/* 店铺业务列表 */}
    <Route
      path="/management/storefront/storeFrontBusiness/:id/:mall/:peisong"
      component={StoreFrontBusiness}
    />
    {/* 电商业务配置编辑 */}
    <Route
      path="/management/storefront/storeFrontBusiness/ECommercePanel/:id"
      component={ECommercePanel}
    />
    {/* 外卖业务配置编辑 */}
    <Route
      path="/management/storefront/storeFrontBusiness/TakeawayPanel/:id"
      component={TakeawayPanel}
    />
    {/* 克隆商铺 */}
    <Route
      path="/management/storefront/storeFrontBusiness/cloneCommodity/:id"
      component={CloneCommodity}
    />
    {/* 分类管理列表 */}
    <Route
      path="/management/storefront/categoryManagement/:id/:type"
      component={CategoryManagement}
    />
    {/* 分类管理编辑 */}
    <Route
      path="/management/storefront/categoryPanel/:str/:id/:type/:stid?"
      component={CategoryPanel}
    />
    {/* 店铺优惠列表 */}
    <Route
      path="/management/storefront/storeFrontBusiness/storeDiscount/:id"
      component={StoreDiscount}
    />
    {/* 店铺优惠编辑 */}
    <Route
      path="/management/storefront/storeDiscountPanel/:str/:id/:cid?"
      component={StoreDiscountPanel}
    />
    {/* 资质审核 */}
    <Route
      path="/management/storefront/qualification/:id"
      component={StoreFrontQualification}
    />
    {/* 餐饮信息 */}
    <Route
      path="/management/storefront/diningInformation"
      component={DiningInformation}
    />
  </React.Fragment>
)
