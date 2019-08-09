import React from 'react'
import { Route } from 'react-router-dom'
import {
  List, Switch, Picker, WhiteSpace, Menu, Flex, Toast,
} from 'antd-mobile'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import ModifyPhone from './modify/phone'
import ModifyEmail from './modify/email'
import ModifyDescription from './modify/description'
import ModifyPicture from './modify/picture'
import ModifyDetail from './modify/detail'
import NavBar from '@/common/NavBar'
import {
  CustomizeList, ListTitle, ListContent, PrimaryTag, MenuMask,
} from '@/styled'
import 'rc-tooltip/assets/bootstrap.css'
import utils from '@/utils'

const { Item } = List

@inject('basicInformation')
@observer
class BasicInformation extends React.Component {
  state = {
    menu: false,
  }

  componentDidMount() {
    const { basicInformation, history } = this.props
    basicInformation.fetchCategory()
    basicInformation.fetchBasicInfo()
    if (history.location.search) {
      basicInformation.wxBind(utils.getUrlParam('openid'))
    }
  }

  getMenuList = () => {
    const { basicInformation } = this.props
    const basicInfo = toJS(basicInformation.basicInfo)
    const categoryOption = toJS(basicInformation.categoryOption)
    const cateGoryLabel = []
    categoryOption.forEach(item => {
      if (item.value === basicInfo.cat_fid) {
        cateGoryLabel.push(item.label)
        if (item.children.length) {
          item.children.forEach(child => {
            if (child.value === basicInfo.cat_id) {
              cateGoryLabel.push(child.label)
            }
          })
        }
      }
    })
    return (
      <Flex justify="end">
        {cateGoryLabel.map((item, index) => (
          <PrimaryTag
            key={index}
            style={{ marginLeft: 2 }}
            onClick={() => this.setState({ menu: true })}
          >
            {item}
          </PrimaryTag>
        ))}
      </Flex>
    )
  }

  changeTimeout = val => {
    const { basicInformation } = this.props
    basicInformation.modifyTimeout(val[0])
  }

  changePermission = bool => {
    const { basicInformation } = this.props
    basicInformation.modifyPermission(bool ? '1' : '0')
  }

  changeCategory = async arr => {
    const { basicInformation } = this.props
    await basicInformation.modifyCategory(arr)
    this.setState({ menu: false })
  }

  wxBind = async () => {
    const ua = window.navigator.userAgent.toLowerCase()
    /* eslint eqeqeq: 0 */
    if (!(ua.match(/micromessenger/i) == 'micromessenger')) {
      Toast.info('请在微信环境下进行绑定')
    } else {
      const { basicInformation } = this.props
      await basicInformation.getWxCode()
    }
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
        value={[basicInfo.cat_fid, basicInfo.cat_id]}
        onChange={this.changeCategory}
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
                history.push({
                  pathname: '/setting/basicInformation/modifyPhone',
                  state: {
                    value: basicInfo.phone,
                  },
                })
              }}
            >
              联系电话
            </Item>
            <Item
              extra={basicInfo.email}
              arrow="horizontal"
              onClick={() => {
                history.push({
                  pathname: '/setting/basicInformation/modifyEmail',
                  state: {
                    value: basicInfo.email,
                  },
                })
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
              onChange={this.changeTimeout}
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
            <Item
              extra={
                <Switch checked={basicInfo.is_offline === '1'} onChange={this.changePermission} />
              }
              arrow="empty"
            >
              线下支付权限
            </Item>
            <Item arrow="empty" extra={this.getMenuList()}>
              商户所属分类
            </Item>
          </List>
          <List renderHeader="商家描述">
            <Item
              extra={basicInfo.txt_info}
              arrow="horizontal"
              onClick={() => {
                history.push({
                  pathname: '/setting/basicInformation/modifyDescription',
                  state: {
                    value: basicInfo.txt_info,
                  },
                })
              }}
            >
              商户描述
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => {
                history.push({
                  pathname: '/setting/basicInformation/modifyPicture',
                  state: {
                    action: 'modifyLogoUrl',
                    aspectratio: 1 / 1,
                  },
                })
              }}
            >
              <CustomizeList>
                <ListTitle>商户LOGO</ListTitle>
                <ListContent>
                  <img src={basicInfo.service_ico} alt="" />
                </ListContent>
              </CustomizeList>
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => {
                history.push({
                  pathname: '/setting/basicInformation/modifyPicture',
                  state: {
                    action: 'modifyImgUrl',
                    aspectratio: 2 / 1,
                  },
                })
              }}
            >
              <CustomizeList>
                <ListTitle>商户图片</ListTitle>
                <ListContent>
                  <img src={basicInfo.pic_info} alt="" />
                </ListContent>
              </CustomizeList>
            </Item>
            <Item
              extra="前往修改"
              arrow="horizontal"
              onClick={() => {
                history.push({
                  pathname: '/setting/basicInformation/modifyDetail',
                  state: {
                    value: basicInfo.content,
                  },
                })
              }}
            >
              商户详情
            </Item>
          </List>
          <List renderHeader="绑定微信">
            <Item arrow="horizontal" onClick={this.wxBind}>
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

export default () => (
  <React.Fragment>
    <Route path="/setting/basicInformation" exact component={BasicInformation} />
    <Route path="/setting/basicInformation/modifyPhone" component={ModifyPhone} />
    <Route path="/setting/basicInformation/modifyEmail" component={ModifyEmail} />
    <Route path="/setting/basicInformation/modifyDescription" component={ModifyDescription} />
    <Route path="/setting/basicInformation/modifyPicture" component={ModifyPicture} />
    <Route path="/setting/basicInformation/modifyDetail" component={ModifyDetail} />
  </React.Fragment>
)
