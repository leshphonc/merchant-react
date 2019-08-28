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
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { observer, inject } from 'mobx-react'
import E from 'wangeditor'
// import CropperImg from '@/common/CropperImg'
import { createForm } from 'rc-form'
import {
 Team, Editor,
} from './styled'
import { toJS } from 'mobx'
// import { CustomizeList, ListTitle, ListContent } from '@/styled'

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
const share = [
  [
    {
      label: '固定',
      value: '0',
    },
    {
      label: '百分比(%)',
      value: '1',
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
/*const member = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]*/
/*const member1 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]*/
/*const member2 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member3 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]
const member4 = [
  [
    {
      label: '无优惠',
      value: '2013',
    },
    {
      label: '百分比(%)',
      value: '2014',
    },
    {
      label: '立减',
      value: '2015',
    },
  ],
]*/
/*const setMeal = [
  [
    {
      label: '不加入任何套餐',
      value: '2013',
    },
    {
      label: '火锅套餐',
      value: '2014',
    },
  ],
]*/
const times = [
  [
    {
      label: '周末、法定节假日通用',
      value: '2013',
    },
    {
      label: '周末不能使用',
      value: '2014',
    },
    {
      label: '法定节假日不能使用',
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

@createForm()
@inject('commodity')
@observer
class GroupPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      distribution: false,
      // startdate: '',
      // enddate: '',
      selectValue: '0',
      timees: '',
      statusValue: false,
      typeValue: '0',
      memberValue: '',
      member1Value: '',
      member2Value: '',
      member3Value: '',
      member4Value: '',
      setMealValue: '',
      files: [],
      editorContent: '',
      stockreduce:[],
      groupCatFir: [],
      groupCatSec: [],
      cat_fid:'',
      cat_id:'',
      des:''
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    // const { history } = this.props
    // this.setState({
    //   editorContent: history.location.state.value,
    // })
    const { commodity, match } = this.props
    if(match.params.id) {
        commodity.fetchGroupDetail(match.params.id).then(()=>{
            const { groupDetail } = commodity
            this.setState({
                files:toJS(groupDetail).pic_arr,
                cat_fid:toJS(groupDetail).cat_fid,
                cat_id:toJS(groupDetail).cat_id,
            })
            commodity.fetchGroupCat(this.state.cat_fid).then(()=>{
                const { groupCatSec } = commodity
                this.setState({
                    groupCatSec:toJS(groupCatSec)
                })
            })
        })

        commodity.fetchGroupCat(0).then(()=>{
            const { groupCatFir } = commodity
            this.setState({
                groupCatFir:toJS(groupCatFir)
            })
        })
        commodity.fetchShopList().then(() => {
          const { shopList } = commodity
            console.log(toJS(shopList))
        })
    }else{

    }


    const editor = new E(this.editor.current)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
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
  }

  submit = async () => {
    // const { history } = this.props
    const { editorContent } = this.state
    console.log(editorContent)
  }

  onChange = (files, index) => {
    console.log(files, index)
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
    const { files } = this.state
    const { commodity } =this.props
    const { groupCatFir, groupCatSec } = commodity
    console.log(groupCatFir)
    const {
      // startdate,
      // enddate,
      checked,
      selectValue,
      cat_fid,
      cat_id,
      timees,
      statusValue,
      typeValue,
      des
    } = this.state
    const { shopList } = commodity
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
                  rules: [{ required: true }],
                })}
                checked={checked}
                onChange={() => {
                  this.setState({
                    checked: !checked,
                  })
                }}
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
              value={[typeValue]}
              onChange={v => {
                  console.log(v)
                  this.setState({
                      typeValue: v[0],
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
          <List.Item
              extra={
                <Switch
                    {...getFieldProps('status', {
                        rules: [{ required: true }],
                    })}
                    checked={statusValue}
                    onChange={() => {
                        this.setState({
                            statusValue: !statusValue,
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
          <DatePicker
            {...getFieldProps('deadline_time', {
              rules: [{ required: true }],
            })}
          >
            <Item arrow="horizontal">团购券有效期</Item>
          </DatePicker>
          <Picker
            {...getFieldProps('is_general', {
              rules: [{ required: true }],
            })}
            data={times}
            value={timees}
            cascade={false}
            onChange={v => {
              this.setState({
                timees: v,
              })
            }}
          >
            <Item arrow="horizontal">使用时间限制</Item>
          </Picker>
          <Picker
            {...getFieldProps('fx_type', {
              rules: [{ required: true }],
            })}
            data={share}
            cascade={false}
            extra="请选择"
            value={[selectValue]}
            onChange={v => {
              this.setState({
                selectValue: v[0],
              })
            }}
          >
            <List.Item arrow="horizontal">分润设置</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('fx_money', {
              rules: [{ required: true }],
            })}
            placeholder="请填写分润金额"
            extra={selectValue === '0' ? '元' : '%'}
          >
            分润金额
          </InputItem>

          <List.Item
            extra={
              <Switch
                {...getFieldProps('status', {
                  rules: [{ required: true }],
                })}
                checked={statusValue}
                onChange={() => {
                  this.setState({
                    statusValue: !statusValue,
                  })
                }}
              />
            }
          >
            团购状态
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
          <Picker
              {...getFieldProps('cat_fid', {
                  rules: [{ required: true }],
              })}
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
              {...getFieldProps('cat_id', {
                  rules: [{ required: true }],
              })}
              value={[cat_id]}
              data={groupCatSec}
              cols={1}
              extra="请选择"
              onOk={v => {
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
          {shopList.map(i => (
            <CheckboxItem key={i.value}>
              {i.label}
            </CheckboxItem>
          ))}
          <Item>
            本单详情
            <Editor>
              <div
                  ref={this.editor}
                  className="editor"
                  value={des}
              />
            </Editor>
          </Item>
          <div>
            <Item>
              商品图片
              <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 5}
                accept="image/gif,image/jpeg,image/jpg,image/png"
              />
            </Item>
          </div>
          <Item>
            <div style={{ whiteSpace: 'initial', color: '#ea6161' }}>
              说明：一个团购商品只能参与一个套餐！
            </div>
          </Item>
          <Team>
            <InputItem defaultValue="0" placeholder="请填写商品数量">
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
            <InputItem defaultValue="0" placeholder="请填写购买数量">
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
            <InputItem defaultValue="1" placeholder="请填写购买数量">
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
          <Picker
              data={stockreduce}
              cascade={false}
              extra="请选择"
              value={[selectValue]}
              onChange={v => {
                  this.setState({
                      selectValue: v[0],
                  })
              }}
          >
            <List.Item arrow="horizontal">库存减少方式</List.Item>
          </Picker>
          <Team>
            <InputItem {...getFieldProps('pin_num', {
                rules: [{ required: true }],
            })} placeholder="必须填写 (0表示不设置拼团)" style={{ width: '100%' }}>
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
                defaultValue="0" placeholder="请填写人数">
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
                defaultValue="1" placeholder="请填写人数">
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
            <Button type="primary" style={{ color: '#333', fontWeight: 'bold' }}>
              添加
            </Button>
          </WingBlank>
        </List>
      </React.Fragment>
    )
  }
}
// export default GroupAdd
export default GroupPanel
