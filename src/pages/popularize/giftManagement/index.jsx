import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, WingBlank, Card, WhiteSpace,
} from 'antd-mobile'
import { toJS } from 'mobx'
import GiftPanel from './giftPanel'

const seasons = [{ label: '关闭', value: '0' }, { label: '启用', value: '1' }]
@inject('giftManagement')
@observer
class GiftManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { giftManagement } = this.props
    giftManagement.fetchGetGift()
  }

  search = () => {}

  mapList = () => {
    const { giftManagement, history } = this.props
    const { getGift, getLists } = giftManagement
    console.log(toJS(getGift))
    console.log(toJS(getLists))
    return getGift.map(item => (
      <React.Fragment key={item.gift_id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.gift_name}
              </span>
            }
            thumb={item.wap_pic}
            extra={<span>{seasons[item.status].label}</span>}
          />
          <Card.Body style={{ minHeight: '22px' }}>
            <Flex style={{ textAlign: 'center' }}>
              <Flex.Item>编号 {item.gift_id}</Flex.Item>
              <Flex.Item>销量 {item.sale_count}份</Flex.Item>
              <Flex.Item>库存 {item.sku}</Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <Flex>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/management/storefront/storePanel/${item.store_id}`)
                    }
                  >
                    商品订单
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(
                      `/popularize/giftManagement/giftPanel/修改/${item.gift_id}`,
                    )
                    }
                  >
                    编辑
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
          title="礼品列表"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/popularize/giftManagement/giftPanel/添加">
              添加
            </Link>
          }
        />
        <WingBlank size="sm" style={{ marginTop: '10px' }}>
          {this.mapList()}
        </WingBlank>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/popularize/giftManagement" exact component={GiftManagement} />
    <Route path="/popularize/giftManagement/giftPanel/:str/:giftId?" component={GiftPanel} />
  </React.Fragment>
)
