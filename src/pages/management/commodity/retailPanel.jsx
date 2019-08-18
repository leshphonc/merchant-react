import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  Picker,
  List,
  InputItem,
  WingBlank,
  Button,
  ImagePicker,
  Toast,
  DatePicker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import axios from 'axios'
import Compressor from 'compressorjs'
import { Title, Editor } from './styled'

const { Item } = List
const seasons = [
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
const category = [
  [
    {
      label: '实体商品',
      value: '2013',
    },
    {
      label: '虚拟商品',
      value: '2014',
    },
    {
      label: '虚拟商品(需配送)',
      value: '2015',
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
      value: '2015',
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
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starttime: '',
      endtime: '',
      selectValue: '',
      categoryValue: '',
      storeValue: '',
      classifyValue: '',
      // files: datas,
      editorContent: '',
      sortName: '',
      number: '',
      des: '',
      unit: '',
      price: '',
      oldPrice: '',
      sort: '',
      stockNum: '',
      packingCharge: '',
      seckillPrice: '',
      seckillStock: '',
      pic: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
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
    // editor.txt.html(history.location.state.value)
    const { commodity, match } = this.props
    console.log(this.props)
    //

    if (!match.params.goodid) return
    commodity.fetchRetailDetail(match.params.id, match.params.goodid).then(() => {
      const { retailDetail } = commodity
      console.log(retailDetail)
      this.setState({
        sortName: retailDetail.name,
        number: retailDetail.number,
        des: retailDetail.des,
        unit: retailDetail.unit,
        price: retailDetail.price,
        oldPrice: retailDetail.old_price,
        sort: retailDetail.sort,
        stockNum: retailDetail.stock_num,
        packingCharge: retailDetail.packing_charge,
        seckillPrice: retailDetail.seckill_price,
        seckillStock: retailDetail.seckill_stock,
        pic: retailDetail.pic_arr,
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
      pic,
      stockNum,
      packingCharge,
      seckillPrice,
      seckillStock,
    } = this.state
    if (!sortName && !sort && !sortName) {
      Toast.info('请填写完整信息')
      return
    }
    if (match.params.goodid) {
      commodity
        .modifyRetail({
          name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          old_price: oldPrice,
          stock_num: stockNum,
          packing_charge: packingCharge,
          seckill_price: seckillPrice,
          seckill_stock: seckillStock,
          store_id: match.params.id,
          goods_id: match.params.goodid,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    } else {
      commodity
        .addRetail({
          name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          old_price: oldPrice,
          store_id: commodity.retailValues[0].value,
          pic_arr: pic,
        })
        .then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
    }
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

  submits = async () => {
    // const { history } = this.props
    const { editorContent } = this.state
    console.log(editorContent)
  }

  render() {
    const { match } = this.props
    const {
      selectValue, categoryValue, storeValue, classifyValue,
    } = this.state
    const {
      sortName,
      number,
      unit,
      price,
      oldPrice,
      sort,
      pic,
      stockNum,
      packingCharge,
      seckillPrice,
      seckillStock,
      starttime,
      endtime,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}餐饮商品`} goBack />
        <form>
          <List>
            <DatePicker
              value={starttime}
              onChange={v => {
                this.setState({
                  starttime: v,
                })
              }}
            >
              <List.Item />
            </DatePicker>
            至
            <DatePicker
              value={endtime}
              onChange={v => {
                this.setState({
                  endtime: v,
                })
              }}
            >
              <List.Item />
            </DatePicker>
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
              placeholder="请填写商品单位，如个、斤、份"
              value={unit}
              onChange={val => this.setState({
                unit: val,
              })
              }
            >
              商品单位
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
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="最多支持两位小数，下同"
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
              defaultValue=""
              placeholder="请填写商品原价"
              value={oldPrice}
              onChange={val => this.setState({
                oldPrice: val,
              })
              }
            >
              商品原价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="原价可不填，不填和现价一样"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            {/* <InputItem defaultValue="" placeholder="请填写商品进价">
              商品进价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="进货价用户是看不到的"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem> */}
            {/* <InputItem defaultValue="" placeholder="请填写商品现价">
              商品现价
            </InputItem> */}
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
                overlay="默认添加顺序排序。数值越大，排序越前"
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
              defaultValue=""
              placeholder="请填写库存数"
              value={stockNum}
              onChange={val => this.setState({
                stockNum: val,
              })
              }
            >
              商品库存
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="-1表示无限量。数量小于10时，商品详细页面会显示库存。"
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
              defaultValue=""
              placeholder="请填写打包费用"
              value={packingCharge}
              onChange={val => this.setState({
                packingCharge: val,
              })
              }
            >
              打包费
            </InputItem>
            <Picker
              data={seasons}
              cascade={false}
              extra="请选择"
              value={selectValue}
              onChange={v => {
                this.setState({
                  selectValue: v,
                })
              }}
            >
              <List.Item arrow="horizontal">商品状态</List.Item>
            </Picker>
            <Picker
              data={category}
              cascade={false}
              extra="请选择"
              value={categoryValue}
              onChange={v => {
                this.setState({
                  categoryValue: v,
                })
              }}
            >
              <List.Item arrow="horizontal">商品类别</List.Item>
            </Picker>
            {match.params.goodid ? (
              ''
            ) : (
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
            )}

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
            <Title>
              <InputItem
                defaultValue=""
                placeholder="请填写限时价"
                value={seckillPrice}
                onChange={val => this.setState({
                  seckillPrice: val,
                })
                }
              >
                商品限时价
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="0表示无限时价。"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </Title>
            <Title>
              <InputItem
                defaultValue=""
                placeholder="请填写库存"
                value={seckillStock}
                onChange={val => this.setState({
                  seckillStock: val,
                })
                }
              >
                限时价库存
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="-1表示无限量。"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </Title>
            <div>
              <Item>
                商品图片
                <ImagePicker
                  files={pic}
                  onChange={this.imgChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={pic.length < 5}
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
              <Button
                type="primary"
                style={{ color: '#333', fontWeight: 'bold' }}
                onClick={this.submit}
              >
                添加
              </Button>
            </WingBlank>
          </List>
        </form>
      </React.Fragment>
    )
  }
}
export default RetailAdd
