import React from 'react'
// import NavBar from '@/common/NavBar'
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
  Switch,
  Flex,
  NavBar,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
// import E from 'wangeditor'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
// import { toJS } from 'mobx'
import Utils from '@/utils'
import { Editor } from './styled'

const { Item } = List
const seasons = [{ label: '正常', value: '1' }, { label: '停售', value: '0' }]
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
      editor: null,
      editorContent: '',
      // give: [],
      specification: [],
      // speciValue: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match } = this.props
    const editor = new E(this.editor.current)
    this.setState({
      editor,
    })
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
    // console.log(editor.txt.html())

    const { form } = this.props
    console.log(this.props)
    commodity.fetchRetailMeal(match.params.id)
    commodity.fetchGoodsSort(match.params.id)
    commodity.fetchExpressLists()
    console.log(commodity.expressLists)
    // commodity.fetchExpressDetail()
    if (!match.params.goodid) return
    commodity.fetchRetailDetail(match.params.id, match.params.goodid).then(() => {
      const { retailDetail } = commodity
      const picArr = retailDetail.pic.map(item => ({
        url: item.url,
      }))
      this.setState({
        pic: picArr,
      })
      form.setFieldsValue({
        ...retailDetail,
        status: [retailDetail.status],
        sort_id: [retailDetail.sort_id],
        stort_id: [retailDetail.stort_id],
        goods_type: [retailDetail.goods_type],
        in_group: [retailDetail.in_group],
        is_fx: retailDetail.is_fx === '1',
        fx_type: [retailDetail.fx_type],
        freight_type: [retailDetail.freight_type],
        freight_template: [retailDetail.freight_template],
        pic: picArr,
        cat_id: [retailDetail.cat_id],
      })
      editor.txt.html(retailDetail.des)
      // this.setState({
      //   specification: retailDetail.spec_list,
      // })
    })
  }

  changeGiveValue = (val, index) => {
    const { specification } = this.state
    const cache = Object.assign([], specification)
    // eslint-disable-next-line prefer-destructuring
    cache[index].spec_name = val[0]
    this.setState({
      specification: cache,
    })
  }

  changeGiveNum = (val, index) => {
    const { specification } = this.state
    const cache = Object.assign([], specification)
    // eslint-disable-next-line prefer-destructuring
    cache[index].spec_val = val
    this.setState({
      specification: cache,
    })
  }

  submit = () => {
    const {
      commodity, form, match, history,
    } = this.props
    const { editorContent, editor, specification } = this.state
    console.log(editorContent)
    form.validateFields((error, value) => {
      // if (error) {
      //   Toast.info('请输入完整信息')
      //   return
      // }
      console.log(value)
      const obj = {
        ...value,
        status: value.status[0],
        sort_id: value.sort_id[0],
        goods_type: value.goods_type[0],
        is_fx: value.is_fx ? '1' : '0',
        fx_type: value.fx_type[0],
        freight_type: value.freight_type[0],
        freight_template: value.freight_template[0],
        cat_id: value.cat_id[0],
        pic: value.pic.map(item => item.url),
        des: editor.txt.html(),
        spec_list: specification,
      }
      console.log(value)
      console.log(obj)
      if (match.params.id) {
        console.log(match.params.id)
        commodity
          .modifyRetail({ ...obj, store_id: match.params.id, goods_id: match.params.goodid })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        console.log(value.store_id[0])
        commodity.addRetail({ ...obj, store_id: value.store_id[0] }).then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
      }
    })
  }

  mapSpecification = () => {
    const { specification } = this.state
    // console.log(specification)
    return specification.map((item, index) => (
      <React.Fragment key={item.value}>
        <InputItem
          defaultValue={item.spec_name}
          placeholder="请输入规则名称"
          cols={1}
          onChange={val => this.changeGiveValue(val, index)}
        >
          规格名称
        </InputItem>
        <InputItem
          placeholder="请输入属性值"
          defaultValue={item.spec_val}
          onChange={val => this.changeGiveNum(val, index)}
        >
          规格属性值
        </InputItem>
        {/* <Item defaultValue={item.list} onChange={val => this.changeSpeciValue(val, index)}>
          {this.mapSpeciValue()}
        </Item> */}
      </React.Fragment>
    ))
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

  render() {
    const { match, commodity, form } = this.props
    const {
      retailValues, retailMeal, goodsSort, expressLists,
    } = commodity
    const { getFieldProps } = form
    const { pic, specification } = this.state
    const fxTypeValue = form.getFieldValue('fx_type') ? form.getFieldValue('fx_type')[0] : ''
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
              rules: [{ required: false }],
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
          <List.Item
            extra={
              <Flex justify="between">
                <Button
                  size="small"
                  type="ghost"
                  onClick={() => this.setState({
                    specification: specification.concat({ spec_name: '', spec_val: '' }),
                  })
                  }
                >
                  添加
                </Button>
                <Button
                  size="small"
                  type="warning"
                  onClick={() => this.setState({
                    specification: specification.slice(0, specification.length - 1),
                  })
                  }
                >
                  删除
                </Button>
              </Flex>
            }
          >
            添加规格
          </List.Item>
          {/* {this.mapSpecification()} */}
          {/* <List.Item
            extra={
              <Flex justify="between">
                <Button
                  size="small"
                  type="ghost"
                  onClick={() => this.setState({
                    speciValue: speciValue.concat({ goods: '', goods_num: '' }),
                  })
                  }
                >
                  添加
                </Button>
                <Button
                  size="small"
                  type="warning"
                  onClick={() => this.setState({
                    speciValue: speciValue.slice(0, speciValue.length - 1),
                  })
                  }
                >
                  删除
                </Button>
              </Flex>
            }
          >
            规格属性值
          </List.Item> */}
          {this.mapSpecification()}
          {/* {this.mapSpeciValue()} */}

          <Picker
            {...getFieldProps('freight_template', {
              rules: [{ required: false }],
            })}
            data={expressLists}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">运费模板</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('freight_template', {
              rules: [{ required: false }],
            })}
            onClick={this.handleClick}
            extra="新建"
          >
            <List.Item>运费模板</List.Item>
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
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_fx', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            是否发布到分销市场
          </List.Item>
          <Picker
            {...getFieldProps('fx_type', {
              rules: [{ required: true }],
            })}
            data={fxType}
            cols={1}
          >
            <List.Item arrow="horizontal">分润设置</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('fx_money', {
              rules: [{ required: true }],
            })}
            extra={fxTypeValue === '0' ? '元' : '%'}
            labelNumber={6}
            placeholder="请填写分润金额"
          >
            分润金额
          </InputItem>
          <Picker
            {...getFieldProps('cat_id', {
              rules: [{ required: true }],
            })}
            data={goodsSort}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">商城商品分类</List.Item>
          </Picker>
          <List.Item arrow="empty">
            店铺图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
              })}
              selectable={pic.length < 4}
            />
          </List.Item>
          <Item>
            商品描述
            <Editor>
              <div ref={this.editor} className="editor" />
            </Editor>
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
