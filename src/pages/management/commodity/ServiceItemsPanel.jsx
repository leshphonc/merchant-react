import React from 'react'
import { createForm } from 'rc-form'
import NavBar from '@/common/NavBar'
import {
  List,
  InputItem,
  Switch,
  Picker,
  DatePicker,
  ImagePicker,
  Button,
  WingBlank,
  Toast,
} from 'antd-mobile'
import Editor from '@/common/Editor'
import Tooltip from 'rc-tooltip'
import Utils from '@/utils'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@createForm()
@inject('commodity')
@observer
class ServiceItemsPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectData: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { match, form, commodity } = this.props
    // 先判断是否有缓存值
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      if (match.params.type === '单项目') {
        setTimeout(() => {
          form.setFieldsValue({
            ...cacheData,
            start_time: cacheData.start_time && new Date(cacheData.start_time),
            end_time: cacheData.end_time && new Date(cacheData.end_time),
          })
          if (cacheData.payment_status) {
            form.setFieldsValue({
              payment_money: cacheData.payment_money,
            })
          }
          this.editor.current.state.editor.txt.html(cacheData.des)
          delete cacheData.des
        }, 500)
        Utils.clearCacheData()
        return false
      }
      form.setFieldsValue({
        name: cacheData.name,
        price: cacheData.price,
        total_num: cacheData.total_num,
        person_num: cacheData.person_num,
      })
      this.setState({
        projectData: cacheData.project_data,
      })
      Utils.clearCacheData()
      return false
    }

    if (match.params.str === '新增') {
      // 新增
      if (match.params.type === '单项目') {
        // 新增单项目
      } else {
        // 新增套餐项目
      }
    } else {
      // 获取默认数据
      // eslint-disable-next-line no-lonely-if
      if (match.params.type === '单项目') {
        // 编辑单项目
        commodity.fetchSingleServiceDetail(match.params.id).then(() => {
          const { singleServiceDetail } = commodity
          form.setFieldsValue({
            appoint_name: singleServiceDetail.appoint_name,
            appoint_content: singleServiceDetail.appoint_content,
            old_price: singleServiceDetail.old_price,
            payment_status: singleServiceDetail.payment_status === '1',
            appoint_date_type: singleServiceDetail.appoint_date_type === '1',
            appoint_date_num: singleServiceDetail.appoint_date_num,
            expend_time: singleServiceDetail.expend_time,
            start_time: new Date(singleServiceDetail.start_time * 1000),
            end_time: new Date(singleServiceDetail.end_time * 1000),
            appoint_type: [singleServiceDetail.appoint_type],
            car_type: singleServiceDetail.car_type === '1',
            car_no: singleServiceDetail.car_no === '1',
            pic: [{ url: singleServiceDetail.pic }],
          })
          setTimeout(() => {
            form.setFieldsValue({
              payment_money: singleServiceDetail.payment_money,
            })
            this.editor.current.state.editor.txt.html(singleServiceDetail.appoint_pic_content)
          }, 500)
        })
      } else {
        // 编辑套餐项目
      }
    }
  }

  goPackage = () => {
    const { history, form } = this.props
    const { projectData } = this.state
    const formData = form.getFieldsValue()
    formData.project_data = projectData
    Utils.cacheData(formData)
    history.push('/management/commodity/serviceItemsSelectSingle')
  }

  submit = () => {
    const { match, form, commodity, history } = this.props
    const id = match.params.id ? match.params.id : 0
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return false
      }
      if (match.params.type === '单项目') {
        commodity
          .addSingleService({
            ...value,
            appoint_id: id,
            payment_status: value.payment_status ? 1 : 0,
            appoint_date_type: value.appoint_date_type ? 1 : 0,
            appoint_type: value.appoint_type[0],
            car_type: value.car_type ? 1 : 0,
            car_no: value.car_no ? 1 : 0,
            pic: value.pic.map(item => item.url)[0],
            start_time: moment(value.start_time).valueOf() / 1000,
            end_time: moment(value.end_time).valueOf() / 1000,
            appoint_pic_content: this.editor.current.state.editor.txt.html(),
          })
          .then(res => {
            if (res) {
              Toast.success('成功', 1, () => history.goBack())
            }
          })
      } else {
        commodity
          .addPackage({
            ...value,
            project_data: JSON.stringify([]),
          })
          .then(res => {
            if (res) {
              Toast.success('成功', 1, () => history.goBack())
            }
          })
      }
    })
  }

  render() {
    const { match, form, history } = this.props
    const { getFieldProps } = form
    const picArr = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    const paymentStatus = form.getFieldValue('payment_status')
      ? form.getFieldValue('payment_status')
      : false
    return (
      <>
        <NavBar title={`${match.params.str}${match.params.type}`} goBack />
        {match.params.type === '单项目' ? (
          <>
            <List>
              <InputItem
                {...getFieldProps('appoint_name', {
                  rules: [{ required: true }],
                })}
                placeholder="服务项目名称"
              >
                服务名称
              </InputItem>
              <InputItem
                {...getFieldProps('appoint_content', {
                  rules: [{ required: true }],
                })}
                placeholder="服务项目简介"
              >
                服务简介
              </InputItem>
              <InputItem
                {...getFieldProps('old_price', {
                  rules: [{ required: true }],
                })}
                type="money"
                placeholder="保留两位小数"
              >
                原价
              </InputItem>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('payment_status', {
                      valuePropName: 'checked',
                      rules: [{ required: true }],
                    })}
                  />
                }
              >
                收取定金
              </List.Item>
              {paymentStatus ? (
                <InputItem
                  {...getFieldProps('payment_money', {
                    rules: [{ required: true }],
                  })}
                  type="money"
                  placeholder="保留两位小数"
                >
                  定金
                </InputItem>
              ) : null}
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('appoint_date_type', {
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
                extra="天"
                type="number"
                placeholder="可提前预约天数"
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
                extra="分钟"
                type="number"
                placeholder="项目耗时，单位：分钟"
              >
                耗时
              </InputItem>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('car_type', {
                      valuePropName: 'checked',
                      rules: [{ required: true }],
                    })}
                  />
                }
              >
                开启选择车型
              </List.Item>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps('car_no', {
                      valuePropName: 'checked',
                      rules: [{ required: true }],
                    })}
                  />
                }
              >
                开启选择车牌
              </List.Item>
              <DatePicker
                {...getFieldProps('start_time', {
                  rules: [{ required: true }],
                })}
              >
                <List.Item arrow="horizontal">预约开始时间</List.Item>
              </DatePicker>
              <DatePicker
                {...getFieldProps('end_time', {
                  rules: [{ required: true }],
                })}
              >
                <List.Item arrow="horizontal">预约结束时间</List.Item>
              </DatePicker>
              <Picker
                {...getFieldProps('appoint_type', {
                  rules: [{ required: true }],
                })}
                cols={1}
                data={[{ label: '到店', value: '0' }, { label: '上门', value: '1' }]}
              >
                <List.Item arrow="horizontal">服务类别</List.Item>
              </Picker>
              <List.Item arrow="empty">
                商品图片
                <ImagePicker
                  {...getFieldProps('pic', {
                    valuePropName: 'files',
                    rules: [{ required: true }],
                  })}
                  selectable={picArr.length < 1}
                  onAddImageClick={e => {
                    const formData = form.getFieldsValue()
                    formData.des = this.editor.current.state.editor.txt.html()
                    Utils.cacheData(formData)
                    history.push('/uploadMultipleImg/裁剪/pic/1')
                    e.preventDefault()
                  }}
                />
              </List.Item>
              <List.Item>
                服务详情
                <Editor ref={this.editor} />
              </List.Item>
            </List>
            <WingBlank>
              <Button
                type="primary"
                onClick={this.submit}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                确定
              </Button>
            </WingBlank>
          </>
        ) : (
          <>
            <List>
              <InputItem
                {...getFieldProps('name', {
                  rules: [{ required: true }],
                })}
                placeholder="套餐名称"
              >
                套餐名称
              </InputItem>
              <InputItem
                {...getFieldProps('price', {
                  rules: [{ required: true }],
                })}
                type="money"
                placeholder="保留两位小数"
              >
                套餐价格
              </InputItem>
              <InputItem
                {...getFieldProps('total_num', {
                  rules: [{ required: true }],
                })}
                type="number"
                placeholder="套餐库存数量"
              >
                套餐总数
              </InputItem>
              <InputItem
                {...getFieldProps('person_num', {
                  rules: [{ required: true }],
                })}
                type="number"
                placeholder="每人可购买数量"
              >
                每人可购买
              </InputItem>
              <List.Item arrow="horizontal" onClick={this.goPackage}>
                套餐包含项目
              </List.Item>
            </List>
            <WingBlank>
              <Button
                type="primary"
                onClick={this.submit}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                确定
              </Button>
            </WingBlank>
          </>
        )}
      </>
    )
  }
}

export default ServiceItemsPanel
