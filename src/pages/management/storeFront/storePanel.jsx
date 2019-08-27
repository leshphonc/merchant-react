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
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import moment from 'moment'
import { toJS } from 'mobx'

const PickerOptions = [{ label: '是', value: '1' }, { label: '否', value: '0' }]
const DiscountOptions = [{ label: '折扣', value: '1' }, { label: '满减', value: '2' }]

@createForm()
@inject('storeFront')
@observer
class StorePanel extends React.Component {
  state = {
    long: '',
    lat: '',
    pic: [],
    asyncCascadeValue: [],
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props
    const { cacheStore } = storeFront
    if (Object.keys(cacheStore).length) {
      console.log(toJS(cacheStore))
      form.setFieldsValue({
        ...cacheStore,
      })
      if (cacheStore.discount_type) {
        setTimeout(() => {
          if (cacheStore.discount_type[0] === '1') {
            form.setFieldsValue({
              discount_percent: cacheStore.discount_percent,
            })
          } else {
            form.setFieldsValue({
              condition_price: cacheStore.condition_price,
              minus_price: cacheStore.minus_price,
            })
          }
        }, 20)
      }
      this.setState({
        pic: cacheStore.pic,
        long: cacheStore.long,
        lat: cacheStore.lat,
        asyncCascadeValue: cacheStore.asyncCascadeValue,
      })
      return
    }
    if (!match.params.id) {
      storeFront.fetchCascadeOption().then(() => {
        const { asyncCascadeValue } = storeFront
        this.setState({
          asyncCascadeValue,
        })
      })
      return
    }
    storeFront.fetchStoreDetail(match.params.id).then(() => {
      const { storeDetail } = storeFront
      // storeFront.fetchProvince()
      // storeFront.fetchCity(storeDetail.province_id)
      // storeFront.fetchArea(storeDetail.city_id)
      // storeFront.fetchCircle(storeDetail.area_id)
      // 获取级联数据
      storeFront
        .fetchCascadeOption(storeDetail.province_id, storeDetail.city_id, storeDetail.area_id)
        .then(() => {
          const { asyncCascadeValue } = storeFront
          this.setState({
            asyncCascadeValue,
          })
        })
      console.log(toJS(storeDetail))
      const picArr = storeDetail.pic.map(item => ({
        url: item,
      }))
      this.setState({
        long: storeDetail.long,
        lat: storeDetail.lat,
        pic: picArr,
      })
      Utils.conversionTimeStringToDate(storeDetail.open_1)
      form.setFieldsValue({
        ...storeDetail,
        have_meal: [storeDetail.have_meal],
        have_group: [storeDetail.have_group],
        have_shop: [storeDetail.have_shop],
        discount_type: [storeDetail.discount_type],
        open_1: Utils.conversionTimeStringToDate(storeDetail.open_1),
        close_1: Utils.conversionTimeStringToDate(storeDetail.close_1),
        cascade: [storeDetail.province_id, storeDetail.city_id, storeDetail.area_id],
        circle_id: [storeDetail.circle_id],
        ismain: [storeDetail.ismain],
        pic: picArr,
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
    const { storeFront, history, form } = this.props
    const { long, lat, asyncCascadeValue } = this.state
    const formData = form.getFieldsValue()
    console.log(formData)
    storeFront
      .cacheStoreDetail({
        ...formData,
        long,
        lat,
        pic: formData.pic || [],
        asyncCascadeValue,
      })
      .then(() => {
        history.push(`/management/storefront/coordinatePicker/${long}/${lat}`)
      })
  }

  onPickerChange = val => {
    const { storeFront } = this.props
    const { cascadeOption } = storeFront
    // let colNum = 1
    const d = [...cascadeOption]
    let asyncValue = [...val]
    // 遍历当前的PickerOption
    d.forEach(i => {
      // 遍历并找出传入的省份
      if (i.value === val[0]) {
        // colNum = 2
        // 如果没有children，则去获取
        if (!i.children) {
          storeFront.fetchCityAndConcat(val[0]).then(res => {
            if (res) asyncValue = res
            this.setState({
              // data: d,
              // cols: colNum,
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
                    // data: d,
                    // cols: colNum,
                    asyncCascadeValue: asyncValue,
                  })
                })
              }
            }
          })
          // colNum = 3
        }
      }
    })
    this.setState({
      // data: d,
      // cols: colNum,
      asyncCascadeValue: asyncValue,
    })
  }

