import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, InputItem, WingBlank, Button, Toast, Picker,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import Utils from '@/utils'
// import { toJS } from 'mobx'

// const { Item } = List
@createForm()
@inject('selfManagement', 'common')
@observer
class selfMention extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // menu: false,
      long: '',
      lat: '',
      asyncCascadeValue: [],
    }
  }

  componentDidMount() {
    const { selfManagement, form, match } = this.props
    console.log(this.props)
    // selfManagement.fetchBasicInfo()
    // selfManagement.fetchPickAddressDetail(match.params.id)
    const cacheData = JSON.parse(sessionStorage.getItem('cacheData'))
    if (cacheData && Object.keys(cacheData).length) {
      if (cacheData.cascade) {
        selfManagement.fetchCascadeOption(
          cacheData.cascade[0],
          cacheData.cascade[1],
          cacheData.cascade[2],
        )
      } else {
        selfManagement.fetchCascadeOption()
      }
      // 整理默认数据存入state
      this.setState({
        asyncCascadeValue: cacheData.cascade,
        long: cacheData.long,
        lat: cacheData.lat,
      })
    }
    if (!match.params.id) {
      selfManagement.fetchCascadeOption().then(() => {
        const { asyncCascadeValue } = selfManagement
        this.setState({
          asyncCascadeValue,
        })
      })
      return
    }
    selfManagement.fetchPickAddressDetail(match.params.id).then(() => {
      const { pickAddressDetail } = selfManagement
      // console.log(pickAddressDetail)
      selfManagement
        .fetchCascadeOption(
          pickAddressDetail.province_id,
          pickAddressDetail.city_id,
          pickAddressDetail.area_id,
        )
        .then(() => {
          const { asyncCascadeValue } = selfManagement
          // 整理默认数据存入state
          this.setState({
            asyncCascadeValue,
            long: pickAddressDetail.long,
            lat: pickAddressDetail.lat,
          })
        })
      form.setFieldsValue({
        cascade: [
          pickAddressDetail.province_id,
          pickAddressDetail.city_id,
          pickAddressDetail.area_id,
        ],
        pick_addr: pickAddressDetail.pick_addr,
        phone: pickAddressDetail.phone,
      })
    })
  }

  cacheData = () => {
    const { form } = this.props
    const {
      long, lat, asyncCascadeValue,
    } = this.state
    const formData = form.getFieldsValue()
    form.asyncCascadeValue = asyncCascadeValue
    formData.long = long
    formData.lat = lat
    Utils.cacheData(formData)
  }

  goMapPicker = () => {
    const { history } = this.props
    const { long, lat } = this.state
    this.cacheData()
    history.push(`/coordinatePicker/${long}/${lat}`)
  }

  onPickerChange = val => {
    const { selfManagement } = this.props
    const { cascadeOption } = selfManagement
    const d = [...cascadeOption]
    let asyncValue = [...val]
    // 遍历当前的PickerOption
    d.forEach(i => {
      // 遍历并找出传入的省份
      if (i.value === val[0]) {
        // 如果没有children，则去获取
        if (!i.children) {
          selfManagement.fetchCityAndConcat(val[0]).then(res => {
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
                selfManagement.fetchAreaAndConcat(val[0], val[1]).then(res => {
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
      selfManagement, form, match, history,
    } = this.props
    const { long, lat } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }

      const obj = {
        ...value,
        province_id: value.cascade ? value.cascade[0] : value.province_id,
        city_id: value.cascade ? value.cascade[1] : value.city_id,
        area_id: value.cascade ? value.cascade[2] : value.area_id,
        long_lat: { long, lat },
        long,
        lat,
      }
      if (match.params.id) {
        selfManagement
          .addECommerce({ ...obj, id: match.params.id })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        selfManagement.modifyECommerce(obj).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  render() {
    const {
      match, form, selfManagement,
    } = this.props
    const { getFieldProps } = form
    const { cascadeOption } = selfManagement
    const { asyncCascadeValue, long, lat } = this.state
    // console.log(long)
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}自提点`} goBack />
        <List>
          <List.Item extra={`${long}, ${lat}`} arrow="horizontal" onClick={this.goMapPicker}>
          自提点经纬度
          </List.Item>
          {/* <Item
            arrow="horizontal"
            extra={`${basicInfo.long || 0}, ${basicInfo.lat || 0}`}
            onClick={() => history.push(
              `/setting/selfManagement/modify/coordinate/${basicInfo.long}/${basicInfo.lat}`,
            )
            }
          >
            自提点经纬度
          </Item> */}
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
          >
            <List.Item arrow="horizontal">店铺所在地</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('pick_addr', {
              rules: [{ required: true }],
            })}
            maxLength="11"
            placeholder="请填写详细地址"
          >
            详细地址
          </InputItem>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{ required: true }],
            })}
            maxLength="11"
            placeholder="请填写联系电话"
          >
            电话号码
          </InputItem>
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
export default selfMention
