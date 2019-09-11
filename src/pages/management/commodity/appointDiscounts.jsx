import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Toast, Picker, ImagePicker,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import { toJS } from 'mobx'
import MultipleImg from '@/common/UploadImg/Multiple'

const { Item } = List
const seckill = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('commodity')
@observer
class AppointDiscounts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // userLevels: [],
      give: [],
      envoList: [],
      score_name: '',
      dhb_name: '',
      mul: false,
      typePic: '',
      indexPic: '',
    }
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    commodity.fetchCardGroupAll()
    const alias = JSON.parse(localStorage.getItem('alias'))
    alias.forEach(item => {
      if (item.name === 'score_name') {
        this.setState({
          score_name: item.value,
        })
      }
      if (item.name === 'dhb_name') {
        this.setState({
          dhb_name: item.value,
        })
      }
    })
    if (!match.params.id) return
    commodity.fetchGiftVoucher()
    commodity.fetchReserveDetail(match.params.id).then(() => {
      const { appointDetail } = commodity
      // eslint-disable-next-line camelcase
      const envo_info_list = toJS(appointDetail.envo_info_list)
      envo_info_list.forEach((item, index) => {
        envo_info_list[index].envo_before_select_pic = envo_info_list[index].envo_before_select_pic
          ? [{ url: envo_info_list[index].envo_before_select_pic }]
          : []
        envo_info_list[index].envo_after_select_pic = envo_info_list[index].envo_after_select_pic
          ? [{ url: envo_info_list[index].envo_after_select_pic }]
          : []
        envo_info_list[index].envo_serving_pic = envo_info_list[index].envo_serving_pic
          ? [{ url: envo_info_list[index].envo_serving_pic }]
          : []
      })
      this.setState({
        envoList: envo_info_list,
      })
      form.setFieldsValue({
        is_select_car_model: [appointDetail.appoint_list.is_select_car_model],
        is_select_car_license: [appointDetail.appoint_list.is_select_car_license],
        is_select_workerstaff: [appointDetail.appoint_list.is_select_workerstaff],
        dhb_get_num: appointDetail.appoint_list.dhb_get_num
          ? appointDetail.appoint_list.dhb_get_num
          : '0',
        score_get_num: appointDetail.appoint_list.score_get_num
          ? appointDetail.appoint_list.score_get_num
          : '0',
        envo_area_name: appointDetail.appoint_list.envo_area_name,
      })
    })
  }

  addEnv = () => {
    const envoList = toJS(this.state.envoList)
    envoList.push({
      envo_after_select_pic: [],
      envo_before_select_pic: [],
      envo_name: '',
      envo_screen_num: '',
      envo_serving_pic: [],
    })
    this.setState({
      envoList,
    })
  }

  saveImg = url => {
    const { envoList } = this.state
    // eslint-disable-next-line camelcase
    const now_envo = toJS(envoList)
    // eslint-disable-next-line react/destructuring-assignment
    now_envo[this.state.indexPic][this.state.typePic] = [{ url : url }]
    this.setState({
      mul: false,
    })
  }

  showEnvo = () => {
    const { envoList } = this.state
    if (envoList) {
      return envoList.map((item, index) => (
        <React.Fragment key={index}>
          <InputItem
            defaultValue={item.envo_name}
            onChange={e => {
              const now_envoList = toJS(envoList)
              now_envoList[index].envo_name = e
              this.setState({
                envoList: now_envoList,
              })
            }}
          >
            环境名称：
          </InputItem>
          <InputItem
            placeholder=""
            defaultValue={item.envo_screen_num}
            onChange={e => {
              const now_envoList = toJS(envoList)
              now_envoList[index].envo_screen_num = e
              this.setState({
                envoList: now_envoList,
              })
            }}
          >
            每屏数量：
          </InputItem>
          <Item>
            选中前图标
            <ImagePicker
              files={item.envo_before_select_pic}
              onAddImageClick={e => {
                this.setState({
                  mul: true,
                  // eslint-disable-next-line react/no-unused-state
                  typePic: 'envo_before_select_pic',
                  // eslint-disable-next-line react/no-unused-state
                  indexPic: index,
                })
                e.preventDefault()
              }}
              onChange={
                e => {
                  if (e.length <= 0) {
                    // eslint-disable-next-line camelcase
                    const now_envoList = toJS(envoList)
                    now_envoList[index].envo_before_select_pic.splice(0, 1)
                    this.setState({
                      envoList: now_envoList,
                    })
                  }
                }
              }
              selectable={item.envo_before_select_pic.length < 1}
            />
          </Item>
          <Item>
            选后前图标
            <ImagePicker
              files={item.envo_after_select_pic}
              onAddImageClick={e => {
                this.setState({
                  mul: true,
                  // eslint-disable-next-line react/no-unused-state
                  typePic: 'envo_after_select_pic',
                  // eslint-disable-next-line react/no-unused-state
                  indexPic: index,
                })
                e.preventDefault()
              }}
              onChange={e => {
                if (e.length <= 0) {
                  // eslint-disable-next-line camelcase
                  const now_envoList = toJS(envoList)
                  now_envoList[index].envo_after_select_pic.splice(0, 1)
                  this.setState({
                    envoList: now_envoList,
                  })
                }
              }}
              selectable={item.envo_after_select_pic.length < 1}
            />
          </Item>
          <Item>
            服务中图标
            <ImagePicker
              files={item.envo_serving_pic}
              onAddImageClick={e => {
                this.setState({
                  mul: true,
                  // eslint-disable-next-line react/no-unused-state
                  typePic: 'envo_serving_pic',
                  // eslint-disable-next-line react/no-unused-state
                  indexPic: index,
                })
                e.preventDefault()
              }}
              onChange={e => {
                if (e.length <= 0) {
                  const now_envoList = toJS(envoList)
                  now_envoList[index].envo_serving_pic.splice(0, 1)
                  this.setState({
                    envoList: now_envoList,
                  })
                }
              }}
              selectable={item.envo_serving_pic.length < 1}
            />
          </Item>
          <Button
            type="primary"
            size="small"
            style={{ color: '#fff', width: '25%', margin: '1% auto' }}
            onClick={() => {
              const envoList = toJS(this.state.envoList)
              if (envoList.length > 1) {
                envoList.splice(index, 1)
                this.setState({
                  envoList,
                })
              } else {
                Toast.info('至少保留一个环境')
              }
            }}
          >
            删除
          </Button>
        </React.Fragment>
      ))
    }
  }

  submit = () => {
    const {
      commodity, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const envo_after_select_pic = []
      const envo_before_select_pic = []
      const envo_name = []
      const envo_screen_num = []
      const envo_serving_pic = []
      if (this.state.envoList[0].envo_after_select_pic.length > 0) {
        // eslint-disable-next-line react/destructuring-assignment
        this.state.envoList.forEach(item => {
          envo_after_select_pic.push(item.envo_after_select_pic[0].url)
          envo_before_select_pic.push(item.envo_before_select_pic[0].url)
          envo_name.push(item.envo_name)
          envo_screen_num.push(item.envo_screen_num)
          envo_serving_pic.push(item.envo_serving_pic[0].url)
        })
      }
      const obj = {
        dhb_get_num: value.dhb_get_num,
        envo_area_name: value.envo_area_name,
        score_get_num: value.score_get_num,
        is_select_car_license: value.is_select_car_license[0],
        is_select_car_model: value.is_select_car_model[0],
        is_select_workerstaff: value.is_select_workerstaff[0],
        envo_after_select_pic,
        envo_before_select_pic,
        envo_name,
        envo_screen_num,
        envo_serving_pic,
      }

      commodity.editAppointDis({ ...obj, appoint_id: match.params.id }).then(res => {
        if (res) Toast.success('编辑成功', 1, () => history.goBack())
      })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { score_name, dhb_name, mul } = this.state
    return (
      <React.Fragment>
        <NavBar title="预约优惠设置" goBack />
        <List>
          <Picker
            {...getFieldProps('is_select_car_model', {
              rules: [{ required: false }],
            })}
            data={seckill}
            cols={1}
          >
            <List.Item arrow="horizontal">是否选择车型</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('is_select_car_license', {
              rules: [{ required: false }],
            })}
            data={seckill}
            cols={1}
          >
            <List.Item arrow="horizontal">是否显示服务者</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('is_select_workerstaff', {
              rules: [{ required: false }],
            })}
            data={seckill}
            cols={1}
          >
            <List.Item arrow="horizontal">是否输入车牌</List.Item>
          </Picker>
          <Item>
            用户消费赠送比例
            <InputItem
              {...getFieldProps('dhb_get_num', {
                rules: [{ required: false }],
              })}
              labelNumber={7}
              extra={dhb_name}
              placeholder={`请填写${dhb_name}数量`}
            >
              每消费1元赠送
            </InputItem>
            <InputItem
              {...getFieldProps('score_get_num', {
                rules: [{ required: false }],
              })}
              extra={score_name}
              labelNumber={7}
              placeholder={`请填写${score_name}数量`}
            >
              每消费1元赠送
            </InputItem>
          </Item>
          <InputItem
            {...getFieldProps('envo_area_name', {
              rules: [{ required: false }],
            })}
            placeholder="输入环境专区名称"
          >
            环境专区名称
          </InputItem>
          {this.showEnvo()}
          <Button
            type="primary"
            size="small"
            style={{ color: '#fff', width: '30%', margin: '1% auto' }}
            onClick={this.addEnv}
          >
            新增环境
          </Button>
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={this.submit}
            >
              确定
            </Button>
          </WingBlank>
        </List>
        <MultipleImg
          visible={mul}
          close={() => this.setState({
            mul: false,
          })
          }
          ratio={1}
          callback={this.saveImg}
        />
      </React.Fragment>
    )
  }
}
export default AppointDiscounts
