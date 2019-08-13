import React from 'react'
import NavBar from '@/common/NavBar'
// import { Route } from 'react-router-dom'
import {
  Picker, List, InputItem, WingBlank, Button, Switch, ImagePicker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import { NavBox, Editor } from './styled'
// import { CustomizeList, ListTitle, ListContent } from '@/styled'

const { Item } = List
const status = [
  [
    {
      label: '正常',
      value: '2013',
    },
    {
      label: '停售',
      value: '2014',
    },
  ],
]
const store = [
  [
    {
      label: '可是劳动纠纷',
      value: '2013',
    },
    {
      label: '是法国首都了',
      value: '2014',
    },
  ],
]
const classify = [
  [
    {
      label: '水果',
      value: '2013',
    },
    {
      label: '蔬菜',
      value: '2014',
    },
    {
      label: '鲜肉',
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
class CateringAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      recom: false,
      storeValue: '',
      classifyValue: '',
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
      checked, recom, statusValue, storeValue, classifyValue,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="添加餐饮商品" goBack />
        <form>
          <NavBox>
            <List>
              <InputItem placeholder="请填写商品名称">商品名称</InputItem>
              <InputItem placeholder="请填写商品条形码">商品条形码</InputItem>
              <InputItem placeholder="请填写关键词，最多5个">关键词</InputItem>
              <InputItem defaultValue="" placeholder="请填写商品单价，如个、斤、份">
                商品(单价)
              </InputItem>
              <InputItem defaultValue="" placeholder="请填写商品价格">
                商品价格
              </InputItem>
              <InputItem defaultValue="" placeholder="请填写商品原价">
                商品原价
              </InputItem>
              <InputItem defaultValue="" placeholder="请填写商品现价">
                商品现价
              </InputItem>
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
                是否必点
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="必点是在菜单中看不到的，用户下单是按照用餐人数来算份数，如餐具"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </List.Item>
              <List.Item
                extra={
                  <Switch
                    checked={recom}
                    onChange={() => {
                      this.setState({
                        recom: !recom,
                      })
                    }}
                  />
                }
              >
                是否推荐
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="必点是在菜单中看不到的，用户下单是按照用餐人数来算份数，如餐具"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </List.Item>
              <InputItem defaultValue="" placeholder="请填写数值">
                商品排序
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="默认添加顺序排序，数值越大，排序越前"
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
                <List.Item arrow="horizontal">商品状态</List.Item>
              </Picker>
              <Picker
                data={store}
                cascade={false}
                extra="请选择"
                value={storeValue}
                onChange={v => {
                  this.setState({
                    storeValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">选择添加到的店铺</List.Item>
              </Picker>
              <Picker
                data={classify}
                cascade={false}
                extra="请选择"
                value={classifyValue}
                onChange={v => {
                  this.setState({
                    classifyValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal">选择添加到的分类</List.Item>
              </Picker>
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
                商品描述
                <Editor>
                  <div ref={this.editor} className="editor" />
                </Editor>
              </Item>
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
export default CateringAdd
