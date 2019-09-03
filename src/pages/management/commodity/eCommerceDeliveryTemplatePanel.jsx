/* eslint-disable array-callback-return */
import React from 'react'
import NavBar from '@/common/NavBar'
import { List, InputItem, WhiteSpace, Button, Menu, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { TemplateArea } from '@/config/constant'
import { MenuMask } from '@/styled'
import Tooltip from 'rc-tooltip'

@inject('commodity')
@observer
class ECommerceDeliveryTemplatePanel extends React.Component {
  state = {
    open: false,
    name: '',
    data: [], // menu数据
    checked: [], // 循环出的数据
  }

  componentDidMount() {
    const { commodity, match } = this.props
    if (match.params.id) {
      commodity.fetchExpressDetail(match.params.id).then(() => {
        // 循环出menu数据
        const data = []
        const arr = Object.keys(TemplateArea)
        arr.forEach(item => {
          data.push({
            label: TemplateArea[item][0],
            value: item,
            disabled: TemplateArea[item][1] !== 0,
          })
        })

        // 修改menu中选择的数据
        data.map(item => {
          commodity.expressDetail.value_list.map(item2 => {
            item2.area_list.map(item3 => {
              if (item.label === item3.area_name) {
                item.disabled = true
              }
            })
          })
        })
        // 循环出checked数据
        this.setState({
          data,
          name: commodity.expressDetail.name,
        })
        commodity.expressDetail.value_list.map(item => {
          const cacheChecked = []
          const label = []
          const value = []
          item.area_list.map(item2 => {
            label.push(item2.area_name)
            value.push(item2.area_id)
          })
          console.log(item.id ? item.id : 0)
          cacheChecked.push({
            vid: item.id ? item.id : 0,
            label,
            value,
            delivery: item.freight,
            reduction: item.full_money,
          })
          this.setState({
            checked: cacheChecked,
          })
        })
      })
      return
    }
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
            <Button
              size="small"
              type="warning"
              onClick={() => this.resetArr(item, index)}
            >
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
          满免
          <Tooltip
            trigger="click"
            placement="topLeft"
            overlay="满多少元免邮费, 0表示不免邮"
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
              &#xe628;
            </i>
          </Tooltip>
        </InputItem>
      </React.Fragment>
    ))
  }

  submit = () => {
    const { match, commodity, history } = this.props
    const { name, checked } = this.state
    const obj = JSON.parse(JSON.stringify(checked))
    const submitObj = []
    obj.map(item => {
      submitObj.push({
        vid: item.vid,
        aids: item.value,
        freight: item.delivery,
        full_money: item.reduction,
      })
    })
    console.log(submitObj)
    const result = {
      tpl_id: match.params.id,
      name,
      area: submitObj,
    }
    console.log(result)
    if (match.params.id) {
      commodity.editExpress(result).then(res => {
        if (res) {
          Toast.success('编辑成功', 1, () => history.goBack())
        }
      })
    } else {
      commodity.addExpress(result).then(res => {
        if (res) {
          Toast.success('新增成功', 1, () => history.goBack())
        }
      })
    }
  }

  render() {
    const { data, open, name } = this.state
    const menuEl = (
      <Menu
        className="menu-position "
        data={data}
        level={1}
        onOk={this.onOk}
        onCancel={() =>
          this.setState({
            open: false,
          })
        }
        height={document.documentElement.clientHeight * 0.6}
        multiSelect
      />
    )
    return (
      <React.Fragment>
        <NavBar title="添加模版" goBack />
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="请输入模版名称"
            value={name}
            onChange={val =>
              this.setState({
                name: val,
              })
            }
          >
            模版名称
          </InputItem>
          <List.Item
            extra={
              <React.Fragment>
                <Button
                  type="ghost"
                  size="small"
                  onClick={() => this.setState({ open: true })}
                >
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

export default ECommerceDeliveryTemplatePanel
