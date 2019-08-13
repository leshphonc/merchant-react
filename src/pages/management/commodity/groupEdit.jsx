import React from 'react'
import NavBar from '@/common/NavBar'
// import { Route } from 'react-router-dom'
import {
  Picker,
  List,
  InputItem,
  WingBlank,
  Button,
  TextareaItem,
  Switch,
  Checkbox,
  ImagePicker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import {
  SizeBox, Center, Right, NavBox, Team, Editor,
} from './styled'
// import ModifyPicture from './modify/picture'
// import { CustomizeList, ListTitle, ListContent } from '@/styled'

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
const share = [
  [
    {
      label: '固定',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
  ],
]
const member = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member1 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member2 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member3 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member4 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const setMeal = [
  [
    {
      label: '不加入任何套餐',
      value: '2013',
    },
    {
      label: '火锅套餐',
      value: '2014',
    },
  ],
]
const times = [
  [
    {
      label: '周末、法定节假日通用',
      value: '2013',
    },
    {
      label: '周末不能使用',
      value: '2014',
    },
    {
      label: '法定节假日不能使用',
      value: '2015',
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
class GroupEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      distribution: false,
      // startdate: '',
      // enddate: '',
      selectValue: ['2013'],
      timees: '',
      statusValue: '',
      typeValue: '',
      memberValue: '',
      member1Value: '',
      member2Value: '',
      member3Value: '',
      member4Value: '',
      setMealValue: '',
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
      // startdate,
      // enddate,
      checked,
      selectValue,
      timees,
      distribution,
      statusValue,
      typeValue,
      memberValue,
      member1Value,
      member2Value,
      member3Value,
      member4Value,
      setMealValue,
    } = this.state
    const data = [
      { value: 0, label: '同城百商联盟 - 下城区-跨贸小镇100幢' },
      { value: 1, label: '同城百商联盟 - 下城区-跨贸小镇101幢' },
      { value: 2, label: '同城百商联盟 - 下城区-跨贸小镇102幢' },
    ]
    return (
      <React.Fragment>
        <NavBar title="编辑团购商品" goBack />
        <form>
          <NavBox>
            <List>
              <InputItem placeholder="请填写商品标题">商品标题</InputItem>
              <InputItem placeholder="请填写商品名称">商品名称</InputItem>
              <Item>
                <SizeBox>
                  <TextareaItem title="商品简介" placeholder="请填写商品简介" rows={4} count={80} />
                </SizeBox>
              </Item>
              <InputItem placeholder="请填写关键词，最多5个">关键词</InputItem>
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
                支持退款
              </List.Item>
              <InputItem defaultValue="" placeholder="请填写原价，最多一位小数">
                原价
              </InputItem>
              <InputItem defaultValue="" placeholder="请填写团购价，最多一位小数">
                团购价
              </InputItem>
              <InputItem defaultValue="" placeholder="请填写优惠数值，单位元">
                微信优惠
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="最多支持一位小数，不填则不显示微信优惠！实际购买价=(团购价 - 微信优惠价)"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
              <Item>
                团购开始时间
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="到了团购开始时间，商品才会显示"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp; 2019年10月10日 15时50分30秒
                {/* <DatePicker
                mode="date"
                extra="选择时间"
                value={startdate}
                onChange={v => {
                  this.setState({
                    startdate: v,
                  })
                }}
              >
                <List.Item arrow="" />
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
                <List.Item arrow="" />
              </DatePicker> */}
              </Item>
              <Item>
                团购结束时间
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="到了团购结束时间，商品才会显示"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp; 2019年10月10日 15时50分30秒
              </Item>
              <Item>优惠券有效期 &nbsp;&nbsp;&nbsp;&nbsp;2019年10月10日 15时50分30秒</Item>
              <Picker
                data={times}
                cascade={false}
                extra="请选择"
                value={timees}
                onChange={v => {
                  this.setState({
                    timees: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">使用时间限制</List.Item>
              </Picker>
              <List.Item
                extra={
                  <Switch
                    checked={distribution}
                    onChange={() => {
                      this.setState({
                        distribution: !distribution,
                      })
                    }}
                  />
                }
              >
                是否发布到分销市场
              </List.Item>
              <Item>
                分润设置
                <Center>
                  <Picker
                    data={share}
                    cascade={false}
                    extra="请选择"
                    value={selectValue}
                    onChange={v => {
                      this.setState({
                        selectValue: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写分润金额"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
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
                  团购状态
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
              <Item>
                选择店铺
                {data.map(i => (
                  <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                    {i.label}
                  </CheckboxItem>
                ))}
              </Item>
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
                <List.Item arrow="horizontal">
                  团购类型
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="如果是团购券或代金券,则会生成券密码;如果是实物,则需要填写快递单号"
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
              <Item>
                本单详情
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
              <Item>
                <div style={{ whiteSpace: 'initial', color: '#ea6161' }}>
                  说明：必须设置一个会员等级优惠类型和优惠类型对应的数值，我们将结合优惠类型和所填的数值来计算该商品会员等级的优惠的幅度！
                </div>
              </Item>
              <Item>
                白银会员 优惠类型
                <Center>
                  <Picker
                    data={member}
                    cascade={false}
                    extra="请选择"
                    value={memberValue}
                    onChange={v => {
                      this.setState({
                        memberValue: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写优惠数值"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
              <Item>
                黄金会员 优惠类型
                <Center>
                  <Picker
                    data={member1}
                    cascade={false}
                    extra="请选择"
                    value={member1Value}
                    onChange={v => {
                      this.setState({
                        member1Value: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写优惠数值"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
              <Item>
                城市合伙人 优惠类型
                <Center>
                  <Picker
                    data={member2}
                    cascade={false}
                    extra="请选择"
                    value={member2Value}
                    onChange={v => {
                      this.setState({
                        member2Value: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写优惠数值"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
              <Item>
                区域合伙人 优惠类型
                <Center>
                  <Picker
                    data={member3}
                    cascade={false}
                    extra="请选择"
                    value={member3Value}
                    onChange={v => {
                      this.setState({
                        member3Value: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写优惠数值"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
              <Item>
                总部合伙人 优惠类型
                <Center>
                  <Picker
                    data={member4}
                    cascade={false}
                    extra="请选择"
                    value={member4Value}
                    onChange={v => {
                      this.setState({
                        member4Value: v,
                      })
                    }}
                  >
                    <List.Item arrow="horizontal" />
                  </Picker>
                </Center>
                <Right>
                  <InputItem
                    defaultValue=""
                    placeholder="请填写优惠数值"
                    style={{ display: 'inline-block' }}
                  />
                </Right>
              </Item>
              <Item>
                <div style={{ whiteSpace: 'initial', color: '#ea6161' }}>
                  说明：一个团购商品只能参与一个套餐！
                </div>
              </Item>
              <Team>
                <InputItem placeholder="必须填写 (例如：3-4人)" style={{ width: '100%' }}>
                  本团购套餐标签
                </InputItem>
              </Team>
              <Picker
                data={setMeal}
                cascade={false}
                extra="请选择"
                value={setMealValue}
                onChange={v => {
                  this.setState({
                    setMealValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">选择加入套餐</List.Item>
              </Picker>
              <Team>
                <InputItem defaultValue="1" placeholder="请填写人数">
                  成功团购人数要求
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="最少需要多少人购买才算团购成功"
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
                <InputItem defaultValue="0" placeholder="请填写商品数量">
                  商品总数量
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="0表示不限制,否则产品会出现“已卖光”状态"
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
                <InputItem defaultValue="0" placeholder="请填写购买数量">
                  ID最多购买数量
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="一个ID最多购买数量,0表示不限制"
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
                <InputItem defaultValue="1" placeholder="请填写购买数量">
                  一次最少购买数量
                  <Tooltip
                    trigger="click"
                    placement="topLeft"
                    overlay="购买数量低于此设置不允许参团"
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
export default GroupEdit
