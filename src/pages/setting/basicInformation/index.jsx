import React from 'react'
import NavBar from '@/common/NavBar'
import { List, Switch, Tag, WhiteSpace } from 'antd-mobile'
import { CustomizeList, ListTitle, ListContent } from '@/global'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const { Item } = List

export default props => {
  return (
    <React.Fragment>
      <NavBar title="基本信息" goBack />
      <form>
        <List renderHeader="基本信息">
          <Item arrow="empty">
            <CustomizeList>
              <ListTitle>商户账号</ListTitle>
              <ListContent>18033661270</ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="empty">
            <CustomizeList>
              <ListTitle>商户名称</ListTitle>
              <ListContent>cc</ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>联系电话</ListTitle>
              <ListContent>18033661270</ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>商家邮箱</ListTitle>
              <ListContent>102075776@qq.com</ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>
                超时时间
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="团购快递收货超时时间，0为永不超时，1为一天后超时并确认消费。（店员发货后开始计时）"
                >
                  <i
                    className="iconfont"
                    style={{ marginLeft: 10, color: '#bbb' }}
                  >
                    &#xe628;
                  </i>
                </Tooltip>
              </ListTitle>
              <ListContent>0</ListContent>
            </CustomizeList>
          </Item>
          <Item extra={<Switch />}>线下支付权限</Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>微官网点击量</ListTitle>
              <ListContent>0</ListContent>
            </CustomizeList>
          </Item>
          <Item
            arrow="empty"
            extra={
              <React.Fragment>
                <Tag small style={{ marginRight: 5 }}>
                  上门服务
                </Tag>
                <Tag small>按摩</Tag>
              </React.Fragment>
            }
          >
            商户所属分类
          </Item>
        </List>
        <List renderHeader="商家描述">
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>商户描述</ListTitle>
              <ListContent className="wrap">
                我是商户描述你信吗？我是商户描述你信吗？我是商户描述你信吗？我是商户描述你信吗？
              </ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>商户图片</ListTitle>
              <ListContent>
                <img
                  src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=2c156b13a3345982d187edc06d9d5ac8/ae51f3deb48f8c542f263a4834292df5e1fe7fe4.jpg"
                  alt=""
                />
              </ListContent>
            </CustomizeList>
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            <CustomizeList>
              <ListTitle>商户详情</ListTitle>
              <ListContent className="wrap">
                我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？
              </ListContent>
            </CustomizeList>
          </Item>
        </List>
        <List renderHeader="绑定微信">
          <Item arrow="horizontal" onClick={() => {}}>
            绑定微信
          </Item>
        </List>
        <WhiteSpace />
      </form>
    </React.Fragment>
  )
}
