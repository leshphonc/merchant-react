import React from 'react'
import NavBar from '@/common/NavBar'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import {
  List,
  InputItem,
  ImagePicker,
  Switch,
  Modal,
  Flex,
  Button,
  Checkbox,
  Picker,
  TextareaItem,
  Toast,
  Radio,
  DatePicker,
} from 'antd-mobile'
import CropperImgModal from '@/common/UploadImg/CropperImgModal'
import moment from 'moment'

const { RadioItem } = Radio
const { CheckboxItem } = Checkbox

@createForm()
@inject('common', 'member')
@observer
class CouponCRU extends React.Component {
  state = {
    imgOpen: false,
    detail: {},
    open: false,
    colorOpen: false,
    coverOpen: false,
    graphicOpen: false,
    storeList: [],
    store: [],
    platform: [],
    colorList: {},
    color: '',
    cateIDColumns: [],
    checkboxValue: [
      {
        label: '外卖服务',
        value: 'BIZ_SERVICE_DELIVER',
      },
      {
        label: '停车位',
        value: 'BIZ_SERVICE_FREE_PARK',
      },
      {
        label: '可带宠物',
        value: 'BIZ_SERVICE_WITH_PET',
      },
      {
        label: '免费Wi-Fi',
        value: 'BIZ_SERVICE_FREE_WIFI',
      },
    ],
    checkedValue: [],
  }

  async componentDidMount() {
    const { member, common, match } = this.props
    await common.getStoreList(0).then(res => {
      this.setState({
        storeList: res.store_list,
      })
    })
    await member.getColorList().then(res => {
      this.setState({
        colorList: res,
      })
    })
    await member.getCategoryList().then(res => {
      console.log(res)
    })
    if (match.params.id) {
      member.readCouponDetail(match.params.id).then(res => {
        const detail = res.coupon
        this.setState({
          detail: detail,
          store: detail.store_id,
          platform: detail.platform,
        })
      })
    }
  }

  mapStore = () => {
    const { store } = this.state
    return store.map(item => <div key={item}>{this.getStoreName(item)}</div>)
  }

  getStoreName = id => {
    const { storeList } = this.state
    const item = storeList.find(item => item.value === id)
    return item && item.label
  }

  mapStoreList = () => {
    const { storeList, store } = this.state
    return storeList.map(i => {
      return (
        <CheckboxItem
          checked={store.indexOf(i.value) > -1}
          key={i.value}
          onChange={e => this.onChange(e, i.value)}
        >
          {i.label}
        </CheckboxItem>
      )
    })
  }

  mapColorList = () => {
    const { colorList, color } = this.state
    const keys = Object.keys(colorList)
    return keys.map(i => {
      return (
        <RadioItem
          checked={color === colorList[i]}
          key={colorList[i]}
          onChange={e => this.onChangeColor(e, colorList[i])}
        >
          <div style={{ color: colorList[i] }}>{colorList[i]}</div>
        </RadioItem>
      )
    })
  }

  onChange = (e, value) => {
    console.log(e)
    console.log(value)
    let { store } = this.state
    if (e.target.checked) {
      const arr = [...new Set([...store, value])]
      store = arr
      this.setState({
        store: store,
      })
    } else {
      const index = store.findIndex(item => item === value)
      const arr = store
      if (index > -1) {
        arr.splice(index, 1)
      }
      store = arr
      this.setState({
        store: store,
      })
    }
  }

  onChangeColor = (e, value) => {
    this.setState({
      color: value,
      colorOpen: false,
    })
  }

  onChangePlatForm = value => {
    const { platform } = this.state
    const index = platform.findIndex(item => item === value)
    if (index > -1) {
      const arr = platform
      arr.splice(index, 1)
      this.setState({
        platform: [...arr],
      })
    } else {
      this.setState({
        platform: [...platform, value],
      })
    }
  }

  cropper = data => {
    const { form } = this.props
    this.setState({
      imgOpen: false,
    })
    form.setFieldsValue({
      img: [
        {
          url: data,
        },
      ],
    })
  }

  cropperCover = data => {
    console.log(data)
  }

  cropperGraphic = data => {
    console.log(data)
  }

