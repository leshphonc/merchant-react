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
  DatePicker,
  ImagePicker,
  WhiteSpace,
  Toast,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import Editor from '@/common/Editor'
import moment from 'moment'
import Utils from '@/utils'
import { toJS } from 'mobx'
// import MultipleImg from '@/common/UploadImg/Multiple'

const { Item } = List
const { CheckboxItem } = Checkbox
const price = [
  {
    label: '面议',
    value: '0',
  },
  {
    label: '自定义',
    value: '1',
  },
]
const types = [
  {
    label: '到店',
    value: '0',
  },
  {
    label: '上门',
    value: '1',
  },
]

@createForm()
@inject('commodity')
@observer
class ReservePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      files: [],
      category: [],
      editor: null,
      shopList: [],
      store: [],
      workerList: [],
      appoint_type: 0,
      workerSele: [],
      custom_name: [],
      custom_payment_price: [],
      custom_price: [],
      custom_content: [],
      use_time: [],
      custom_id: [],
      mul: false,
      isClick: true,
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    const { appoint_type } = this.state
    commodity.fetchShopList(appoint_type, 1).then(() => {
      const { shopList } = commodity
      this.setState({
        shopList,
      })
    })

    commodity.fetchReserveCategoryOption()
    if (match.params.id) {
      commodity.fetchReserveDetail(match.params.id).then(res => {
        const { appointDetail } = commodity
        const workerSele = []
        if (appointDetail.merchant_workers_appoint_list) {
          appointDetail.merchant_workers_appoint_list.forEach((item, index) => {
            workerSele.push(item.merchant_worker_id)
          })
        }
        setTimeout(() => {
          this.editor.current.state.editor.txt.html(
            appointDetail.appoint_list.appoint_pic_content,
          )
        }, 500)
        this.setState({
          files: appointDetail.appoint_list.pic_arr,
          category: [
            appointDetail.appoint_list.cat_fid,
            appointDetail.appoint_list.cat_id,
          ],
          store: appointDetail.store_arr,
          workerSele,
        })
        commodity.fetchShopList(1, 1).then(() => {
          const { shopList } = commodity
          this.setState({
            shopList,
          })
          const start_workder = []
          shopList.forEach(item => {
            if (item.worker_list) {
              item.worker_list.forEach(t => {
                if (
                  this.state.workerSele.indexOf(t.merchant_worker_id) !== -1
                ) {
                  start_workder.push(`${item.value},${t.merchant_worker_id}`)
                }
              })
              this.setState({
                workerList: start_workder,
              })
            }
          })
        })
        form.setFieldsValue({
          appoint_name: appointDetail.appoint_list.appoint_name,
          appoint_content: appointDetail.appoint_list.appoint_content,
          old_price: appointDetail.appoint_list.old_price,
          payment_status: appointDetail.appoint_list.payment_status === '1',
          appoint_date_type:
            appointDetail.appoint_list.appoint_date_type === '1',
          appoint_date_num: appointDetail.appoint_list.appoint_date_num,
          expend_time: appointDetail.appoint_list.expend_time,
          sort: appointDetail.appoint_list.sort,
          start_time: appointDetail.appoint_list.start_time
            ? new Date(appointDetail.appoint_list.start_time * 1000)
            : '',
          end_time: appointDetail.appoint_list.end_time
            ? new Date(appointDetail.appoint_list.end_time * 1000)
            : '',
          is_store: appointDetail.appoint_list.is_store === '1',
          office_start_time: Utils.conversionTimeStringToDate(
            appointDetail.office_time.open,
          ),
          office_stop_time: Utils.conversionTimeStringToDate(
            appointDetail.office_time.close,
          ),
          appoint_status: appointDetail.appoint_list.appoint_status === '0',
          appoint_type: appointDetail.appoint_list.appoint_type,
          is_appoint_price: appointDetail.appoint_list.is_appoint_price || 0,
          pic: appointDetail.appoint_list.pic_arr,
          time_gap: appointDetail.appoint_list.time_gap,
        })
        if (sessionStorage.getItem('cacheData')) {
          const arr_pic = JSON.parse(sessionStorage.getItem('cacheData')).pic
          form.setFieldsValue({
            pic: arr_pic,
          })
          Utils.clearCacheData()
        }
        this.setState({
          editor: appointDetail.appoint_list.appoint_pic_content,
        })

        setTimeout(() => {
          form.setFieldsValue({
            payment_money: appointDetail.appoint_list.payment_money,
            appoint_price: appointDetail.appoint_list.appoint_price,
          })
        }, 100)
        if (appointDetail.product_list) {
          const custom_name = []
          const custom_payment_price = []
          const custom_price = []
          const custom_content = []
          const use_time = []
          const custom_id = []
          appointDetail.product_list.forEach((item, index) => {
            custom_name.push(item.name)
            custom_payment_price.push(item.payment_price)
            custom_price.push(item.price)
            custom_content.push(item.content)
            use_time.push(item.use_time)
            custom_id.push(item.id)
          })
          this.setState({
            custom_name,
            custom_payment_price,
            custom_price,
            custom_content,
            use_time,
            custom_id,
          })
        }
        this.setState({
          appoint_type: appointDetail.appoint_list.appoint_type,
        })
      })
    } else {
      form.setFieldsValue({
        sort: 0,
      })
      if (sessionStorage.getItem('cacheData')) {
        const arr_pic = JSON.parse(sessionStorage.getItem('cacheData')).pic
        form.setFieldsValue({
          pic: arr_pic,
        })
        Utils.clearCacheData()
      }
    }
    // editor.txt.html(history.location.state.value)
  }

  changeCategory = async arr => {
    // const { basicInformation } = this.props
    // await basicInformation.modifyCategory(arr)
    this.setState({ menu: false, category: arr })
  }

  addSpe = async () => {
    const {
      custom_name,
      custom_payment_price,
      custom_price,
      custom_content,
      use_time,
      custom_id,
    } = this.state
    if (custom_name.length < 9) {
      custom_name.push('')
      custom_payment_price.push('')
      custom_price.push('')
      custom_content.push('')
      use_time.push('')
      custom_id.push('')
      this.setState({
        custom_name,
        custom_payment_price,
        custom_price,
        custom_content,
        use_time,
        custom_id,
      })
    } else {
      Toast.info('不能超过9个规格')
    }
  }

  submit = () => {
    const { form, match, commodity, history } = this.props
    const { category, isClick } = this.state
    // const content = this.editor.current.state.editor.txt.html()
    if (isClick) {
      form.validateFields((error, value) => {
        this.setState({
          isClick: false,
        })
        if (error) {
          Toast.info('请输入完整信息')
          this.setState({
            isClick: true,
          })
          return
        }
        // eslint-disable-next-line no-param-reassign
        value.appoint_type = value.appoint_type ? value.appoint_type[0] : '0'
        const obj = {
          ...value,
          cat_fid: category[0],
          cat_id: category[1],
          appoint_pic_content: this.editor.current.state.editor.txt.html(),
          start_time: value.start_time
            ? moment(value.start_time).format('YYYY-MM-DD')
            : '',
          end_time: value.end_time
            ? moment(value.end_time).format('YYYY-MM-DD')
            : '',
          office_start_time: value.office_start_time
            ? moment(value.office_start_time).format('HH:mm')
            : '',
          office_stop_time: value.office_stop_time
            ? moment(value.office_stop_time).format('HH:mm')
            : '',
          is_appoint_price: value.is_appoint_price[0],
          appoint_type: value.appoint_type[0],
          payment_status: value.payment_status ? '1' : '0',
          appoint_date_type: value.appoint_date_type ? '1' : '0',
          is_store: value.is_store ? '1' : '0',
          appoint_status: !value.appoint_status ? '1' : '0',
          pic: value.pic.map(item => item.url),
          store: this.state.store,
          worker_memus: this.state.workerList,
          custom_name: this.state.custom_name,
          custom_payment_price: this.state.custom_payment_price,
          custom_price: this.state.custom_price,
          custom_content: this.state.custom_content,
          custom_use_time: this.state.use_time,
          custom_id: this.state.custom_id,
        }

        if (match.params.id) {
          commodity
            .modifyReserve({ ...obj, appoint_id: match.params.id })
            .then(res => {
              if (res) {
                Toast.success('修改成功', 1, () => {
                  commodity.resetAndFetchReserveList().then(() => {
                    history.goBack()
                  })
                })
              }
            })
        } else {
          commodity.insertReserve(obj).then(res => {
            if (res) {
              Toast.success('新增成功', 1, () => {
                commodity.resetAndFetchReserveList().then(() => {
                  history.goBack()
                })
              })
            }
          })
        }
        setTimeout(() => {
          this.setState({
            isClick: true,
          })
        }, 1500)
      })
    }
  }

  saveImg = url => {
    const { form } = this.props
    const pic = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    form.setFieldsValue({
      pic: [...pic, { url }],
    })
  }

  render() {
    const { match, form, commodity, history } = this.props
    const {
      store,
      // eslint-disable-next-line camelcase
      custom_name,
      // eslint-disable-next-line camelcase
      custom_payment_price,
      // eslint-disable-next-line camelcase
      custom_price,
      // eslint-disable-next-line camelcase
      custom_content,
      // eslint-disable-next-line camelcase
      use_time,
    } = this.state
    const { getFieldProps } = form
    const { shopList } = this.state
    // eslint-disable-next-line camelcase
    const pic_arr = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    const paymentValue = form.getFieldValue('payment_status')
    const storeChecked = form.getFieldValue('is_store')
    // eslint-disable-next-line camelcase
    const is_appoint_price = form.getFieldValue('is_appoint_price') || '0'
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}预定商品`} goBack />
        <List>
          <InputItem
            {...getFieldProps('appoint_name', {
              rules: [{ required: true }],
            })}
            placeholder="预约页面显示此名称"
          >
            服务名称
          </InputItem>
          <TextareaItem
            {...getFieldProps('appoint_content', {
              rules: [{ required: true }],
            })}
            title="服务简介"
            placeholder="请填写服务简介"
            rows={4}
            count={80}
          />
          <InputItem
            {...getFieldProps('old_price', {
              rules: [{ required: true }],
            })}
            placeholder="请填写原价，最多两位小数"
          >
            原价
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('payment_status', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            收取定金
          </List.Item>
          {paymentValue && (
            <InputItem
              {...getFieldProps('payment_money', {
                rules: [{ required: true }],
              })}
              placeholder="请填写定金，最多支持两位小数"
            >
              定金
            </InputItem>
          )}
          <Picker
            {...getFieldProps('is_appoint_price', {
              rules: [{ required: true }],
            })}
            disabled={!!match.params.id}
            data={price}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">全价</List.Item>
          </Picker>
          {is_appoint_price[0] === '1' && (
            <InputItem
              {...getFieldProps('appoint_price', {
                rules: [{ required: true }],
              })}
              placeholder="请填写自定义价格，最多两位小数"
            >
              自定义价格
            </InputItem>
          )}
          <List.Item
            extra={
              <Switch
                {...getFieldProps('appoint_date_type', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            日期多选
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="若开启可以选择多个连续的预约时间，且预约金额叠加，若选择两个连续的时间，预约订单最后的总价为设定全价的两倍，以此类推"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <InputItem
            {...getFieldProps('appoint_date_num', {
              rules: [{ required: true }],
            })}
            placeholder="请填写可预约天数"
          >
            预约天数
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="从今天开始算，可以向前预约的天数，最多30天，填写0表示只有今天可以预约，以此类推。"
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
            {...getFieldProps('expend_time', {
              rules: [{ required: true }],
            })}
            placeholder="请填写时间，单位：分钟"
          >
            耗时
          </InputItem>
          <InputItem
            {...getFieldProps('time_gap', {
              rules: [{ required: true }],
            })}
            placeholder=""
          >
            时间间隔
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="预约时间间隔，单位分钟，必须是5的倍数，填写-1则显示为天数预约。"
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
            placeholder="请填写数值，值越大，越靠前"
          >
            排序
          </InputItem>
          <DatePicker
            {...getFieldProps('start_time', {
              rules: [{ required: true }],
            })}
            mode="date"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              预约开始时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了开始时间，会自动显示"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 10, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('end_time', {
              rules: [{ required: true }],
            })}
            mode="date"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              预约结束时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="到了结束时间，会自动显示"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 10, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <Picker
            {...getFieldProps('appoint_type', {
              rules: [{ required: true }],
            })}
            data={types}
            cols={1}
            extra="请选择"
            disabled={!!match.params.id}
            onOk={e => {
              commodity.fetchShopList(0, 1).then(() => {
                const { shopList } = commodity
                this.setState({
                  shopList,
                })
              })
            }}
          >
            <List.Item arrow="horizontal">服务类别</List.Item>
          </Picker>
          <Item
            arrow="horizontal"
            onClick={() =>
              this.setState({
                menu: true,
              })
            }
          >
            商户所属分类
            <div>{}</div>
          </Item>
          <Item arrow="empty">
            商品图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                rules: [{ required: true }],
              })}
              selectable={pic_arr.length < 5}
              onAddImageClick={e => {
                const formData = form.getFieldsValue()
                formData.des = this.editor.current.state.editor.txt.html()
                console.log(formData)
                Utils.cacheData(formData)
                history.push('/uploadMultipleImg/裁剪/pic/1')
                e.preventDefault()
              }}
            />
          </Item>
          <Item>
            服务详情
            <Editor ref={this.editor} />
          </Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_store', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
                onClick={e => {
                  if (!e) {
                    this.setState({
                      store: [],
                      workerList: [],
                      workerSele: [],
                    })
                  }
                }}
              />
            }
          >
            选择服务店铺
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="选择后，用户预约时可自行选择服务店铺。"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          {storeChecked &&
            shopList.map(i => (
              <div key={i.value}>
                <CheckboxItem
                  key={i.value}
                  checked={store.indexOf(i.value) !== -1}
                  onChange={e => {
                    const store_now = toJS(this.state.store)
                    const workerList = toJS(this.state.workerList)
                    const workerSele = toJS(this.state.workerSele)
                    if (store_now.indexOf(i.value) === -1) {
                      store_now.push(i.value)
                    } else {
                      store_now.splice(store_now.indexOf(i.value), 1)
                      if (i.worker_list) {
                        i.worker_list.forEach(item => {
                          if (
                            workerList.indexOf(
                              `${item.merchant_store_id},${item.merchant_worker_id}`,
                            ) !== -1
                          ) {
                            workerList.splice(
                              workerList.indexOf(
                                `${item.merchant_store_id},${item.merchant_worker_id}`,
                              ),
                              1,
                            )
                            workerSele.splice(
                              workerSele.indexOf(item.merchant_worker_id),
                              1,
                            )
                          }
                        })
                      }
                      console.log(workerList)
                    }
                    this.setState({
                      store: store_now,
                      workerList,
                      workerSele,
                    })
                  }}
                >
                  {i.label}
                </CheckboxItem>
                {this.state.store.indexOf(i.value) !== -1 &&
                  i.worker_list &&
                  i.worker_list.map(j => (
                    <List.Item key={j.value}>
                      <CheckboxItem
                        checked={this.state.workerSele.indexOf(j.value) !== -1}
                        onChange={e => {
                          const workerList = toJS(this.state.workerList)
                          const workerSele = toJS(this.state.workerSele)
                          if (
                            workerList.indexOf(`${i.value},${j.value}`) === -1
                          ) {
                            workerList.push(`${i.value},${j.value}`)
                            workerSele.push(j.value)
                          } else {
                            workerList.splice(
                              workerList.indexOf(`${i.value},${j.value}`),
                              1,
                            )
                            workerSele.splice(workerSele.indexOf(j.value), 1)
                          }
                          this.setState({
                            workerList,
                            workerSele,
                          })
                        }}
                      >
                        {j.label}
                      </CheckboxItem>
                    </List.Item>
                  ))}
              </div>
            ))}
          <DatePicker
            {...getFieldProps('office_start_time', {
              rules: [{ required: true }],
            })}
            mode="time"
            extra="选择时间"
          >
            <List.Item arrow="horizontal">
              营业开始时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="如果营业时间段设置为00:00-00:00，则表示24小时营业"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 10, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('office_stop_time', {
              rules: [{ required: true }],
            })}
            mode="time"
            extra="选择时间"
            onOk={e => {
              console.log(e)
            }}
          >
            <List.Item arrow="horizontal">
              营业结束时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="如果营业时间段设置为00:00-00:00，则表示24小时营业"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 10, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          </DatePicker>

          {custom_name &&
            custom_name.map((item, index) => (
              <List key={index} style={{ marginBottom: '2%' }}>
                <InputItem
                  placeholder=""
                  value={custom_name[index] ? custom_name[index] : ''}
                  onChange={e => {
                    custom_name[index] = e
                    this.setState({
                      custom_name,
                    })
                  }}
                >
                  规格名称
                </InputItem>
                <InputItem
                  placeholder=""
                  value={
                    custom_payment_price[index]
                      ? custom_payment_price[index]
                      : ''
                  }
                  onChange={e => {
                    custom_payment_price[index] = e
                    this.setState({
                      custom_payment_price,
                    })
                  }}
                >
                  规格定金
                </InputItem>
                <InputItem
                  placeholder=""
                  value={custom_price[index] ? custom_price[index] : ''}
                  onChange={e => {
                    custom_price[index] = e
                    this.setState({
                      custom_price,
                    })
                  }}
                >
                  规格全价
                </InputItem>
                <InputItem
                  placeholder=""
                  value={custom_content[index] ? custom_content[index] : ''}
                  onChange={e => {
                    custom_content[index] = e
                    this.setState({
                      custom_content,
                    })
                  }}
                >
                  规格描述
                </InputItem>
                <InputItem
                  placeholder="(分钟)"
                  value={use_time[index] ? use_time[index] : ''}
                  onChange={e => {
                    use_time[index] = e
                    this.setState({
                      use_time,
                    })
                  }}
                >
                  平均用时
                </InputItem>
                {/*        <Button type="primary"
                          style={{width:"20%",height:"25px",lineHeight:"25px",fontSize:"14px",margin:"0 auto"}}
                          onClick={ e => {
                                    console.log(this.state.custom_name)
                                  custom_name.splice(index,1)
                                  custom_payment_price.splice(index,1)
                                  custom_price.splice(index,1)
                                  custom_content.splice(index,1)
                                  use_time.splice(index,1)
                          this.setState({
                              custom_name,
                              custom_payment_price,
                              custom_price,
                              custom_content,
                              use_time
                          },() => {console.log(this.state.custom_name)})
                  }}>
                   删除
                  </Button> */}
              </List>
            ))}

          <Button
            type="primary"
            style={{
              width: '30%',
              height: '30px',
              lineHeight: '30px',
              fontSize: '14px',
              margin: '0 auto',
            }}
            onClick={this.addSpe}
          >
            增加规格
          </Button>
          {match.params.id && (
            <List.Item
              extra={
                <Switch
                  {...getFieldProps('appoint_status', {
                    initialValue: false,
                    valuePropName: 'checked',
                    rules: [{ required: true }],
                  })}
                />
              }
            >
              预约状态
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="为了方便用户能查到以前的订单，预约无法删除！"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 10, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </List.Item>
          )}
        </List>

        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onClick={this.submit}>
            确定
          </Button>
          <WhiteSpace />
        </WingBlank>
        {/* {menu ? menuEl : null}
        {menu ? <MenuMask onClick={() => this.setState({ menu: false })} /> : null} */}
        {/* <MultipleImg
          visible={mul}
          close={() => this.setState({
            mul: false,
          })
          }
          ratio={1}
          callback={this.saveImg}
        /> */}
      </React.Fragment>
    )
  }
}
export default ReservePanel
