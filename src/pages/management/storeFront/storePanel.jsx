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
  Flex,
  Menu,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import moment from 'moment'
import Editor from '@/common/Editor'
import { CustomizeList, ListTitle, ListContent, MenuMask, PrimaryTag } from '@/styled'

const DiscountOptions = [
  { label: '无优惠', value: '0' },
  { label: '折扣', value: '1' },
  { label: '满减', value: '2' },
]

const BusinessOption = [
  { label: '标准', value: 'have_service' },
  { label: '电商', value: 'have_mall' },
  { label: '外卖', value: 'have_peisong' },
  { label: '餐饮', value: 'have_meal' },
  { label: '酒店', value: 'have_hotel' },
  { label: '汽配', value: 'have_auto_parts' },
  // { label: '', value: 'have_auto_parts' },
]

@createForm()
@inject('storeFront', 'common')
@observer
class StorePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncCascadeValue: [],
      long: '',
      lat: '',
      shopLogo: '',
      qrcode: '',
      open: false,
      goods: [],
      business: {
        have_service: '0',
        have_mall: '0',
        have_peisong: '0',
        have_meal: '0',
        have_hotel: '0',
        have_auto_parts: '0',
      },
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props
    storeFront.fetchAllCategory()

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
        goods: cacheData.goods,
      })
      if (cacheData.circle_id) {
        storeFront.fetchMarket(cacheData.circle_id).then(() => {
          form.setFieldsValue({
            market_id: cacheData.market_id,
          })
        })
      }
      // 整理默认数据放入表单
      form.setFieldsValue({
        name: cacheData.name,
        ismain: cacheData.ismain,
        phone: cacheData.phone,
        cascade: cacheData.cascade,
        circle_id: cacheData.circle_id,
        adress: cacheData.adress,
        sort: cacheData.sort,
        business: cacheData.business,
        // have_mall: cacheData.have_mall,
        // have_peisong: cacheData.have_peisong,
        // have_meal: cacheData.have_meal,
        // have_hotel: cacheData.have_hotel,
        // have_auto_parts: cacheData.have_auto_parts,
        txt_info: cacheData.txt_info,
        pic: cacheData.pic,
        discount_type: cacheData.discount_type,
        open_1: cacheData.open_1 && new Date(cacheData.open_1),
        close_1: cacheData.close_1 && new Date(cacheData.close_1),
      })
      setTimeout(() => {
        if (this.editor.current) {
          this.editor.current.state.editor.txt.html(cacheData.context)
        }
      }, 500)
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
            goods: [storeDetail.cat_fid, storeDetail.cat_id],
          })
        })
      if (storeDetail.circle_id) {
        storeFront.fetchMarket(storeDetail.circle_id).then(() => {
          form.setFieldsValue({
            market_id: [storeDetail.market_id],
          })
        })
      }
      // const picArr = []
      // if (storeDetail.pic && storeDetail.pic.length !== 0) {
      //   storeDetail.pic.forEach(item => {
      //     picArr.push({ url: item })
      //   })
      // }
      let business = ''
      if (storeDetail.have_service === '1') {
        business = ['have_service']
      }
      if (storeDetail.have_mall === '1') {
        business = ['have_mall']
      }
      if (storeDetail.have_peisong === '1') {
        business = ['have_peisong']
      }
      if (storeDetail.have_meal === '1') {
        business = ['have_meal']
      }
      if (storeDetail.have_hotel === '1') {
        business = ['have_hotel']
      }
      if (storeDetail.have_auto_parts === '1') {
        business = ['have_auto_parts']
      }
      // 整理默认数据放入表单
      form.setFieldsValue({
        name: storeDetail.name,
        ismain: storeDetail.ismain === '1',
        phone: storeDetail.phone,
        cascade: [storeDetail.province_id, storeDetail.city_id, storeDetail.area_id],
        circle_id: [storeDetail.circle_id],
        adress: storeDetail.adress,
        sort: storeDetail.sort,
        business,
        // have_mall: storeDetail.have_mall === '1',
        // have_peisong: storeDetail.have_mall === '1' ? false : storeDetail.have_peisong === '1',
        // have_meal: storeDetail.have_meal === '1',
        // have_hotel: storeDetail.have_hotel === '1',
        // have_auto_parts: storeDetail.have_auto_parts === '1',
        open_1: Utils.conversionTimeStringToDate(storeDetail.open_1),
        close_1: Utils.conversionTimeStringToDate(storeDetail.close_1),
        txt_info: storeDetail.txt_info,
        pic: storeDetail.pic,
        discount_type: [storeDetail.discount_type],
      })
      setTimeout(() => {
        if (this.editor.current) {
          this.editor.current.state.editor.txt.html(storeDetail.context)
        }
      }, 500)
      if (storeDetail.discount_type) {
        setTimeout(() => {
          if (storeDetail.discount_type[0] === '1') {
            form.setFieldsValue({
              discount_percent: storeDetail.discount_percent,
            })
          } else if (storeDetail.discount_type[0] === '2') {
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
    const { long, lat, shopLogo, qrcode, asyncCascadeValue, goods } = this.state
    const formData = form.getFieldsValue()
    form.asyncCascadeValue = asyncCascadeValue
    formData.long = long
    formData.lat = lat
    formData.shopLogo = shopLogo
    formData.qrcode = qrcode
    formData.goods = goods
    formData.context = this.editor.current.state.editor.txt.html()
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
    history.push('/uploadSingleImg/上传二维码背景图/qrcode')
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

  getMenuList = () => {
    const { storeFront } = this.props
    const { allCategory } = storeFront
    const { goods } = this.state
    const cateGoryLabel = []
    if (allCategory.length) {
      allCategory.forEach(item => {
        if (item.value === goods[0]) {
          cateGoryLabel.push(item.label)
          if (item.children.length) {
            item.children.forEach(child => {
              if (child.value === goods[1]) {
                cateGoryLabel.push(child.label)
              }
            })
          }
        }
      })
    }
    return (
      <Flex justify="end">
        {cateGoryLabel.map((item, index) => (
          <PrimaryTag
            key={index}
            style={{ marginLeft: 2 }}
            onClick={() => {
              document.body.style.position = 'fixed'
              this.setState({ open: true })
            }}
          >
            {item}
          </PrimaryTag>
        ))}
      </Flex>
    )
  }

  submit = () => {
    const { storeFront, form, match, history } = this.props
    const { long, lat, shopLogo, qrcode, goods, business } = this.state

    if (!long || !lat || !shopLogo) {
      Toast.info('请输入完整信息')
      return
    }
    if (!goods.length) {
      Toast.info('请选择店铺分类')
      return
    }
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const businessCache = JSON.parse(JSON.stringify(business))
      businessCache[value.business] = '1'
      let have_shop = '0'
      let have_mall = '0'
      if (businessCache.have_mall === '1' || businessCache.have_peisong === '1') {
        have_shop = '1'
      }
      if (businessCache.have_service === '1') {
        have_mall = '1'
      }
      const obj = {
        ...businessCache,
        have_shop,
        have_mall,
        name: value.name,
        ismain: value.ismain ? '1' : '0',
        phone: value.phone,
        province_id: value.cascade[0],
        city_id: value.cascade[1],
        area_id: value.cascade[2],
        circle_id: value.circle_id[0],
        market_id: value.market_id ? value.market_id[0] : '',
        adress: value.adress,
        sort: value.sort,
        cat_fid: goods[0],
        cat_id: goods[1],
        // have_mall: value.have_mall ? '1' : '0',
        // have_peisong: value.have_peisong ? '1' : '0',
        // have_meal: value.have_meal ? '1' : '0',
        // have_hotel: value.have_hotel ? '1' : '0',
        // have_auto_parts: value.have_auto_parts ? '1' : '0',
        open_1: moment(value.open_1).format('HH:mm:ss'),
        close_1: moment(value.close_1).format('HH:mm:ss'),
        txt_info: value.txt_info,
        context: this.editor.current.state.editor.txt.html(),
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

  fetchMarket = val => {
    const { storeFront } = this.props
    storeFront.fetchMarket(val[0])
  }

  render() {
    const { match, form, storeFront, history } = this.props
    const { getFieldProps } = form
    const { cascadeOption, circleOption, marketOption, allCategory } = storeFront
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    /* eslint camelcase: 0 */
    const discount_type = form.getFieldValue('discount_type')
      ? form.getFieldValue('discount_type')[0]
      : ''
    const { long, lat, asyncCascadeValue, shopLogo, qrcode, open, goods } = this.state
    const menuEl = (
      <Menu
        className="menu-position"
        data={allCategory}
        value={goods}
        onChange={arr => this.setState({ goods: arr })}
        height={document.documentElement.clientHeight * 0.6}
      />
    )
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
            onOk={this.fetchMarket}
          >
            <List.Item arrow="horizontal">所在商圈</List.Item>
          </Picker>

          <Picker
            {...getFieldProps('market_id', {
              rules: [{ required: false }],
            })}
            data={marketOption}
            title="选择商盟"
            extra="请选择"
            cols={1}
          >
            <List.Item arrow="horizontal">所在商盟</List.Item>
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
              initialValue: 0,
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
          {/* <List.Item
            extra={
              <Switch
                {...getFieldProps('have_mall', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
                onChange={val => {
                  const bool = form.getFieldValue('have_peisong')
                  if (val && bool) {
                    form.setFieldsValue({
                      have_mall: true,
                      have_peisong: false,
                    })
                  } else {
                    form.setFieldsValue({
                      have_mall: val,
                    })
                  }
                }}
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
                onChange={val => {
                  const bool = form.getFieldValue('have_mall')
                  if (val && bool) {
                    form.setFieldsValue({
                      have_mall: false,
                      have_peisong: true,
                    })
                  } else {
                    form.setFieldsValue({
                      have_peisong: val,
                    })
                  }
                }}
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
          </List.Item> */}
          <Picker
            {...getFieldProps('business', {
              rules: [{ required: true }],
            })}
            disabled={match.params.id}
            data={BusinessOption}
            cols={1}
          >
            <List.Item arrow="horizontal">店铺业务</List.Item>
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
          <TextareaItem
            placeholder="请输入店铺描述"
            {...getFieldProps('txt_info', {
              rules: [{ required: true }],
            })}
            title="店铺描述"
            rows={3}
            count={100}
          />
          <List.Item
            arrow="horizontal"
            extra={this.getMenuList()}
            onClick={() => this.setState({ open: true })}
            className="primaryTag-show"
          >
            店铺分类
          </List.Item>
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
                rules: [{ required: true }],
              })}
              selectable={pic.length < 5}
              onAddImageClick={e => {
                this.cacheData()
                history.push('/uploadMultipleImg/裁剪/pic/2')
                e.preventDefault()
              }}
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
          <Picker
            {...getFieldProps('discount_type', {
              rules: [{ required: true }],
              initialValue: ['0'],
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
          <List.Item>
            店铺详情
            <Editor ref={this.editor} />
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
        {open ? menuEl : null}
        {open ? <MenuMask onClick={() => this.setState({ open: false })} /> : null}
      </React.Fragment>
    )
  }
}

export default StorePanel