  imgChange = (arr, type) => {
    const { form } = this.props
    if (type === 'remove') {
      console.log(arr)
      form.setFieldsValue({
        pic: arr,
      })
      this.setState({ pic: arr })
      return
    }
    arr.forEach((item, index) => {
      if (item.file) {
        Utils.compressionAndUploadImg(item.file)
          .then(res => {
            const picArr = arr
            picArr.splice(index, 1, { url: res })
            form.setFieldsValue({
              pic: picArr,
            })
            this.setState({ pic: picArr })
          })
          .catch(e => Toast.fail(e))
      }
    })
  }

  submit = () => {
    const {
      storeFront, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const { long, lat } = this.state
      const obj = {
        name: value.name,
        ismain: value.ismain[0],
        phone: value.phone,
        weixin: value.weixin,
        qq: value.qq,
        keywords: value.keywords,
        permoney: value.permoney,
        feature: value.feature,
        province_id: value.cascade[0],
        city_id: value.cascade[1],
        area_id: value.cascade[2],
        circle_id: value.circle_id[0],
        adress: value.adress,
        trafficroute: value.trafficroute,
        sort: value.sort,
        have_meal: value.have_meal[0],
        have_group: value.have_group[0],
        have_shop: value.have_shop[0],
        open_1: moment(value.open_1).format('HH:mm:ss'),
        close_1: moment(value.close_1).format('HH:mm:ss'),
        long,
        lat,
        txt_info: value.txt_info,
        pic: value.pic.map(item => item.url),
        discount_type: value.discount_type[0],
        discount_percent: value.discount_percent,
        condition_price: value.condition_price,
        minus_price: value.minus_price,
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
    console.log(val)
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
    const discount_type = form.getFieldValue('discount_type')
      ? form.getFieldValue('discount_type')[0]
      : ''
    /* eslint camelcase: 0 */
    const {
      long, lat, pic, asyncCascadeValue,
    } = this.state
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
          <Picker
            {...getFieldProps('ismain', {
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">是否设置成主店</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{ required: true }],
            })}
            placeholder="请输入联系电话"
          >
            联系电话
          </InputItem>
          <InputItem
            {...getFieldProps('weixin', {
              rules: [{ required: true }],
            })}
            placeholder="请输入联系微信"
          >
            联系微信
          </InputItem>
          <InputItem
            {...getFieldProps('qq', {
              rules: [{ required: true }],
            })}
            placeholder="请输入联系QQ"
          >
            联系QQ
          </InputItem>
          <InputItem
            {...getFieldProps('keywords', {
              rules: [{ required: true }],
            })}
            placeholder="搜索关键词"
          >
            关键词
          </InputItem>
          <InputItem
            {...getFieldProps('permoney', {
              rules: [{ required: true }],
            })}
            placeholder="请输入人均消费"
          >
            人均消费
          </InputItem>
          <TextareaItem
            {...getFieldProps('feature', {
              rules: [{ required: true }],
            })}
            placeholder="本店特色"
            title="店铺特色"
            rows={2}
          />
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
          <TextareaItem
            {...getFieldProps('trafficroute', {
              rules: [{ required: true }],
            })}
            placeholder="描述到店路线"
            title="交通路线"
            rows={2}
          />
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
          <Picker
            {...getFieldProps('have_meal', {
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">餐饮</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('have_group', {
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">团购</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('have_shop', {
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">零售</List.Item>
          </Picker>

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
          <List.Item extra={`${long}, ${lat}`} arrow="horizontal" onClick={this.cacheData}>
            地图位置
          </List.Item>
          <InputItem
            {...getFieldProps('txt_info', {
              rules: [{ required: true }],
            })}
            placeholder=" 请输入店铺简介"
          >
            店铺简介
          </InputItem>
          <List.Item arrow="empty">
            店铺图片
            <ImagePicker
              {...getFieldProps('pic', {
                rules: [{ required: true }],
              })}
              files={pic}
              onChange={this.imgChange}
              selectable={pic.length < 4}
            />
          </List.Item>

          <Picker
            {...getFieldProps('discount_type', {
              rules: [{ required: true }],
            })}
            data={DiscountOptions}
            cols={1}
          >
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
