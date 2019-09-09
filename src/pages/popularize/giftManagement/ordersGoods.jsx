import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import {
  Button, Flex, WingBlank, Card, WhiteSpace, PullToRefresh,
} from 'antd-mobile'
import moment from 'moment'

@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { giftManagement, match } = this.props
    const { height } = this.state
    giftManagement.fetchGiftOrder(match.params.giftId).then(() => {
      giftManagement.resetAndFetchGiftOrderList()
      giftManagement.fetchGiftOrder(match.params.giftId)
    })
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
  }

  mapList = () => {
    const { giftManagement, history } = this.props
    const { giftOrder } = giftManagement
    return giftOrder.map(item => (
      <React.Fragment key={item.order_id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.gift_name}
              </span>
            }
            thumb={item.wap_pic}
          />
          <Card.Body style={{ minHeight: '22px' }}>
            <Flex>
              <Flex.Item style={{ flex: 'none', width: '56%' }}>订单编号: {item.order_id}</Flex.Item>
              <Flex.Item>订单数量: {item.num}</Flex.Item>
            </Flex>
            <Flex style={{ marginTop: '10px', marginBottom: '5px' }}>
              <Flex.Item style={{ flex: 'none', width: '58%' }}>订单时间: {moment(item.order_time * 1000).format('YYYY-MM-DD HH:mm')}</Flex.Item>
              <Flex.Item style={{ marginLeft: '2px' }}>状态: {item.paid === '1' ? '已支付' : '未支付'} {item.status === '1' ? '已发货' : '未发货'}</Flex.Item>
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
                      `/popularize/giftManagement/orderDetails/${item.order_id}`,
                    )
                    }
                  >
                    详情
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(
                      `/popularize/giftManagement/deliverGoods/${item.order_id}`,
                    )
                    }
                  >
                    发货
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
    this.setState({ refreshing: true })
    await giftManagement.fetchGiftOrder()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { giftManagement } = this.props
    const { giftOrderTotal } = giftManagement
    const { refreshing, height } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="商品订单"
          goBack
        />
        {giftOrderTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </React.Fragment>
        ) : (
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
        )}
      </React.Fragment>
    )
  }
}
export default OressGoods
