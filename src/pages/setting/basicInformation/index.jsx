import React from 'react'
import { Route } from 'react-router-dom'
import {
  List, Switch, Picker, WhiteSpace, Menu, Flex, Toast,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Tooltip from 'rc-tooltip'
import ModifyPhone from './modify/phone'
import ModifyEmail from './modify/email'
import ModifyDescription from './modify/description'
import ModifyPicture from './modify/picture'
import ModifyDetail from './modify/detail'
import ModifyCoordinate from './modify/coordinate'
import ModifyAddress from './modify/address'
import NavBar from '@/common/NavBar'
import {
  CustomizeList, ListTitle, ListContent, PrimaryTag, MenuMask,
} from '@/styled'
import 'rc-tooltip/assets/bootstrap.css'
import Utils from '@/utils'

const { Item } = List

@inject('basicInformation', 'common')
@observer
class BasicInformation extends React.Component {
  state = {
    menu: false,
  }

  componentDidMount() {
    const { basicInformation, common } = this.props
    basicInformation.fetchCategory()
    basicInformation.fetchBasicInfo()
    const code = Utils.getUrlParam('code')
    if (code) {
      common.fetchOpenId(code).then(res => {
        if (res) {
          basicInformation.wxBind(common.openid).then(res2 => {
            if (res2) {
              Toast.success('绑定成功', 1, () => {
                basicInformation.fetchBasicInfo()
                window.location.search = ''
              })
            } else {
              window.location.search = ''
            }
          })
        }
      })
      // const openid = sessionStorage.getItem('openid')
      // basicInformation.wxBind(openid)
    }
  }

  getMenuList = () => {
    const { basicInformation } = this.props
    const { basicInfo } = basicInformation
    const { categoryOption } = basicInformation
    const cateGoryLabel = []
    if (!categoryOption) return false
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
            onClick={() => {
              document.body.style.position = 'fixed'
              this.setState({ menu: true })
            }}
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
    document.body.style.position = 'static'
    this.setState({ menu: false })
  }

  wxBind = async () => {
    const { basicInformation, common } = this.props
    const { basicInfo } = basicInformation
    const ua = window.navigator.userAgent.toLowerCase()
    /* eslint eqeqeq: 0 */
    if (!(ua.match(/micromessenger/i) == 'micromessenger')) {
      Toast.info('请在微信环境下进行绑定')
    } else if (!basicInfo.uid) {
      common.getWxCode()
      // await basicInformation.getWxCode()
    } else {
      Toast.info('已绑定微信，无需重复绑定')
    }
  }

  render() {
    const { history, basicInformation } = this.props
    const { basicInfo, categoryOption } = basicInformation
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
        <NavBar title="基本信息" goBack="/" />
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
              onClick={() => history.push(`/setting/basicInformation/modifyPhone/${basicInfo.phone}`)
              }
            >
              联系电话
            </Item>
            <Item
              extra={basicInfo.email}
              arrow="horizontal"
              onClick={() => history.push(`/setting/basicInformation/modifyEmail/${basicInfo.email}`)
              }
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
            >
              线下支付权限
            </Item>
            <Item
              arrow="horizontal"
              extra={`${basicInfo.long || 0}, ${basicInfo.lat || 0}`}
              onClick={() => history.push(
                `/setting/basicInformation/modifyCoordinate/${basicInfo.long}/${basicInfo.lat}`,
              )
              }
            >
              商户经纬度
            </Item>
            <Item
              arrow="horizontal"
              wrap
              extra={basicInfo.adress}
              onClick={() => history.push(`/setting/basicInformation/modifyAddress/${basicInfo.adress}`)
              }
            >
              详细地址
            </Item>
            <Item extra={this.getMenuList()}>商户所属分类</Item>
          </List>
          <List renderHeader="商家描述">
            <Item
              extra={basicInfo.txt_info}
              arrow="horizontal"
              onClick={() => history.push(`/setting/basicInformation/modifyDescription/${basicInfo.txt_info}`)
              }
            >
              商户描述
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => history.push('/setting/basicInformation/modifyPicture/modifyLogoUrl/1')
              }
            >
              <CustomizeList>
                <ListTitle>商户LOGO</ListTitle>
                <ListContent>
                  <img src={basicInfo.service_ico} className="w40" alt="" />
                </ListContent>
              </CustomizeList>
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => history.push('/setting/basicInformation/modifyPicture/modifyImgUrl/2')}
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
              onClick={() => history.push('/setting/basicInformation/modifyDetail')}
            >
              商户详情
            </Item>
          </List>
          <List renderHeader="绑定微信">
            <Item
              arrow="horizontal"
              onClick={this.wxBind}
              extra={basicInfo.uid ? '已绑定' : '点击绑定'}
            >
              绑定微信
            </Item>
          </List>
          <WhiteSpace />
        </form>
        {menu ? menuEl : null}
        {menu ? (
          <MenuMask
            onClick={() => {
              document.body.style.position = 'static'
              this.setState({ menu: false })
            }}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/setting/basicInformation" exact component={BasicInformation} />
    <Route path="/setting/basicInformation/modifyPhone/:value" component={ModifyPhone} />
    <Route path="/setting/basicInformation/modifyEmail/:value" component={ModifyEmail} />
    <Route
      path="/setting/basicInformation/modifyDescription/:value"
      component={ModifyDescription}
    />
    <Route
      path="/setting/basicInformation/modifyPicture/:action/:aspectratio"
      component={ModifyPicture}
    />
    <Route path="/setting/basicInformation/modifyDetail" component={ModifyDetail} />
    <Route path="/setting/basicInformation/modifyAddress/:address?" component={ModifyAddress} />
    <Route
      path="/setting/basicInformation/modifyCoordinate/:lng/:lat"
      component={ModifyCoordinate}
    />
  </React.Fragment>
)