  changeServiceType = type => {
    const { checkedValue } = this.state
    const index = checkedValue.findIndex(item => item === type)
    if (index > -1) {
      const arr = checkedValue
      arr.splice(index, 1)
      this.setState({
        checkedValue: arr,
      })
    } else {
      this.setState({
        checkedValue: [...checkedValue, type],
      })
    }
  }

  // 刚刚粘锅来
  addImage = () => {
    const { detail } = this.state
    const obj = detail
    obj.text_image_list.push({
      image_url: '',
      text: '',
    })
    this.setState({
      detail: obj,
    })
  }

  // 刚刚粘锅来
  mapImage = () => {
    const { form } = this.props
    const { getFieldProps } = form
    const { detail } = this.state
    console.log(detail)
    if (!detail.wx_param) return
    return detail.wx_param.text_image_list.map((item, index) => {
      return (
        <List
          renderHeader={
            <div>
              图文消息 {index + 1}
              <Button
                style={{
                  display: 'inline-block',
                  verticalAlign: 'sub',
                  marginLeft: 10,
                }}
                size="small"
                type="warning"
                onClick={() => this.deleteImage(index)}
              >
                删除
              </Button>
            </div>
          }
          key={index}
        >
          <List.Item>
            图文{index + 1}
            <ImagePicker
              {...getFieldProps(`wx_image_url${index}`, {
                rules: [{ required: true }],
                initialValue: item.image_url ? [{ url: item.image_url }] : [],
                valuePropName: 'files',
              })}
              selectable={
                form.getFieldValue(`wx_image_url${index}`)
                  ? form.getFieldValue(`wx_image_url${index}`).length < 1
                  : false
              }
              onAddImageClick={e => {
                this.setState({
                  curImg: index,
                  graphicOpen: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
          <TextareaItem
            {...getFieldProps(`wx_text${index}`, {
              rules: [{ required: true }],
              initialValue: item.text,
            })}
            title={`图文描述${index + 1}`}
            placeholder={`图文描述${index + 1}`}
            rows={3}
            autoHeight
          />
        </List>
      )
    })
  }

  _submit = () => {
    const { form, member, history, match } = this.props
    const { platform, store } = this.state
    form.validateFields((error, value) => {
      console.log(value)
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const keys = Object.keys(value)
      keys.forEach(item => {
        if (value[item] === true) {
          value[item] = '1'
        } else if (value[item] === false) {
          value[item] = '0'
        }
      })
      let method = 'createCoupon'
      if (match.params.id) {
        method = 'updateCoupon'
        value.coupon_id = match.params.id
      }
      value.img = value.img[0].url
      value.store_id = store
      value.user_level = value.user_level[0]
      value.cate_name = value.cate_name[0]
      value.status = value.status[0]
      value.auto_get = value.auto_get[0]
      value.platform = platform
      value.start_time = moment(value.start_time).format('YYYY-MM-DD')
      value.end_time = moment(value.end_time).format('YYYY-MM-DD')
      value.effe_start_time = moment(value.effe_start_time).format('YYYY-MM-DD')
      value.effe_end_time = moment(value.effe_end_time).format('YYYY-MM-DD')

      member[method](value).then(() => {
        Toast.success('操作成功', 1, () => {
          history.goBack()
        })
      })
    })
  }

  render() {
    const { form, match } = this.props
    const { getFieldProps } = form
    const {
      detail,
      imgOpen,
      coverOpen,
      graphicOpen,
      open,
      colorOpen,
      color,
      checkboxValue,
      platform,
      cateIDColumns,
    } = this.state
    const type = match.params.id ? '编辑' : '创建'
    const sync_wx = form.getFieldValue('sync_wx')
    return (
      <div>
        <NavBar
          title={`${type}优惠券`}
          goBack
          right={<div onClick={this._submit}>保存</div>}
        />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
              initialValue: detail.name,
            })}
            placeholder="请填写优惠券名称"
          >
            优惠券名称
          </InputItem>
          <List.Item>
            优惠券图片
            <ImagePicker
              {...getFieldProps('img', {
                rules: [{ required: true }],
                initialValue: detail.img ? [{ url: detail.img }] : [],
                valuePropName: 'files',
              })}
              selectable={
                form.getFieldValue('img')
                  ? form.getFieldValue('img').length < 1
                  : false
              }
              onAddImageClick={e => {
                this.setState({
                  imgOpen: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('use_with_card', {
                  valuePropName: 'checked',
                  initialValue: detail.use_with_card === '1',
                })}
              />
            }
          >
            与商家优惠券同时使用
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => this.setState({ open: true })}
            extra={this.mapStore()}
          >
            指定店铺
          </List.Item>
          <Picker
            {...getFieldProps('auto_get', {
              rules: [{ required: true }],
              initialValue: detail.auto_get ? [detail.auto_get] : ['0'],
            })}
            data={[
              { label: '不自动领取', value: '0' },
              { label: '领卡时自动领取', value: '1' },
              { label: '单笔消费达到额度自动领取', value: '2' },
            ]}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">自动领取优惠券</List.Item>
          </Picker>
          {form.getFieldValue('auto_get') &&
          form.getFieldValue('auto_get')[0] === '0' ? (
            <div>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('is_show', {
                      valuePropName: 'checked',
                      initialValue: detail.is_show === '1',
                    })}
                  />
                }
              >
                在领券中心显示
              </List.Item>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('is_free', {
                      valuePropName: 'checked',
                      initialValue: detail.is_free === '1',
                    })}
                  />
                }
              >
                是否为商品兑换券
              </List.Item>
            </div>
          ) : null}
          {form.getFieldValue('auto_get') &&
          form.getFieldValue('auto_get')[0] === '2' ? (
            <InputItem
              {...getFieldProps('auto_get_money_limit', {
                rules: [{ required: true }],
                initialValue: detail.auto_get_money_limit,
              })}
              placeholder="单笔消费到达此额度自动领取优惠券"
            >
              单笔消费额度
            </InputItem>
          ) : null}

