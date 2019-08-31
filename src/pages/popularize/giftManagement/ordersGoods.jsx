import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, WingBlank, Card, WhiteSpace,
} from 'antd-mobile'
import moment from 'moment'
import { toJS } from 'mobx'

@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { giftManagement } = this.props
    giftManagement.fetchGiftOrder()
  }

  mapList = () => {
    const { giftManagement, history } = this.props
    const { giftOrder } = giftManagement
    console.log(toJS(giftOrder))
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
            // extra={<span>{seasons[item.status].label}</span>}
          />
          <Card.Body style={{ minHeight: '22px' }}>
            <Flex>
              <Flex.Item>订单编号 {item.order_id}</Flex.Item>
              <Flex.Item>订单数量 {item.num}</Flex.Item>
            </Flex>
            <Flex style={{ marginTop: '10px' }}>
              <Flex.Item>订单时间 {moment(item.order_time * 1000).format('YYYY-MM-DD')}</Flex.Item>
              <Flex.Item>状态 {item.paid === '1' ? '已支付' : '未支付'} {item.status === '1' ? '已发货' : '未发货'}</Flex.Item>
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
                    // onClick={() => this.detele(item.gift_id)}
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

  render() {
    return (
      <React.Fragment>
        <NavBar
          title="商品订单"
          goBack
        />
        <WingBlank size="sm" style={{ marginTop: '10px' }}>
          {this.mapList()}
        </WingBlank>
      </React.Fragment>
    )
  }
}
export default OressGoods
