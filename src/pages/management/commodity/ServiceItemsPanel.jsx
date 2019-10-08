import React from 'react'
import { createForm } from 'rc-form'
import NavBar from '@/common/NavBar'
import { List, InputItem, Switch, Picker, ImagePicker, Button, WingBlank } from 'antd-mobile'
import Editor from '@/common/Editor'
import Tooltip from 'rc-tooltip'
import Utils from '@/utils'

@createForm()
class ServiceItemsPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { match } = this.props
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
      } else {
        // 编辑套餐项目
      }
    }
  }

  fetchServicesItemsDetail = () => {
    console.log('编辑服务项目')
  }

  render() {
    const { match, form, history } = this.props
    const { getFieldProps } = form
    const picArr = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    return (
      <>
        <NavBar title={`${match.params.str}${match.params.type}`} goBack />
        {match.params.type === '单项目' ? (
          <>
            <List>
              <InputItem placeholder="服务项目名称">服务名称</InputItem>
              <InputItem placeholder="服务项目简介">服务简介</InputItem>
              <InputItem placeholder="保留两位小数">原价</InputItem>
              <List.Item extra={<Switch />}>收取定金</List.Item>
              <InputItem placeholder="保留两位小数">定金</InputItem>
              <List.Item extra={<Switch />}>
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
              <InputItem placeholder="可提前预约天数">
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
              <InputItem placeholder="项目耗时，单位：分钟">耗时</InputItem>
              <List.Item extra={<Switch />}>开启选择车型</List.Item>
              <List.Item extra={<Switch />}>开启选择车牌</List.Item>
              <Picker>
                <List.Item arrow="horizontal">预约开始时间</List.Item>
              </Picker>
              <Picker>
                <List.Item arrow="horizontal">预约结束时间</List.Item>
              </Picker>
              <Picker
                cols={1}
                data={[{ label: '到店', value: '1' }, { label: '上门', value: '2' }]}
              >
                <List.Item arrow="horizontal">服务类别</List.Item>
              </Picker>
              <List.Item extra={<Switch />}>
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

              <List.Item arrow="empty">
                商品图片
                <ImagePicker
                  {...getFieldProps('pic', {
                    valuePropName: 'files',
                    rules: [{ required: true }],
                  })}
                  selectable={picArr.length < 5}
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
              <InputItem placeholder="套餐名称">套餐名称</InputItem>
              <InputItem placeholder="保留两位小数">套餐价格</InputItem>
              <List.Item arrow="horizontal">套餐包含项目</List.Item>
              <List.Item extra={<Switch />}>
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
