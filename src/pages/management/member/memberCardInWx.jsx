import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List,
  InputItem,
  TextareaItem,
  Checkbox,
  ImagePicker,
  Button,
  Toast,
  Radio,
  Modal,
  Flex,
} from 'antd-mobile'
import CropperImgModal from '@/common/UploadImg/CropperImgModal'
import { createForm } from 'rc-form'

const { RadioItem } = Radio
const { CheckboxItem } = Checkbox
let textColor = '#ffffff'

@createForm()
@inject('member')
@observer
class MemberCardInWx extends React.Component {
  state = {
    imgOpen: false,
    detail: {},
    selected: [],
    curImg: '',
    colorList: {},
    color: '',
    checkboxValue: [
      {
        label: '外卖服务',
        value: 'BIZ_SERVICE_DELIVER',
      },
      {
        label: '停车位',
        value: 'BIZ_SERVICE_FREE_PARK',
      },
      {
        label: '可带宠物',
        value: 'BIZ_SERVICE_WITH_PET',
      },
      {
        label: '免费Wi-Fi',
        value: 'BIZ_SERVICE_FREE_WIFI',
      },
    ],
  }
  componentDidMount() {
    const { member, form } = this.props
    member.readMemberCardBasicInfoDetail().then(res => {
      const detail = res.card
      const keys = Object.keys(res.color_list)
      let wxColor = ''
      keys.forEach(item => {
        if (item === detail.wx_param.color) {
          wxColor = res.color_list[item]
        }
      })
      form.setFieldsValue({
        wx_title: detail.wx_param.title,
        wx_notice: detail.wx_param.notice,
        wx_color: wxColor,
        wx_prerogative: detail.wx_param.prerogative,
        wx_center_title: detail.wx_param.center_title,
        wx_center_sub_title: detail.wx_param.center_sub_title,
        wx_center_url: detail.wx_param.center_url,
        wx_custom_url_name: detail.wx_param.custom_url_name,
        wx_custom_url_sub_title: detail.wx_param.custom_url_sub_title,
        wx_custom_url: detail.wx_param.custom_url,
        wx_custom_cell1_name: detail.wx_param.custom_cell1_name,
        wx_custom_cell1_tips: detail.wx_param.custom_cell1_tips,
        wx_custom_cell1_url: detail.wx_param.custom_cell1_url,
        wx_custom_cell2_name: detail.wx_param.custom_cell2_name,
        wx_custom_cell2_tips: detail.wx_param.custom_cell2_tips,
        wx_custom_cell2_url: detail.wx_param.custom_cell2_url,
        wx_promotion_url_name: detail.wx_param.promotion_url_name,
        wx_promotion_url_sub_title: detail.wx_param.promotion_url_sub_title,
        wx_promotion_url: detail.wx_param.promotion_url,
      })
      this.setState({
        selected: detail.wx_param.business_service,
        detail: res.card,
        colorList: res.color_list,
        color: detail.wx_param.color,
      })
    })
  }

  mapColorList = () => {
    const { colorList, color } = this.state
    const keys = Object.keys(colorList)
    return keys.map(i => {
      return (
        <RadioItem
          checked={color === colorList[i]}
          key={colorList[i]}
          onChange={e => this.onChangeColor(e, i)}
        >
          <div style={{ color: colorList[i] }}>{colorList[i]}</div>
        </RadioItem>
      )
    })
  }

  onChangeColor = (e, value) => {
    this.setState({
      color: value,
      colorOpen: false,
    })
  }

  cropper = data => {
    const { form } = this.props
    const { curImg, detail } = this.state
    detail.wx_param.text_image_list[curImg].image_url = data
    this.setState({
      imgOpen: false,
      detail: detail,
    })
    form.setFieldsValue({
      [`wx_image_url${curImg}`]: [
        {
          url: data,
        },
      ],
    })
  }

