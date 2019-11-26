import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Toast,
  List,
  Switch,
  ImagePicker,
  InputItem,
  TextareaItem,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import CropperImgModal from '@/common/UploadImg/CropperImgModal'
import Tooltip from 'rc-tooltip'
import { observer, inject } from 'mobx-react'

let textColor = '#ffffff'
@createForm()
@inject('member')
@observer
class MemberCardBasicInfo extends React.Component {
  state = {
    logoOpen: false,
    diyOpen: false,
    cardDetail: {},
  }
  componentDidMount() {
    const { member, form } = this.props
    member.readMemberCardBasicInfoDetail().then(res => {
      const detail = res.card
      form.setFieldsValue({
        status: detail.status === '1',
        logo: [{ url: detail.logo }],
        background_img: detail.diybg ? false : true,
        diybg: [{ url: detail.diybg }],
        numbercolor: detail.numbercolor,
        discount: detail.discount,
        self_get: detail.self_get === '1',
        is_physical_card: detail.is_physical_card === '1',
        auto_get: detail.auto_get === '1',
        auto_get_buy: detail.auto_get_buy === '1',
        is_index: detail.is_index === '1',
        posters: [{ url: detail.posters }],
        auto_get_coupon: detail.auto_get_coupon === '1',
        weixin_send: detail.weixin_send === '1',
        recharge_des: detail.recharge_des,
        score_des: detail.score_des,
        info: detail.info,
      })
      console.log(res)
    })
  }

  onClose = () => {
    console.log(11)
  }

  cropper = data => {
    const { form } = this.props
    this.setState({
      logoOpen: false,
    })
    form.setFieldsValue({
      logo: [
        {
          url: data,
        },
      ],
    })
    console.log(data)
  }

  _submit = () => {
    const { form, member, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const keys = Object.keys(value)
      keys.forEach(item => {
        if (value[item] === false) {
          value[item] = '0'
        } else if (value[item] === true) {
          value[item] = '1'
        }
      })
      value.diybg = value.diybg[0].url
      value.logo = value.logo[0].url
      value.posters = value.posters[0].url
      console.log(value)
      member.updateCardBasicInfo(value).then(() => {
        Toast.success('操作成功', 1, () => {
          history.goBack()
        })
      })
    })
  }
  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { logoOpen, diyOpen, bannerOpen } = this.state
    const logo = form.getFieldValue('logo') ? form.getFieldValue('logo') : []
    const diybg = form.getFieldValue('diybg') ? form.getFieldValue('diybg') : []
    const posters = form.getFieldValue('posters')
      ? form.getFieldValue('posters')
      : []
    const default_img = form.getFieldValue('background_img') ? true : false
    return (
      <div>
        <NavBar
          title="会员卡基本信息"
          goBack
          right={<div onClick={this._submit}>保存</div>}
        />
        <List renderHeader="基础信息">
          <List.Item
            extra={
              <Switch
                {...getFieldProps('status', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            启用
          </List.Item>
          <List.Item>
            会员卡LOGO
            <ImagePicker
              {...getFieldProps('logo', {
                rules: [{ required: true }],
                valuePropName: 'files',
              })}
              selectable={logo.length < 1}
              onAddImageClick={e => {
                this.setState({
                  logoOpen: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('background_img', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            使用默认背景图
          </List.Item>
          {default_img ? (
            <List.Item arrow="horizontal">选择默认背景图</List.Item>
          ) : (
            <List.Item>
              上传背景图
              <ImagePicker
                {...getFieldProps('diybg', {
                  rules: [{ required: true }],
                  valuePropName: 'files',
                })}
                selectable={diybg.length < 1}
                onAddImageClick={e => {
                  this.setState({
                    diyOpen: true,
                  })
                  e.preventDefault()
                }}
              />
            </List.Item>
          )}
          <List.Item>
            卡号文字颜色
            <input
              {...getFieldProps('numbercolor', {
                rules: [{ required: true }],
                normalize: val => {
                  textColor = val
                  return val
                },
              })}
              value={textColor}
              style={{ float: 'right' }}
              type="color"
            />
          </List.Item>
          <InputItem
            {...getFieldProps('discount', {
              rules: [{ required: true }],
            })}
            placeholder="请输入会员卡折扣数"
          >
            会员卡折扣数
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('self_get', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            用户自助领卡
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户访问会员卡页面时自动领卡"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_physical_card', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            支持实体卡
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户会员卡页面出现绑定实体卡选项"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('auto_get', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            扫码自动领卡
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="扫描商家渠道二维码自动领卡"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('auto_get_buy', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            消费自动领卡
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="购买商家商品后自动领卡"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_index', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            是否推送到首页
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="首页是否显示海报"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item>
            首页海报
            <ImagePicker
              {...getFieldProps('posters', {
                rules: [{ required: true }],
                valuePropName: 'files',
              })}
              selectable={posters.length < 1}
              onAddImageClick={e => {
                this.setState({
                  bannerOpen: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
        </List>
        <List renderHeader="优惠券">
          <List.Item
            extra={
              <Switch
                {...getFieldProps('auto_get_coupon', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            自动领优惠券
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="仅限第一次领卡时触发"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('weixin_send', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            消费自动领优惠券
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="暂时仅支持微信中购买商家商品自动派发优惠券"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
        </List>
        <List renderHeader="使用说明">
          <TextareaItem
            title="充值说明"
            {...getFieldProps('recharge_des', {
              rules: [{ required: true }],
            })}
            placeholder="请输入充值说明"
            rows={5}
            count={100}
          />
          <TextareaItem
            title="积分说明"
            {...getFieldProps('score_des', {
              rules: [{ required: true }],
            })}
            placeholder="请输入积分说明"
            rows={5}
            count={100}
          />
          <TextareaItem
            title="会员卡说明"
            {...getFieldProps('info', {
              rules: [{ required: true }],
            })}
            placeholder="请输入会员卡说明"
            rows={5}
            count={100}
          />
        </List>
        <CropperImgModal
          open={logoOpen}
          aspectratio={1}
          cropper={this.cropper}
          close={() => this.setState({ logoOpen: false })}
        />
      </div>
    )
  }
}

export default MemberCardBasicInfo