          <List.Item
            extra={
              <Switch
                {...getFieldProps('allow_new', {
                  valuePropName: 'checked',
                  initialValue: detail.allow_new === '1',
                })}
              />
            }
          >
            只允许新用户领取
          </List.Item>
          <Picker
            {...getFieldProps('user_level', {
              rules: [{ required: true }],
              initialValue: detail.user_level ? [detail.user_level] : ['0'],
            })}
            data={[
              { label: '普通及以上会员', value: '0' },
              { label: '青铜会员及以上会员', value: '1' },
              { label: '白银会员及以上会员', value: '2' },
              { label: '黄金会员及以上会员', value: '3' },
              { label: '城市合伙人及以上会员', value: '4' },
            ]}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">自动领取优惠券</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('cate_name', {
              rules: [{ required: true }],
              initialValue: detail.cate_name ? [detail.cate_name] : ['all'],
            })}
            data={[
              { label: '全品类通用', value: 'all' },
              { label: '团购', value: 'group' },
              { label: '餐饮', value: 'meal' },
              { label: '预定', value: 'appoint' },
              { label: '零售', value: 'shop' },
              { label: '优惠买单', value: 'store' },
              { label: '电商产品', value: 'mall' },
              { label: '门店服务', value: 'door' },
              { label: '微信营销', value: 'wxapp' },
            ]}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">使用类别</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('cate_id', {
              rules: [{ required: true }],
              initialValue: detail.cate_name ? [detail.cate_name] : ['all'],
            })}
            data={cateIDColumns}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">使用类别</List.Item>
          </Picker>
          <TextareaItem
            {...getFieldProps('des', {
              rules: [{ required: true }],
              initialValue: detail.des,
            })}
            title="展示简短描述"
            placeholder="微信卡券优惠说明"
            rows={3}
            autoHeight
          />
          <TextareaItem
            {...getFieldProps('des_detial', {
              rules: [{ required: true }],
              initialValue: detail.des_detial,
            })}
            title="使用说明"
            placeholder="微信卡券使用须知"
            rows={3}
            autoHeight
          />
          <InputItem
            {...getFieldProps('num', {
              rules: [{ required: true }],
              initialValue: detail.num,
            })}
            placeholder="优惠券总数量"
          >
            数量
          </InputItem>
          <InputItem
            {...getFieldProps('limit', {
              rules: [{ required: true }],
              initialValue: detail.limit,
            })}
            placeholder="每人可领最多数量"
          >
            领取数量限制
          </InputItem>
          <InputItem
            {...getFieldProps('use_limit', {
              rules: [{ required: true }],
              initialValue: detail.use_limit,
            })}
            placeholder="每人可使用数量"
          >
            使用数量限制
          </InputItem>
          <InputItem
            {...getFieldProps('discount', {
              rules: [{ required: true }],
              initialValue: detail.discount,
            })}
            placeholder="优惠金额"
          >
            优惠金额
          </InputItem>
          <InputItem
            {...getFieldProps('order_money', {
              rules: [{ required: true }],
              initialValue: detail.order_money,
            })}
            placeholder="最小订单金额"
          >
            最小订单金额
          </InputItem>
          <DatePicker
            {...getFieldProps('start_time', {
              rules: [{ required: true }],
              initialValue: detail.start_time
                ? new Date(detail.start_time * 1000)
                : '',
            })}
            mode="date"
          >
            <List.Item arrow="horizontal">可领开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
              initialValue: detail.end_time
                ? new Date(detail.end_time * 1000)
                : '',
            })}
            mode="date"
          >
            <List.Item arrow="horizontal">可领结束时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('effe_start_time', {
              rules: [{ required: true }],
              initialValue: detail.effe_start_time
                ? new Date(detail.effe_start_time * 1000)
                : '',
            })}
            mode="date"
          >
            <List.Item arrow="horizontal">使用开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('effe_end_time', {
              rules: [{ required: true }],
              initialValue: detail.effe_end_time
                ? new Date(detail.effe_end_time * 1000)
                : '',
            })}
            mode="date"
          >
            <List.Item arrow="horizontal">使用结束时间</List.Item>
          </DatePicker>
          <Picker
            {...getFieldProps('status', {
              rules: [{ required: true }],
              initialValue: detail.status ? [detail.status] : ['1'],
            })}
            data={[
              { label: '正常', value: '1' },
              { label: '禁用', value: '0' },
            ]}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">优惠券状态</List.Item>
          </Picker>
        </List>
        <List renderHeader="使用系统">
          <CheckboxItem
            checked={platform.indexOf('wap') > -1}
            onChange={() => this.onChangePlatForm('wap')}
          >
            移动网页
          </CheckboxItem>
          <CheckboxItem
            checked={platform.indexOf('app') > -1}
            onChange={() => this.onChangePlatForm('app')}
          >
            App
          </CheckboxItem>
          <CheckboxItem
            checked={platform.indexOf('weixin') > -1}
            onChange={() => this.onChangePlatForm('weixin')}
          >
            微信
          </CheckboxItem>
        </List>
        {!match.params.id ? (
          <List renderHeader="微信">
            <List.Item
              extra={
                <Switch
                  {...getFieldProps('sync_wx', {
                    valuePropName: 'checked',
                    initialValue: detail.sync_wx === '1',
                  })}
                />
              }
            >
              同步到微信卡券
            </List.Item>
            {sync_wx ? (
              <>
                <List.Item
                  arrow="horizontal"
                  extra={<div style={{ color: color }}>{color}</div>}
                  onClick={() => this.setState({ colorOpen: true })}
                >
                  卡券颜色
                </List.Item>
                <InputItem
                  {...getFieldProps('brand_name', {
                    rules: [{ required: true, max: 12 }],
                    initialValue: detail.brand_name,
                  })}
                  placeholder="12个汉字以内"
                >
                  商家名称
                </InputItem>
                <InputItem
                  {...getFieldProps('notice', {
                    rules: [{ required: true, max: 16 }],
                    initialValue: detail.notice,
                  })}
                  placeholder="16个汉字以内"
                >
                  卡券提示
                </InputItem>
                <InputItem
                  {...getFieldProps('center_sub_title', {
                    rules: [{ required: true, max: 6 }],
                    initialValue: detail.center_sub_title,
                  })}
                  placeholder="卡券副标题"
                >
                  卡券副标题
                </InputItem>
                <InputItem
                  {...getFieldProps('center_url', {
                    rules: [{ required: true }],
                    initialValue: detail.center_url,
                  })}
                  placeholder="点击立即使用跳转"
                >
                  立即使用链接
                </InputItem>
                <InputItem
                  {...getFieldProps('promotion_url', {
                    rules: [{ required: true }],
                    initialValue: detail.promotion_url,
                  })}
                  placeholder="点击更多优惠跳转"
                >
                  更多优惠链接
                </InputItem>
                <InputItem
                  {...getFieldProps('custom_url_name', {
                    rules: [{ required: true, max: 5 }],
                    initialValue: detail.custom_url_name,
                  })}
                  placeholder="5个汉字以内"
                >
                  自定义标题
                </InputItem>
                <InputItem
                  {...getFieldProps('custom_url', {
                    rules: [{ required: true }],
                    initialValue: detail.custom_url_name,
                  })}
                  placeholder="自定义跳转链接"
                >
                  自定义链接
                </InputItem>
                <InputItem
                  {...getFieldProps('custom_url_sub_title', {
                    rules: [{ required: true, max: 5 }],
                    initialValue: detail.custom_url_sub_title,
                  })}
                  placeholder="6个汉字以内"
                >
                  自定义链接
                </InputItem>
                <List.Item>
                  封面图片
                  <ImagePicker
                    {...getFieldProps('icon_url_list', {
                      rules: [{ required: true }],
                      initialValue: [],
                      valuePropName: 'files',
                    })}
                    selectable={
                      form.getFieldValue('icon_url_list')
                        ? form.getFieldValue('icon_url_list').length < 1
                        : false
                    }
                    onAddImageClick={e => {
                      this.setState({
                        coverOpen: true,
                      })
                      e.preventDefault()
                    }}
                  />
                </List.Item>
                <InputItem
                  {...getFieldProps('abstract', {
                    rules: [{ required: true, max: 5 }],
                    initialValue: detail.abstract,
                  })}
                  placeholder="封面描述"
                >
                  封面描述
                </InputItem>
                <List renderHeader="服务类型">
                  {checkboxValue.map(item => {
                    return (
                      <CheckboxItem
                        onChange={() => this.changeServiceType(item.value)}
                        key={item.value}
                      >
                        {item.label}
                      </CheckboxItem>
                    )
                  })}
                </List>
                <List renderHeader="卡券图文（图片大小1MB）">
                  <List.Item
                    extra={
                      <div>
                        <Button
                          size="small"
                          type="primary"
                          onClick={this.addImage}
                        >
                          新增
                        </Button>
                      </div>
                    }
                  >
                    图文消息
                  </List.Item>
                </List>
                {this.mapImage()}
              </>
            ) : null}
          </List>
        ) : null}

        <CropperImgModal
          open={imgOpen}
          aspectratio={1}
          cropper={this.cropper}
          close={() => this.setState({ imgOpen: false })}
        />
        <CropperImgModal
          open={coverOpen}
          aspectratio={1}
          cropper={this.cropperCover}
          close={() => this.setState({ coverOpen: false })}
        />
        <CropperImgModal
          open={graphicOpen}
          aspectratio={1}
          cropper={this.cropperGraphic}
          close={() => this.setState({ graphicOpen: false })}
        />
        <Modal
          style={{ height: '100vh' }}
          popup
          visible={open}
          animationType="slide-up"
        >
          <List style={{ marginBottom: 47 }}>{this.mapStoreList()}</List>
          <Flex
            style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10 }}
          >
            <Flex.Item>
              <Button onClick={() => this.setState({ open: false })}>
                关闭
              </Button>
            </Flex.Item>
          </Flex>
        </Modal>
        <Modal
          style={{ height: '100vh' }}
          popup
          visible={colorOpen}
          animationType="slide-up"
        >
          <List style={{ marginBottom: 47 }}>{this.mapColorList()}</List>
          <Flex
            style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10 }}
          >
            <Flex.Item>
              <Button onClick={() => this.setState({ colorOpen: false })}>
                关闭
              </Button>
            </Flex.Item>
          </Flex>
        </Modal>
      </div>
    )
  }
}

export default CouponCRU