  mapImage = () => {
    const { form } = this.props
    const { getFieldProps } = form
    const { detail } = this.state
    if (!detail.wx_param) return
    return detail.wx_param.text_image_list.map((item, index) => {
      return (
        <List
          renderHeader={
            <div>
              图文消息 {index + 1}
              <Button
                style={{
                  display: 'inline-block',
                  verticalAlign: 'sub',
                  marginLeft: 10,
                }}
                size="small"
                type="warning"
                onClick={() => this.deleteImage(index)}
              >
                删除
              </Button>
            </div>
          }
          key={index}
        >
          <List.Item>
            图文{index + 1}
            <ImagePicker
              {...getFieldProps(`wx_image_url${index}`, {
                rules: [{ required: true }],
                initialValue: item.image_url ? [{ url: item.image_url }] : [],
                valuePropName: 'files',
              })}
              selectable={
                form.getFieldValue(`wx_image_url${index}`)
                  ? form.getFieldValue(`wx_image_url${index}`).length < 1
                  : false
              }
              onAddImageClick={e => {
                this.setState({
                  curImg: index,
                  imgOpen: true,
                })
                e.preventDefault()
              }}
            />
          </List.Item>
          <TextareaItem
            {...getFieldProps(`wx_text${index}`, {
              rules: [{ required: true }],
              initialValue: item.text,
            })}
            onChange={val => {
              const list = detail.wx_param.text_image_list
              list[index].text = val
              this.setState({
                detail: detail,
              })
            }}
            title={`图文描述${index + 1}`}
            placeholder={`图文描述${index + 1}`}
            rows={3}
            autoHeight
          />
        </List>
      )
    })
  }

  onCheckBoxChange = (e, value) => {
    const { selected } = this.state
    if (e.target.checked) {
      this.setState({
        selected: [...new Set([...selected, value])],
      })
    } else {
      const index = selected.findIndex(item => item === value)
      const arr = selected
      arr.splice(index, 1)
      this.setState({
        selected: arr,
      })
    }
  }

  mapCheckBox = () => {
    const { detail, checkboxValue } = this.state
    if (!detail.wx_param) return
    return checkboxValue.map(item => {
      if (detail.wx_param.business_service.indexOf(item.value) > -1) {
        return (
          <CheckboxItem key={item.value} checked disabled>
            {item.label}
          </CheckboxItem>
        )
      } else {
        return (
          <CheckboxItem
            onChange={e => this.onCheckBoxChange(e, item.value)}
            key={item.value}
          >
            {item.label}
          </CheckboxItem>
        )
      }
    })
  }

  addImage = () => {
    const { detail } = this.state
    const obj = detail
    obj.wx_param.text_image_list.push({
      image_url: '',
      text: '',
    })
    this.setState({
      detail: obj,
    })
  }

  deleteImage = index => {
    const { form } = this.props
    const { detail } = this.state
    const arr = detail.wx_param.text_image_list
    arr.splice(index, 1)
    const obj = detail
    obj.wx_param.text_image_list = arr
    this.setState({
      detail: obj,
    })
    detail.wx_param.text_image_list.forEach((item, index) => {
      form.setFieldsValue({
        [`wx_image_url${index}`]: [
          {
            url: item.image_url,
          },
        ],
      })
    })
  }

  getColor = value => {
    const { colorList } = this.state
    const keys = Object.keys(colorList)
    let color = '#000'
    keys.forEach(item => {
      if (item === value) {
        color = colorList[item]
      }
    })
    return color
  }

