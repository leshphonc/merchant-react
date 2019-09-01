import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Picker,
  List,
  InputItem,
  Button,
  ImagePicker,
  Toast,
  WhiteSpace,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import Utils from '@/utils'
import { createForm } from 'rc-form'
import Editor from '@/common/Editor'

const statusData = [{ label: '正常', value: '1' }, { label: '停售', value: '0' }]
const category = [
  { label: '实体商品', value: '0' },
  { label: '虚拟商品', value: '1' },
  { label: '虚拟商品(需配送)', value: '2' },
]

@createForm()
@inject('commodity')
@observer
class TakeAwayPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // checked: false,
      // recom: false,
      storeValue: '',
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
    commodity.fetchStoreValues()
    commodity.fetchCategoryValues()
    if (!match.params.goodid) return
    commodity.fetchTakeAwayDetail(match.params.id, match.params.goodid).then(() => {
      const { takeAwayDetail } = commodity
      this.setState({
        sortName: takeAwayDetail.name,
        number: takeAwayDetail.number,
        des: takeAwayDetail.des,
        unit: takeAwayDetail.unit,
        price: takeAwayDetail.price,
        oldPrice: takeAwayDetail.old_price,
        sort: takeAwayDetail.sort,
        pic: takeAwayDetail.pic_arr,
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
        .modifyTakeAway({
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
        .addTakeAway({
          name: sortName,
          sort,
          number,
          des,
          unit,
          price,
          pic_arr: pic,
          old_price: oldPrice,
          store_id: commodity.takeAwayValues[0].value,
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
        Utils.compressionAndUploadImg(item.file)
          .then(res => {
            const picArr = arr
            picArr.splice(index, 1, { url: res })
            this.setState({
              pic: picArr,
            })
          })
          .catch(e => Toast.fail(e))
      }
    })
  }

  changePermission = bool => {
    const { basicInformation } = this.props
    basicInformation.modifyPermission(bool ? '1' : '0')
  }

  render() {
    const {
      commodity, match, form, history,
    } = this.props
    const { getFieldProps } = form
    const { storeValues, categoryValues } = commodity
    const { pic } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}外卖商品`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请输入商品名称"
          >
            商品名称
          </InputItem>
          <InputItem {...getFieldProps('number')} placeholder="请填写商品条形码">
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
            {...getFieldProps('price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品现价"
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
            {...getFieldProps('packing_charge', {
              rules: [{ required: true }],
            })}
            placeholder="请填写打包费"
          >
            打包费
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
          <Picker
            {...getFieldProps('status', {
              rules: [{ required: true }],
            })}
            data={statusData}
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
          {match.params.goodid ? null : (
            <Picker
              {...getFieldProps('store_id', {
                rules: [{ required: true }],
                getValueFromEvent: item => {
                  commodity.fetchCategoryValues(item[0])
                  return item
                },
              })}
              data={storeValues}
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
            data={categoryValues}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择添加到的分类</List.Item>
          </Picker>
          <List.Item
            arrow="horizontal"
            onClick={() => history.push('/management/commodity/commoditySpecification')}
          >
            规格设置
          </List.Item>
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
          <List.Item>
            商品描述
            <Editor ref={this.editor} />
          </List.Item>
        </List>
        <Button
          type="primary"
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            marginBottom: 20,
          }}
          onClick={this.submit}
        >
          确定
        </Button>
      </React.Fragment>
    )
  }
}
export default TakeAwayPanel
