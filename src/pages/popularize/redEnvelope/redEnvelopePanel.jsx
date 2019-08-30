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
  DatePicker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import moment from 'moment'
import { toJS } from 'mobx'

const { Item } = List
const data = []
const packetType = [{ label: '手气红包', value: '1' }, { label: '普通红包', value: '2' }]
const isOpen = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('redEnvelop')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: [],
      files: data,
      asyncCascadeValue: [],
    }
  }

  componentDidMount() {
    const { redEnvelop, match, form } = this.props
    console.log(this.props)
    if (!match.params.id) return
    redEnvelop.fetchGetRedPacket(match.params.id).then(() => {
      const { getRedPacket } = redEnvelop
      console.log(moment(getRedPacket.start_time * 1000).format('YYYY-MM-DD'))
      form.setFieldsValue({
        ...getRedPacket,
        // pic: getRedPacket.pic,
        start_time: new Date(moment(getRedPacket.start_time * 1000).format('YYYY-MM-DD hh:mm:ss')),
        end_time: new Date(moment(getRedPacket.end_time * 1000).format('YYYY-MM-DD hh:mm:ss')),
        is_open: [getRedPacket.is_open],
        packet_type: [getRedPacket.packet_type],
      })
    })
  }

  submit = () => {
    const {
      redEnvelop, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      // if (error) {
      //   Toast.info('请输入完整信息')
      //   return
      // }
      const obj = {
        ...value,
        start_time: value.start_time ? moment(value.start_time).format('YYYY-MM-DD') : '',
        end_time: value.end_time ? moment(value.end_time).format('YYYY-MM-DD') : '',
        is_open: value.is_open[0],
        packet_type: value.packet_type[0],
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
    // const { giftCategory, giftCategorylist, shopList } = giftManagement
    const { pic, asyncCascadeValue, files } = this.state
    // const { cascadeOption, circleOption } = giftManagement
    // console.log(circleOption)
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
          <InputItem
            {...getFieldProps('keyword', {
              rules: [{ required: true }],
            })}
            placeholder="请填写关键词"
          >
            关键词
          </InputItem>
          <ImagePicker
            length="6"
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 2}
            onAddImageClick={this.onAddImageClick}
            disableDelete
          />
          {/* <List.Item arrow="empty">
            活动图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
              })}
              selectable={pic.length < 4}
            />
          </List.Item> */}
          <DatePicker
            {...getFieldProps('start_time', {
              rules: [{ required: true }],
            })}
            mode="datetime"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
            })}
            mode="datetime"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">结束时间</List.Item>
          </DatePicker>
          <List.Item>
            活动介绍
            <TextareaItem {...getFieldProps('desc')} rows={3} placeholder="请填写简短描述" />
          </List.Item>
          {/* <Picker
            {...getFieldProps('cascade', {
              rules: [{ required: true }],
            })}
            title="选择地区"
            extra="请选择"
            cols={3}
            // data={cascadeOption}
            value={asyncCascadeValue}
            onPickerChange={this.onPickerChange}
            onOk={this.fetchCircle}
          >
            <List.Item arrow="horizontal">店铺所在地</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('circle_idss', {
              rules: [{ required: true }],
            })}
            // data={circleOption}
            title="选择商圈"
            extra="请选择"
            cols={1}
          >
            <List.Item arrow="horizontal">所在商圈</List.Item>
          </Picker> */}
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
          {packettype === '1' ? (
            <React.Fragment>
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
