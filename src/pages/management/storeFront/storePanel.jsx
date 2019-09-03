import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  List,
  InputItem,
  Picker,
  Button,
  DatePicker,
  ImagePicker,
  Toast,
  TextareaItem,
  Switch,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import moment from 'moment'
import { toJS } from 'mobx'
import { CustomizeList, ListTitle, ListContent } from '@/styled'

const DiscountOptions = [
  { label: '无优惠', value: '0' },
  { label: '折扣', value: '1' },
  { label: '满减', value: '2' },
]

@createForm()
@inject('storeFront', 'common')
@observer
class StorePanel extends React.Component {
  state = {
    asyncCascadeValue: [],
    long: '',
    lat: '',
    shopLogo: '',
    qrcode: '',
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props

    // 首先判断是否有缓存
    const cacheData = JSON.parse(sessionStorage.getItem('cacheData'))
    if (cacheData && Object.keys(cacheData).length) {
      if (cacheData.cascade) {
        storeFront.fetchCascadeOption(
          cacheData.cascade[0],
          cacheData.cascade[1],
          cacheData.cascade[2],
        )
      } else {
        storeFront.fetchCascadeOption()
      }
      // 整理默认数据存入state
      this.setState({
        asyncCascadeValue: cacheData.cascade,
        shopLogo: cacheData.shopLogo,
        qrcode: cacheData.qrcode,
        long: cacheData.long,
        lat: cacheData.lat,
      })
      // 整理默认数据放入表单
      form.setFieldsValue({
        name: cacheData.name,
        ismain: cacheData.ismain,
        phone: cacheData.phone,
        cascade: cacheData.cascade,
        circle_id: cacheData.circle_id,
        adress: cacheData.adress,
        sort: cacheData.sort,
        have_mall: cacheData.have_mall,
        have_peisong: cacheData.have_peisong,
        have_meal: cacheData.have_meal,
        have_hotel: cacheData.have_hotel,
        have_auto_parts: cacheData.have_auto_parts,
        txt_info: cacheData.txt_info,
        context: cacheData.context,
        pic: cacheData.pic,
        discount_type: cacheData.discount_type,
        open_1: cacheData.open_1 && new Date(cacheData.open_1),
        close_1: cacheData.open_1 && new Date(cacheData.close_1),
      })
      if (cacheData.discount_type) {
        setTimeout(() => {
          if (cacheData.discount_type[0] === '1') {
            form.setFieldsValue({
              discount_percent: cacheData.discount_percent,
            })
          } else {
            form.setFieldsValue({
              condition_price: cacheData.condition_price,
              minus_price: cacheData.minus_price,
            })
          }
        }, 20)
      }
      return
    }

    // 没有缓存判断是否为编辑，不是编辑则只获取默认级联数据，并结束mount
    if (!match.params.id) {
      storeFront.fetchCascadeOption().then(() => {
        const { asyncCascadeValue } = storeFront
        this.setState({
          asyncCascadeValue,
        })
      })
      return
    }
    // 当前为编辑，获取商户详情
    storeFront.fetchStoreDetail(match.params.id).then(() => {
      const { storeDetail } = storeFront
      // 获取级联数据
      storeFront
        .fetchCascadeOption(storeDetail.province_id, storeDetail.city_id, storeDetail.area_id)
        .then(() => {
          const { asyncCascadeValue } = storeFront
          // 整理默认数据存入state
          this.setState({
            asyncCascadeValue,
            shopLogo: storeDetail.shop_logo,
            qrcode: storeDetail.qrcode_backgroup,
            long: storeDetail.long,
            lat: storeDetail.lat,
          })
        })
      // 整理默认数据放入表单
      console.log(toJS(storeDetail.pic))
      form.setFieldsValue({
        name: storeDetail.name,
        ismain: storeDetail.ismain === '1',
        phone: storeDetail.phone,
        cascade: [storeDetail.province_id, storeDetail.city_id, storeDetail.area_id],
        circle_id: [storeDetail.circle_id],
        adress: storeDetail.adress,
        sort: storeDetail.sort,
        have_mall: storeDetail.have_mall === '1',
        have_peisong: storeDetail.have_peisong === '1',
        have_meal: storeDetail.have_meal === '1',
        have_hotel: storeDetail.have_hotel === '1',
        have_auto_parts: storeDetail.have_auto_parts === '1',
        open_1: Utils.conversionTimeStringToDate(storeDetail.open_1),
        close_1: Utils.conversionTimeStringToDate(storeDetail.close_1),
        txt_info: storeDetail.txt_info,
        context: storeDetail.context,
        pic: storeDetail.pic,
        discount_type: [storeDetail.discount_type],
      })
      if (storeDetail.discount_type) {
        setTimeout(() => {
          if (storeDetail.discount_type[0] === '1') {
            form.setFieldsValue({
              discount_percent: storeDetail.discount_percent,
            })
          } else {
            form.setFieldsValue({
              condition_price: storeDetail.condition_price,
              minus_price: storeDetail.minus_price,
            })
          }
        }, 20)
      }
    })
  }

