import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, Card, Flex, Button, List } from 'antd-mobile'
import Utils from '@/utils'

@inject('storeFront')
@observer
class StoreFrontBusiness extends React.Component {
  componentDidMount() {
    Utils.clearCacheData()
  }

  render() {
    const { match, history } = this.props
    return (
      <React.Fragment>
        <NavBar title="商铺业务信息" goBack />
        <WhiteSpace />
        {match.params.mall - 0 ? (
          <Card>
            <Card.Header title="零售配置"></Card.Header>
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/ECommercePanel/${match.params.id}`,
                      )
                    }
                  >
                    配置编辑
                  </Button>
                </Flex.Item>
                {/* <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/categoryManagement/${match.params.id}/1`,
                      )
                    }
                  >
                    分类管理
                  </Button>
                </Flex.Item> */}
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/storeDiscount/${match.params.id}`,
                      )
                    }
                  >
                    店铺优惠
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/cloneCommodity/${match.params.id}`,
                      )
                    }
                  >
                    商品克隆
                  </Button>
                </Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
        ) : null}
        {match.params.peisong - 0 ? (
          <Card>
            <Card.Header title="外卖配置"></Card.Header>
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/TakeawayPanel/${match.params.id}`,
                      )
                    }
                  >
                    配置编辑
                  </Button>
                </Flex.Item>
                {/* <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/categoryManagement/${match.params.id}/2`,
                      )
                    }
                  >
                    分类管理
                  </Button>
                </Flex.Item> */}
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/storeDiscount/${match.params.id}`,
                      )
                    }
                  >
                    店铺优惠
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      history.push(
                        `/management/storefront/storeFrontBusiness/cloneCommodity/${match.params.id}`,
                      )
                    }
                  >
                    商品克隆
                  </Button>
                </Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
        ) : null}
        <WhiteSpace />
        {match.params.mall - 0 ? (
          <List>
            <List.Item
              arrow="horizontal"
              onClick={() => {
                history.push(
                  `/management/storefront/storeFrontBusinessService/${match.params.id}`,
                )
              }}
            >
              服务配置
            </List.Item>
          </List>
        ) : null}
      </React.Fragment>
    )
  }
}

export default StoreFrontBusiness
