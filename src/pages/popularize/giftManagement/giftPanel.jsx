import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List,
  InputItem,
  WingBlank,
  Button,
  Toast,
  Picker,
  Switch,
  ImagePicker,
  TextareaItem,
  Checkbox,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import MultipleImg from '@/common/UploadImg/Multiple'
import { createForm } from 'rc-form'
import { toJS } from 'mobx'
import Editor from '@/common/Editor'

const { Item } = List
const { CheckboxItem } = Checkbox
@createForm()
@inject('giftManagement')
@observer
class GiftPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mul: false,
      store: [],
      asyncCascadeValue: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { giftManagement, match, form } = this.props
    // console.log(this.props)
    giftManagement.fetchGiftCategory()
    giftManagement.fetchGiftCategorylist(match.params.catFid)
    const cacheData = JSON.parse(sessionStorage.getItem('cacheData'))
    if (cacheData && Object.keys(cacheData).length) {
      if (cacheData.cascade) {
        giftManagement.fetchCascadeOption(
          cacheData.cascade[0],
          cacheData.cascade[1],
          cacheData.cascade[2],
        )
      } else {
        giftManagement.fetchCascadeOption()
      }
      // 整理默认数据存入state
      this.setState({
        asyncCascadeValue: cacheData.cascade,
      })
    }
    if (!match.params.giftId) {
      giftManagement.fetchCascadeOption().then(() => {
        const { asyncCascadeValue } = giftManagement
        this.setState({
          asyncCascadeValue,
        })
      })
      giftManagement.fetchShopList().then(() => {
        const { shopList } = giftManagement
        console.log(shopList)
      })
      return
    }
    giftManagement.fetchGetGiftDetail(match.params.giftId).then(() => {
      const { getGiftDetail } = giftManagement
      giftManagement
        .fetchCascadeOption(
          getGiftDetail.province_idss,
          getGiftDetail.city_idss,
          getGiftDetail.area_idss,
        )
        .then(() => {
          const { asyncCascadeValue } = giftManagement
          // 整理默认数据存入state
          this.setState({
            asyncCascadeValue,
          })
        })
      const picArr = getGiftDetail.wap_pic_list.map(item => ({
        url: item.url,
      }))
      this.setState({
        // pic: picArr,
        store: getGiftDetail.store_arr,
      })
      form.setFieldsValue({
        gift_name: getGiftDetail.gift_name,
        cat_fid: [getGiftDetail.cat_fid],
        cat_id: [getGiftDetail.cat_id],
        pick_in_store: getGiftDetail.pick_in_store === '1',
        pic: picArr,
        worth: getGiftDetail.worth,
        sku: getGiftDetail.sku,
        intro: getGiftDetail.intro,
        specification: getGiftDetail.specification,
        invoice_content: getGiftDetail.invoice_content,
        cascade: [getGiftDetail.province_idss, getGiftDetail.city_idss, getGiftDetail.area_idss],
        circle_idss: [getGiftDetail.circle_idss],
        market_idss: [getGiftDetail.market_idss],
      })
      setTimeout(() => {
        this.editor.current.state.editor.txt.html(getGiftDetail.gift_content)
      }, 500)
      giftManagement.fetchMarket(getGiftDetail.circle_idss)
    })
    giftManagement.fetchShopList().then(() => {
      // const { shopList } = giftManagement
      // console.log(shopList)
    })
  }

  onPickerChange = val => {
    const { giftManagement } = this.props
    const { cascadeOption } = giftManagement
    const d = [...cascadeOption]
    let asyncValue = [...val]
    // 遍历当前的PickerOption
    d.forEach(i => {
      // 遍历并找出传入的省份
      if (i.value === val[0]) {
        // 如果没有children，则去获取
        if (!i.children) {
          giftManagement.fetchCityAndConcat(val[0]).then(res => {
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
                giftManagement.fetchAreaAndConcat(val[0], val[1]).then(res => {
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
      giftManagement, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        cat_fid: value.cat_fid[0],
        cat_id: value.cat_id[0],
        pick_in_store: value.pick_in_store ? '1' : '0',
        wap_pic: value.pic.map(item => item.url),
        province_idss: value.cascade ? value.cascade[0] : value.province_idss,
        city_idss: value.cascade ? value.cascade[1] : value.city_idss,
        area_idss: value.cascade ? value.cascade[2] : value.area_idss,
        circle_idss: value.circle_idss ? value.circle_idss[0] : value.circle_idss,
        market_idss: value.market_idss ? value.market_idss[0] : value.market_idss,
        gift_content: this.editor.current.state.editor.txt.html(),
        store: this.state.store,
      }
      // console.log(value)
      // console.log(obj)
      if (match.params.giftId) {
        giftManagement.modifyGift({ ...obj, gift_id: match.params.giftId }).then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
      } else {
        giftManagement.addGift({ ...obj }).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  fetchCircle = val => {
    const { giftManagement } = this.props
    if (val[2]) {
      giftManagement.fetchCircle(val[2])
    } else {
      giftManagement.resetCircle()
    }
  }

  fetchMarket = val => {
    // console.log(val[0])
    const { giftManagement } = this.props
    if (val[0]) {
      giftManagement.fetchMarket(val[0])
    } else {
      giftManagement.resetMarket()
    }
  }

  onChange = val => {
    console.log(val)
  }

  saveImg = url => {
    const { form } = this.props
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    form.setFieldsValue({
      pic: [...pic, { url }],
    })
    this.setState({
      mul: false,
    })
  }

  render() {
    const { giftManagement, match, form } = this.props
    const { getFieldProps } = form
    const { giftCategory, giftCategorylist, shopList } = giftManagement
    const { asyncCascadeValue, store, mul } = this.state
    const { cascadeOption, circleOption, marketOption } = giftManagement
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    const pickinstore = form.getFieldValue('pick_in_store')
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}礼品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('gift_name', {
              rules: [{ required: true }],
            })}
            placeholder="请填写礼品名称"
          >
            礼品名称
          </InputItem>
          <Picker
            {...getFieldProps('cat_fid', {
              rules: [{ required: true }],
              getValueFromEvent: item => {
                giftManagement.fetchGiftCategorylist(item[0])
                return item
              },
            })}
            data={giftCategory}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择分类</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('cat_id', {
              rules: [{ required: true }],
            })}
            data={giftCategorylist}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择分类产品</List.Item>
          </Picker>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('pick_in_store', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            是否到店自提
          </List.Item>
          {pickinstore === false ? (
            <Picker
              {...getFieldProps('cascade', {
                rules: [{ required: false }],
                getValueFromEvent: item => {
                  giftManagement.resetMarket()
                  return item
                },
              })}
              title="选择地区"
              extra="全部省"
              cols={3}
              data={cascadeOption}
              value={asyncCascadeValue}
              onPickerChange={this.onPickerChange}
              onOk={this.fetchCircle}
            >
              <List.Item arrow="horizontal">兑换地区</List.Item>
            </Picker>
          ) : (
            ''
          )}
          {pickinstore === false ? (
            <Picker
              {...getFieldProps('circle_idss', {
                rules: [{ required: false }],
                getValueFromEvent: item => {
                  giftManagement.fetchMarket(item[0])
                  return item
                },
              })}
              data={circleOption}
              title="选择商圈"
              extra="请选择"
              cols={1}
            >
              <List.Item arrow="horizontal">所在商圈</List.Item>
            </Picker>
          ) : (
            ''
          )}
          {pickinstore === false ? (
            <Picker
              {...getFieldProps('market_idss', {
                rules: [{ required: false }],
              })}
              data={marketOption}
              title="选择商盟"
              extra="请选择"
              cols={1}
            >
              <List.Item arrow="horizontal">所在商盟</List.Item>
            </Picker>
          ) : (
            ''
          )}
          {pickinstore === true ? (
            <List.Item>
              选择店铺
              {shopList.map(i => (
                <CheckboxItem
                  key={i.value}
                  checked={store.indexOf(i.value) !== -1}
                  onChange={e => {
                    const new_store = toJS(store)
                    try {
                      if (store.indexOf(i.value) === -1) {
                        new_store.push(i.value)
                        this.setState({
                          store: new_store,
                        })
                      } else {
                        new_store.splice(new_store.indexOf(i.value), 1)
                        this.setState({
                          store: new_store,
                        })
                      }
                    } catch (e) {
                      console.log(e)
                    }
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {i.label} - {i.adress}
                  </div>
                </CheckboxItem>
              ))}
            </List.Item>
          ) : (
            ''
          )}
          <InputItem
            {...getFieldProps('worth', {
              rules: [{ required: true }],
            })}
            placeholder="请填写结算价格"
          >
            结算价格
          </InputItem>
          <InputItem
            {...getFieldProps('sku', {
              rules: [{ required: true }],
            })}
            placeholder="请填写数量"
          >
            库存数量
          </InputItem>
          <List.Item arrow="empty">
            图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                rules: [{ required: true }],
              })}
              selectable={pic.length < 5}
              onAddImageClick={e => {
                this.setState({
                  mul: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
          <List.Item>
            简述
            <TextareaItem {...getFieldProps('intro')} rows={3} placeholder="请填写简短描述" />
          </List.Item>
          <List.Item>
            规格
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="以回车换行进行分割"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
            <TextareaItem {...getFieldProps('specification')} rows={3} placeholder="请填写规格" />
          </List.Item>
          <List.Item>
            发货清单
            <TextareaItem
              {...getFieldProps('invoice_content')}
              rows={3}
              placeholder="请填写发货清单"
            />
          </List.Item>
          <Item>
            礼品描述
            <Editor ref={this.editor} />
          </Item>
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={this.submit}
            >
              确定
            </Button>
          </WingBlank>
        </List>
        <MultipleImg
          visible={mul}
          close={() => this.setState({
            mul: false,
          })
          }
          ratio={1}
          callback={this.saveImg}
        />
      </React.Fragment>
    )
  }
}
export default GiftPanel
