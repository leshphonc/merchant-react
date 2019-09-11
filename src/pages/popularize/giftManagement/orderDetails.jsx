import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List } from 'antd-mobile'
import moment from 'moment'

const { Item } = List
const delivery = [
  { label: '', value: '0' },
  { label: '工作日、双休日与假日均可送货', value: '1' },
  { label: '只工作日送货', value: '2' },
  { label: '只双休日、假日送货', value: '3' },
  { label: '白天没人，其它时间送货', value: '4' },
]

@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { giftManagement, match } = this.props
    giftManagement.fetchGiftOrderDetail(match.params.orderId)
  }

  render() {
    const { giftManagement } = this.props
    const { giftOrderDetail } = giftManagement
    return (
      <React.Fragment>
        <NavBar title="订单详情" goBack />
        <List>
          <Item extra={giftOrderDetail.order_id} arrow="empty">
            订单编号
          </Item>
          <Item extra={giftOrderDetail.order_name} arrow="empty">
            金币商城商品
          </Item>
        </List>
        <List renderHeader="订单信息">
          <Item
            extra={
              `${giftOrderDetail.exchange_type}` === '0'
                ? `纯${giftOrderDetail.score_name}`
                : giftOrderDetail.score_name
            }
            arrow="empty"
          >
            兑换类型
          </Item>
          <Item extra="实物" arrow="empty">
            订单类型
          </Item>
          <Item
            extra={
              `${giftOrderDetail.status}` === '2'
                ? '已完成'
                : `${giftOrderDetail.paid}` === '1'
                  ? '已支付'
                  : '未支付'
            }
            arrow="empty"
          >
            订单状态
          </Item>
          <Item extra={giftOrderDetail.num} arrow="empty">
            数量
          </Item>
          <Item extra={`${giftOrderDetail.worth}元`} arrow="empty">
            结算价
          </Item>
          <Item
            extra={moment(giftOrderDetail.order_time * 1000).format('YYYY-MM-DD HH:mm')}
            arrow="empty"
          >
            下单时间
          </Item>
          {/* <Item extra={giftOrderDetail.memo} arrow="empty">
            买家留言
          </Item> */}
        </List>
        <List renderHeader="用户信息">
          <Item extra={giftOrderDetail.uid} arrow="empty">
            用户ID
          </Item>
          <Item extra={giftOrderDetail.nickname} arrow="empty">
            用户昵称
          </Item>
          <Item extra={giftOrderDetail.phone} arrow="empty">
            订单手机号
          </Item>
          <Item extra={giftOrderDetail.user_phone} arrow="empty">
            用户手机号
          </Item>
        </List>
        <List renderHeader="配送信息">
          <Item extra={giftOrderDetail.contact_name} arrow="empty">
            收货人
          </Item>
          <Item extra={giftOrderDetail.phone} arrow="empty">
            联系电话
          </Item>
          <Item
            // extra={
            //   giftOrderDetail.delivery_type ? delivery[giftOrderDetail.delivery_type].label : ''
            // }
            arrow="empty"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                配送要求
              </div>
              <div>{giftOrderDetail.delivery_type ? delivery[giftOrderDetail.delivery_type].label : ''}</div>
            </div>
          </Item>
          <Item extra={giftOrderDetail.zipcode} arrow="empty">
            邮编
          </Item>
          <Item arrow="empty">
            <div style={{ display: 'flex' }}>
              <div>
                收货地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div style={{ whiteSpace: 'initial' }}>
                {giftOrderDetail.adress}
              </div>
            </div>
          </Item>
        </List>
      </React.Fragment>
    )
  }
}
export default OressGoods
