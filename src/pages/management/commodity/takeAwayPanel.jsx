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
  Modal,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import Utils from '@/utils'
import { createForm } from 'rc-form'
import Editor from '@/common/Editor'

const statusData = [
  { label: '正常', value: '1' },
  { label: '停售', value: '0' },
]
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
      pic: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    commodity.fetchStoreValues('2')
    if (Utils.getCacheData()) {
      const cacheData = Utils.getCacheData()
      form.setFieldsValue({
        ...cacheData,
      })
      if (cacheData.store_id) {
        commodity.fetchCategoryValues(cacheData.store_id[0]).then(() => {
          setTimeout(() => {
            form.setFieldsValue({
              sort_id: cacheData.sort_id,
            })
            this.editor.current.state.editor.txt.html(cacheData.des)
          }, 500)
        })
      }
      Utils.clearCacheData()
      if (match.params.goodid) {
        commodity.fetchTakeAwayDetail(match.params.id, match.params.goodid)
      }
      return false
    }
    if (!match.params.goodid) return
    commodity
      .fetchTakeAwayDetail(match.params.id, match.params.goodid)
      .then(() => {
        const { takeAwayDetail } = commodity
        const picArr = takeAwayDetail.pic.map(item => ({
          url: item.url,
        }))
        form.setFieldsValue({
          name: takeAwayDetail.name,
          number: takeAwayDetail.number,
          unit: takeAwayDetail.unit,
          old_price: takeAwayDetail.old_price,
          price: takeAwayDetail.price,
          packing_charge: takeAwayDetail.packing_charge,
          stock_num: takeAwayDetail.stock_num,
          sort: takeAwayDetail.sort,
          status: [takeAwayDetail.status],
          goods_type: [takeAwayDetail.goods_type],
          store_id: [takeAwayDetail.store_id],
          sort_id: [takeAwayDetail.sort_id],
          pic: picArr,
        })
        commodity.fetchCategoryValues(takeAwayDetail.store_id).then(() => {
          setTimeout(() => {
            form.setFieldsValue({
              sort_id: [takeAwayDetail.sort_id],
            })
            this.editor.current.state.editor.txt.html(takeAwayDetail.des)
          }, 500)
        })
      })
  }

  submit = () => {
    const { commodity, match, history, form } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return
      }
      let spec = null
      if (sessionStorage.getItem('spec')) {
        spec = JSON.parse(sessionStorage.getItem('spec'))
      }
      const obj = {
        name: value.name,
        number: value.number,
        unit: value.unit,
        old_price: value.old_price,
        price: value.price,
        packing_charge: value.packing_charge,
        stock_num: value.stock_num,
        sort: value.sort,
        status: value.status[0],
        goods_type: value.goods_type[0],
        store_id: value.store_id[0],
        sort_id: value.sort_id[0],
        pic: value.pic.map(item => item.url),
        des: this.editor.current.state.editor.txt.html(),
      }
      if (match.params.goodid) {
        commodity
          .modifyTakeAway({
            ...spec,
            ...obj,
            goods_id: match.params.goodid,
          })
          .then(res => {
            if (res) {
              Toast.success('编辑成功', 1, () => {
                sessionStorage.removeItem('spec')
                history.goBack()
              })
            }
          })
      } else {
        commodity
          .addTakeAway({
            ...obj,
            ...spec,
          })
          .then(res => {
            if (res) {
              Toast.success('新增成功', 1, () => {
                sessionStorage.removeItem('spec')
                history.goBack()
              })
            }
          })
      }
    })
  }

  goSpec = () => {
    const { form, history, commodity } = this.props
    const formData = form.getFieldsValue()
    formData.des = this.editor.current.state.editor.txt.html()
    Utils.cacheData(formData)
    const obj = {
      spec: commodity.takeAwayDetail.spec_list || [],
      attr: commodity.takeAwayDetail.properties_status_list || [],
      json: commodity.takeAwayDetail.json || [],
    }
    if (sessionStorage.getItem('spec')) {
      const spec = JSON.parse(sessionStorage.getItem('spec'))
      if (spec.cost_prices) {
        Modal.alert('已编辑过规格', '是否重新编辑？', [
          { text: '取消' },
          {
            text: '重新编辑',
            onPress: () => {
              Utils.cacheData(formData)
              sessionStorage.setItem('spec', JSON.stringify(obj))
              history.push('/specification')
            },
          },
        ])
      } else {
        Utils.cacheData(formData)
        sessionStorage.setItem('spec', JSON.stringify(obj))
        history.push('/specification')
      }
    } else {
      Utils.cacheData(formData)
      sessionStorage.setItem('spec', JSON.stringify(obj))
      history.push('/specification')
    }
  }

  render() {
    const { commodity, match, form } = this.props
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
          <InputItem
            {...getFieldProps('number')}
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
          <List.Item arrow="horizontal" onClick={() => this.goSpec()}>
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
