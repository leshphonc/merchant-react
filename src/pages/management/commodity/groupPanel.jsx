import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Picker,
  List,
  InputItem,
  WingBlank,
  Button,
  TextareaItem,
  Switch,
  Checkbox,
  ImagePicker,
  DatePicker,
  Toast
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { observer, inject } from 'mobx-react'
import E from 'wangeditor'
import { createForm } from 'rc-form'
import {
 Team, Editor,
} from './styled'
import { toJS } from 'mobx'
import Utils from '@/utils'
import moment from 'moment'
const { Item } = List
const { CheckboxItem } = Checkbox
const type = [
  [
    {
      label: '团购券',
      value: '0',
    },
    {
      label: '代金券',
      value: '1',
    },
    {
      label: '实物',
      value: '2',
    },
  ],
]
const stockreduce = [
    [
        {
          label:'支付成功后减库存',
          value:'0'
        },
        {
            label:'下单成功后减库存',
            value:'1'
        }
    ]
]
const times = [
  [
    {
      label: '周末、法定节假日通用',
      value: '0',
    },
    {
      label: '周末不能使用',
      value: '1',
    },
    {
      label: '法定节假日不能使用',
      value: '2',
    },
    {
      label: '周末、法定节假日不能通用',
      value: '3'
    }
  ],
]
@createForm()
@inject('commodity')
@observer
class GroupPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      distribution: false,
      files: [],
      editorContent: '',
      stockreduce:[],
      groupCatFir: [],
      groupCatSec: [],
      cat_fid:'',
      cat_id:'',
      des:'',
      shopList:[],
      intro:'',
      old_price:'',
      price:'',
      begin_time:'',
      end_time:'',
      tuan_type:'0',
      pick_in_store:false,
      deadline_time:'',
      is_general: '0',
      store: [],
      content: '',
      editor: null,
      stock_reduce_method: '0',
      start_discount:'',
      is_edit:''
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match , form} = this.props
    if(match.params.id) {
        commodity.fetchGroupDetail(match.params.id).then(()=>{
            const { groupDetail } = commodity
            this.setState({
                files:groupDetail.pic_arr,
                cat_fid:groupDetail.cat_fid,
                cat_id:groupDetail.cat_id,
                no_refund:(groupDetail.no_refund === "0") ? true : false,
                price:groupDetail.price,
                old_price:groupDetail.old_price,
                begin_time:groupDetail.begin_time,
                end_time:groupDetail.end_time,
                tuan_type:groupDetail.tuan_type,
                pick_in_store:groupDetail.pick_in_store === "1",
                deadline_time:groupDetail.deadline_time,
                is_general:groupDetail.is_general,
                store: groupDetail.store_arr,
                editor: groupDetail.content,
                stock_reduce_method: groupDetail.stock_reduce_method,
                is_edit:true
            })
            form.setFieldsValue({
                name:groupDetail.name,
                intro:groupDetail.intro,
                old_price:groupDetail.old_price,
                price:groupDetail.price,
                begin_time:groupDetail.begin_time?new Date(groupDetail.begin_time*1000):'',
                end_time:groupDetail.end_time?new Date(groupDetail.end_time*1000):'',
                count_num:groupDetail.count_num,
                pin_effective_time:groupDetail.pin_effective_time,
                group_refund_fee:groupDetail.group_refund_fee,
                start_discount:groupDetail.start_discount,
                pin_num:groupDetail.pin_num,
                once_min:groupDetail.once_min,
                once_max:groupDetail.once_max,
                deadline_time:groupDetail.deadline_time?new Date(groupDetail.deadline_time*1000):'',
                pic:groupDetail.pic_arr,
                no_refund: (groupDetail.no_refund === "0") ? true : false,
                status:groupDetail.status === '0' ? false : true
            })
            setTimeout(() => {
                console.log((groupDetail.no_refund === "0") ? true : false)
                form.setFieldsValue({
                    no_refund: (groupDetail.no_refund === "0") ? true : false
                })
            },100)
            const editor = new E(this.editor.current)
            // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
            editor.customConfig.onchange = html => {
                this.setState({
                    editor: html,
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
            editor.txt.html(toJS(groupDetail).content)
            commodity.fetchGroupCat(this.state.cat_fid).then(()=>{
                const { groupCatSec } = commodity
                this.setState({
                    groupCatSec:groupCatSec
                })
                setTimeout(() => {
                        this.setState({
                            cat_id:groupDetail.cat_id,
                        })
                })
            })
        })
        commodity.fetchGroupCat(0).then(()=>{
            const { groupCatFir } = commodity
            this.setState({
                groupCatFir:groupCatFir
            })
        })
        commodity.fetchShopList(1).then(() => {
          const { shopList } = commodity
          this.setState({
              shopList:shopList
          })
        })

    }else{
        commodity.fetchGroupCat(0).then(()=>{
            const { groupCatFir } = commodity
            this.setState({
                groupCatFir:toJS(groupCatFir)
            })
        })
        commodity.fetchShopList(1).then(() => {
            const { shopList } = commodity
            this.setState({
                shopList:shopList
            })
        })
        form.setFieldsValue({
            name:'',
            intro:'',
            old_price:'',
            price:'',
            begin_time:'',
            end_time:'',
            count_num:'',
            pin_effective_time:'',
            group_refund_fee:'',
            start_discount:'',
            pin_num:'',
            once_min:'',
            once_max:'',
            deadline_time:'',
            no_refund: false,
            status: false
        })
        const editor = new E(this.editor.current)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editor: html,
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
        editor.txt.html()
    }


  }

  submit = async () => {
    // const { editorContent } = this.state
    const { form , match , commodity , history} = this.props

    form.validateFields((error,value) => {
        if (error) {
            Toast.info('请输入完整信息')
            return
        }
        if(!this.state.cat_id || !this.state.cat_fid || this.state.store.length <= 0){
            Toast.info('请输入完整信息')
            return
        }
        const obj = {
            name : value.name,
            s_name:value.name,
            begin_time:moment(value.begin_time).format('YYYY-MM-DD HH:mm:ss'),
            count_num:value.count_num,
            deadline_time:moment(value.deadline_time).format('YYYY-MM-DD HH:mm:ss'),
            end_time:moment(value.end_time).format('YYYY-MM-DD HH:mm:ss'),
            group_refund_fee:value.group_refund_fee,
            intro:value.intro,
            no_refund:value.no_refund?0:1,
            old_price:value.old_price,
            once_max:value.once_max,
            once_min:value.once_min,
            pic:value.pic.map(item => item.url),
            pick_in_store:value.pick_in_store?1:0,
            pin_effective_time:value.pin_effective_time,
            pin_num: value.pin_num,
            price: value.price,
            start_discount: value.start_discount,
            content:this.state.editor,
            store:this.state.store,
            cat_fid:this.state.cat_fid,
            cat_id:this.state.cat_id,
            is_general:this.state.is_general,
            stock_reduce_method:this.state.stock_reduce_method,
            success_num:1,
            tuan_type:this.state.tuan_type,
            status:value.status ? '1' : '0'
        }
        if(match.params.id){
            commodity.fetchEditGroup(obj, match.params.id).then(res => {
                if (res) Toast.success('修改成功', 1, () => history.goBack())
            })
        }else{
            console.log(121)
            commodity.fetchAddGroup(obj).then(res => {
                if (res) Toast.success('新增成功', 1, () => history.goBack())
            })
        }
    })
  }

  onChange = (files, index) => {
    this.setState({
      files,
    })
  }

  changePermission = bool => {
    const { basicInformation } = this.props
    basicInformation.modifyPermission(bool ? '1' : '0')
  }

  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    const { commodity } =this.props
    const { groupCatFir, groupCatSec } = commodity
    const { is_edit }  =this.state
    const {
      checked,
      cat_fid,
      cat_id,
      tuan_type,
      pick_in_store,
      is_general,
      store,
      stock_reduce_method,
    } = this.state
    const { shopList } = commodity
    const pic_arr = form.getFieldValue('pic') ? form.getFieldValue('pic') : (this.state.files ? this.state.files : [])


    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}团购商品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请填写商品名称"
          >
            商品名称
          </InputItem>
          <TextareaItem
            {...getFieldProps('intro', {
              rules: [{ required: true }],
            })}
            title="商品简介"
            placeholder="请填写商品简介"
            rows={4}
            count={80}
          />
          <List.Item
            extra={
              <Switch
                {...getFieldProps('no_refund', {
                    initialValue: false,
                    valuePropName: 'checked',
                    rules: [{ required: true }],
                })}
              />
            }
          >
            支持退款
          </List.Item>
          <InputItem
            {...getFieldProps('old_price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写原价，最多一位小数"
          >
            原价
          </InputItem>
          <InputItem
            {...getFieldProps('price', {
              rules: [{ required: true }],
            })}
             placeholder="请填写团购价，最多一位小数"
          >
            团购价
          </InputItem>
          <DatePicker
            {...getFieldProps('begin_time', {
              rules: [{ required: true }],
            })}
            onOk={e => {
                console.log(e)
            }}
          >
            <Item arrow="horizontal">
              团购开始时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了团购开始时间，商品才会显示"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
            })}
          >
            <Item arrow="horizontal">
              团购结束时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了团购结束时间，商品会隐藏"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </Item>
          </DatePicker>
          <Picker
              data={type}
              cascade={false}
              extra="请选择"
              value={[tuan_type]}
              disabled={is_edit?true:false}
              onChange={v => {
                  this.setState({
                      tuan_type: v[0],
                  })
              }}
          >
            <List.Item arrow="horizontal">
              团购类型
              <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="如果是团购券或代金券,则会生成券密码;如果是实物,则需要填写快递单号"
                  onClick={e => {
                      e.stopPropagation()
                  }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>

          </Picker>
            {this.state.tuan_type !== '0' &&(
                <List.Item
                    extra={
                        <Switch
                            {...getFieldProps('pick_in_store', {
                                initialValue: false,
                                valuePropName: 'checked',
                                rules: [{ required: true }],
                            })}
                            checked={pick_in_store}
                            onChange={e => {
                                this.setState({
                                    pick_in_store: (e?1:0),
                                })
                            }}
                        />
                    }
                >
                    是否自提
                    <Tooltip
                        trigger="click"
                        placement="topLeft"
                        overlay="为了方便用户能查到以前的订单，团购无法删除！"
                        onClick={e => {
                            e.stopPropagation()
                        }}
                    >
                        <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                            &#xe628;
                        </i>
                    </Tooltip>
                </List.Item>
            )}

          <DatePicker
            {...getFieldProps('deadline_time', {
              rules: [{ required: true }],
            })}
            onOk={e => {
                console.log(e)
            }}
          >
            <Item arrow="horizontal">团购券有效期</Item>
          </DatePicker>
          <Picker
            data={times}
            value={[is_general]}
            cascade={false}
            onChange={v => {
              this.setState({
                  is_general: v[0],
              })
            }}
          >
            <Item arrow="horizontal">使用时间限制</Item>
          </Picker>
          <Picker
              data={groupCatFir}
              value={[cat_fid]}
              cols={1}
              extra="请选择"
              onOk={v => {
                  this.setState({
                      cat_fid:v[0],
                  })
                  commodity.fetchGroupCat(v[0]).then(()=>{
                      const { groupCatSec } = commodity
                      this.setState({
                          groupCatSec:toJS(groupCatSec)
                      })
                  })
              }}
          >
            <List.Item arrow="horizontal">
              选择分类
            </List.Item>

          </Picker>
          <Picker
              data={groupCatSec}
              value={[cat_id]}
              cols={1}
              extra="请选择"
              onOk={v => {
                  console.log(v[0])
                  this.setState({
                      cat_id:v[0],
                  })
              }}
          >
            <List.Item arrow="horizontal">
              选择子分类
            </List.Item>

          </Picker>
          <Item>选择店铺</Item>
          {shopList.map(i => {
                return (
                    <CheckboxItem key={i.value}
                                  checked={store.indexOf(i.value) === -1?false:true}
                                  onChange={e => {
                                      const new_store = toJS(store)
                                    try{
                                        if(store.indexOf(i.value) === -1){
                                            new_store.push(i.value)
                                            this.setState({
                                                store:new_store
                                            })

                                        }else{
                                            new_store.splice(new_store.indexOf(i.value),1)
                                            this.setState({
                                                store: new_store
                                            })
                                        }
                                    }catch (e){
                                        console.log(e)
                                    }


                                  }}>
                        {i.label}
                    </CheckboxItem>
                )

          })}
          <Item>
            本单详情
            <Editor>
              <div
                  ref={this.editor}
                  className="editor"
              />
            </Editor>
          </Item>
          <div>
            <Item>
              商品图片
              <ImagePicker
                {...getFieldProps('pic', {
                  valuePropName: 'files',
                getValueFromEvent: arr => Utils.compressionAndUploadImgArr(arr),
                rules: [{ required: true }],
                })}
                selectable={pic_arr.length < 4}
              />
            </Item>
          </div>
          <Team>
            <InputItem
                {...getFieldProps('count_num', {
                    rules: [{ required: true }],
                })}
                placeholder="请填写商品数量">
              商品总数量
              <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="0表示不限制,否则产品会出现“已卖光”状态"
                  onClick={e => {
                      e.stopPropagation()
                  }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          </Team>
          <Team>
            <InputItem
                {...getFieldProps('once_max', {
                    rules: [{ required: true }],
                })}
                placeholder="请填写购买数量">
              ID最多购买数量
              <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="一个ID最多购买数量,0表示不限制"
                  onClick={e => {
                      e.stopPropagation()
                  }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          </Team>
          <Team>
            <InputItem
                {...getFieldProps('once_min', {
                    rules: [{ required: true }],
                })}
                 placeholder="请填写购买数量">
              一次最少购买数量
              <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="购买数量低于此设置不允许参团"
                  onClick={e => {
                      e.stopPropagation()
                  }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          </Team>
            <List.Item
                extra={
                    <Switch
                        {...getFieldProps('status', {
                            initialValue: false,
                            valuePropName: 'checked',
                            rules: [{ required: true }],
                        })}
                    />
                }
            >
                团购状态
            </List.Item>
          <Picker
              data={stockreduce}
              cascade={false}
              extra="请选择"
              value={[stock_reduce_method]}
              onChange={v => {
                  this.setState({
                      stock_reduce_method: v[0],
                  })
              }}
          >
            <List.Item arrow="horizontal">库存减少方式</List.Item>
          </Picker>
          <Team>
            <InputItem {...getFieldProps('pin_num', {
                rules: [{ required: true }],
            })}
                       placeholder="必须填写 (0表示不设置拼团)" style={{ width: '100%' }}>
              拼团人数设置
            </InputItem>
          </Team>
          <Team>
            <InputItem
                {...getFieldProps('start_discount', {
                    rules: [{ required: true }],
                })}
                placeholder="团长优惠 0 为免费，100 为原价" style={{ width: '100%' }}>
             团长优惠比例
            </InputItem>
          </Team>
          <Team>
            <InputItem
                {...getFieldProps('group_refund_fee', {
                    rules: [{ required: true }],
                })}
                 placeholder="请填写百分比（0-100）">
              退款手续费比例：
              <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="手续费将按单价百分比（0-100）收取,设置为100（成团前所有参团人也不可退）则不允许退款"
                  onClick={e => {
                      e.stopPropagation()
                  }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          </Team>
          <Team>
            <InputItem
                {...getFieldProps('pin_effective_time', {
                    rules: [{ required: true }],
                })}
                placeholder="必须填写数值">
              成团有效期
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="有效期内未成团团长不能取消订单，单位/时"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          </Team>

          <WingBlank style={{ padding: '10px 0' }}>
            <Button type="primary" style={{ color: '#333', fontWeight: 'bold' }} onClick={this.submit}>
              确定
            </Button>
          </WingBlank>
        </List>
      </React.Fragment>
    )
  }
}
// export default GroupAdd
export default GroupPanel
