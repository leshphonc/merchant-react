import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List,
  Button,
  Flex,
  WingBlank,
  WhiteSpace,
  Modal,
  Radio,
  Toast,
  Picker,
  InputItem,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'
import ClipboardJS from 'clipboard'

const { RadioItem } = Radio

@inject('order', 'login')
@observer
class RetailDetail extends React.Component {
  state = {
    modal: false,
    copyModal: false,
    sendModal: false,
    addressValue: '',
    expressListLabel: '',
    expressListValue: '',
    no: '',
  }

  componentDidMount() {
    const { order, match } = this.props
    order.fetchShopOrderDetail(match.params.id).then(() => {
      const { shopOrderDetail } = order
      this.setState({
        no: shopOrderDetail.order_details.express_number,
      })
    })
    order.fetchExpressList(match.params.id).then(() => {
      const { order } = this.props
      const { label } = order.expressList[0] ? order.expressList[0] : { label: '' }
      const { value } = order.expressList[0] ? order.expressList[0] : { value: '' }
      this.setState({
        expressListLabel: label,
        expressListValue: value,
      })
    })
    const copyBtn = new ClipboardJS('#copyDOM')
    copyBtn.on('success', e => {
      // 复制成功
      e.clearSelection()
    })
    copyBtn.on('error', e => {
      // 复制失败；
      console.log(e.action)
    })
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
                  ¥{item2.total}
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
            <Button type="primary" onClick={this.orders}>
              接单
            </Button>
          </Flex.Item>
        )
      }
    }
  }

  orders = () => {
    const { order, match } = this.props
    order.orders(match.params.id)
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
          <Button
            type="primary"
            onClick={() => this.setState({
              sendModal: true,
            })
            }
          >
            发货
          </Button>
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
          <Button type="primary" onClick={() => this.confirmConsumption(orderDetails.order_id)}>
            确认消费
          </Button>
        </Flex.Item>
      )
    }
  }

  scanQRCode = () => {
    const { order, login } = this.props
    window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success(res) {
        const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        // window.alert(result)
        order.scanCode(result).then(res2 => {
          if (res2) {
            Toast.success('确认消费成功')
          } else {
            Toast.fail('确认消费失败')
          }
        })
      },
      fail() {
        login.wxConfigFun().then(res => {
          if (res) {
            this.scanQRCode()
          }
        })
      },
    })
  }

  // 确认消费
  confirmConsumption = id => {
    const { order } = this.props
    const { shopOrderDetail } = order
    const { order_details } = shopOrderDetail
    if (order_details.deliver_str === '自提') {
      this.scanQRCode()
      return false
    }
    Modal.alert('重要提示', '确认消费后，订单将设为已消费且不能恢复，请确认用户收货后再操作！', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => order.confirmConsumption(id),
      },
    ])
  }

  // 取消订单
  cancelOrder = id => {
    const { order } = this.props
    Modal.alert('取消订单', '确认取消订单？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => order.cancelOrder(id),
      },
    ])
  }

  mapDiscount = () => {
    const { order } = this.props
    const { shopOrderDetail } = order
    const dom = []
    if (shopOrderDetail.discount_detail) {
      const keys = Object.keys(shopOrderDetail.discount_detail)
      keys.forEach(key => {
        if (shopOrderDetail.discount_detail[key].discount_type === 1) {
          dom.push(
            <List.Item
              key={key}
              wrap
              extra={
                <span style={{ color: '#ff372d' }}>
                  {`- ¥${shopOrderDetail.discount_detail[key].minus}`}
                </span>
              }
            >
              <span style={{ color: '#fff', background: '#0ec0a8', padding: '0 2px' }}>首</span>{' '}
              系统首单满
              {shopOrderDetail.discount_detail[key].money}元减
              {shopOrderDetail.discount_detail[key].minus}元
            </List.Item>,
          )
        }
        if (shopOrderDetail.discount_detail[key].discount_type === 2) {
          dom.push(
            <List.Item
              key={key}
              wrap
              extra={
                <span style={{ color: '#ff372d' }}>
                  {`- ¥${shopOrderDetail.discount_detail[key].minus}`}
                </span>
              }
            >
              <span style={{ color: '#fff', background: '#5d26ea', padding: '0 2px' }}>减</span>{' '}
              系统优惠满
              {shopOrderDetail.discount_detail[key].money}元减
              {shopOrderDetail.discount_detail[key].minus}元
            </List.Item>,
          )
        }
        if (shopOrderDetail.discount_detail[key].discount_type === 3) {
          dom.push(
            <List.Item
              key={key}
              wrap
              extra={
                <span style={{ color: '#ff372d' }}>
                  {`- ¥${shopOrderDetail.discount_detail[key].minus}`}
                </span>
              }
            >
              <span style={{ color: '#fff', background: '#ffb000', padding: '0 2px' }}>首</span>{' '}
              店铺首单满
              {shopOrderDetail.discount_detail[key].money}元减
              {shopOrderDetail.discount_detail[key].minus}元
            </List.Item>,
          )
        }
        if (shopOrderDetail.discount_detail[key].discount_type === 4) {
          dom.push(
            <List.Item
              key={key}
              wrap
              extra={
                <span style={{ color: '#ff372d' }}>
                  {`- ¥${shopOrderDetail.discount_detail[key].minus}`}
                </span>
              }
            >
              <span style={{ color: '#fff', background: '#ff6655', padding: '0 2px' }}>减</span>{' '}
              店铺优惠满
              {shopOrderDetail.discount_detail[key].money}元减
              {shopOrderDetail.discount_detail[key].minus}元
            </List.Item>,
          )
        }
        if (shopOrderDetail.discount_detail[key].discount_type === 5) {
          dom.push(
            <List.Item
              key={key}
              wrap
              extra={
                <span style={{ color: '#ff372d' }}>
                  {`- ¥${shopOrderDetail.discount_detail[key].minus}`}
                </span>
              }
            >
              <span style={{ color: '#fff', background: '#ff0000', padding: '0 2px' }}>惠</span>{' '}
              商品满
              {shopOrderDetail.discount_detail[key].money}元配送费减
              {shopOrderDetail.discount_detail[key].minus}元
            </List.Item>,
          )
        }
      })
      return dom
    }
  }

  findExpressLabelAndFetch = value => {
    const { order } = this.props
    const { expressList } = order
    const result = expressList.find(item => item.value === value[0])
    this.setState({
      expressListLabel: result.label,
      expressListValue: result.value,
    })
  }

  // 发货到自提
  shipToSelfLifting = id => {
    const { order } = this.props
    order.shipToSelfLifting(id)
  }

  send = () => {
    const { order, match } = this.props
    const { no, expressListValue } = this.state
    order.sendOrder(match.params.id, no, expressListValue).then(res => {
      if (res) {
        Toast.success('发货成功', 1)
        this.setState({ sendModal: false })
      }
    })
  }

  render() {
    const { order } = this.props
    const { shopOrderDetail, expressList } = order
    const { modal, copyModal, sendModal, expressListLabel, expressListValue, no } = this.state
    const orderDetails = shopOrderDetail.order_details || {}
    return (
      <React.Fragment>
        <NavBar title="零售订单详情" goBack />
        <List renderHeader="订单信息">
          {orderDetails.fetch_number === '0' ? null : (
            <List.Item extra={orderDetails.fetch_number}>取单编号</List.Item>
          )}
          <List.Item extra={orderDetails.order_id}>订单编号</List.Item>
          <List.Item
            extra={orderDetails.real_orderid}
            data-clipboard-text={orderDetails.real_orderid}
            id="copyDOM"
            onClick={() => this.setState({ copyModal: true })}
          >
            流水号
          </List.Item>
          <List.Item extra={orderDetails.create_time}>下单时间</List.Item>
          <List.Item extra={orderDetails.expect_use_time}>期望送达时间</List.Item>
          <List.Item extra={orderDetails.order_from_txt}>订单来源</List.Item>
          <List.Item extra={orderDetails.username}>收货人名称</List.Item>
          <List.Item extra={orderDetails.userphone}>收货人电话</List.Item>
          <List.Item extra={orderDetails.register_phone}>注册电话</List.Item>
          <List.Item extra={orderDetails.note}>用户备注</List.Item>
          <List.Item extra={orderDetails.goods_type === '0' ? '实体商品订单' : '虚拟商品订单'}>
            订单类型
          </List.Item>
        </List>
        <List renderHeader="配送信息">
          <List.Item extra={orderDetails.deliver_str}>配送方式</List.Item>
          <List.Item wrap extra={orderDetails.address}>
            收货地址
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
          {this.mapDiscount()}
          <List.Item
            extra={
              <span style={{ color: '#ff372d' }}>{`优惠  - ¥${orderDetails.minus_price}`}</span>
            }
          >
            {`订单 ¥${orderDetails.discount_price}`}
          </List.Item>
        </List>
        <List renderHeader="支付信息">
          <List.Item extra={orderDetails.pay_time}>支付时间</List.Item>
          <List.Item extra={orderDetails.pay_type_str}>支付方式</List.Item>
          <List.Item
            extra={
              orderDetails.change_price > 0 ? orderDetails.price : `¥${orderDetails.go_pay_price}`
            }
          >
            应收总额
          </List.Item>
          <List.Item
            extra={`${orderDetails.minus_card_discount > 0 ? '- ' : ''}¥${
              orderDetails.minus_card_discount
            }`}
          >
            商家会员卡折扣
          </List.Item>
          <List.Item
            extra={`${orderDetails.balance_pay > 0 ? '- ' : ''}¥${orderDetails.balance_pay}`}
          >
            系统余额支付
          </List.Item>
        </List>
        <WhiteSpace />
        <WingBlank size="md">
          <Flex>
            {this.showSelfLifting()}
            {orderDetails.status === '7' && orderDetails.paid === '1' ? (
              <Flex.Item>
                <Button
                  type="primary"
                  onClick={() => this.shipToSelfLifting(orderDetails.order_id)}
                >
                  发货到自提
                </Button>
              </Flex.Item>
            ) : null}
            {this.showConfirm()}
            {orderDetails.status !== '2'
            && orderDetails.status !== '3'
            && orderDetails.status !== '4'
            && orderDetails.status !== '5'
            && orderDetails.sure ? (
              <Flex.Item>
                <Button type="warning" onClick={() => this.cancelOrder(orderDetails.order_id)}>
                  取消订单
                </Button>
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
        <Modal
          visible={copyModal}
          transparent
          onClose={() => this.setState({ copyModal: false })}
          title="流水号"
          footer={[
            {
              text: '复制',
              onPress: () => {
                Toast.success('流水号已复制到剪贴板', 1)
                this.setState({ copyModal: false })
              },
            },
          ]}
        >
          {orderDetails.real_orderid}
        </Modal>
        <Modal
          visible={sendModal}
          transparent
          onClose={() => this.setState({ sendModal: false })}
          title="快递信息"
          footer={[
            {
              text: '发货',
              onPress: () => this.send(),
            },
          ]}
        >
          <div style={{ fontSize: 13 }}>{orderDetails.address}</div>
          <div style={{ fontSize: 13 }}>配送距离：{orderDetails.distance}km</div>
          <WhiteSpace />
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={expressList}
              cols={1}
              value={[expressListValue]}
              onChange={val => this.findExpressLabelAndFetch(val)}
            >
              <div>
                <span>{expressListLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <InputItem
            placeholder="请输入快递单号"
            value={no}
            onChange={val => this.setState({ no: val })}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default RetailDetail
