import React from 'react'
import NavBar from '@/common/NavBar'
import { Picker, List, InputItem } from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const seasons = [
  [
    {
      label: '正常',
      value: '2013',
    },
    {
      label: '停售',
      value: '2014',
    },
  ],
]
class RetailAdd extends React.Component {
  state = {
    selectValue: ['2013'],
  }

  render() {
    const { selectValue } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="添加零售商品"
          goBack
        />
        <form>
          <List>
            <InputItem
              placeholder="请填写商品名称"
            >商品名称
            </InputItem>
            <InputItem
              placeholder="请填写商品条形码"
            >商品条形码
            </InputItem>
            <InputItem
              placeholder="请填写商品单位，如个、斤、份"
            >商品单位
            </InputItem>
            <Picker
              data={seasons}
              cascade={false}
              extra="请选择"
              value={selectValue}
              onChange={v => {
                this.setState({
                  selectValue: v,
                })
              }}
            >
              <List.Item arrow="horizontal">商品分类</List.Item>
            </Picker>
            <InputItem
              defaultValue=""
              placeholder="请填写商品价格"
            >商品价格
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="最多支持两位小数，下同"
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
              defaultValue=""
              placeholder="请填写商品原价"
            >商品原价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="原价可不填，不填和现价一样"
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
              defaultValue=""
              placeholder="请填写商品进价"
            >商品进价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="进货价用户是看不到的"
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
              defaultValue=""
              placeholder="请填写商品现价"
            >商品现价
            </InputItem>
          </List>
        </form>
      </React.Fragment>
    )
  }
}
export default RetailAdd
