import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List, InputItem, WhiteSpace, Button, Menu,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { TemplateArea } from '@/config/constant'
import { MenuMask } from '@/styled'

@inject('commodity')
@observer
class ECommerceDeliveryTemplate extends React.Component {
  state = {
    open: false,
    data: [],
    checked: [],
  }

  componentDidMount() {
    const data = []
    const arr = Object.keys(TemplateArea)
    arr.forEach(item => {
      data.push({
        label: TemplateArea[item][0],
        value: item,
        disabled: TemplateArea[item][1] !== 0,
      })
    })
    this.setState({
      data,
    })
  }

  resetArr = (arr, index) => {
    const { data, checked } = this.state
    const cache = JSON.parse(JSON.stringify(data))
    const cache2 = JSON.parse(JSON.stringify(checked))
    arr.value.map(item => {
      cache.map(item2 => {
        if (item === item2.value) {
          item2.disabled = false
        }
      })
    })
    cache2.splice(index, 1)
    this.setState({
      data: cache,
      checked: cache2,
    })
  }

  onOk = arr => {
    const { data, checked } = this.state
    const cache = JSON.parse(JSON.stringify(data))
    const child = {
      label: [],
      value: [],
      delivery: '',
      reduction: '',
    }
    arr.map(item => {
      cache.map(item2 => {
        if (item === item2.value) {
          item2.disabled = true
          child.label.push(item2.label)
          child.value.push(item2.value)
        }
      })
    })
    this.setState({
      data: cache,
      open: false,
      checked: [...checked, child],
    })
  }

  mapList = () => {
    const { checked } = this.state
    return checked.map((item, index) => (
      <React.Fragment key={item.value}>
        <List.Item
          wrap
          extra={
            <Button size="small" type="warning" onClick={() => this.resetArr(item, index)}>
              删除
            </Button>
          }
        >
          {item.label.join(',')}
        </List.Item>
        <InputItem
          value={item.delivery}
          onChange={val => {
            checked[index].delivery = val
            this.setState({
              checked,
            })
          }}
        >
          运费
        </InputItem>
        <InputItem
          value={item.reduction}
          onChange={val => {
            checked[index].reduction = val
            this.setState({
              checked,
            })
          }}
        >
          满减
        </InputItem>
      </React.Fragment>
    ))
  }

  submit = () => {
    const { checked } = this.state
    const obj = JSON.parse(JSON.stringify(checked))
    const submitObj = []
    obj.map(item => {
      submitObj.push({
        vid: 0,
        aids: item.value,
        freight: item.delivery,
        full_money: item.reduction,
      })
    })
    console.log(submitObj)
  }

  render() {
    const { data, open } = this.state
    const menuEl = (
      <Menu
        className="menu-position "
        data={data}
        level={1}
        onOk={this.onOk}
        height={document.documentElement.clientHeight * 0.6}
        multiSelect
      />
    )
    return (
      <React.Fragment>
        <NavBar title="添加模版" goBack />
        <WhiteSpace />
        <List>
          <InputItem placeholder="请输入模版名称">模版名称</InputItem>
          <List.Item
            extra={
              <React.Fragment>
                <Button type="ghost" size="small" onClick={() => this.setState({ open: true })}>
                  添加
                </Button>
              </React.Fragment>
            }
          >
            配送区域
          </List.Item>
          {this.mapList()}
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
        {open ? <MenuMask /> : null}
      </React.Fragment>
    )
  }
}

export default ECommerceDeliveryTemplate
