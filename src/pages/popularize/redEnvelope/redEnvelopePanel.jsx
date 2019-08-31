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
  TextareaItem,
  DatePicker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import moment from 'moment'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import { toJS } from 'mobx'

const packetType = [{ label: '手气红包', value: '1' }, { label: '普通红包', value: '2' }]
const isOpen = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('redEnvelop', 'common')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncCascadeValue: [],
      pics: '',
    }
  }

  componentDidMount() {
    const { redEnvelop, match, form } = this.props
    console.log(this.props)
    const cacheData = JSON.parse(sessionStorage.getItem('cacheData'))
    if (cacheData && Object.keys(cacheData).length) {
      if (cacheData.cascade) {
        redEnvelop.fetchCascadeOption(
          cacheData.cascade[0],
          cacheData.cascade[1],
          cacheData.cascade[2],
        )
      } else {
        redEnvelop.fetchCascadeOption()
      }
      // 整理默认数据存入state
      this.setState({
        asyncCascadeValue: cacheData.cascade,
        pics: cacheData.pics,
      })
      form.setFieldsValue({
        cascade: cacheData.cascade,
        packet_type: cacheData.packet_type,
        title: cacheData.title,
        share_url: cacheData.share_url,
        desc: cacheData.desc,
        start_time: cacheData.start_time && new Date(cacheData.start_time),
        end_time: cacheData.end_time && new Date(cacheData.end_time),
        is_open: cacheData.is_open,
        item_sum: cacheData.item_sum,
        item_max: cacheData.item_max,
        item_min: cacheData.item_min,
        item_num: cacheData.item_num,
        item_unit: cacheData.item_unit,
        keyword: cacheData.title,
        people: cacheData.people,
        get_number: cacheData.get_number,
        day_number: cacheData.day_number,
      })
      return
    }

    if (!match.params.id) {
      redEnvelop.fetchCascadeOption().then(() => {
        const { asyncCascadeValue } = redEnvelop
        this.setState({
          asyncCascadeValue,
        })
      })
      return
    }
    redEnvelop.fetchGetRedPacket(match.params.id).then(() => {
      const { getRedPacket } = redEnvelop
      redEnvelop
        .fetchCascadeOption(getRedPacket.province_id, getRedPacket.city_id, getRedPacket.area_id)
        .then(() => {
          const { asyncCascadeValue } = redEnvelop
          // 整理默认数据存入state
          this.setState({
            asyncCascadeValue,
            pics: getRedPacket.pic,
          })
        })
      console.log(moment(getRedPacket.start_time).format('YYYY-MM-DD'))
      form.setFieldsValue({
        ...getRedPacket,
        title: getRedPacket.title,
        share_url: getRedPacket.share_url,
        desc: getRedPacket.desc,
        cascade: [getRedPacket.province_id, getRedPacket.city_id, getRedPacket.area_id],
        start_time: new Date(moment(getRedPacket.start_time * 1000).format('YYYY-MM-DD hh:mm')),
        end_time: new Date(moment(getRedPacket.end_time * 1000).format('YYYY-MM-DD hh:mm')),
        is_open: [getRedPacket.is_open],
        packet_type: [getRedPacket.packet_type],
      })
      if (getRedPacket.packet_type) {
        setTimeout(() => {
          if (getRedPacket.packet_type[0] === '1') {
            form.setFieldsValue({
              item_sum: getRedPacket.item_sum,
              item_max: getRedPacket.item_max,
              item_min: getRedPacket.item_min,
            })
          } else {
            form.setFieldsValue({
              item_num: getRedPacket.item_num,
              item_unit: getRedPacket.item_unit,
            })
          }
        }, 20)
      }
    })
  }

  cacheData = () => {
    // debugger
    const { form } = this.props
    const { pics } = this.state
    console.log(pics)
    const formData = form.getFieldsValue()
    console.log(formData)
    formData.pics = pics
    Utils.cacheData(formData)
  }

  goLogoPicker = () => {
    const { history } = this.props
    this.cacheData()
    history.push('/uploadSingleImg/上传图片/pics/1')
  }

  onPickerChange = val => {
    const { redEnvelop } = this.props
    const { cascadeOption } = redEnvelop
    const d = [...cascadeOption]
    let asyncValue = [...val]
    // 遍历当前的PickerOption
    d.forEach(i => {
      // 遍历并找出传入的省份
      if (i.value === val[0]) {
        // 如果没有children，则去获取
        if (!i.children) {
          redEnvelop.fetchCityAndConcat(val[0]).then(res => {
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
                redEnvelop.fetchAreaAndConcat(val[0], val[1]).then(res => {
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
      redEnvelop, form, match, history,
    } = this.props
    const { pics } = this.state
    if (!pics) {
      Toast.info('请输入完整信息')
      return
    }
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        start_time: value.start_time ? moment(value.start_time).format('YYYY-MM-DD hh:mm') : '',
        end_time: value.end_time ? moment(value.end_time).format('YYYY-MM-DD hh:mm') : '',
        is_open: value.is_open[0],
        province_id: value.cascade[0],
        city_id: value.cascade[1],
        area_id: value.cascade[2],
        packet_type: value.packet_type[0],
        item_sum: value.item_sum,
        item_max: value.item_max,
        item_min: value.item_min,
        item_num: value.item_num,
        item_unit: value.item_unit,
        keyword: value.title,
        pic: pics,
      }
      console.log(value)
      console.log(obj)
      if (match.params.id) {
        console.log(match.params.id)
        redEnvelop.modifyPacket({ ...obj, id: match.params.id }).then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
      } else {
        redEnvelop.addPacket({ ...obj }).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  onChange = val => {
    console.log(val)
  }

  render() {
    const { redEnvelop, match, form } = this.props
    const { getRedPacket } = redEnvelop
    const { getFieldProps } = form
    const { asyncCascadeValue } = this.state
    const { cascadeOption } = redEnvelop
    // console.log(circleOption)
    const { pics } = this.state
    const packettype = form.getFieldValue('packet_type') ? form.getFieldValue('packet_type')[0] : ''
    // console.log(shopList)
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}活动`} goBack />
        <List>
          <InputItem
            {...getFieldProps('title', {
              rules: [{ required: true }],
            })}
            placeholder="请填写活动名称"
          >
            活动名称
          </InputItem>
          <List.Item arrow="horizontal" onClick={this.goLogoPicker}>
            <CustomizeList>
              <ListTitle>活动图片</ListTitle>
              <ListContent>
                <img src={pics || ''} className="w40" alt="" />
              </ListContent>
            </CustomizeList>
          </List.Item>
          {getRedPacket.is_fabu === '0' ? (
            <DatePicker
              {...getFieldProps('start_time', {
                rules: [{ required: true }],
              })}
              mode="datetime"
              extra="选择时间"
            >
              <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
          ) : (
            <DatePicker
              {...getFieldProps('start_time', {
                rules: [{ required: true }],
              })}
              mode="datetime"
              extra="选择时间"
              disabled
            >
              <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
          )}
          {getRedPacket.is_fabu === '0' ? (
            <DatePicker
              {...getFieldProps('end_time', {
                rules: [{ required: true }],
              })}
              mode="datetime"
              extra="选择时间"
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
          ) : (
            <DatePicker
              {...getFieldProps('end_time', {
                rules: [{ required: true }],
              })}
              mode="datetime"
              extra="选择时间"
              disabled
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
          )}
          <List.Item>
            活动介绍
            <TextareaItem {...getFieldProps('desc')} rows={3} placeholder="请填写简短描述" />
          </List.Item>
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
            <List.Item arrow="horizontal">活动地区</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('share_url', {
              rules: [{ required: true }],
            })}
            placeholder="请填写链接"
          >
            分享链接
          </InputItem>
          <InputItem
            {...getFieldProps('people', {
              rules: [{ required: true }],
            })}
            placeholder="请填写人数"
          >
            领取人数
          </InputItem>
          <InputItem
            {...getFieldProps('get_number', {
              rules: [{ required: true }],
            })}
            placeholder="请填写次数"
          >
            领取次数
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户可以领取红包的次数,超过后无法领取"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('day_number', {
              rules: [{ required: true }],
            })}
            placeholder="请填写次数"
            labelNumber="7"
          >
            每天领取次数
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="每天领取次数，0表示不限制"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          {getRedPacket.is_fabu === '0' ? (
            <Picker
              {...getFieldProps('packet_type', {
                rules: [{ required: true }],
              })}
              data={packetType}
              cols={1}
            >
              <List.Item arrow="horizontal">
                红包类型
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="手气红包会根据红包的属性发放随机面额红包，普通红包只能发放固定面额的红包"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </List.Item>
            </Picker>
          ) : (
            <Picker
              {...getFieldProps('packet_type', {
                rules: [{ required: true }],
              })}
              data={packetType}
              cols={1}
              disabled
            >
              <List.Item arrow="horizontal">
                红包类型
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="手气红包会根据红包的属性发放随机面额红包，普通红包只能发放固定面额的红包"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </List.Item>
            </Picker>
          )}
          {packettype === '1' ? (
            <React.Fragment>
              {getRedPacket.is_fabu === '0' ? (
                <InputItem
                  {...getFieldProps('item_sum', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请填写金额"
                >
                  活动资金
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="被领取的红包总额度超过活动资金后将无法领取红包"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                      &#xe628;
                    </i>
                  </Tooltip>
                </InputItem>
              ) : (
                <InputItem
                  {...getFieldProps('item_sum', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请填写金额"
                  disabled
                >
                  活动资金
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="被领取的红包总额度超过活动资金后将无法领取红包"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                      &#xe628;
                    </i>
                  </Tooltip>
                </InputItem>
              )}
              <InputItem
                {...getFieldProps('item_max', {
                  rules: [{ required: true }],
                })}
                placeholder="请填写金额"
              >
                面额上限
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="单个红包可被抽取的最大值"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
              <InputItem
                {...getFieldProps('item_min', {
                  rules: [{ required: true }],
                })}
                placeholder="请填写金额"
              >
                面额下限
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="单个红包可被抽取的最小值"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </React.Fragment>
          ) : (
            ''
          )}
          {packettype === '2' ? (
            <React.Fragment>
              <InputItem
                {...getFieldProps('item_num', {
                  rules: [{ required: true }],
                })}
                placeholder="请填写个数"
              >
                发放个数
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="可被领取的红包个数，超过后将无法领取红包"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
              <InputItem
                {...getFieldProps('item_unit', {
                  rules: [{ required: true }],
                })}
                placeholder="请填写金额"
              >
                红包面额
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="请填写整数或者不大于2位的小数"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </React.Fragment>
          ) : (
            ''
          )}
          <Picker
            {...getFieldProps('is_open', {
              rules: [{ required: true }],
            })}
            data={isOpen}
            cols={1}
          >
            <List.Item arrow="horizontal">是否开启活动</List.Item>
          </Picker>
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
