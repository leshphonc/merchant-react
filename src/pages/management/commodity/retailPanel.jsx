import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import E from 'wangeditor'
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
// import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import axios from 'axios'
import Compressor from 'compressorjs'
import moment from 'moment'
import { toJS } from 'mobx'
import Utils from '@/utils'
import {
  TimeBox, Shoe, Editor, Center, Right,
} from './styled'

const { Item } = List
const seasons = [{ label: '正常', value: '1' }, { label: '停售', value: '0' }]
const seckill = [{ label: '固定时间段', value: '1' }, { label: '每天的时间段', value: '0' }]
const isFx = [{ label: '是', value: '1' }, { label: '否', value: '0' }]
const freightType = [{ label: '按最大值算', value: '0' }, { label: '单独计算', value: '1' }]
const fxType = [{ label: '按固定金额', value: '0' }, { label: '按售价百分比', value: '1' }]
const category = [
  { label: '实体商品', value: '0' },
  { label: '虚拟商品', value: '1' },
  { label: '虚拟商品(需配送)', value: '2' },
]
@createForm()
@inject('commodity')
@observer
class RetailAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: [],
      storeValue: '',
      editorContent: '',
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
    // editor.txt.html(sessionStorage.getItem('content') || '')

    const { form } = this.props
    console.log(this.props)
    commodity.fetchRetailMeal(match.params.id)
    commodity.fetchRetailValues()
    if (!match.params.goodid) return
    commodity.fetchRetailDetail(match.params.id, match.params.goodid).then(() => {
      const { retailDetail } = commodity
      const picArr = retailDetail.pic.map(item => ({
        url: item.url,
      }))
      this.setState({
        pic: picArr,
      })
      console.log(toJS(moment(retailDetail.seckill_open_time * 1000)).valueOf())
      form.setFieldsValue({
        ...retailDetail,
        status: [retailDetail.status],
        sort_id: [retailDetail.sort_id],
        stort_id: [retailDetail.stort_id],
        goods_type: [retailDetail.goods_type],
        seckill_type: [retailDetail.seckill_type],
        in_group: [retailDetail.in_group],
        is_fx: [retailDetail.is_fx],
        fx_type: [retailDetail.fx_type],
        freight_type: [retailDetail.freight_type],
        seckill_open_time: new Date(retailDetail.seckill_open_time * 1000),
        seckill_close_time: new Date(retailDetail.seckill_close_time * 1000),
        pic: picArr,
      })
    })
  }

  // submits = async () => {
  //   const { editorContent } = this.state
  //   console.log(editorContent)
  // }

  submit = () => {
    const {
      commodity, form, match, history,
    } = this.props
    const {  editorContent } = this.state
    console.log(editorContent)
    form.validateFields((error, value) => {
      // if (error) {
      //   Toast.info('请输入完整信息')
      //   return
      // }
      console.log(value)
      const obj = {
        name: value.name,
        sort: value.sort,
        number: value.number,
        unit: value.unit,
        price: value.price,
        old_price: value.old_price,
        cost_price: value.cost_price,
        stock_num: value.stock_num,
        status: value.status[0],
        sort_id: value.sort_id[0],
        goods_type: value.goods_type[0],
        packing_charge: value.packing_charge,
        seckill_price: value.seckill_price,
        seckill_stock: value.seckill_stock,
        seckill_type: value.seckill_type[0],
        is_fx: value.is_fx[0],
        fx_type: value.fx_type[0],
        fx_money: value.fx_money,
        freight_type: value.freight_type[0],
        freight_value: value.freight_value,
        spread_sale: value.spread_sale,
        spread_rate: value.spread_rate,
        dhb_get_num: value.dhb_get_num,
        score_get_num: value.score_get_num,
        seckill_open_time: moment(value.seckill_open_time).format('YYYY-MM-DD hh:mm'),
        seckill_close_time: moment(value.seckill_close_time).format('YYYY-MM-DD hh:mm'),
        pic: value.pic.map(item => item.url),
        goods_id: value.sort_id,
        store_id: value.store_id[0],
        des: editorContent,
      }
      console.log(value)
      console.log(obj)
      if (match.params.id) {
        commodity
          .modifyRetail({ ...obj, store_id: match.params.id, goods_id: match.params.goodid })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        commodity.addRetail(obj).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
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
                    console.log(picArr)
                    form.setFieldsValue({
                      pic: picArr,
                    })
                    this.setState({ pic: picArr })
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

  // submits = async () => {
  //   // const { history } = this.props
  //   const { editorContent } = this.state
  //   console.log(editorContent)
  // }

  render() {
    const { match, commodity, form } = this.props
    const { retailValues, retailMeal, retailDetail } = commodity
    const { getFieldProps } = form
    const { storeValue, pic } = this.state
    // const fx_type = form.getFieldValue('fx_type')
    //   ? form.getFieldValue('fx_type')[0]
    //   : ''
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}零售商品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请输入商品名称"
          >
            商品名称
          </InputItem>
          <InputItem
            {...getFieldProps('number', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品条形码"
          >
            商品条形码
          </InputItem>
          <InputItem
            {...getFieldProps('unit', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品单位，如个、斤、份"
          >
            商品单位
          </InputItem>
          <InputItem
            {...getFieldProps('price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品价格"
          >
            商品现价
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
            {...getFieldProps('old_price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品原价"
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
          <InputItem
            {...getFieldProps('cost_price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品进价"
          >
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
          </InputItem>
          <InputItem
            {...getFieldProps('sort', {
              rules: [{ required: true }],
            })}
            placeholder="请填写数值"
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
            {...getFieldProps('stock_num', {
              rules: [{ required: true }],
            })}
            placeholder="请填写库存数"
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
            {...getFieldProps('packing_charge', {
              rules: [{ required: true }],
            })}
            placeholder="请填写打包费用"
          >
            打包费
          </InputItem>
          <Picker
            {...getFieldProps('status', {
              rules: [{ required: true }],
            })}
            data={seasons}
            cols={1}
          >
            <List.Item arrow="horizontal">商品状态</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('goods_type', {
              rules: [{ required: true }],
            })}
            data={category}
            cols={1}
          >
            <List.Item arrow="horizontal">商品类型</List.Item>
          </Picker>
          {match.params.goodid ? (
            ''
          ) : (
            <Picker
              {...getFieldProps('store_id', {
                rules: [{ required: true }],
                getValueFromEvent: item => {
                  commodity.fetchRetailMeal(item[0])
                  return item
                },
              })}
              data={retailValues}
              cols={1}
              extra="请选择"
            >
              <List.Item arrow="horizontal">选择添加到的店铺</List.Item>
            </Picker>
          )}

          <Picker
            {...getFieldProps('sort_id', {
              rules: [{ required: true }],
            })}
            data={retailMeal}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择添加到的分类</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('freight_value', {
              rules: [{ required: true }],
            })}
            labelNumber={6}
            placeholder="请填写金额"
          >
            其他区域运费
          </InputItem>
          <Picker
            {...getFieldProps('freight_type', {
              rules: [{ required: true }],
            })}
            data={freightType}
            cols={1}
          >
            <List.Item arrow="horizontal">运费计算方式</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('is_fx', {
              rules: [{ required: true }],
            })}
            data={isFx}
            cols={1}
          >
            <List.Item arrow="horizontal">是否发布到分销市场</List.Item>
          </Picker>
          <Item>
            分润设置
            <Center>
              <Picker
                {...getFieldProps('fx_type', {
                  rules: [{ required: true }],
                })}
                data={fxType}
                cols={1}
              >
                <List.Item arrow="horizontal" />
              </Picker>
            </Center>
            <Right>
              <div className="fx">
                <InputItem
                  {...getFieldProps('fx_money', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  style={{ display: 'inline-block' }}
                />
                元
              </div>
            </Right>
            <Right>
              <div className="fx">
                <InputItem
                  {...getFieldProps('fx_money', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  style={{ display: 'inline-block' }}
                />
                %
              </div>
            </Right>
          </Item>
          <List.Item arrow="empty">
            店铺图片
            <ImagePicker
              {...getFieldProps('pic', {
                rules: [{ required: true }],
              })}
              files={pic}
              onChange={this.imgChange}
              selectable={pic.length < 4}
            />
          </List.Item>
          <Item>
            商品描述
            <Editor>
              <div ref={this.editor} className="editor" />
            </Editor>
          </Item>
          <InputItem
            {...getFieldProps('spread_sale', {
              rules: [{ required: true }],
            })}
            placeholder="请填写佣金比例"
          >
            销售佣金比例
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户分享商品链接后，其他用户点击链接购买该商品后，分享者将获得此佣金（百分比 0-100"
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
            {...getFieldProps('spread_rate', {
              rules: [{ required: true }],
            })}
            placeholder="请填写佣金比例"
          >
            推广佣金比例
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户分享网页后，点击网页的新用户将会被绑定为分享者的粉丝，该粉丝在商户产生消费时，分享者将获得此佣金 （百分比 0-100"
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
            {...getFieldProps('seckill_price', {
              rules: [{ required: true }],
            })}
            labelNumber={6}
            placeholder="请填写限时价"
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

          <InputItem
            {...getFieldProps('seckill_stock', {
              rules: [{ required: true }],
            })}
            labelNumber={6}
            placeholder="请填写库存"
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

          <Picker
            {...getFieldProps('seckill_type', {
              rules: [{ required: true }],
            })}
            data={seckill}
            cols={1}
          >
            <List.Item arrow="horizontal">现时价类型</List.Item>
          </Picker>
          <Item>
            限时段
            <TimeBox>
              <DatePicker
                {...getFieldProps('seckill_open_time', {
                  rules: [{ required: true }],
                })}
                mode="datetime"
              >
                <List.Item />
              </DatePicker>
              至
              <DatePicker
                {...getFieldProps('seckill_close_time', {
                  rules: [{ required: true }],
                })}
                mode="datetime"
              >
                <List.Item />
              </DatePicker>
            </TimeBox>
          </Item>
          {/* <Picker
            {...getFieldProps('in_group', {
              rules: [{ required: true }],
            })}
            data={isFx}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择会员分组</List.Item>
          </Picker> */}
          <Shoe>
            <Item>
              用户消费赠送比例
              <div className="box">
                每消费1元赠送
                <InputItem
                  {...getFieldProps('dhb_get_num', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请填写元宝数量"
                />
                元宝
              </div>
              <div className="box">
                每消费1元赠送
                <InputItem
                  {...getFieldProps('score_get_num', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请填写金币数量"
                />
                金币
              </div>
            </Item>
          </Shoe>
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
      </React.Fragment>
    )
  }
}
export default RetailAdd
