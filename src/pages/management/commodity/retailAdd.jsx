import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Picker, List, InputItem, ImagePicker, WingBlank,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { Title } from './styled'

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
const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
]
class RetailAdd extends React.Component {
  state = {
    selectValue: ['2013'],
    files: data,
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
    })
  }

  render() {
    const { selectValue } = this.state
    const { files } = this.state
    return (
      <React.Fragment>
        <NavBar title="添加零售商品" goBack />
        <form>
          <List>
            <InputItem placeholder="请填写商品名称">商品名称</InputItem>
            <InputItem placeholder="请填写商品条形码">商品条形码</InputItem>
            <InputItem placeholder="请填写商品单位，如个、斤、份">商品单位</InputItem>
            <InputItem defaultValue="" placeholder="请填写商品价格">
              商品价格
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="最多支持两位小数，下同"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写商品原价">
              商品原价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="原价可不填，不填和现价一样"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写商品进价">
              商品进价
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="进货价用户是看不到的"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写商品现价">
              商品现价
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写数值">
              商品排序
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="默认添加顺序排序。数值越大，排序越前"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写库存数">
              商品库存
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="-1表示无限量。数量小于10时，商品详细页面会显示库存。"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
            <InputItem defaultValue="" placeholder="请填写打包费用">
              打包费
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
              <List.Item arrow="horizontal">商品状态</List.Item>
            </Picker>
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
              <List.Item arrow="horizontal">商品类别</List.Item>
            </Picker>
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
              <List.Item arrow="horizontal">选择添加到的店铺</List.Item>
            </Picker>
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
              <List.Item arrow="horizontal">选择添加到的分类</List.Item>
            </Picker>
            <Title>
              <InputItem defaultValue="" placeholder="请填写限时价">
                商品限时价
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="0表示无限时价。"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </Title>
            <Title>
              <InputItem defaultValue="" placeholder="请填写库存">
                限时价库存
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="-1表示无限量。"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                    &#xe628;
                  </i>
                </Tooltip>
              </InputItem>
            </Title>
            <WingBlank>
              <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 5}
                accept="image/gif,image/jpeg,image/jpg,image/png"
              />
            </WingBlank>
          </List>
        </form>
      </React.Fragment>
    )
  }
}
export default RetailAdd
