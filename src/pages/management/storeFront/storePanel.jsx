import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Picker, Button, DatePicker,
} from 'antd-mobile'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import { createForm } from 'rc-form'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import Utils from '@/utils'

const PickerOptions = [{ label: '是', value: '1' }, { label: '否', value: '0' }]
const DiscountOptions = [{ label: '折扣', value: '1' }, { label: '满减', value: '2' }]

@createForm()
@inject('storeFront')
@observer
class StorePanel extends React.Component {
  state = {
    store_id: '',
    name: '',
    ismain: '',
    phone: '',
    weixin: '',
    qq: '',
    keywords: '',
    permoney: '',
    feature: '',
    province_id: '',
    city_id: '',
    area_id: '',
    circle_id: '',
    adress: '',
    trafficroute: '',
    sort: '',
    have_meal: '',
    have_group: '',
    have_shop: '',
    open_1: '',
    close_1: '',
    long: '',
    lat: '',
    txt_info: '',
    pic: [],
    discount_type: '',
    discount_percent: '',
    condition_price: '',
    minus_price: '',
  }

  componentDidMount() {
    const { storeFront, match, form } = this.props
    if (!match.params.id) return
    storeFront.fetchStoreDetail(match.params.id).then(() => {
      const { storeDetail, cacheStore } = storeFront
      storeFront.fetchProvince()
      storeFront.fetchCity(storeDetail.province_id)
      storeFront.fetchArea(storeDetail.city_id)
      storeFront.fetchCircle(storeDetail.area_id)
      if (cacheStore.store_id) {
        form.setFieldsValue({
          ...cacheStore,
          have_meal: [cacheStore.have_meal],
          have_group: [cacheStore.have_group],
          have_shop: [cacheStore.have_shop],
        })
        this.setState({
          ...cacheStore,
          pic: toJS(cacheStore.pic),
        })
      } else {
        Utils.conversionTimeStringToDate(storeDetail.open_1)
        form.setFieldsValue({
          ...storeDetail,
          have_meal: [storeDetail.have_meal],
          have_group: [storeDetail.have_group],
          have_shop: [storeDetail.have_shop],
          open_1: Utils.conversionTimeStringToDate(storeDetail.open_1),
          close_1: Utils.conversionTimeStringToDate(storeDetail.close_1),
        })
        this.setState({
          ...storeDetail,
          pic: toJS(storeDetail.pic),
        })
      }
    })
  }

  cacheData = () => {
    const { storeFront, history } = this.props
    storeFront.cacheStoreDetail(this.state).then(() => {
      history.push('/management/storefront/coordinatePicker')
    })
  }

  submit = () => {
    const { form } = this.props
    form.validateFields((error, value) => {
      console.log(error, value)
      console.log(this.state)
    })
  }

  render() {
    const { match, form, storeFront } = this.props
    const { getFieldProps } = form
    const {
      provinceOption, cityOption, areaOption, circleOption,
    } = storeFront
    /* eslint camelcase: 0 */
    const {
      long, lat, pic, discount_type,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}店铺`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('name', {
              onChange: val => {
                this.setState({
                  name: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺名称"
          >
            店铺名称
          </InputItem>
          <Picker
            {...getFieldProps('ismain', {
              onChange: val => {
                this.setState({
                  ismain: val,
                })
              },
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">是否设置成主店</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('phone', {
              onChange: val => {
                this.setState({
                  phone: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入联系电话"
          >
            联系电话
          </InputItem>
          <InputItem
            {...getFieldProps('weixin', {
              onChange: val => {
                this.setState({
                  weixin: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入联系微信"
          >
            联系微信
          </InputItem>
          <InputItem
            {...getFieldProps('qq', {
              onChange: val => {
                this.setState({
                  qq: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入联系QQ"
          >
            联系QQ
          </InputItem>
          <InputItem
            {...getFieldProps('keywords', {
              onChange: val => {
                this.setState({
                  keywords: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="搜索关键词"
          >
            关键词
          </InputItem>
          <InputItem
            {...getFieldProps('permoney', {
              onChange: val => {
                this.setState({
                  permoney: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入人均消费"
          >
            人均消费
          </InputItem>
          <InputItem
            {...getFieldProps('feature', {
              onChange: val => {
                this.setState({
                  feature: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="本店特色"
          >
            店铺特色
          </InputItem>
          <Picker
            title="选择地区"
            extra="请选择(可选)"
            cols={4}
            data={[provinceOption, cityOption, areaOption, circleOption]}
            cascade={false}
            onPickerChange={val => console.log(val)}
          >
            <List.Item arrow="horizontal">店铺所在地</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('adress', {
              onChange: val => {
                this.setState({
                  adress: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入详细地址"
          >
            详细地址
          </InputItem>
          <InputItem
            {...getFieldProps('trafficroute', {
              onChange: val => {
                this.setState({
                  trafficroute: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="描述到店路线"
          >
            交通路线
          </InputItem>
          <InputItem
            {...getFieldProps('sort', {
              onChange: val => {
                this.setState({
                  sort: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺排序"
          >
            店铺排序
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="默认添加顺序排序！数值越大，排序越前"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <Picker
            {...getFieldProps('have_meal', {
              onChange: val => {
                this.setState({
                  have_meal: val[0],
                })
              },
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">餐饮</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('have_group', {
              onChange: val => {
                this.setState({
                  have_group: val[0],
                })
              },
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">团购</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('have_shop', {
              onChange: val => {
                this.setState({
                  have_shop: val[0],
                })
              },
              rules: [{ required: true }],
            })}
            data={PickerOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">零售</List.Item>
          </Picker>

          <DatePicker
            {...getFieldProps('open_1', {
              onChange: val => {
                console.log(val)
                this.setState({
                  open_1: val,
                })
              },
              rules: [{ required: true }],
            })}
            mode="time"
          >
            <List.Item arrow="horizontal">营业开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('close_1', {
              onChange: val => {
                this.setState({
                  open_1: val,
                })
              },
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
              onChange: val => {
                this.setState({
                  txt_info: val,
                })
              },
              rules: [{ required: true }],
            })}
            placeholder=" 请输入店铺简介"
          >
            店铺简介
          </InputItem>
          <List.Item arrow="horizontal">
            <CustomizeList>
              <ListTitle>店铺图片</ListTitle>
              <ListContent>
                <img src={pic[0]} alt="" />
              </ListContent>
            </CustomizeList>
          </List.Item>
          <Picker
            {...getFieldProps('discount_type', {
              onChange: val => {
                this.setState({
                  discount_type: val[0],
                })
              },
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
                onChange: val => {
                  this.setState({
                    discount_percent: val,
                  })
                },
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
                  onChange: val => {
                    this.setState({
                      condition_price: val,
                    })
                  },
                  rules: [{ required: true }],
                })}
                placeholder=" 请输入满足金额"
              >
                满
              </InputItem>
              <InputItem
                {...getFieldProps('minus_price', {
                  onChange: val => {
                    this.setState({
                      minus_price: val,
                    })
                  },
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
