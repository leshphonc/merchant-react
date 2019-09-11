import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List,
  Button,
  Flex,
  WingBlank,
  WhiteSpace,
  Modal,
  Card,
  Toast,
  Picker,
  InputItem,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'

const PayType = [
  {
    label: '现金',
    value: '1',
  },
  {
    label: '微信',
    value: '2',
  },
  {
    label: '支付宝',
    value: '3',
  },
  {
    label: '刷卡',
    value: '4',
  },
  {
    label: '其他',
    value: '5',
  },
]

@inject('order')
@observer
class ReservationDetail extends React.Component {
  state = {
    workerModal: false,
    verifyModal: false,
    workerId: '',
    workerLabel: '',
    payType: '1',
    payTypeLabel: '现金',
    psw: '',
  }

  componentDidMount() {
    const { order, match } = this.props
    order.fetchReservationOrderDetail(match.params.id).then(() => {
      const { reservationOrderDetail } = order
      this.findWorkerLabel([reservationOrderDetail.merchant_worker_id])
    })
  }

  findWorkerLabel = val => {
    const { order } = this.props
    const { reservationOrderDetail } = order
    if (!reservationOrderDetail.merchant_worker_list) return false
    const result = reservationOrderDetail.merchant_worker_list.find(item => item.value === val[0])
    if (result) {
      this.setState({
        workerId: val[0],
        workerLabel: result.label,
      })
    } else {
      this.setState({
        workerId: '-1',
        workerLabel: '抢单方式',
      })
    }
  }

  findPayTypeLabel = val => {
    const result = PayType.find(item => item.value === val[0])
    this.setState({
      payType: result.value,
      payTypeLabel: result.label,
    })
  }

  closeModal = () => {
    this.setState({
      workerModal: false,
      verifyModal: false,
    })
  }

  // 服务状态
  serviceStatus = item => {
    if (item.paid === '0') {
      if (item.service_status === '0') {
        if (!item.supply_info) return '无信息'
        if (item.supply_info.status === '1') return '未服务'
        if (item.supply_info.status === '2') return '服务中'
        if (item.supply_info.status === '3') return '已服务'
      } else if (item.service_status === '1') {
        return '已服务'
      } else if (item.service_status === '2') {
        return '已评价'
      }
    } else if (item.paid === '1') {
      if (item.service_status === '0') {
        if (!item.supply_info) return '无信息'
        if (item.supply_info.status === '1') return '未服务'
        if (item.supply_info.status === '2') return '服务中'
        if (item.supply_info.status === '3') return '已服务'
      } else if (item.service_status === '1') {
        return '已服务'
      } else if (item.service_status === '2') {
        return '已评价'
      } else if (item.service_status === '3') {
        return '已付款，已服务'
      }
    } else if (item.paid === '2') {
      return '已退款'
    } else if (item.paid === '3') {
      return '用户已取消'
    } else {
      return '订单异常'
    }
  }

  showSJ = orderDetails => {
    if (
      orderDetails.product_real_payment_price - 0 + (orderDetails.product_real_balace_price - 0)
      > 0
    ) {
      return (
        <List.Item
          extra={`-¥${orderDetails.product_real_payment_price
            - 0
            + (orderDetails.product_real_balace_price - 0)}`}
        >
          实际支付金额
        </List.Item>
      )
    }
    if (orderDetails.is_initiative && orderDetails.service_status) {
      if (orderDetails.product_balance_pay > 0) {
        return <List.Item extra={`-¥${orderDetails.product_balance_pay}`}>余额支付金额</List.Item>
      }
    }
  }

  showSJ2 = orderDetails => {
    if (orderDetails.product_real_payment_price > 0) {
      return (
        <List.Item extra={`-¥${orderDetails.product_real_payment_price}`}>实际支付金额</List.Item>
      )
    }
    if (orderDetails.balance_pay > 0) {
      return <List.Item extra={`-¥${orderDetails.balance_pay}`}>余额支付金额</List.Item>
    }
  }

  showSJ3 = orderDetails => {
    const dom = []
    if (
      orderDetails.product_id
      && orderDetails.paid === '1'
      && orderDetails.service_status === '1'
      && orderDetails.is_initiative
    ) {
      if (orderDetails.user_pay_money - 0 + (orderDetails.product_balance_pay - 0) > 0) {
        dom.push(
          <List.Item key="实际支付余额" extra={`-¥${orderDetails.balance_pay}`}>
            实际支付余额
          </List.Item>,
        )
      }
      dom.push(
        <List.Item key="实际支付余额时间" extra={`${orderDetails.user_pay_time}`}>
          实际支付余额时间
        </List.Item>,
      )
      if (orderDetails.product_score_deducte > 0) {
        dom.push(
          <List.Item
            key="实际支付积分金额"
            extra={`-¥${orderDetails.product_score_deducte} (使用${orderDetails.product_score_used_count}积分)`}
          >
            实际支付积分金额
          </List.Item>,
        )
      }
      if (orderDetails.product_coupon_price > 0) {
        dom.push(
          <List.Item key="实际支付系统优惠券金额" extra={`-¥${orderDetails.product_score_deducte}`}>
            实际支付系统优惠券金额
          </List.Item>,
        )
      }
      if (orderDetails.product_card_price > 0) {
        dom.push(
          <List.Item key="实际支付商家优惠券金额" extra={`-¥${orderDetails.product_card_price}`}>
            实际支付商家优惠券金额
          </List.Item>,
        )
      }
    }
    return dom
  }

