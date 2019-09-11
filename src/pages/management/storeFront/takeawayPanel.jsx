import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List,
  WhiteSpace,
  Switch,
  TextareaItem,
  InputItem,
  Picker,
  DatePicker,
  Modal,
  Button,
  Toast,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import CommodityCategory from './components/CommodityCategory'
import MemberDiscount from './components/MemberDiscount'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import Utils from '@/utils'

@createForm()
@inject('storeFront')
@observer
class TakeawayPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrcode: '',
      modal: false,
    }
    this.memberDiscount = React.createRef()
    this.categoryCheck = React.createRef()
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props
    storeFront.fetchQrcode(match.params.id).then(() => {
      this.setState({
        qrcode: storeFront.qrCode,
      })
    })
    storeFront.fetchTakeawayDetail(match.params.id).then(() => {
      const { takeawayDetail } = storeFront
      if (Object.keys(takeawayDetail.store_shop).length) {
        form.setFieldsValue({
          is_open_pick: takeawayDetail.store_shop.is_open_pick === '1',
          store_notice: takeawayDetail.store_shop.store_notice,
          is_mult_class: takeawayDetail.store_shop.is_mult_class === '1',
          is_auto_order: takeawayDetail.store_shop.is_auto_order === '1',
          is_invoice: takeawayDetail.store_shop.is_invoice === '1',
          advance_day: takeawayDetail.store_shop.advance_day,
          pack_alias: takeawayDetail.store_shop.pack_alias,
          freight_alias: takeawayDetail.store_shop.freight_alias,
          send_time_type: [takeawayDetail.store_shop.send_time_type],
          send_time: takeawayDetail.store_shop.send_time,
          deliver_type: [takeawayDetail.store_shop.deliver_type],
          basic_price: takeawayDetail.store_shop.basic_price,
          delivery_radius: takeawayDetail.store_shop.delivery_radius,
          store_discount: takeawayDetail.store_shop.store_discount,
          stock_type: [takeawayDetail.store_shop.stock_type],
          reduce_stock_type: [takeawayDetail.store_shop.reduce_stock_type],
          rollback_time: takeawayDetail.store_shop.rollback_time,
          discount_type: [takeawayDetail.store_shop.discount_type],
          delivertime_start: Utils.conversionTimeStringToDate(
            takeawayDetail.store_shop.delivertime_start,
          ),
          delivertime_stop: Utils.conversionTimeStringToDate(
            takeawayDetail.store_shop.delivertime_stop,
          ),
          basic_distance: takeawayDetail.store_shop.basic_distance,
          delivery_fee: takeawayDetail.store_shop.delivery_fee,
          per_km_price: takeawayDetail.store_shop.per_km_price,
          reach_delivery_fee_type: [takeawayDetail.store_shop.reach_delivery_fee_type],
          no_delivery_fee_value: takeawayDetail.store_shop.no_delivery_fee_value,
        })
        if (takeawayDetail.store_shop.is_invoice === '1') {
          setTimeout(() => {
            form.setFieldsValue({
              invoice_price: takeawayDetail.store_shop.invoice_price,
            })
          }, 50)
        }
      }
    })
  }

  mapCheck = () => {
    const { storeFront } = this.props
    if (Utils.getCacheData()) {
      const cacheData = Utils.getCacheData()
      return (
        <CommodityCategory
          data={storeFront.takeawayDetail.category_list || []}
          check={cacheData.check}
          type="2"
          ref={this.categoryCheck}
        />
      )
    }
    if (storeFront.takeawayDetail.category_list) {
      return (
        <CommodityCategory
          data={storeFront.takeawayDetail.category_list}
          check={storeFront.takeawayDetail.relation_array}
          type="2"
          ref={this.categoryCheck}
        />
      )
    }
  }

  submit = () => {
    const {
      form, storeFront, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return
      }
      const obj = {
        ...value,
        is_open_pick: value.is_open_pick ? '1' : '0',
        is_mult_class: value.is_mult_class ? '1' : '0',
        is_auto_order: value.is_auto_order ? '1' : '0',
        is_invoice: value.is_invoice ? '1' : '0',
        send_time_type: value.send_time_type[0],
        deliver_type: value.deliver_type[0],
        stock_type: value.stock_type[0],
        reduce_stock_type: value.reduce_stock_type[0],
        discount_type: value.discount_type ? value.discount_type[0] : '',
        delivertime_start: moment(value.delivertime_start).format('HH:mm'),
        delivertime_stop: moment(value.delivertime_stop).format('HH:mm'),
        reach_delivery_fee_type: value.reach_delivery_fee_type[0],
        leveloff: this.memberDiscount.current.state.leveloff,
        store_category: this.categoryCheck.current.state.check,
        store_id: match.params.id,
      }
      storeFront.modifyTakeawayDetail(obj).then(res => {
        if (res) {
          Toast.success('编辑成功', 1, () => history.goBack())
        }
      })
    })
  }

  render() {
    const { form, storeFront } = this.props
    const { getFieldProps } = form
    const { qrcode, modal } = this.state
    const invoice = form.getFieldValue('is_invoice')
    return (
      <React.Fragment>
        <NavBar title="外卖详情配置" goBack />
        <WhiteSpace />
        <List>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_open_pick', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            配送自提点
          </List.Item>
          <TextareaItem
            {...getFieldProps('store_notice', {
              rules: [{ required: true }],
            })}
            rows={3}
            count={100}
            title="店铺公告"
          />
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_mult_class', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            多级分类
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_auto_order', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            自动接单
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_invoice', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            开发票
          </List.Item>
          {invoice ? (
            <InputItem
              {...getFieldProps('invoice_price', {
                rules: [{ required: true }],
              })}
              placeholder="满多少元可开发票"
            >
              开票条件
            </InputItem>
          ) : null}
          <InputItem
            {...getFieldProps('advance_day', {
              rules: [{ required: true }],
            })}
            placeholder="可提前多少天预订下单"
          >
            预订下单
          </InputItem>
          <InputItem
            {...getFieldProps('pack_alias', {
              initialValue: '打包费',
            })}
            placeholder="给商品包装时耗材产生的费用名称"
          >
            包装费别名
          </InputItem>
          <InputItem
            {...getFieldProps('freight_alias', {
              initialValue: '配送费用',
            })}
            placeholder="商品运输时所产生的费用名称"
          >
            配送费别名
          </InputItem>
          <Picker
            {...getFieldProps('send_time_type', {
              required: true,
            })}
            cols={1}
            data={[
              { label: '分钟', value: '0' },
              { label: '小时', value: '1' },
              { label: '天', value: '2' },
              { label: '周', value: '3' },
              { label: '月', value: '4' },
            ]}
          >
            <List.Item arrow="horizontal">配单时长单位</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('send_time', {
              required: true,
            })}
            placeholder="配单时长"
          >
            配送费别名
          </InputItem>
          <Picker
            {...getFieldProps('deliver_type', {
              required: true,
            })}
            cols={1}
            data={[
              { label: '系统配送', value: '0' },
              { label: '商家配送', value: '1' },
              { label: '客户自提', value: '2' },
              { label: '系统配送或自提', value: '3' },
              { label: '商家配送或自提', value: '4' },
            ]}
          >
            <List.Item arrow="horizontal">配送方式</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('basic_price', {
              required: true,
            })}
            extra="元"
            placeholder="请输入起送价格"
          >
            起送价格
          </InputItem>
          <InputItem
            {...getFieldProps('delivery_radius', {
              required: true,
            })}
            extra="公里"
            placeholder="请输入服务半径"
          >
            服务半径
          </InputItem>
          <DatePicker
            {...getFieldProps('delivertime_start', {
              required: true,
            })}
            mode="time"
          >
            <List.Item arrow="horizontal">配送起始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('delivertime_stop', {
              required: true,
            })}
            mode="time"
          >
            <List.Item arrow="horizontal">配送结束时间</List.Item>
          </DatePicker>
          <InputItem
            {...getFieldProps('basic_distance', {
              required: true,
            })}
            extra="公里内"
            placeholder="请输入配送公里数"
          >
            配送距离
          </InputItem>
          <InputItem
            {...getFieldProps('delivery_fee', {
              required: true,
            })}
            extra="元"
            placeholder="请输入配送距离内价格"
          >
            配送价格
          </InputItem>
          <InputItem
            {...getFieldProps('per_km_price', {
              required: true,
            })}
            extra="元"
            placeholder="请输入超出部分费用"
          >
            超出范围每公里
          </InputItem>
          <Picker
            {...getFieldProps('reach_delivery_fee_type', {
              required: true,
            })}
            cols={1}
            data={[{ label: '免外送费', value: '0' }, { label: '照样收取外送费', value: '1' }]}
          >
            <List.Item arrow="horizontal">达到起送价格</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('no_delivery_fee_value', {
              required: true,
            })}
            extra="元"
            placeholder="请输入免外送费金额"
          >
            免外送费金额
          </InputItem>
          {this.mapCheck()}

          <Picker
            {...getFieldProps('discount_type')}
            title="优惠方式"
            extra="请选择"
            cols={1}
            data={[
              {
                label: '折上折',
                value: '0',
              },
              {
                label: '折扣最优',
                value: '1',
              },
            ]}
          >
            <List.Item arrow="horizontal">优惠方式</List.Item>
          </Picker>
          <InputItem {...getFieldProps('store_discount')} placeholder="请填写店铺折扣">
            店铺折扣
          </InputItem>
          <Picker
            {...getFieldProps('stock_type', {
              rules: [{ required: true }],
            })}
            title="库存类型"
            extra="请选择"
            cols={1}
            data={[
              {
                label: '每天自动更新固定量的库存',
                value: '0',
              },
              {
                label: '固定库存，不会每天自动更新',
                value: '1',
              },
            ]}
          >
            <List.Item arrow="horizontal">库存类型</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('reduce_stock_type', {
              rules: [{ required: true }],
            })}
            title="减库存类型"
            extra="请选择"
            cols={1}
            data={[
              {
                label: '支付成功后减库存',
                value: '0',
              },
              {
                label: '下单成功后减库存',
                value: '1',
              },
            ]}
          >
            <List.Item arrow="horizontal">减库存类型</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('rollback_time', {
              rules: [{ required: true }],
            })}
            placeholder="请填写买单时长"
          >
            买单时长
          </InputItem>
          {storeFront.takeawayDetail.store_shop ? (
            <MemberDiscount ref={this.memberDiscount} data={storeFront.takeawayDetail.store_shop} />
          ) : null}
          <List.Item
            arrow="horizontal"
            onClick={() => {
              this.setState({
                modal: true,
              })
            }}
          >
            <CustomizeList>
              <ListTitle>店铺二维码</ListTitle>
              <ListContent>
                <img src={qrcode || ''} className="w40" alt="" />
              </ListContent>
            </CustomizeList>
          </List.Item>
        </List>
        <Button
          type="primary"
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            marginBottom: 20,
          }}
          onClick={this.submit}
        >
          确定
        </Button>
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          title="店铺二维码"
          footer={[
            {
              text: '确定',
              onPress: () => {
                this.setState({
                  modal: false,
                })
              },
            },
          ]}
        >
          <img src={qrcode} alt="" style={{ width: '100%', height: '100%' }} />
        </Modal>
      </React.Fragment>
    )
  }
}

export default TakeawayPanel
