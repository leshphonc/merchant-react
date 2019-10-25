import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List,
  WhiteSpace,
  InputItem,
  TextareaItem,
  DatePicker,
  Button,
  WingBlank,
  Toast,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@createForm()
@inject('smartScreen')
@observer
class SmartScreenSloganCRU extends React.Component {
  state = {
    used: 0,
  }
  componentDidMount() {
    const { match, location, history } = this.props
    // 是否编辑
    if (match.params.id) {
      this.setForm(match.params.id)
    }
    if (match.params.show === '1' && !location.state) {
      history.goBack()
    }
  }

  setForm = id => {
    const { smartScreen, form, match } = this.props
    smartScreen.getSloganDetail(id).then(() => {
      const { sloganDetail } = smartScreen
      form.setFieldsValue({
        title: sloganDetail.title,
        context: sloganDetail.context,
      })
      // 是否特殊店员
      if (match.params.show !== '0') {
        this.setSp(sloganDetail)
      }
    })
  }

  setSp = data => {
    const { form } = this.props
    form.setFieldsValue({
      start_time: new Date(data.start_time * 1000),
      end_time: new Date(data.end_time * 1000),
      num: data.num,
    })
    this.setState({
      used: data.used,
    })
  }

  submit = () => {
    const { form, match, smartScreen, history, location } = this.props
    const { sloganDetail } = smartScreen
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return false
      }
      if (value.start_time) {
        value.start_time = moment(value.start_time).format(
          'YYYY-MM-DD hh:mm:00',
        )
      }
      if (value.end_time) {
        value.end_time = moment(value.end_time).format('YYYY-MM-DD hh:mm:00')
      }
      if (location.state) {
        value.staff_id = location.state.staff_id
      }
      if (match.params.show !== '0' && !Number(value.num)) {
        Toast.info('播放次数必须为整数')
        return false
      }
      if (match.params.id) {
        smartScreen
          .updateSlogan({
            ...value,
            id: sloganDetail.id,
            imax_id: match.params.imax,
            type: match.params.type,
          })
          .then(res => {
            if (res) {
              Toast.success('修改成功', 1, () => history.goBack())
            }
          })
      } else {
        smartScreen
          .createSlogan({
            ...value,
            imax_id: match.params.imax,
            type: match.params.type,
          })
          .then(res => {
            if (res) {
              Toast.success('新增成功', 1, () => history.goBack())
            }
          })
      }
    })
  }

  render() {
    const { form, match } = this.props
    const { getFieldProps } = form
    const { used } = this.state
    return (
      <>
        <NavBar title="编辑见面语" goBack />
        <WhiteSpace />
        <List
          renderFooter={match.params.show !== '0' ? `已播报${used}次` : null}
        >
          <InputItem
            placeholder="请输入见面语名称"
            {...getFieldProps('title', {
              rules: [{ required: true }],
            })}
          >
            见面语名称
          </InputItem>
          <TextareaItem
            {...getFieldProps('context', {
              rules: [{ required: true }],
            })}
            title="见面语内容"
            rows={4}
            count={200}
            placeholder="请输入见面语播报内容"
          />
          {match.params.show !== '0' ? (
            <React.Fragment>
              <DatePicker
                {...getFieldProps('start_time', {
                  rules: [{ required: true }],
                })}
              >
                <List.Item arrow="horizontal">播报开始时间</List.Item>
              </DatePicker>
              <DatePicker
                {...getFieldProps('end_time', {
                  rules: [{ required: true }],
                })}
              >
                <List.Item arrow="horizontal">播报结束时间</List.Item>
              </DatePicker>
              <InputItem
                {...getFieldProps('num', {
                  rules: [{ required: true }],
                })}
                placeholder="此条语音总播报次数"
              >
                播报次数
              </InputItem>
            </React.Fragment>
          ) : null}
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.submit}>
            确定
          </Button>
        </WingBlank>
      </>
    )
  }
}

export default SmartScreenSloganCRU