  showAddress = orderDetails => {
    if (orderDetails.cue_list) {
      orderDetails.cue_list.map(item => (
        <List.Item
          extra={
            item.type === '2' && item.address !== undefined ? (
              <React.Fragment>
                <span>地址：{item.address}</span>
                <span>{item.value}</span>
              </React.Fragment>
            ) : null
          }
        >
          {item.name}
        </List.Item>
      ))
    }
  }

  operating = orderDetails => {
    if (
      (orderDetails.service_status === '0' || orderDetails.service_status === '3')
      && orderDetails.is_del === '0'
    ) {
      if (orderDetails.merchant_worker_id !== '0') {
        return (
          <Flex.Item>
            <Button
              type="primary"
              onClick={() => this.setState({
                workerModal: true,
              })
              }
            >
              修改派单
            </Button>
          </Flex.Item>
        )
      }
      return (
        <Flex.Item>
          <Button
            type="primary"
            onClick={() => this.setState({
              workerModal: true,
            })
            }
          >
            派单
          </Button>
        </Flex.Item>
      )
    }
  }

  orderHandle = () => {
    const { order, match } = this.props
    const { workerId } = this.state
    if (!workerId) {
      Toast.info('请选择服务者', 1)
      return false
    }
    order.orderHandle(match.params.id, workerId).then(() => {
      this.setState({ workerModal: false })
      Toast.success('服务者指定成功', 2)
    })
  }

  verifyHandle = () => {
    const { order, match } = this.props
    const { workerId, payType, psw } = this.state
    if (!workerId) {
      Toast.info('请选择服务者', 1)
      return false
    }
    if (!psw) {
      Toast.info('输入服务密码', 1)
      return false
    }
    order.verifyHandle(match.params.id, workerId, payType, psw).then(() => {
      this.setState({ verifyModal: false })
      Toast.success('验证成功', 2)
    })
  }

