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
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import Utils from '@/utils'

const { CheckboxItem } = Checkbox
const data = [
  { value: 0, label: 'Ph.D.' },
  { value: 1, label: 'Bachelor' },
  { value: 2, label: 'College diploma' },
]
@createForm()
@inject('giftManagement')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: [],
      asyncCascadeValue: [],
    }
  }

  componentDidMount() {
    const { giftManagement, match, form } = this.props
    console.log(this.props)
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
    if (!match.params.giftId) return
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
        pic: picArr,
      })
      form.setFieldsValue({
        ...getGiftDetail,
        cat_fid: [getGiftDetail.cat_fid],
        cat_id: [getGiftDetail.cat_id],
        pick_in_store: getGiftDetail.pick_in_store === '1',
        pic: picArr,
        cascade: [getGiftDetail.province_idss, getGiftDetail.city_idss, getGiftDetail.area_idss],
        circle_idss: [getGiftDetail.circle_idss],
      })
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
      // if (error) {
      //   Toast.info('请输入完整信息')
      //   return
      // }
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
      }
      console.log(value)
      console.log(obj)
      if (match.params.giftId) {
        console.log(match.params.giftId)
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

  onChange = val => {
    console.log(val)
  }

  render() {
    const { giftManagement, match, form } = this.props
    const { getFieldProps } = form
    const { giftCategory, giftCategorylist } = giftManagement
    const { pic, asyncCascadeValue } = this.state
    const { cascadeOption, circleOption } = giftManagement
    console.log(circleOption)
    const pickinstore = form.getFieldValue('pick_in_store')
    console.log(pickinstore)
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
          ) : (
            ''
          )}
          {pickinstore === false ? (
            <Picker
              {...getFieldProps('circle_idss', {
                rules: [{ required: true }],
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
          {pickinstore === true ? (
            // <InputItem
            //   {...getFieldProps('gift_name', {
            //     rules: [{ required: true }],
            //   })}
            //   placeholder="请填写礼品名称"
            // >
            //   选择店铺
            // </InputItem>
            <List.Item>
              选择店铺
              {data.map(i => (
                <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                  {i.label}
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
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
              })}
              selectable={pic.length < 4}
            />
          </List.Item>
          <List.Item>
            简述
            <TextareaItem {...getFieldProps('intro')} rows={3} placeholder="请填写简短描述" />
          </List.Item>
          <List.Item>
            规格
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
      </React.Fragment>
    )
  }
}
export default RetailAdd