  _submit = () => {
    const { form, member, history } = this.props
    const { selected, color } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const keys = Object.keys(value)
      value.wx_image_url = []
      value.wx_text = []
      keys.forEach(item => {
        if (item.indexOf('wx_text') > -1) {
          value.wx_text.push(value[item])
        }
        if (item.indexOf('wx_image_url') > -1) {
          value.wx_image_url.push(value[item][0].url)
        }
      })
      value.wx_business_service = selected
      value.wx_color = color
      console.log(value)
      member.updateCardWxInfo(value).then(() => {
        Toast.success('操作成功', 1, () => {
          history.goBack()
        })
      })
    })
  }
  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { detail, imgOpen, colorOpen, color } = this.state
    return (
      <div>
        <NavBar
          title="微信会员卡"
          goBack
          right={<div onClick={this._submit}>保存</div>}
        />
        <List renderHeader="基本信息">
          <InputItem
            {...getFieldProps('wx_title', {
              rules: [{ required: true }],
              initialValue: detail.wx_title,
            })}
            placeholder="会员卡名称"
          >
            会员卡名称
          </InputItem>
          <InputItem
            {...getFieldProps('wx_notice', {
              rules: [{ required: true }],
              initialValue: detail.wx_notice,
            })}
            placeholder="提醒文字"
          >
            会员卡提醒
          </InputItem>
          {/* <List.Item>
            会员卡颜色
            <input
              {...getFieldProps('wx_color', {
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
          </List.Item> */}
          <List.Item
            arrow="horizontal"
            extra={
              <div style={{ color: this.getColor(color) }}>
                {this.getColor(color)}
              </div>
            }
            onClick={() => this.setState({ colorOpen: true })}
          >
            卡券颜色
          </List.Item>
          <TextareaItem
            {...getFieldProps('wx_prerogative', {
              rules: [{ required: true }],
              initialValue: detail.wx_prerogative,
            })}
            title="特权说明"
            placeholder="说明文本"
            rows={3}
            autoHeight
          />
        </List>
        <List renderHeader="中间按钮">
          <InputItem
            {...getFieldProps('wx_center_title', {
              rules: [{ required: true }],
              initialValue: detail.wx_center_title,
            })}
          >
            标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_center_sub_title', {
              rules: [{ required: true }],
              initialValue: detail.wx_center_sub_title,
            })}
          >
            副标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_center_url', {
              rules: [{ required: true }],
              initialValue: detail.wx_center_url,
            })}
          >
            链接地址
          </InputItem>
        </List>
        <List renderHeader="自定义类目1（选填）">
          <InputItem
            {...getFieldProps('wx_custom_url_name', {
              initialValue: detail.wx_custom_url_name,
            })}
          >
            标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_url_sub_title', {
              initialValue: detail.wx_custom_url_sub_title,
            })}
          >
            副标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_url', {
              initialValue: detail.wx_custom_url,
            })}
          >
            链接地址
          </InputItem>
        </List>
        <List renderHeader="自定义类目2（选填）">
          <InputItem
            {...getFieldProps('wx_custom_cell1_name', {
              initialValue: detail.wx_custom_cell1_name,
            })}
          >
            标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_cell1_tips', {
              initialValue: detail.wx_custom_cell1_tips,
            })}
          >
            副标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_cell1_url', {
              initialValue: detail.wx_custom_cell1_url,
            })}
          >
            链接地址
          </InputItem>
        </List>
        <List renderHeader="自定义类目3（选填）">
          <InputItem
            {...getFieldProps('wx_custom_cell2_name', {
              initialValue: detail.wx_custom_cell2_name,
            })}
          >
            标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_cell2_tips', {
              initialValue: detail.wx_custom_cell2_tips,
            })}
          >
            副标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_custom_cell2_url', {
              initialValue: detail.wx_custom_cell2_url,
            })}
          >
            链接地址
          </InputItem>
        </List>
        <List renderHeader="自定义类目4（选填）">
          <InputItem
            {...getFieldProps('wx_promotion_url_name', {
              initialValue: detail.wx_promotion_url_name,
            })}
          >
            标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_promotion_url_sub_title', {
              initialValue: detail.wx_promotion_url_sub_title,
            })}
          >
            副标题
          </InputItem>
          <InputItem
            {...getFieldProps('wx_promotion_url', {
              initialValue: detail.wx_promotion_url,
            })}
          >
            链接地址
          </InputItem>
        </List>
        <List renderHeader="服务类型（设置后不能取消）">
          {this.mapCheckBox()}
        </List>
        <List renderHeader="卡券图文（图片大小1MB）">
          <List.Item
            extra={
              <div>
                <Button size="small" type="primary" onClick={this.addImage}>
                  新增
                </Button>
              </div>
            }
          >
            图文消息
          </List.Item>
        </List>
        {this.mapImage()}
        <CropperImgModal
          open={imgOpen}
          aspectratio={1}
          cropper={this.cropper}
          close={() => this.setState({ imgOpen: false })}
        />
        <Modal
          style={{ height: '100vh' }}
          popup
          visible={colorOpen}
          animationType="slide-up"
        >
          <List style={{ marginBottom: 47 }}>{this.mapColorList()}</List>
          <Flex
            style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10 }}
          >
            <Flex.Item>
              <Button onClick={() => this.setState({ colorOpen: false })}>
                关闭
              </Button>
            </Flex.Item>
          </Flex>
        </Modal>
      </div>
    )
  }
}

export default MemberCardInWx
