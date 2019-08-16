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

@inject('commodity')
@observer
class CateringPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // checked: false,
      // recom: false,
      storeValue: '',
      statusValue: ['0'],
      classifyValue: '',
      files: datas,
      editorContent: '',
      sortName: '',
      number: '',
      des: '',
      unit: '',
      price: '',
      oldPrice: '',
      sort: '',
      storeId: '',
      goodsId: '',
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match } = this.props
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
    commodity.fetchCateringMeal(match.params.store_id)
    if (!match.params.stid) return
    commodity.fetchCateringDetail(match.params.store_id, match.params.goods_id).then(() => {
      const { cateringDetail } = commodity
      console.log(cateringDetail)
      this.setState({
        storeId: cateringDetail.store_id,
        goodsId: cateringDetail.goods_id,
        sortName: cateringDetail.name,
        number: cateringDetail.number,
        des: cateringDetail.des,
        unit: cateringDetail.unit,
        price: cateringDetail.price,
        oldPrice: cateringDetail.old_price,
        sort: cateringDetail.sort,
        files: cateringDetail.pic_arr,
      })
    })
    commodity
      .fetchCateringDetail(match.params.id, match.params.type, match.params.stid)
      .then(() => {
        const { cateringDetail } = commodity
        this.setState({
          sortName: cateringDetail.name,
          sort: cateringDetail.sort,
        })
      })
  }

  submit = () => {
    const { commodity, match, history } = this.props
    const {
      sortName,
      number,
      sort,
      des,
      unit,
      price,
      oldPrice,
      storeId,
      goodsId,
      files,
    } = this.state
    if (!sortName && !sort && !sortName) {
      Toast.info('请填写完整信息')
      return
    }
    if (match.params.stid) {
      commodity
        .modifyCategory({
          sort_name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          store_id: storeId,
          goods_id: goodsId,
          old_price: oldPrice,
          stid: match.params.stid,
          store_type: match.params.type,
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
          old_price: oldPrice,
          store_id: storeId,
          goods_id: goodsId,
          pic_arr: files,
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
        files: arr,
      })
      return
    }
    arr.forEach((item, index) => {
      if (item.file) {
        /* eslint no-new: 0 */
        new Compressor(item.file, {
          quality: 0.3,
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
                      files: picArr,
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
    const { commodity } = this.props
    const { cateringValues, cateringMeal } = commodity
    const {
      statusValue,
      storeValue,
      classifyValue,
      files,
      sortName,
      number,
      des,
      unit,
      price,
      oldPrice,
      sort,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="添加餐饮商品" goBack />
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
                商品(单价)
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
                  files={files}
                  onChange={this.imgChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 4}
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
