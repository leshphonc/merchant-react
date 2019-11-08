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
  Stepper,
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
      eCommerce_data: [],
      pic: [],
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { match, form, commodity } = this.props
    commodity.fetchServiceCategory()
    // 先判断是否有缓存值
    const cacheData = Utils.getCacheData()
    if (cacheData) {
      if (match.params.type === '服务项目') {
        if (cacheData.cat_fid !== '0') {
          commodity.fetchCategoryChild(cacheData.cat_fid[0])
        }
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
      console.log(cacheData)
      form.setFieldsValue({
        name: cacheData.name,
        price: cacheData.price,
        total_num: cacheData.total_num,
        person_num: cacheData.person_num,
        day_num: cacheData.day_num,
        pic: cacheData.pic || [],
      })
      this.setState({
        projectData: cacheData.project_data,
        eCommerce_data: cacheData.eCommerce_data,
        pic: cacheData.pic || [],
      })
      Utils.clearCacheData()
      return false
    }

    if (match.params.str === '新增') {
      // 新增
      if (match.params.type === '服务项目') {
        // 新增服务项目
      } else {
        // 新增套餐项目
      }
    } else {
      // 获取默认数据
      // eslint-disable-next-line no-lonely-if
      if (match.params.type === '服务项目') {
        // 编辑服务项目
        commodity.fetchSingleServiceDetail(match.params.id).then(() => {
          const { singleServiceDetail } = commodity
          if (singleServiceDetail.cat_fid !== '0') {
            commodity.fetchCategoryChild(singleServiceDetail.cat_fid)
          }
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
            cat_fid: [singleServiceDetail.cat_fid],
            pic: [{ url: singleServiceDetail.pic }],
          })
          setTimeout(() => {
            form.setFieldsValue({
              payment_money: singleServiceDetail.payment_money,
              cat_id: [singleServiceDetail.cat_id],
            })
            this.editor.current.state.editor.txt.html(
              singleServiceDetail.appoint_pic_content,
            )
          }, 500)
        })
      } else {
        // 编辑套餐项目
        commodity.fetchPackageDetail(match.params.id).then(() => {
          commodity.fetchServiceOfPackage(match.params.id).then(() => {
            const { packageDetail, serviceOfPackage } = commodity
            const projectData = []
            const eCommerce_data = []
            serviceOfPackage.forEach(item => {
              if (item.type === '0') {
                projectData.push(item)
              } else if (item.type === '1') {
                eCommerce_data.push(item)
              }
            })
            const cur = packageDetail[0]
            form.setFieldsValue({
              name: cur.meal_name,
              price: cur.price,
              total_num: cur.total_num,
              pic: [{ url: cur.pic }],
              day_num: cur.day_num,
              person_num: cur.person_num,
            })
            this.setState({
              projectData: projectData,
              eCommerce_data: eCommerce_data,
              pic: [{ url: cur.pic }],
            })
          })
        })
      }
    }
  }

  goPackage = () => {
    const { history, form } = this.props
    const { projectData, eCommerce_data } = this.state
    const formData = form.getFieldsValue()
    formData.project_data = projectData
    formData.eCommerce_data = eCommerce_data
    Utils.cacheData(formData)
    history.push('/management/commodity/serviceItemsSelectSingle')
  }

  goECommerce = () => {
    const { history, form } = this.props
    const { projectData, eCommerce_data } = this.state
    const formData = form.getFieldsValue()
    formData.project_data = projectData
    formData.eCommerce_data = eCommerce_data
    Utils.cacheData(formData)
    history.push('/management/commodity/serviceItemsSelectECommerce')
  }

  mapPackageList = () => {
    const { projectData } = this.state
    return projectData.map((item, index) => (
      <div key={index}>
        <List.Item
          thumb={item.img}
          extra={
            <Stepper
              style={{ width: '70%' }}
              showNumber
              min={1}
              onChange={val => {
                const data = JSON.parse(JSON.stringify(projectData))
                data[index].meal_num = val
                this.setState({
                  projectData: [...data],
                })
              }}
              defaultValue={item.meal_num}
            />
          }
        >
          {item.name}
        </List.Item>
        <InputItem
          placeholder="开卡后，可使用天数"
          value={item.day_num}
          extra="天"
          onChange={val => {
            const data = JSON.parse(JSON.stringify(projectData))
            data[index].day_num = val
            this.setState({
              projectData: [...data],
            })
          }}
        >
          有效天数
        </InputItem>
      </div>
    ))
  }

  mapECommerceList = () => {
    const { eCommerce_data } = this.state
    return eCommerce_data.map((item, index) => (
      <div key={index}>
        <List.Item
          thumb={item.img}
          extra={
            <Stepper
              style={{ width: '70%' }}
              showNumber
              min={1}
              onChange={val => {
                const data = JSON.parse(JSON.stringify(eCommerce_data))
                data[index].meal_num = val
                this.setState({
                  eCommerce_data: [...data],
                })
              }}
              defaultValue={item.meal_num}
            />
          }
        >
          {item.name}
        </List.Item>
      </div>
    ))
  }

  submit = () => {
    const { match, form, commodity, history } = this.props
    const id = match.params.id ? match.params.id : 0
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return false
      }
      if (match.params.type === '服务项目') {
        const obj = {
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
          cat_fid: value.cat_fid[0],
          cat_id: value.cat_id ? value.cat_id[0] : undefined,
          appoint_pic_content: this.editor.current.state.editor.txt.html(),
        }
        if (value.cat_id) {
          obj.cat_id = value.cat_id[0]
        }
        commodity.addSingleService(obj).then(res => {
          if (res) {
            Toast.success('成功', 1, () => history.goBack())
          }
        })
      } else {
        const { projectData, eCommerce_data } = this.state
        if (!projectData.length && !eCommerce_data.length) {
          Toast.info('请选择套餐内包含商品')
          return false
        }
        const data = [...projectData, ...eCommerce_data]
        if (id) {
          commodity
            .modifyPackage({
              ...value,
              pic: value.pic.map(item => item.url)[0],
              meal_id: id,
              project_data: JSON.stringify(data),
            })
            .then(res => {
              if (res) {
                Toast.success('编辑成功', 1, () => history.goBack())
              }
            })
        } else {
          commodity
            .addPackage({
              ...value,
              pic: value.pic.map(item => item.url)[0],
              project_data: JSON.stringify(data),
            })
            .then(res => {
              if (res) {
                Toast.success('新增成功', 1, () => history.goBack())
              }
            })
        }
      }
    })
  }

  fetchCategoryChild = id => {
    const { commodity } = this.props
    commodity.fetchCategoryChild(id)
  }

  render() {
    const { match, form, history, commodity } = this.props
    const { pic } = this.state
    const { getFieldProps } = form
    const { serviceCategory, serviceCategoryChild } = commodity
    const fidOption = serviceCategory.map(item => ({
      label: item.cat_name,
      value: item.cat_id,
    }))
    const childOption = serviceCategoryChild.twoCate.map(item => ({
      label: item.cat_name,
      value: item.cat_id,
    }))
    const picArr = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    const paymentStatus = form.getFieldValue('payment_status')
      ? form.getFieldValue('payment_status')
      : false
    return (
      <>
        <NavBar title={`${match.params.str}${match.params.type}`} goBack />
        {match.params.type === '服务项目' ? (
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
                      initialValue: false,
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
                      initialValue: false,
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
                  <i
                    className="iconfont"
                    style={{ marginLeft: 10, color: '#bbb' }}
                  >
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
                  <i
                    className="iconfont"
                    style={{ marginLeft: 10, color: '#bbb' }}
                  >
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
                      initialValue: false,
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
                      initialValue: false,
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
                data={[
                  { label: '到店', value: '0' },
                  { label: '上门', value: '1' },
                ]}
              >
                <List.Item arrow="horizontal">服务类别</List.Item>
              </Picker>
              <Picker
                {...getFieldProps('cat_fid', {
                  rules: [{ required: true }],
                  getValueFromEvent: item => {
                    this.fetchCategoryChild(item[0])
                    return item
                  },
                })}
                cols={1}
                data={fidOption}
              >
                <List.Item arrow="horizontal">添加至分类</List.Item>
              </Picker>
              {childOption.length ? (
                <Picker
                  {...getFieldProps('cat_id', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  data={childOption}
                >
                  <List.Item arrow="horizontal">添加至二级分类</List.Item>
                </Picker>
              ) : null}

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
              {/* <InputItem
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
              </InputItem> */}
              <InputItem
                {...getFieldProps('day_num', {
                  rules: [{ required: true }],
                })}
                type="number"
                placeholder="开卡后，可使用天数"
              >
                有效天数
              </InputItem>
              <List.Item arrow="empty">
                套餐图片
                <ImagePicker
                  {...getFieldProps('pic', {
                    valuePropName: 'files',
                    rules: [{ required: true }],
                  })}
                  selectable={pic.length < 1}
                  onAddImageClick={e => {
                    const { eCommerce_data, projectData } = this.state
                    const formData = form.getFieldsValue()
                    formData.project_data = projectData
                    formData.eCommerce_data = eCommerce_data
                    Utils.cacheData(formData)
                    history.push('/uploadMultipleImg/裁剪/pic/1')
                    e.preventDefault()
                  }}
                />
              </List.Item>
              <List.Item
                extra={<i className="iconfont">&#xe634;</i>}
                onClick={this.goPackage}
              >
                套餐包含项目
              </List.Item>
              {this.mapPackageList()}
              <List.Item
                extra={<i className="iconfont">&#xe634;</i>}
                onClick={this.goECommerce}
              >
                套餐包含商品
              </List.Item>
              {this.mapECommerceList()}
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