  cacheData = () => {
    const { form } = this.props
    const {
      long, lat, shopLogo, qrcode, asyncCascadeValue,
    } = this.state
    const formData = form.getFieldsValue()
    console.log(formData)
    form.asyncCascadeValue = asyncCascadeValue
    formData.long = long
    formData.lat = lat
    formData.shopLogo = shopLogo
    formData.qrcode = qrcode
    Utils.cacheData(formData)
  }

  goMapPicker = () => {
    const { history } = this.props
    const { long, lat } = this.state
    this.cacheData()
    history.push(`/coordinatePicker/${long}/${lat}`)
  }

  goLogoPicker = () => {
    const { history } = this.props
    this.cacheData()
    history.push('/uploadSingleImg/上传Logo/shopLogo/1')
  }

  goQrPicker = () => {
    const { history } = this.props
    this.cacheData()
    history.push('/uploadSingleImg/上传二维码背景图/qrcode/2')
  }

  onPickerChange = val => {
    const { storeFront } = this.props
    const { cascadeOption } = storeFront
    const d = [...cascadeOption]
    let asyncValue = [...val]
    // 遍历当前的PickerOption
    d.forEach(i => {
      // 遍历并找出传入的省份
      if (i.value === val[0]) {
        // 如果没有children，则去获取
        if (!i.children) {
          storeFront.fetchCityAndConcat(val[0]).then(res => {
            if (res) asyncValue = res
            this.setState({
              asyncCascadeValue: asyncValue,
            })
          })
        } else {
          // 如果有children，则遍历children
          i.children.forEach(j => {
            // 遍历并找出传入的市
            if (j.value === val[1]) {
              // 如果没有children，则获取
              if (!j.children) {
                storeFront.fetchAreaAndConcat(val[0], val[1]).then(res => {
                  if (res) asyncValue = res
                  this.setState({
                    asyncCascadeValue: asyncValue,
                  })
                })
              }
            }
          })
        }
      }
    })
    this.setState({
      asyncCascadeValue: asyncValue,
    })
  }

