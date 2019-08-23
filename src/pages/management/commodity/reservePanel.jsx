import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Picker,
  List,
  InputItem,
  WingBlank,
  Button,
  TextareaItem,
  Switch,
  Checkbox,
  DatePicker,
  ImagePicker,
  WhiteSpace,
  Toast,
  Menu,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
// import E from 'wangeditor'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import Editor from '@/common/Editor'
import moment from 'moment'
import { MenuMask } from '@/styled'
import Utils from '@/utils'

const { Item } = List
const { CheckboxItem } = Checkbox
const price = [
  {
    label: '面议',
    value: '0',
  },
  {
    label: '未定义',
    value: '1',
  },
]
const types = [
  {
    label: '到店',
    value: '0',
  },
  {
    label: '上门',
    value: '1',
  },
]

@createForm()
@inject('commodity')
@observer
class ReservePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      files: [],
      category: [],
      editor: null,
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match } = this.props
    commodity.fetchReserveCategoryOption()
    if (match.params.id) {
      commodity.fetchReserveDetail(match.params.id)
    }
    // editor.txt.html(history.location.state.value)
  }

  sotreChange = val => {
    console.log(val)
  }

  // getMenuList = () => {
  //   const { commodity } = this.props
  //   const { reserveCategoryOption } = commodity
  //   const cateGoryLabel = []
  //   reserveCategoryOption.forEach(item => {
  //     if (item.value === basicInfo.cat_fid) {
  //       cateGoryLabel.push(item.label)
  //       if (item.children.length) {
  //         item.children.forEach(child => {
  //           if (child.value === basicInfo.cat_id) {
  //             cateGoryLabel.push(child.label)
  //           }
  //         })
  //       }
  //     }
  //   })
  //   return (
  //     <Flex justify="end">
  //       {cateGoryLabel.map((item, index) => (
  //         <PrimaryTag
  //           key={index}
  //           style={{ marginLeft: 2 }}
  //           onClick={() => this.setState({ menu: true })}
  //         >
  //           {item}
  //         </PrimaryTag>
  //       ))}
  //     </Flex>
  //   )
  // }

  changeCategory = async arr => {
    // const { basicInformation } = this.props
    // await basicInformation.modifyCategory(arr)
    this.setState({ menu: false, category: arr })
  }

  submit = async () => {
    const { form, match, commodity } = this.props
    const { category } = this.state
    const content = this.editor.current.state.editor.txt.html()
    form.validateFields((error, value) => {
      console.log(value)
      if (error) {
        Toast.info('请输入完整信息')
      }
      const obj = {
        ...value,
        cat_fid: category[0],
        cat_id: category[1],
        appoint_pic_content: content,
        start_time: value.start_time ? moment(value.start_time).format('YYYY-MM-DD') : '',
        end_time: value.end_time ? moment(value.end_time).format('YYYY-MM-DD') : '',
        office_start_time: value.office_start_time
          ? moment(value.office_start_time).format('HH:mm')
          : '',
        office_stop_time: value.office_stop_time
          ? moment(value.office_stop_time).format('HH:mm')
          : '',
        is_appoint_price: value.is_appoint_price[0],
        appoint_type: value.appoint_type[0],
        payment_status: value.payment_status ? '1' : '0',
        appoint_date_type: value.appoint_date_type ? '1' : '0',
        is_store: value.is_store ? '1' : '0',
        appoint_status: value.appoint_status ? '1' : '0',
        pic: value.pic.map(item => item.url),
      }
      if (match.params.id) {
        commodity.modifyReserve({ ...obj, appoint_id: match.params.id })
      } else {
        commodity.insertReserve(obj)
      }
    })
  }

  render() {
    const { match, form, commodity } = this.props
    const { files, menu, category } = this.state
    const { getFieldProps } = form
    const data = [
      { value: 0, label: '同城百商联盟 - 下城区-跨贸小镇100幢' },
      { value: 1, label: '同城百商联盟 - 下城区-跨贸小镇101幢' },
      { value: 2, label: '同城百商联盟 - 下城区-跨贸小镇102幢' },
    ]
    const { reserveCategoryOption } = commodity
    const paymentValue = form.getFieldValue('payment_status')
    const storeChecked = form.getFieldValue('is_store')
    const menuEl = (
      <Menu
        className="menu-position"
        value={category}
        data={reserveCategoryOption}
        onChange={this.changeCategory}
      />
    )
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}预定商品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('appoint_name', {
              rules: [{ required: true }],
            })}
            placeholder="预约页面显示此名称"
          >
            服务名称
          </InputItem>
          <TextareaItem
            {...getFieldProps('appoint_content', {
              rules: [{ required: true }],
            })}
            title="服务简介"
            placeholder="请填写服务简介"
            rows={4}
            count={80}
          />
          <InputItem
            {...getFieldProps('old_price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写原件，最多两位小数"
          >
            原价
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('payment_status', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            收取定金
          </List.Item>
          {paymentValue && (
            <InputItem
              {...getFieldProps('payment_money', {
                rules: [{ required: true }],
              })}
              placeholder="请填写定金，最多支持两位小数"
            >
              定金
            </InputItem>
          )}
          <Picker
            {...getFieldProps('is_appoint_price', {
              rules: [{ required: true }],
            })}
            data={price}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">全价</List.Item>
          </Picker>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('appoint_date_type', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            日期多选
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="若开启可以选择多个连续的预约时间，且预约金额叠加，若选择两个连续的时间，预约订单最后的总价为设定全价的两倍，以此类推"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <InputItem
            {...getFieldProps('appoint_date_num', {
              rules: [{ required: true }],
            })}
            placeholder="请填写可预约天数"
          >
            预约天数
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="从今天开始算，可以向前预约的天数，最多30天，填写0表示只有今天可以预约，以此类推。"
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
            {...getFieldProps('expend_time', {
              rules: [{ required: true }],
            })}
            placeholder="请填写时间，单位：分钟"
          >
            耗时
          </InputItem>
          <InputItem
            {...getFieldProps('sort', {
              rules: [{ required: true }],
            })}
            placeholder="请填写数值，值越大，越靠前"
          >
            排序
          </InputItem>
          <DatePicker
            {...getFieldProps('start_time', {
              rules: [{ required: true }],
            })}
            mode="date"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              预约开始时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了开始时间，会自动显示"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
            })}
            mode="date"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              预约结束时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了结束时间，会自动显示"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <Picker
            {...getFieldProps('appoint_type', {
              rules: [{ required: true }],
            })}
            data={types}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">服务类别</List.Item>
          </Picker>
          <Item
            arrow="horizontal"
            onClick={() => this.setState({
              menu: true,
            })
            }
          >
            商户所属分类
          </Item>
          <Item arrow="empty">
            商品图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
              })}
              selectable={files.length < 5}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />
          </Item>
          <Item>
            服务详情
            <Editor ref={this.editor} />
          </Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_store', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            是否开启选择店铺
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="关闭后，订单将由商家指定门店及技师进行服务"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          {storeChecked
            && data.map(i => (
              <CheckboxItem key={i.value} onChange={() => this.sotreChange(i.value)}>
                {i.label}
              </CheckboxItem>
            ))}
          <DatePicker
            {...getFieldProps('office_start_time', {
              rules: [{ required: true }],
            })}
            mode="time"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              营业开始时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="如果营业时间段设置为00:00-00:00，则表示24小时营业"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('office_stop_time', {
              rules: [{ required: true }],
            })}
            mode="time"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              营业结束时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="如果营业时间段设置为00:00-00:00，则表示24小时营业"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('appoint_status', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            预约状态
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="为了方便用户能查到以前的订单，预约无法删除！"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
        </List>
        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onClick={this.submit}>
            确定
          </Button>
          <WhiteSpace />
        </WingBlank>
        {menu ? menuEl : null}
        {menu ? <MenuMask onClick={() => this.setState({ menu: false })} /> : null}
      </React.Fragment>
    )
  }
}
export default ReservePanel
