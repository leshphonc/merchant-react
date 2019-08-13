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
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import E from 'wangeditor'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US'
import {
  SizeBox, Center, NavBox, Team, Business, Editor,
} from './styled'
// import { CustomizeList, ListTitle, ListContent } from '@/styled'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const utcNow1 = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
const utcNow2 = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
let minDate = new Date(nowTimeStamp - 1e7)
const maxDate = new Date(nowTimeStamp + 1e7)
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
}
function formatDate(date) {
  const pad = n => (n < 10 ? `0${n}` : n)
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  return `${dateStr} ${timeStr}`
}

const { Item } = List
const { CheckboxItem } = Checkbox
const type = [
  [
    {
      label: '团购券',
      value: '2013',
    },
    {
      label: '代金券',
      value: '2014',
    },
    {
      label: '实物',
      value: '2015',
    },
  ],
]
const typeDi = [
  [
    {
      label: '团购',
      value: '2013',
    },
    {
      label: '代金',
      value: '2014',
    },
    {
      label: '实物',
      value: '2015',
    },
    {
      label: '虚拟',
      value: '2016',
    },
  ],
]
const status = [
  [
    {
      label: '开启',
      value: '2013',
    },
    {
      label: '关闭',
      value: '2014',
    },
  ],
]
const price = [
  [
    {
      label: '面议',
      value: '2013',
    },
    {
      label: '未定义',
      value: '2014',
    },
  ],
]
const payment = [
  [
    {
      label: '开启',
      value: '2013',
    },
    {
      label: '关闭',
      value: '2014',
    },
  ],
]
const types = [
  [
    {
      label: '到店',
      value: '2013',
    },
    {
      label: '上门',
      value: '2014',
    },
  ],
]
const datas = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
]
class ReserveAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      paymentValue: ['2013'],
      priceValue: '',
      startdate: '',
      enddate: '',
      typesValue: '',
      statusValue: '',
      typeValue: '',
      utcDate1: utcNow1,
      utcDate2: utcNow2,
      typeDiValue: '',
      files: datas,
      editorContent: '',
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    // const { history } = this.props
    // this.setState({
    //   editorContent: history.location.state.value,
    // })
    const editor = new E(this.editor.current)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html,
      })
    }
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'undo', // 撤销
      'redo', // 重复
    ]
    editor.create()
    // editor.txt.html(history.location.state.value)
  }

  submit = async () => {
    // const { history } = this.props
    const { editorContent } = this.state
    console.log(editorContent)
  }

  onChange = val => {
    console.log(val)
  }

  onChange = (files, index) => {
    console.log(files, index)
    this.setState({
      files,
    })
  }

  changePermission = bool => {
    const { basicInformation } = this.props
    basicInformation.modifyPermission(bool ? '1' : '0')
  }

  render() {
    // const { history } = this.props
    const { files } = this.state
    const {
      startdate,
      enddate,
      checked,
      paymentValue,
      priceValue,
      typesValue,
      statusValue,
      typeValue,
      utcDate1,
      utcDate2,
      typeDiValue,
    } = this.state
    const data = [
      { value: 0, label: '同城百商联盟 - 下城区-跨贸小镇100幢' },
      { value: 1, label: '同城百商联盟 - 下城区-跨贸小镇101幢' },
      { value: 2, label: '同城百商联盟 - 下城区-跨贸小镇102幢' },
    ]
    return (
      <React.Fragment>
        <NavBar title="编辑预定商品" goBack />
        <form>
          <NavBox>
            <List>
              <InputItem placeholder="请填写商品标题">商品标题</InputItem>
              <Item>
                <SizeBox>
                  <TextareaItem title="商品简介" placeholder="请填写商品简介" rows={4} count={80} />
                </SizeBox>
              </Item>
              <InputItem placeholder="请填写原件，最多两位小数">原价</InputItem>
              <Picker
                data={payment}
                cascade={false}
                extra="请选择"
                value={paymentValue}
                onChange={v => {
                  this.setState({
                    paymentValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">收取定金</List.Item>
              </Picker>
              {paymentValue[0] === '2013' ? (
                <InputItem defaultValue="" placeholder="请填写定金，最多支持两位小数">
                  定金
                </InputItem>
              ) : (
                ''
              )}
              <Picker
                data={price}
                cascade={false}
                extra="请选择"
                value={priceValue}
                onChange={v => {
                  this.setState({
                    priceValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">全价</List.Item>
              </Picker>
              <List.Item
                extra={
                  <Switch
                    checked={checked}
                    onChange={() => {
                      this.setState({
                        checked: !checked,
                      })
                    }}
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
              <Team>
                <InputItem defaultValue="" placeholder="请填写预约天数">
                  可预约天数
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
              </Team>
              <Team>
                <InputItem placeholder="请填写时间，单位：分钟">耗时</InputItem>
              </Team>
              <Team>
                <InputItem defaultValue="" placeholder="请填写次数">
                  同时可选次数
                </InputItem>
              </Team>
              <Team>
                <InputItem placeholder="请填写数值，值越大，越靠前">排序</InputItem>
              </Team>
              <Team>
                <InputItem placeholder="请填写验证码">店员验证万能码</InputItem>
              </Team>
              <DatePicker
                mode="date"
                extra="选择时间"
                value={startdate}
                onChange={v => {
                  this.setState({
                    startdate: v,
                  })
                }}
              >
                <List.Item arrow="">
                  开始时间
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
                mode="date"
                extra="选择时间"
                value={enddate}
                onChange={v => {
                  this.setState({
                    enddate: v,
                  })
                }}
              >
                <List.Item arrow="">
                  结束时间
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
                data={types}
                cascade={false}
                extra="请选择"
                value={typesValue}
                onChange={v => {
                  this.setState({
                    typesValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">服务类别</List.Item>
              </Picker>
              <List.Item
                extra={
                  <Switch
                    checked={checked}
                    onChange={() => {
                      this.setState({
                        checked: !checked,
                      })
                    }}
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

              {data.map(i => (
                <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                  {i.label}
                </CheckboxItem>
              ))}
              <Item>
                选择分类
                <Center>
                  <Picker
                    data={type}
                    cascade={false}
                    extra="请选择"
                    value={typeValue}
                    onChange={v => {
                      this.setState({
                        typeValue: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Center>
                  <Picker
                    data={typeDi}
                    cascade={false}
                    extra="请选择"
                    value={typeDiValue}
                    onChange={v => {
                      this.setState({
                        typeDiValue: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
              </Item>
              <Item>
                服务详情
                <Editor>
                  <div ref={this.editor} className="editor" />
                </Editor>
              </Item>
              <div>
                <Item>
                  商品图片
                  <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 5}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                  />
                </Item>
              </div>
              <Business>
                <Item>
                  营业时间段
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
                  <DatePicker
                    mode="time"
                    locale={enUs}
                    format={val => `${formatDate(val).split(' ')[1]}`}
                    value={utcDate1}
                    onChange={v => {
                      this.setState({
                        utcDate1: v,
                      })
                    }}
                  >
                    <List.Item />
                  </DatePicker>
                  至
                  <DatePicker
                    mode="time"
                    locale={enUs}
                    format={val => `${formatDate(val).split(' ')[1]}`}
                    value={utcDate2}
                    onChange={v => {
                      this.setState({
                        utcDate2: v,
                      })
                    }}
                  >
                    <List.Item />
                  </DatePicker>
                </Item>
              </Business>
              <Team>
                <InputItem defaultValue="" placeholder="请填写时间">
                  时间间隔
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="预约时间间隔，单位分钟，必须是5的倍数，填写-1则为天数预约。"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                      &#xe628;
                    </i>
                  </Tooltip>
                </InputItem>
              </Team>
              <Picker
                data={status}
                cascade={false}
                extra="请选择"
                value={statusValue}
                onChange={v => {
                  this.setState({
                    statusValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">
                  预约状态
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="为了方便用户能查到以前的订单，团购无法删除！"
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
              <WingBlank style={{ padding: '10px 0' }}>
                <Button type="primary" style={{ color: '#333', fontWeight: 'bold' }}>
                  添加
                </Button>
              </WingBlank>
            </List>
          </NavBox>
        </form>
      </React.Fragment>
    )
  }
}
export default ReserveAdd
