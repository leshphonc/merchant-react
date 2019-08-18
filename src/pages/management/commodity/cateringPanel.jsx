import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  Picker, List, InputItem, WingBlank, Button, ImagePicker, Toast,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import axios from 'axios'
import Compressor from 'compressorjs'
import { NavBox, Editor } from './styled'
// import { CustomizeList, ListTitle, ListContent } from '@/styled'

const { Item } = List
const status = [
  [
    {
      label: '正常',
      value: '1',
    },
    {
      label: '停售',
      value: '0',
    },
  ],
]
// const datas = [
//   {
//     url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//     id: '2121',
//   },
//   {
//     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//     id: '2122',
//   },
// ]

@inject('commodity')
@observer
class CateringPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // checked: false,
      // recom: false,
      storeValue: '',
      statusValue: '',
      classifyValue: '',
      editorContent: '',
      sortName: '',
      number: '',
      des: '',
      unit: '',
      price: '',
      oldPrice: '',
      sort: '',
      pic: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match } = this.props
    // const { cateringDetail } = commodity
    console.log(match)
    const editor = new E(this.editor.current)
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

    commodity.fetchCateringValues()
    commodity.fetchCateringMeal(0)
    if (!match.params.goodid) return
    commodity.fetchCateringDetail(match.params.id, match.params.goodid).then(() => {
      const { cateringDetail } = commodity
      console.log(cateringDetail)
      this.setState({
        sortName: cateringDetail.name,
        number: cateringDetail.number,
        des: cateringDetail.des,
        unit: cateringDetail.unit,
        price: cateringDetail.price,
        oldPrice: cateringDetail.old_price,
        sort: cateringDetail.sort,
        pic: cateringDetail.pic_arr,
      })
    })
  }

  submit = () => {
    const { commodity, match, history } = this.props
    const {
      sortName, number, sort, des, unit, price, oldPrice, pic,
    } = this.state
    if (!sortName && !sort && !sortName) {
      Toast.info('请填写完整信息')
      return
    }
    if (match.params.goodid) {
      commodity
        .modifyCategory({
          name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          pic_arr: pic,
          old_price: oldPrice,
          goods_id: match.params.goodid,
          store_id: match.params.id,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    } else {
      commodity
        .addCategory({
          name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          pic_arr: pic,
          old_price: oldPrice,
          store_id: commodity.cateringValues[0].value,
          // goods_id: match.params.goodid,
        })
        .then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
    }
  }

  submits = async () => {
    const { editorContent } = this.state
    console.log(editorContent)
  }

  imgChange = (arr, type) => {
    if (type === 'remove') {
      this.setState({
        pic: arr,
      })
      return
    }
    arr.forEach((item, index) => {
      if (item.file) {
        /* eslint no-new: 0 */
        new Compressor(item.file, {
          quality: 0.1,
          success: result => {
            const reader = new window.FileReader()
            reader.readAsDataURL(result)
            reader.onloadend = () => {
              // Send the compressed image file to server with XMLHttpRequest.
              axios
                .post('/wap.php?g=Wap&c=upyun&a=base64change', { imgBase: reader.result })
                .then(response => {
                  if (response.data.error === 0) {
                    const picArr = arr
                    picArr.splice(index, 1, { url: response.data.msg })
                    this.setState({
                      pic: picArr,
                    })
                  } else {
                    Toast.fail(response.data.msg)
                  }
                })
            }
          },
          error: err => {
            console.log(err.message)
          },
        })
      }
    })
  }

  changePermission = bool => {
    const { basicInformation } = this.props
    basicInformation.modifyPermission(bool ? '1' : '0')
  }

  render() {
    const { commodity, match } = this.props
    const { cateringValues, cateringMeal } = commodity
    const {
      statusValue,
      storeValue,
      classifyValue,
      sortName,
      number,
      des,
      unit,
      price,
      oldPrice,
      sort,
      pic,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}餐饮商品`} goBack />
        <form>
          <NavBox>
            <List>
              <InputItem
                placeholder="请填写商品名称"
                value={sortName}
                onChange={val => this.setState({
                  sortName: val,
                })
                }
              >
                商品名称
              </InputItem>
              <InputItem
                placeholder="请填写商品条形码"
                value={number}
                onChange={val => this.setState({
                  number: val,
                })
                }
              >
                商品条形码
              </InputItem>
              <InputItem
                placeholder="请填写关键词，最多5个"
                value={des}
                onChange={val => this.setState({
                  des: val,
                })
                }
              >
                关键词
              </InputItem>
              <InputItem
                defaultValue=""
                placeholder="请填写商品单价，如个、斤、份"
                value={unit}
                onChange={val => this.setState({
                  unit: val,
                })
                }
              >
                商品(单位)
              </InputItem>
              <InputItem
                defaultValue=""
                placeholder="请填写商品价格"
                value={price}
                onChange={val => this.setState({
                  price: val,
                })
                }
              >
                商品价格
              </InputItem>
              <InputItem
                defaultValue=""
                placeholder="请填写商品原价"
                value={oldPrice}
                onChange={val => this.setState({
                  oldPrice: val,
                })
                }
              >
                商品原价
              </InputItem>
              {/* <InputItem defaultValue="" placeholder="请填写商品现价">
                商品现价
              </InputItem> */}
              {/* <List.Item
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
              </List.Item> */}
              {/* <List.Item
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
              </List.Item> */}
              <InputItem
                defaultValue=""
                placeholder="请填写数值"
                value={sort}
                onChange={val => this.setState({
                  sort: val,
                })
                }
              >
                商品排序
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="默认添加顺序排序，数值越大，排序越靠前"
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
              {!match.params.goodid ? (
                <Picker
                  data={[cateringValues]}
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
              ) : (
                ''
              )}
              <Picker
                data={[cateringMeal]}
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
              <Item>
                商品图片
                <ImagePicker
                  files={pic}
                  onChange={this.imgChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={pic.length < 4}
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                />
              </Item>
              <Item>
                商品描述
                <Editor>
                  <div ref={this.editor} className="editor" />
                </Editor>
              </Item>
              <WingBlank style={{ padding: '10px 0' }}>
                <Button
                  type="primary"
                  style={{ color: '#333', fontWeight: 'bold' }}
                  onClick={this.submit}
                >
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
export default CateringPanel
