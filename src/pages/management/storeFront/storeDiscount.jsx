import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import {
  Card, WhiteSpace, WingBlank, Flex,
} from 'antd-mobile'

@inject('storeFront')
@observer
class StoreDiscount extends React.Component {
  componentDidMount() {
    const { storeFront, match } = this.props
    storeFront.fetchStoreDiscountList(match.params.id)
  }

  mapList = () => {
    const { storeFront, history, match } = this.props
    const { storeDiscountList } = storeFront
    return storeDiscountList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Body>
            <Flex>
              <Flex.Item>类别：{item.type === '0' ? '新单' : '满减'}</Flex.Item>
              <Flex.Item>满足金额：{item.full_money}</Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>优惠金额：{item.reduce_money}</Flex.Item>
              <Flex.Item>状态：{item.status === '1' ? '启用' : '停用'}</Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            extra={
              <button
                type="button"
                style={{ color: '#888' }}
                onClick={() => history.push(`/management/storefront/storeDiscountPanel/编辑/${match.params.id}/${item.id}`)
                }
              >
                <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                  &#xe634;
                </i>
                编辑
              </button>
            }
          />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar
          title="店铺优惠"
          goBack
          right={
            <Link
              style={{ color: '#fff' }}
              to={`/management/storefront/storeDiscountPanel/添加/${match.params.id}`}
            >
              添加优惠
            </Link>
          }
        />
        <WhiteSpace />
        <WingBlank>{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default StoreDiscount
