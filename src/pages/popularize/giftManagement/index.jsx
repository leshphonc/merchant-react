import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, WingBlank, Card, WhiteSpace, SearchBar,
} from 'antd-mobile'
import { toJS } from 'mobx'
import GiftPanel from './giftPanel'
import OrdersGoods from './ordersGoods'
import OrderDetails from './orderDetails'
import DeliverGoods from './deliverGoods'

const seasons = [{ label: '关闭', value: '0' }, { label: '启用', value: '1' }]
@inject('giftManagement')
@observer
class GiftManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
    }
  }

  componentDidMount() {
    const { giftManagement } = this.props
    const { keyword } = this.state
    giftManagement.fetchGetGift(keyword)
  }

  detele = id => {
    const { giftManagement } = this.props
    giftManagement.fetchDelGift(id).then(() => {
      giftManagement.fetchGetGift()
    })
  }

  mapList = () => {
    const { giftManagement, history } = this.props
    const { getGift } = giftManagement
    console.log(toJS(getGift))
    return getGift.map(item => (
      <React.Fragment key={item.gift_id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.gift_name}
              </span>
            }
            thumb={item.wap_pic_list[0].image}
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
                    onClick={() => history.push(
                      `/popularize/giftManagement/ordersGoods/商品订单/${item.gift_id}`,
                    )
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
                      `/popularize/giftManagement/giftPanel/修改/${item.gift_id}/${item.cat_fid}`,
                    )
                    }
                  >
                    编辑
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button type="primary" size="small" onClick={() => this.detele(item.gift_id)}>
                    删除
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
    const { giftManagement } = this.props
    const { keyword } = this.state
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
        <SearchBar
          placeholder="礼品名称"
          value={keyword}
          onChange={val => this.setState({ keyword: val })}
          onSubmit={() => giftManagement.resetAndFetchGroupList(keyword)}
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
    <Route
      path="/popularize/giftManagement/giftPanel/:str/:giftId?/:catFid?"
      component={GiftPanel}
    />
    <Route path="/popularize/giftManagement/ordersGoods/:str/:giftId?" component={OrdersGoods} />
    <Route path="/popularize/giftManagement/deliverGoods/:orderId?" component={DeliverGoods} />
    <Route path="/popularize/giftManagement/orderDetails/:orderId?" component={OrderDetails} />
  </React.Fragment>
)