  render() {
    const { order } = this.props
    const { reservationOrderDetail } = order
    const {
      workerModal,
      verifyModal,
      workerId,
      workerLabel,
      payType,
      payTypeLabel,
      psw,
    } = this.state
    const orderDetails = reservationOrderDetail || {}
    return (
      <React.Fragment>
        <NavBar title="预定订单详情" goBack />
        <WhiteSpace />
        <Card>
          <Card.Header
            title={
              <React.Fragment>
                <span style={{ color: '#333' }}>{orderDetails.nickname}</span>
                <span style={{ fontSize: 14, color: '#666', marginLeft: 5 }}>
                  {orderDetails.phone}
                </span>
              </React.Fragment>
            }
            extra={orderDetails.appoint_type === '0' ? '到店服务' : '上门服务'}
          >
          </Card.Header>
          <Card.Body style={{ fontSize: 13 }}>
            <Flex>
              <Flex.Item>
                <Flex direction="column" justify="start" align="start">
                  <div style={{ color: '#999' }}>预约项目</div>
                  <WhiteSpace size="xs" />
                  <div style={{ color: '#666' }}>{orderDetails.appoint_name}</div>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Flex direction="column" justify="start" align="start">
                  <div style={{ color: '#999' }}>预约时间</div>
                  <WhiteSpace size="xs" />
                  <div style={{ color: '#666' }}>
                    {orderDetails.appoint_date} {orderDetails.appoint_time}
                  </div>
                </Flex>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              {orderDetails.car_license ? (
                <Flex.Item>
                  <Flex direction="column" justify="start" align="start">
                    <div style={{ color: '#999' }}>预约车牌</div>
                    <WhiteSpace size="xs" />
                    <div style={{ color: '#666' }}>{orderDetails.car_license}</div>
                  </Flex>
                </Flex.Item>
              ) : null}
              {orderDetails.p_chexingmingcheng ? (
                <Flex.Item>
                  <Flex direction="column" justify="start" align="start">
                    <div style={{ color: '#999' }}>预约车型</div>
                    <WhiteSpace size="xs" />
                    <div style={{ color: '#666' }}>{orderDetails.p_chexingmingcheng}</div>
                  </Flex>
                </Flex.Item>
              ) : null}
              {orderDetails.appoint_envo ? (
                <Flex.Item>
                  <Flex direction="column" justify="start" align="start">
                    <div style={{ color: '#999' }}>预约工位</div>
                    <WhiteSpace size="xs" />
                    <div style={{ color: '#666' }}>{orderDetails.appoint_envo}</div>
                  </Flex>
                </Flex.Item>
              ) : null}
              {orderDetails.content ? (
                <Flex.Item>
                  <Flex direction="column" justify="start" align="start">
                    <div style={{ color: '#999' }}>留言</div>
                    <WhiteSpace size="xs" />
                    <div style={{ color: '#666' }}>{orderDetails.content}</div>
                  </Flex>
                </Flex.Item>
              ) : null}
              {orderDetails.product_detail ? (
                <Flex.Item>
                  <Flex direction="column" justify="start" align="start">
                    <div style={{ color: '#999' }}>选择预约详情</div>
                    <WhiteSpace size="xs" />
                    <div style={{ color: '#666' }}>
                      <span>名称：{orderDetails.product_detail.name}</span>
                      <span>价格：{orderDetails.product_detail.price}</span>
                    </div>
                  </Flex>
                </Flex.Item>
              ) : null}
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer content={`服务状态：${this.serviceStatus(orderDetails)}`}></Card.Footer>
          <WhiteSpace />
        </Card>
        <List renderHeader="订单信息">
          <List.Item extra={orderDetails.order_id}>订单编号</List.Item>
          <List.Item extra={orderDetails.order_time}>下单时间</List.Item>
          {orderDetails.product_payment_price > 0 || orderDetails.payment_money > 0 ? (
            <React.Fragment>
              <List.Item
                extra={
                  orderDetails.product_id > 0
                    ? orderDetails.product_payment_price
                    : orderDetails.payment_money
                }
              >
                预付定金
              </List.Item>
              <List.Item extra={orderDetails.paid === '0' ? '未支付' : '已支付'}>
                支付状态
              </List.Item>
            </React.Fragment>
          ) : null}
          <List.Item
            extra={
              orderDetails.product_id > 0 ? orderDetails.product_price : orderDetails.appoint_price
            }
          >
            订单总价
          </List.Item>
          <List.Item extra={orderDetails.service_status > 0 ? '已支付' : '未支付'}>
            支付状态
          </List.Item>
          {orderDetails.merchant_balance > 0 ? (
            <List.Item extra={orderDetails.merchant_balance}>使用商户余额</List.Item>
          ) : null}

          {orderDetails.score_deducte > 0 ? (
            <List.Item
              extra={`-¥${orderDetails.score_deducte} （使用${orderDetails.score_used_count}）积分`}
            >
              订金积分抵扣
            </List.Item>
          ) : null}
          {orderDetails.is_initiative
          && orderDetails.service_status
          && orderDetails.balance_pay - 0 + (orderDetails.product_balance_pay - 0) > 0 ? (
            <List.Item
              extra={`-¥${orderDetails.balance_pay - 0 + (orderDetails.product_balance_pay - 0)}`}
            >
              余额支付金额
            </List.Item>
            ) : null}
          {this.showSJ(orderDetails)}
          {this.showSJ2(orderDetails)}
          {orderDetails.pay_money > 0 ? (
            <List.Item extra={`-¥${orderDetails.pay_money}`}>实际支付金额</List.Item>
          ) : null}
          {orderDetails.product_card_give_money > 0 ? (
            <List.Item extra={`-¥${orderDetails.product_card_give_money}`}>
              余额商家赠送余额
            </List.Item>
          ) : null}
          {orderDetails.product_id
          && orderDetails.paid === '1'
          && orderDetails.pay_time > 0
          && orderDetails.pay_money
            - 0
            + (orderDetails.balance_pay - 0)
            + (orderDetails.score_deducte - 0)
            > 0 ? (
              <List.Item
                extra={`-¥${orderDetails.pay_money
                - 0
                + (orderDetails.balance_pay - 0)
                + (orderDetails.score_deducte - 0)}`}
              >
              实际支付定金
              </List.Item>
            ) : null}
          {this.showSJ3(orderDetails)}
          {this.showAddress(orderDetails)}
        </List>
        <WhiteSpace />
        <WingBlank size="md">
          <Flex>
            {this.operating(orderDetails)}
            <Flex.Item>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({
                    verifyModal: true,
                  })
                }}
              >
                验证服务
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace />
        <Modal
          visible={workerModal}
          transparent
          onClose={this.closeModal}
          title="选择服务者"
          footer={[
            {
              text: '确定',
              onPress: this.orderHandle,
            },
          ]}
        >
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={reservationOrderDetail.merchant_worker_list}
              cols={1}
              value={[workerId]}
              onChange={val => this.findWorkerLabel(val)}
            >
              <div>
                <span>服务者：{workerLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </Modal>
        <Modal
          visible={verifyModal}
          transparent
          onClose={this.closeModal}
          title="验证务者"
          footer={[
            {
              text: '确定',
              onPress: this.verifyHandle,
            },
          ]}
        >
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={reservationOrderDetail.merchant_worker_list}
              cols={1}
              value={[workerId]}
              onChange={val => this.findWorkerLabel(val)}
            >
              <div>
                <span>服务者：{workerLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <WhiteSpace />
          <FilterBox>
            <Picker
              data={PayType}
              cols={1}
              value={[payType]}
              onChange={val => this.findPayTypeLabel(val)}
            >
              <div>
                <span>支付方式：{payTypeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <WhiteSpace />
          <List>
            <InputItem
              placeholder="请输入服务密码"
              value={psw}
              onChange={val => this.setState({
                psw: val,
              })
              }
            />
          </List>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ReservationDetail
