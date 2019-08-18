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
import { createForm } from 'rc-form'
import moment from 'moment'
import { toJS } from 'mobx'
import { Title, Editor, TimeBox } from './styled'
import Utils from '@/utils'

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
// const category = [
//   [
//     {
//       label: '实体商品',
//       value: '0',
//     },
//     {
//       label: '虚拟商品',
//       value: '1',
//     },
//     {
//       label: '虚拟商品(需配送)',
//       value: '2',
//     },
//   ],
// ]
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
@createForm()
@inject('commodity')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starttime: '',
      endtime: '',
      selectValue: '',
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
    commodity.fetchRetailMeal(match.params.id)
    commodity.fetchRetailValues()
    if (!match.params.goodid) return
    commodity.fetchRetailDetail(match.params.id, match.params.goodid).then(() => {
      const { retailDetail } = commodity
      console.log(toJS(retailDetail))
      const picArr = retailDetail.pic.map(item => ({
        url: item,
      }))
      this.setState({
        pic: picArr,
      })
      console.log(toJS(moment(retailDetail.seckill_close_time * 1000).format('YYYY-MM-DD hh:mm')))
      console.log(toJS(moment(retailDetail.seckill_open_time * 1000).format('YYYY-MM-DD hh:mm')))
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
        selectValue: [retailDetail.status],
        classifyValue: [retailDetail.sort_id],
        pic: picArr,
        // starttime: moment(retailDetail.seckill_close_time * 1000).format('YYYY-MM-DD hh:mm'),
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
      stockNum,
      packingCharge,
      seckillPrice,
      seckillStock,
      storeValue,
      selectValue,
      classifyValue,
      starttime,
      endtime,
      pic,
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
          status: selectValue[0],
          sort_id: classifyValue[0],
          seckill_open_time: moment(starttime).format('YYYY-MM-DD hh:mm'),
          seckill_close_time: moment(endtime).format('YYYY-MM-DD hh:mm'),
          store_id: match.params.id,
          goods_id: match.params.goodid,
          pic: commodity.retailDetail.pic.map(item => item.url),
          // pic: commodity.retailDetail.pic.map(item => item.url),
          // pic,
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
          stock_num: stockNum,
          status: selectValue[0],
          sort_id: classifyValue[0],
          seckill_open_time: moment(starttime).format('YYYY-MM-DD hh:mm'),
          seckill_close_time: moment(endtime).format('YYYY-MM-DD hh:mm'),
          packing_charge: packingCharge,
          seckill_price: seckillPrice,
          seckill_stock: seckillStock,
          store_id: storeValue[0],
          // pic,
          pic: pic[0].url,
          // pic,
        })
        .then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
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

  submits = async () => {
    // const { history } = this.props
    const { editorContent } = this.state
    console.log(editorContent)
  }

  render() {
    const { match, commodity } = this.props
    const { retailValues, retailMeal } = commodity
    const { selectValue, storeValue, classifyValue } = this.state
    const {
      sortName,
      number,
      unit,
      price,
      oldPrice,
      sort,
      pic,
      des,
      stockNum,
      packingCharge,
      seckillPrice,
      seckillStock,
      starttime,
      endtime,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}零售商品`} goBack />
        <form>
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
            {/* <Picker
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
            </Picker> */}
            {match.params.goodid ? (
              ''
            ) : (
              <Picker
                data={[retailValues]}
                cascade={false}
                extra="请选择"
                value={storeValue}
                onChange={v => {
                  this.setState({
                    storeValue: v,
                  })
                  commodity.fetchRetailMeal(v[0])
                }}
              >
                <List.Item arrow="horizontal">选择添加到的店铺</List.Item>
              </Picker>
            )}

            <Picker
              data={[retailMeal]}
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
            <Item>
              限时段
              <TimeBox>
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
              </TimeBox>
            </Item>
            <div>
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
            </div>
            <Item>
              商品描述
              <Editor>
                <div
                  ref={this.editor}
                  className="editor"
                  value={des}
                  onChange={val => this.setState({
                    des: val,
                  })
                  }
                />
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
