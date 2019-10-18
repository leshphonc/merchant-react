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
  Flex,
  WhiteSpace,
  Menu,
  Modal,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import Utils from '@/utils'
import Editor from '@/common/Editor'
import { MenuMask, PrimaryTag } from '@/styled'

const statusData = [{ label: '正常', value: '1' }, { label: '停售', value: '0' }]
const freightType = [{ label: '按最大值算', value: '0' }, { label: '单独计算', value: '1' }]
const category = [
  { label: '实体商品', value: '0' },
  { label: '虚拟商品', value: '1' },
  { label: '虚拟商品(需配送)', value: '2' },
]

@createForm()
@inject('commodity')
@observer
class ECommerceAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      specification: [],
      open: false,
      goods: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    commodity.fetchStoreValues('1', '2')
    // 获取
    commodity.fetchGoodsCategory()
    commodity.fetchExpressLists()
    commodity.fetchShopCategory()
    if (Utils.getCacheData()) {
      const cacheData = Utils.getCacheData()
      form.setFieldsValue({
        ...cacheData,
      })
      this.setState({
        goods: cacheData.goods,
      })
      // if (cacheData.store_id) {
      //   commodity.fetchCategoryValues(cacheData.store_id[0]).then(() => {
      //     form.setFieldsValue({
      //       sort_id: cacheData.sort_id,
      //     })
      //   })
      // }
      setTimeout(() => {
        this.editor.current.state.editor.txt.html(cacheData.des)
      }, 500)

      Utils.clearCacheData()
      if (match.params.goodid) {
        commodity.fetchECommerceDetail(match.params.id, match.params.goodid)
      }
      return false
    }

    if (!match.params.goodid) return
    commodity.fetchECommerceDetail(match.params.id, match.params.goodid).then(() => {
      const { eCommerceDetail } = commodity
      const picArr = eCommerceDetail.pic.map(item => ({
        url: item.url,
      }))
      // commodity.fetchCategoryValues(eCommerceDetail.store_id).then(() => {
      //   form.setFieldsValue({
      //     sort_id: [eCommerceDetail.sort_id],
      //   })
      // })
      setTimeout(() => {
        this.editor.current.state.editor.txt.html(eCommerceDetail.des)
      }, 500)

      this.setState(
        {
          goods: [eCommerceDetail.cat_fid, eCommerceDetail.cat_id],
        },
        () => {
          this.getMenuList()
        },
      )
      form.setFieldsValue({
        name: eCommerceDetail.name,
        unit: eCommerceDetail.unit,
        old_price: eCommerceDetail.old_price,
        price: eCommerceDetail.price,
        stock_num: eCommerceDetail.stock_num,
        sort: eCommerceDetail.sort,
        status: [eCommerceDetail.status],
        store_id: [eCommerceDetail.store_id],
        sort_id: [eCommerceDetail.sort_id],
        goods_type: [eCommerceDetail.goods_type],
        freight_type: [eCommerceDetail.freight_type],
        freight_value: eCommerceDetail.freight_value,
        freight_template: [eCommerceDetail.freight_template],
        pic: picArr,
      })
      // this.setState({
      //   specification: eCommerceDetail.spec_list,
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

  getMenuList = () => {
    const { commodity } = this.props
    const { goodsCategory } = commodity
    const { goods } = this.state
    const cateGoryLabel = []
    if (goodsCategory.length) {
      goodsCategory.forEach(item => {
        if (item.value === goods[0]) {
          cateGoryLabel.push(item.label)
          if (item.children.length) {
            item.children.forEach(child => {
              if (child.value === goods[1]) {
                cateGoryLabel.push(child.label)
              }
            })
          }
        }
      })
    }
    return (
      <Flex justify="end">
        {cateGoryLabel.map((item, index) => (
          <PrimaryTag
            key={index}
            style={{ marginLeft: 2 }}
            onClick={() => {
              document.body.style.position = 'fixed'
              this.setState({ open: true })
            }}
          >
            {item}
          </PrimaryTag>
        ))}
      </Flex>
    )
  }

  submit = () => {
    const { commodity, form, match, history } = this.props
    const { specification, goods } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      let spec = null
      if (sessionStorage.getItem('spec')) {
        spec = JSON.parse(sessionStorage.getItem('spec'))
      }
      const obj = {
        ...value,
        status: value.status[0],
        sort_id: value.sort_id[0],
        goods_type: value.goods_type[0],
        is_fx: value.is_fx ? '1' : '0',
        freight_type: value.freight_type[0],
        freight_template: value.freight_template[0],
        cat_fid: goods[0],
        cat_id: goods[1],
        pic: value.pic.map(item => item.url),
        des: this.editor.current.state.editor.txt.html(),
        spec_list: specification,
        store_id: value.store_id ? value.store_id[0] : '',
      }
      if (match.params.id) {
        commodity
          .modifyECommerce({
            ...obj,
            ...spec,
            store_id: match.params.id,
            goods_id: match.params.goodid,
          })
          .then(res => {
            if (res) {
              Toast.success('编辑成功', 1, () => {
                sessionStorage.removeItem('spec')
                commodity.resetAndFetchECommerceList().then(() => {
                  history.goBack()
                })
              })
            }
          })
      } else {
        commodity.addECommerce({ ...obj, ...spec, store_id: value.store_id[0] }).then(res => {
          if (res) {
            Toast.success('新增成功', 1, () => {
              sessionStorage.removeItem('spec')
              commodity.resetAndFetchECommerceList().then(() => {
                history.goBack()
              })
            })
          }
        })
      }
    })
  }

  mapSpecification = () => {
    const { specification } = this.state
    // console.log(specification)
    return specification.map((item, index) => (
      <React.Fragment key={index}>
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

  onChange = arr => {
    this.setState({
      goods: arr,
    })
  }

  goSpec = () => {
    const { form, history, commodity, match } = this.props
    const { goods } = this.state
    const formData = form.getFieldsValue()
    formData.des = this.editor.current.state.editor.txt.html()
    formData.goods = goods
    const obj = {
      spec: match.params.id ? commodity.eCommerceDetail.spec_list || [] : [],
      attr: match.params.id ? commodity.eCommerceDetail.properties_status_list || [] : [],
      json: match.params.id ? commodity.eCommerceDetail.json || [] : [],
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

  goTemplate = () => {
    const { form, history } = this.props
    const { goods } = this.state
    const formData = form.getFieldsValue()
    formData.des = this.editor.current.state.editor.txt.html()
    formData.goods = goods
    Utils.cacheData(formData)
    history.push('/management/commodity/eCommerceDeliveryTemplate')
  }

  render() {
    const { match, commodity, form, history } = this.props
    const { storeValues, shopCategory, goodsCategory, expressLists } = commodity
    const { getFieldProps } = form
    const { open, goods } = this.state
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    const menuEl = (
      <Menu
        className="menu-position"
        data={goodsCategory}
        value={goods}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.6}
      />
    )
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}电商商品`} goBack />
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
              initialValue: 0,
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
              // getValueFromEvent: item => {
              //   commodity.fetchCategoryValues(item[0])
              //   return item
              // },
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
            data={shopCategory}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择添加到的分类</List.Item>
          </Picker>
          <List.Item arrow="horizontal" onClick={() => this.goSpec()}>
            规格设置
          </List.Item>
          {this.mapSpecification()}
          <Picker
            {...getFieldProps('freight_template', {
              rules: [{ required: true }],
            })}
            data={expressLists}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">运费模板</List.Item>
          </Picker>
          <List.Item arrow="horizontal" extra="编辑" onClick={() => this.goTemplate()}>
            运费模板
          </List.Item>
          <InputItem
            {...getFieldProps('freight_value', {
              rules: [{ required: true }],
            })}
            labelNumber={6}
            extra="元"
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
            arrow="horizontal"
            extra={this.getMenuList()}
            onClick={() => this.setState({ open: true })}
            className="primaryTag-show"
          >
            商城商品分类
          </List.Item>
          <List.Item arrow="empty">
            商品图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                rules: [{ required: true }],
              })}
              selectable={pic.length < 5}
              onAddImageClick={e => {
                const formData = form.getFieldsValue()
                formData.des = this.editor.current.state.editor.txt.html()
                formData.goods = goods
                Utils.cacheData(formData)
                history.push('/uploadMultipleImg/裁剪/pic/1')
                e.preventDefault()
              }}
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
        {open ? menuEl : null}
        {open ? <MenuMask onClick={() => this.setState({ open: false })} /> : null}
      </React.Fragment>
    )
  }
}
export default ECommerceAdd