  submit = () => {
    const {
      storeFront, form, match, history,
    } = this.props
    const {
      long, lat, shopLogo, qrcode,
    } = this.state
    if (!long || !lat || !shopLogo) {
      Toast.info('请输入完整信息')
      return
    }
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        name: value.name,
        ismain: value.ismain ? '1' : '0',
        phone: value.phone,
        province_id: value.cascade[0],
        city_id: value.cascade[1],
        area_id: value.cascade[2],
        circle_id: value.circle_id[0],
        adress: value.adress,
        sort: value.sort,
        have_mall: value.have_mall ? '1' : '0',
        have_peisong: value.have_peisong ? '1' : '0',
        have_meal: value.have_meal ? '1' : '0',
        have_hotel: value.have_hotel ? '1' : '0',
        have_auto_parts: value.have_auto_parts ? '1' : '0',
        open_1: moment(value.open_1).format('HH:mm:ss'),
        close_1: moment(value.close_1).format('HH:mm:ss'),
        txt_info: value.txt_info,
        context: value.context,
        pic: value.pic.map(item => item.url),
        discount_type: value.discount_type[0],
        discount_percent: value.discount_percent,
        condition_price: value.condition_price,
        minus_price: value.minus_price,
        long,
        lat,
        shop_logo: shopLogo,
        qrcode_backgroup: qrcode,
      }
      console.log(value)
      console.log(obj)
      if (match.params.id) {
        storeFront.modifyStoreFront({ ...obj, store_id: match.params.id }).then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
      } else {
        storeFront.insertStoreFront(obj).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  fetchCircle = val => {
    const { storeFront } = this.props
    if (val[2]) {
      storeFront.fetchCircle(val[2])
    } else {
      storeFront.resetCircle()
    }
  }

  render() {
    const { match, form, storeFront } = this.props
    const { getFieldProps } = form
    const { cascadeOption, circleOption } = storeFront
    console.log(circleOption)
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    /* eslint camelcase: 0 */
    const discount_type = form.getFieldValue('discount_type')
      ? form.getFieldValue('discount_type')[0]
      : ''
    const {
      long, lat, asyncCascadeValue, shopLogo, qrcode,
    } = this.state
    console.log(form.getFieldValue('have_auto_parts'))
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}店铺`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺名称"
          >
            店铺名称
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('ismain', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            是否设置成主店
          </List.Item>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{ required: true }],
            })}
            placeholder="请输入联系电话"
          >
            联系电话
          </InputItem>
          <Picker
            {...getFieldProps('cascade', {
              rules: [{ required: true }],
            })}
            title="选择地区"
            extra="请选择"
            cols={3}
            data={cascadeOption}
            value={asyncCascadeValue}
            onPickerChange={this.onPickerChange}
            onOk={this.fetchCircle}
          >
            <List.Item arrow="horizontal">店铺所在地</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('circle_id', {
              rules: [{ required: true }],
            })}
            data={circleOption}
            title="选择商圈"
            extra="请选择"
            cols={1}
          >
            <List.Item arrow="horizontal">所在商圈</List.Item>
          </Picker>
          <TextareaItem
            {...getFieldProps('adress', {
              rules: [{ required: true }],
            })}
            placeholder="请输入详细地址"
            title="详细地址"
            rows={2}
          />
          <List.Item extra={`${long}, ${lat}`} arrow="horizontal" onClick={this.goMapPicker}>
            地图位置
          </List.Item>
          <InputItem
            {...getFieldProps('sort', {
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺排序"
          >
            店铺排序
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="默认添加顺序排序！数值越大，排序越靠前"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('have_mall', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            电商
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('have_peisong', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            外卖
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('have_meal', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            餐饮
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('have_hotel', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            酒店
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('have_auto_parts', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            汽配
          </List.Item>
          <DatePicker
            {...getFieldProps('open_1', {
              rules: [{ required: true }],
            })}
            mode="time"
          >
            <List.Item arrow="horizontal">营业开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('close_1', {
              rules: [{ required: true }],
            })}
            mode="time"
          >
            <List.Item arrow="horizontal">营业结束时间</List.Item>
          </DatePicker>
          <InputItem
            {...getFieldProps('txt_info', {
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺描述"
          >
            店铺描述
          </InputItem>
          <TextareaItem
            {...getFieldProps('context', {
              rules: [{ required: true }],
            })}
            placeholder="店铺详细介绍"
            title="店铺详情"
            rows={3}
            count={100}
          />
          <List.Item arrow="horizontal" onClick={this.goLogoPicker}>
            <CustomizeList>
              <ListTitle>商户LOGO</ListTitle>
              <ListContent>
                <img src={shopLogo || ''} className="w40" alt="" />
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item arrow="empty">
            店铺图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
              })}
              selectable={pic.length < 4}
            />
          </List.Item>
          <List.Item arrow="horizontal" onClick={this.goQrPicker}>
            <CustomizeList>
              <ListTitle>二维码背景图</ListTitle>
              <ListContent>
                <img src={qrcode || ''} className="w40" alt="" />
              </ListContent>
            </CustomizeList>
          </List.Item>
          <Picker {...getFieldProps('discount_type')} data={DiscountOptions} cols={1}>
            <List.Item arrow="horizontal">优惠类型</List.Item>
          </Picker>
          {discount_type === '1' ? (
            <InputItem
              {...getFieldProps('discount_percent', {
                rules: [{ required: true }],
              })}
              placeholder="普通折扣率"
            >
              普通折扣率
            </InputItem>
          ) : null}
          {discount_type === '2' ? (
            <React.Fragment>
              <InputItem
                {...getFieldProps('condition_price', {
                  rules: [{ required: true }],
                })}
                placeholder=" 请输入满足金额"
              >
                满
              </InputItem>
              <InputItem
                {...getFieldProps('minus_price', {
                  rules: [{ required: true }],
                })}
                placeholder=" 请输入减免金额"
              >
                减
              </InputItem>
            </React.Fragment>
          ) : null}
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

export default StorePanel
