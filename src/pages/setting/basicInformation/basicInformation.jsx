import React from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { List, Switch, Picker, WhiteSpace } from 'antd-mobile'
import { CustomizeList, ListTitle, ListContent, PrimaryTag } from '@/styled'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const { Item } = List

export default withRouter(props => {
  console.log(props)
  return (
    <React.Fragment>
      <NavBar title="基本信息" goBack />
      <form>
        <List renderHeader="基本信息">
          <Item extra="18033661270" arrow="empty">
            商户账号
          </Item>
          <Item extra="cc" arrow="empty">
            商户名称
          </Item>
          <Item
            extra="18033661270"
            arrow="horizontal"
            onClick={() => {
              props.history.push('/setting/basicInformation/modifyPhone')
            }}
          >
            联系电话
          </Item>
          <Item
            extra="102075776@qq.com"
            arrow="horizontal"
            onClick={() => {
              props.history.push('/setting/basicInformation/modifyEmail')
            }}
          >
            商家邮箱
          </Item>
          <Picker
            data={[
              {
                label: '永不超时',
                value: '2013',
              },
              {
                label: '一天后超时并确认消费',
                value: '2014',
              },
            ]}
            cols={1}
          >
            <Item extra="0" arrow="horizontal" onClick={() => {}}>
              超时时间
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="团购快递收货超时时间，0为永不超时，1为一天后超时并确认消费。（店员发货后开始计时）"
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
            </Item>
          </Picker>
          <Item extra={<Switch />} arrow="empty">
            线下支付权限
          </Item>
          <Item
            arrow="empty"
            extra={
              <PrimaryTag style={{ width: '50%', float: 'right' }}>
                上门服务
              </PrimaryTag>
            }
          >
            商户所属分类
          </Item>
        </List>
        <List renderHeader="商家描述">
          <Item
            extra="我是商户描述你信吗？我是商户描述你信吗？我是商户描述你信吗？我是商户描述你信吗？"
            arrow="horizontal"
            onClick={() => {}}
          >
            商户描述
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
          <Item
            extra="我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？我是商户详情你信吗？"
            arrow="horizontal"
            onClick={() => {}}
          >
            商户详情
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
})
