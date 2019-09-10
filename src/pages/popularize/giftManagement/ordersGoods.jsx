import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import {
  Button, Flex, WingBlank, Card, WhiteSpace, PullToRefresh, Toast,
} from 'antd-mobile'
import Utils from '@/utils'
import moment from 'moment'

// const { prompt } = Modal
@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      giftPass: '',
      giftPassArr: [],
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { giftManagement, match } = this.props
    const { height } = this.state
    const { giftOrderDetail } = giftManagement
    if (giftOrderDetail.pass_array === '1') {
      giftManagement.fecthGiftPassArray(match.params.orderId).then(() => {
        const { giftOrderPass } = giftManagement
        console.log(giftOrderPass)
        this.setState({
          giftPassArr: giftOrderPass.pass_array,
        })
      })
    }
    // giftManagement.checkCouponCode(262)
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
    const { giftPass, giftPassArr } = this.state
    return giftOrder.map(item => (
      <React.Fragment key={item.order_id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.gift_name}
              </span>
            }
            thumb={item.wap_pic_list[0].image}
          />
          <Card.Body style={{ minHeight: '22px' }}>
            <Flex>
              <Flex.Item style={{ flex: 'none', width: '56%' }}>
                订单编号: {item.order_id}
              </Flex.Item>
              <Flex.Item>订单数量: {item.num}</Flex.Item>
            </Flex>
            <Flex style={{ marginTop: '10px', marginBottom: '5px' }}>
              <Flex.Item style={{ flex: 'none', width: '58%' }}>
                订单时间: {moment(item.order_time * 1000).format('YYYY-MM-DD HH:mm')}
              </Flex.Item>
              <Flex.Item style={{ marginLeft: '2px' }}>
                状态: {item.paid === '1' ? '已支付' : '未支付'}{' '}
                {item.status === '1' ? '已发货' : '未发货'}
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <Flex>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/popularize/giftManagement/orderDetails/${item.order_id}`)
                    }
                  >
                    详情
                  </Button>
                </Flex.Item>
                {item.is_pick_in_store === '0' ? (
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => history.push(`/popularize/giftManagement/deliverGoods/${item.order_id}`)
                      }
                    >
                      发货
                    </Button>
                  </Flex.Item>
                ) : (
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      // onClick={() => this.giftPassList(giftPassArr)}
                      onClick={() => {
                        window.wx.scanQRCode({
                          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                          success(res) {
                            const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                            // window.alert(result)
                            const code = Utils.getUrlParam('code', result)
                            if (code) {
                              giftManagement.checkCouponCode(item.order_id, code).then(res2 => {
                                if (res2) Toast.success('核销成功')
                              })
                            } else {
                              Toast.info('未识别到code，无法核销')
                            }
                          },
                          // fail(res) {
                          //   alert(JSON.stringify(res))
                          //   giftManagement.checkCouponCode(item.order_id)
                          // },
                        })
                      }}
                    >
                      扫码核销
                    </Button>
                  </Flex.Item>
                )}
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
        <NavBar title="商品订单" goBack />
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
