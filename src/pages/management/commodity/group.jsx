import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, InputItem, Picker,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import Tooltip from 'rc-tooltip'

const { Item } = List
const seasons = [
  [
    {
      label: '开启',
      value: '2013',
    },
    {
      label: '关闭',
      value: '2014',
    },
  ],
]

@createForm()
class CateGoryPanel extends React.Component {
  state = {
    sValue: ['2013'],
  }

  render() {
    const { location, form } = this.props
    const { getFieldProps, getFieldError } = form
    return (
      <React.Fragment>
        <NavBar title={`${location.state}分类`} goBack />
        <WhiteSpace />
        <form>
          <List>
            <InputItem
              {...getFieldProps('category_name', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: 'Please input categoryName' },
                  { validator: this.validateAccount },
                ],
              })}
              clear
              error={!!getFieldError('category_name')}
              onErrorClick={() => {
                alert(getFieldError('category_name').join('、'))
              }}
              placeholder="please input categoryName"
            >
              分类名称
            </InputItem>
            <InputItem
              {...getFieldProps('category_name', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: 'Please input categoryName' },
                  { validator: this.validateAccount },
                ],
              })}
              clear
              error={!!getFieldError('category_name')}
              onErrorClick={() => {
                alert(getFieldError('category_name').join('、'))
              }}
              placeholder="please input categoryName"
            >
              店铺排序
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="默认添加顺序排序！数值越大，排序越前"
              >
                <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <Picker
              data={seasons}
              cascade={false}
              value={this.state.sValue}
              onChange={v => this.setState({ sValue: v })}
              onOk={v => this.setState({ sValue: v })}
            >
              <Item arrow="horizontal">是否开启星期几显示</Item>
            </Picker>
          </List>
        </form>
      </React.Fragment>
    )
  }
}

export default CateGoryPanel
