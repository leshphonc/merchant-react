import React from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import {
  List, Switch, Picker, WhiteSpace, Menu,
} from 'antd-mobile'
import {
  CustomizeList, ListTitle, ListContent, PrimaryTag, MenuMask,
} from '@/styled'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const { Item } = List

@withRouter
@inject('basicInformation')
@observer
class BasicInformation extends React.Component {
  state = {
    menu: false,
  }

  componentDidMount() {
    const { basicInformation } = this.props
    basicInformation.fetchBasicInfo()
    basicInformation.fetchCategory()
  }

  render() {
    const { history, basicInformation } = this.props
    const basicInfo = toJS(basicInformation.basicInfo)
    const categoryOption = toJS(basicInformation.categoryOption)
    const { menu } = this.state
    const menuEl = (
      <Menu
        className="menu-position"
        data={categoryOption}
        onChange={() => this.setState({ menu: false })}
      />
    )
    return (
      <React.Fragment>
        <NavBar title="基本信息" goBack />
        <form>
          <List renderHeader="基本信息">
            <Item extra={basicInfo.account} arrow="empty">
              商户账号
            </Item>
            <Item extra={basicInfo.name} arrow="empty">
              商户名称
            </Item>
            <Item
              extra={basicInfo.phone}
              arrow="horizontal"
              onClick={() => {
                history.push('/setting/basicInformation/modifyPhone')
              }}
            >
              联系电话
            </Item>
            <Item
              extra={basicInfo.email}
              arrow="horizontal"
              onClick={() => {
                history.push('/setting/basicInformation/modifyEmail')
              }}
            >
              商家邮箱
            </Item>
            <Picker
              data={[
                {
                  label: '永不超时',
                  value: '0',
                },
                {
                  label: '一天后超时并确认消费',
                  value: '1',
                },
              ]}
              value={[basicInfo.group_express_outtime]}
              cols={1}
            >
              <Item arrow="horizontal" onClick={() => {}}>
                超时时间
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="团购快递收货超时时间，0为永不超时，1为一天后超时并确认消费。（店员发货后开始计时）"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
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
                <PrimaryTag
                  style={{ width: '50%', float: 'right' }}
                  onClick={() => this.setState({ menu: true })}
                >
                  上门服务
                </PrimaryTag>
              }
            >
              商户所属分类
            </Item>
          </List>
          <List renderHeader="商家描述">
            <Item
              extra={basicInfo.txt_info}
              arrow="horizontal"
              onClick={() => {
                history.push('/setting/basicInformation/modifyDescription')
              }}
            >
              商户描述
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => {
                history.push('/setting/basicInformation/modifyPicture')
              }}
            >
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
              extra="前往修改"
              arrow="horizontal"
              onClick={() => {
                history.push('/setting/basicInformation/modifyDetail')
              }}
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
        {menu ? menuEl : null}
        {menu ? <MenuMask onClick={() => this.setState({ menu: false })} /> : null}
      </React.Fragment>
    )
  }
}

export default BasicInformation
