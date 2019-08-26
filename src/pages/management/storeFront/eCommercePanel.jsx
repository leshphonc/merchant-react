import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Picker, Switch, Button, Toast,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { createForm } from 'rc-form'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import ECommerceCategory from './components/E-commerceCategory'
import MemberDiscount from './components/MemberDiscount'
import Utils from '@/utils'

@createForm()
@inject('storeFront')
@observer
class ECommercePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeBackground: '',
      qrcode: '',
    }
    this.categoryCheck = React.createRef()
    this.memberDiscount = React.createRef()
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props
    const cacheData = sessionStorage.getItem('cacheData')
      ? JSON.parse(sessionStorage.getItem('cacheData'))
      : null
    if (cacheData) {
      this.setState({
        storeBackground: cacheData.storeBackground,
        qrcode: cacheData.qrcode,
      })
      form.setFieldsValue({
        is_invoice: cacheData.is_invoice,
        store_discount: cacheData.store_discount,
        stock_type: cacheData.stock_type,
        reduce_stock_type: cacheData.reduce_stock_type,
        rollback_time: cacheData.rollback_time,
      })
      if (cacheData.is_invoice) {
        setTimeout(() => {
          form.setFieldsValue({
            invoice_price: cacheData.invoice_price,
          })
        }, 50)
      }
      return
    }
    // const content = this.editor.current.state.editor.txt.html()
    storeFront.fetchECommerceDetail(match.params.id).then(() => {
      const { eCommerceDetail } = storeFront
      form.setFieldsValue({
        is_invoice: eCommerceDetail.store_shop.is_invoice === '1',
        store_discount: eCommerceDetail.store_shop.store_discount,
        stock_type: [eCommerceDetail.store_shop.stock_type],
        reduce_stock_type: [eCommerceDetail.store_shop.reduce_stock_type],
        rollback_time: eCommerceDetail.store_shop.rollback_time,
        discount_type: [eCommerceDetail.store_shop.discount_type],
      })
      if (eCommerceDetail.store_shop.is_invoice === '1') {
        setTimeout(() => {
          form.setFieldsValue({
            invoice_price: eCommerceDetail.store_shop.invoice_price,
          })
        }, 50)
      }
      this.setState({
        storeBackground: eCommerceDetail.store_shop.file,
      })
    })
  }

  goBackgroundPicker = () => {
    const { history, form } = this.props
    const { storeBackground, qrcode } = this.state
    const data = form.getFieldsValue()
    data.storeBackground = storeBackground
    data.qrcode = qrcode
    Utils.cacheData(data)
    history.push('/uploadSingleImg/店铺背景图/storeBackground/2')
  }

  submit = () => {
    const { form, storeFront, match } = this.props
    const { storeBackground } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return
      }
      const obj = {
        file: storeBackground,
        is_invoice: value.is_invoice,
        invoice_price: value.invoice_price,
        discount_type: value.discount_type,
        store_discount: value.store_discount,
        stock_type: value.stock_type,
        reduce_stock_type: value.reduce_stock_type,
        rollback_time: value.rollback_time,
        leveloff: this.memberDiscount.current.state.leveloff,
        levelarr: this.categoryCheck.current.state.check,
        store_id: match.params.id,
      }
      console.log(this.categoryCheck.current.state.check)
      console.log(this.memberDiscount.current.state.leveloff)
      storeFront.modifyECommerceDetail(obj)
    })
  }

  render() {
    const {
      form, history, storeFront, match,
    } = this.props
    const { getFieldProps } = form
    const { storeBackground, qrcode } = this.state
    console.log(storeBackground)
    const invoice = form.getFieldValue('is_invoice')
    return (
      <React.Fragment>
        <NavBar title="电商详细配置" goBack />
        <WhiteSpace />
        <List>
          <List.Item arrow="horizontal" onClick={() => this.goBackgroundPicker()}>
            <CustomizeList>
              <ListTitle>商铺背景图</ListTitle>
              <ListContent>
                <img src={storeBackground || ''} className="w40" alt="" />
              </ListContent>
            </CustomizeList>
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
          <ECommerceCategory
            data={storeFront.eCommerceDetail.category_list}
            ref={this.categoryCheck}
          />
          <Picker
            {...getFieldProps('discount_type', {
              rules: [{ required: true }],
            })}
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
          <InputItem
            {...getFieldProps('store_discount', {
              rules: [{ required: true }],
            })}
            placeholder="请填写店铺折扣"
          >
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
          <MemberDiscount ref={this.memberDiscount} />
          <List.Item
            arrow="horizontal"
            onClick={() => history.push(
              `/management/storefront/storeFrontBusiness/storeDiscount/${match.params.id}`,
            )
            }
          >
            店铺优惠
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => history.push(
              `/management/storefront/storeFrontBusiness/storeDiscount/${match.params.id}`,
            )
            }
          >
            克隆商品
          </List.Item>
          <List.Item arrow="horizontal">
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
      </React.Fragment>
    )
  }
}

export default ECommercePanel
