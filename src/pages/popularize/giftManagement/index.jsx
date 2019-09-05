import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, WingBlank, Card, WhiteSpace, SearchBar, PullToRefresh,
} from 'antd-mobile'
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
      refreshing: false,
      height: document.documentElement.clientHeight,
      keyword: '',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { giftManagement } = this.props
    const { height, keyword } = this.state
    giftManagement.fetchGetGift(keyword)
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 44
      this.setState({
        height: hei,
      })
    }
  }

  detele = id => {
    const { giftManagement } = this.props
    giftManagement.fetchDelGift(id).then(() => {
      giftManagement.resetAndFetchRedEnvelopList()
      giftManagement.fetchGetGift()
    })
  }

  mapList = () => {
    const { giftManagement, history } = this.props
    const { getGift } = giftManagement
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
                    onClick={() => history.push(`/popularize/giftManagement/ordersGoods/${item.gift_id}`)
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

  loadMore = async () => {
    const { giftManagement } = this.props
    const { keyword } = this.state
    this.setState({ refreshing: true })
    await giftManagement.fetchGetGift(keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { giftManagement } = this.props
    const { keyword, height, refreshing } = this.state
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
          onSubmit={() => giftManagement.resetAndFetchGiftList(keyword)}
        />
        <PullToRefresh
          ref={this.refresh}
          refreshing={refreshing}
          style={{
            height,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.loadMore}
        >
          <WhiteSpace />
          <WingBlank size="sm">{this.mapList()}</WingBlank>
        </PullToRefresh>
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
    <Route path="/popularize/giftManagement/ordersGoods/:giftId?" component={OrdersGoods} />
    <Route path="/popularize/giftManagement/deliverGoods/:orderId?" component={DeliverGoods} />
    <Route path="/popularize/giftManagement/orderDetails/:orderId?" component={OrderDetails} />
  </React.Fragment>
)
