import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List, Button, Flex, WingBlank, WhiteSpace, Modal, Radio,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { RadioItem } = Radio

@inject('order')
@observer
class RetailDetail extends React.Component {
  state = {
    modal: false,
    addressValue: '',
  }

  componentDidMount() {
    const { order, match } = this.props
    order.fetchShopOrderDetail(match.params.id)
  }

  mapList = () => {
    const { order } = this.props
    const { shopOrderDetail } = order
    const info = shopOrderDetail.info || []
    return info.map((item, index) => (
      <React.Fragment key={index}>
        {/* <List.Item>{item.name}</List.Item> */}
        {item.list.map(item2 => (
          <List.Item
            key={item2.name}
            wrap
            extra={
              <React.Fragment>
                <span>x{item2.num}</span>
                <span style={{ textDecoration: 'line-through', margin: '0 15px' }}>
                  ¥{item2.discount_price}
                </span>
                <span>¥{item2.discount_price}</span>
              </React.Fragment>
            }
          >
            {item2.name}
          </List.Item>
        ))}
      </React.Fragment>
    ))
  }

  getPickAddress = () => {
    const { order, match } = this.props
    order.fetchPickAddress(match.params.id).then(() => {
      this.setState({
        modal: true,
      })
    })
  }

  pickAddress = () => {
    const { order, match } = this.props
    const { addressValue } = this.state
    order.pickerAddress(match.params.id, addressValue).then(() => {
      this.setState({ modal: false })
    })
  }

  mapAddress = () => {
    const { order } = this.props
    const { pickAddress } = order
    const { addressValue } = this.state
    return pickAddress.map(item => (
      <RadioItem
        key={item.pick_addr_id}
        checked={item.pick_addr_id === addressValue}
        onChange={() => this.setState({ addressValue: item.pick_addr_id })}
      >
        {`${item.area_info.province}-${item.area_info.city}-${item.area_info.area}`}
        <List.Item.Brief>
          <div>{item.name}</div>
          <div style={{ fontSize: 12 }}>距离{item.range}</div>
        </List.Item.Brief>
      </RadioItem>
    ))
  }

  closeModal = () => {
    this.setState({
      modal: false,
    })
  }

  showSelfLifting = () => {
    const { order } = this.props
    const { shopOrderDetail } = order
    const orderDetails = shopOrderDetail.order_details || {}
    if (orderDetails.status === '0' && orderDetails.paid === '1') {
      if (
        (orderDetails.is_pick_in_store === '1' || orderDetails.is_pick_in_store === '2')
        && orderDetails.is_open_pick === '1'
      ) {
        return (
          <Flex.Item>
            <Button type="primary" onClick={this.getPickAddress}>
              分配自提点
            </Button>
          </Flex.Item>
        )
      }
      if (orderDetails.order_from !== '1' && orderDetails.order_from !== '6') {
        return (
          <Flex.Item>
            <Button type="primary" onClick={this.getPickAddress}>
              接单
            </Button>
          </Flex.Item>
        )
      }
    }
  }

  showConfirm = () => {
    const { order } = this.props
    const { shopOrderDetail } = order
    const orderDetails = shopOrderDetail.order_details || {}
    if (
      orderDetails.is_pick_in_store === '3'
      && orderDetails.status !== '4'
      && orderDetails.status !== '5'
      && orderDetails.paid === '1'
      && orderDetails.user_confirm === '0'
    ) {
      return (
        <Flex.Item>
          <Button type="primary">发货</Button>
        </Flex.Item>
      )
    }
    if (
      (orderDetails.is_pick_in_store === '1' || orderDetails.is_pick_in_store === '2')
      && orderDetails.status !== '2'
      && orderDetails.status !== '3'
      && orderDetails.status !== '4'
      && orderDetails.status !== '5'
      && orderDetails.paid === '1'
      && orderDetails.sure
    ) {
      return (
        <Flex.Item>
          <Button type="primary">确认消费</Button>
        </Flex.Item>
      )
    }
  }

  render() {
    const { order } = this.props
    const { shopOrderDetail } = order
    const { modal } = this.state
    const orderDetails = shopOrderDetail.order_details || {}
    return (
      <React.Fragment>
        <NavBar title="订单详情" goBack />
        <List renderHeader="订单信息">
          <List.Item extra={orderDetails.fetch_number}>取单编号</List.Item>
          <List.Item extra={orderDetails.real_orderid}>订单编号</List.Item>
          <List.Item extra={orderDetails.create_time}>下单时间</List.Item>
          <List.Item extra={orderDetails.expect_use_time}>期望送达时间</List.Item>
          <List.Item extra={orderDetails.order_from_txt}>订单来源</List.Item>
          <List.Item extra={orderDetails.username}>收货人名称</List.Item>
          <List.Item extra={orderDetails.userphone}>收货人电话</List.Item>
          <List.Item extra={orderDetails.register_phone}>注册电话</List.Item>
          <List.Item extra={orderDetails.note}>用户备注</List.Item>
          <List.Item extra={!orderDetails.goods_type ? '实体商品订单' : '虚拟商品订单'}>
            订单类型
          </List.Item>
        </List>
        <List renderHeader="配送信息">
          <List.Item extra={orderDetails.deliver_str}>配送方式</List.Item>
          <List.Item wrap extra={orderDetails.address}>
            收获地址
          </List.Item>
        </List>
        <List renderHeader="商品信息">
          {this.mapList()}
          <List.Item extra={`¥${orderDetails.packing_charge}`}>
            {shopOrderDetail.pack_alias}
          </List.Item>
          <List.Item extra={`¥${orderDetails.freight_charge}`}>
            {shopOrderDetail.freight_alias}
          </List.Item>
        </List>
        <List renderHeader="支付信息">
          <List.Item extra={orderDetails.pay_time}>支付时间</List.Item>
          <List.Item extra={orderDetails.pay_type_str}>支付方式</List.Item>
          <List.Item extra={`¥${orderDetails.price}`}>应收总额</List.Item>
          <List.Item extra={orderDetails.minus_card_discount}>商家会员卡折扣</List.Item>
          <List.Item extra={`¥${orderDetails.balance_pay}`}>系统余额支付</List.Item>
        </List>
        <WhiteSpace />
        <WingBlank size="md">
          <Flex>
            {this.showSelfLifting()}
            {orderDetails.status === '7' && orderDetails.paid === '1' ? (
              <Flex.Item>
                <Button type="primary">发货到自提</Button>
              </Flex.Item>
            ) : null}
            {this.showConfirm()}
            {orderDetails.status !== '2'
            && orderDetails.status !== '3'
            && orderDetails.status !== '4'
            && orderDetails.status !== '5'
            && orderDetails.sure ? (
              <Flex.Item>
                <Button type="warning">取消订单</Button>
              </Flex.Item>
              ) : null}
          </Flex>
        </WingBlank>
        <WhiteSpace />
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          onClose={this.closeModal}
          title="选择配送地址"
          footer={[
            {
              text: '确定',
              onPress: this.pickAddress,
            },
          ]}
        >
          <List>{this.mapAddress()}</List>
        </Modal>
      </React.Fragment>
    )
  }
}

export default RetailDetail
