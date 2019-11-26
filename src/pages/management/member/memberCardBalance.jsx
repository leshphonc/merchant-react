import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, InputItem, Button, Switch, Toast } from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import { createForm } from 'rc-form'

@createForm()
@inject('member')
@observer
class MemberCardBalance extends React.Component {
  state = {
    rules: [],
    detail: {},
  }
  componentDidMount() {
    const { member, form } = this.props
    member.readMemberCardBasicInfoDetail().then(res => {
      const detail = res.card
      const balance = res.rule_list
      form.setFieldsValue({
        begin_money: detail.begin_money,
        recharge_suggest: detail.recharge_suggest,
        begin_score: detail.begin_score,
        support_score_select: detail.support_score_select === '1',
        sign_open: detail.sign_open === '1',
        sign_score: detail.sign_score,
      })
      this.setState({
        rules: balance,
        detail: detail,
      })
      console.log(res)
    })
  }

  addRules = () => {
    const { rules } = this.state
    this.setState({
      rules: [
        ...rules,
        {
          id: '0',
          recharge_count: '',
          recharge_back_money: '',
          recharge_back_score: '',
        },
      ],
    })
  }

  deleteRules = index => {
    const { rules } = this.state
    const arr = rules
    arr.splice(index, 1)
    this.setState({
      rules: arr,
    })
  }

  mapList = () => {
    const { form } = this.props
    const { getFieldProps } = form
    const { rules } = this.state
    return rules.map((item, index) => {
      return (
        <List
          key={index}
          renderHeader={
            <div>
              充值规则 {index + 1}
              <Button
                style={{
                  display: 'inline-block',
                  verticalAlign: 'sub',
                  marginLeft: 10,
                }}
                size="small"
                type="warning"
                onClick={() => this.deleteRules(index)}
              >
                删除
              </Button>
            </div>
          }
        >
          <InputItem
            placeholder="请输入充值金额"
            onChange={() => this.changeRechargeCount(index)}
            {...getFieldProps(`recharge_count${index}`, {
              rules: [{ required: true }],
              initialValue: item.recharge_count,
              getValueFromEvent: value => {
                const { rules } = this.state
                const arr = rules
                arr[index].recharge_count = value
                this.setState({
                  rules: [...arr],
                })
                return value
              },
            })}
          >
            充值
          </InputItem>
          <InputItem
            placeholder="请输入返现金额"
            onChange={() => this.changeRechargeBackMoney(index)}
            {...getFieldProps(`recharge_back_money${index}`, {
              rules: [{ required: true }],
              initialValue: item.recharge_back_money,
              getValueFromEvent: value => {
                const { rules } = this.state
                const arr = rules
                arr[index].recharge_back_money = value
                this.setState({
                  rules: [...arr],
                })
                return value
              },
            })}
          >
            返现
          </InputItem>
          <InputItem
            placeholder="请输入返金币数量"
            onChange={() => this.changeRechargeBackScore(index)}
            {...getFieldProps(`recharge_back_score${index}`, {
              rules: [{ required: true }],
              initialValue: item.recharge_back_score,
              getValueFromEvent: value => {
                const { rules } = this.state
                const arr = rules
                arr[index].recharge_back_score = value
                this.setState({
                  rules: [...arr],
                })
                return value
              },
            })}
          >
            返金币
          </InputItem>
        </List>
      )
    })
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
      const { rules } = this.state
      value.rules = rules
      console.log(value)
      member.updateCardOtherInfo(value).then(() => {
        Toast.success('操作成功', 1, () => {
          history.goBack()
        })
      })
    })
  }
  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { detail } = this.state
    const scoreSelect = form.getFieldValue('support_score_select')
    return (
      <div>
        <NavBar
          title="会员卡余额管理"
          goBack
          right={<div onClick={this._submit}>保存</div>}
        />
        <List>
          <InputItem
            {...getFieldProps('begin_money', {
              rules: [{ required: true }],
              initialValue: detail.begin_money,
            })}
            placeholder="请填写会员卡初始金额"
            labelNumber="7"
          >
            会员卡初始金额
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="领会员卡时自动向该卡赠送金额"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('recharge_suggest', {
              rules: [{ required: true }],
              initialValue: detail.recharge_suggest,
            })}
            placeholder="请填写充值金额建议"
            labelNumber="7"
          >
            充值金额建议
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户可以在充值页面快速点击充值该建议金额。英文逗号隔开，如10,20,30"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <List.Item
            extra={
              <div>
                <Button size="small" type="primary" onClick={this.addRules}>
                  新增
                </Button>
              </div>
            }
          >
            充值返现规则
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户每在线充值一笔达到金额即赠送的金额，可叠加享受。如果设置，请填写大于等于1的整数"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
        </List>
        {this.mapList()}
        <List renderHeader="积分">
          <InputItem
            {...getFieldProps('begin_score', {
              rules: [{ required: true }],
              initialValue: detail.begin_score,
            })}
            labelNumber="7"
            placeholder="请填写会员卡初始积分"
          >
            会员卡初始积分
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="领会员卡时自动向该卡赠送积分"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('support_score_select', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            消费获得积分
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户购买商品之后是否能获取一定的积分"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>

          {scoreSelect ? (
            <InputItem
              labelNumber="7"
              {...getFieldProps('support_score', {
                rules: [{ required: true }],
                initialValue: detail.support_score,
              })}
              placeholder="请填写获得的积分数量"
            >
              消费一元获得积分
              <Tooltip
                trigger="click"
                placement="topLeft"
                overlay="用户每消费一元获得的积分数，大于1的整数"
              >
                <i
                  className="iconfont"
                  style={{ marginLeft: 5, color: '#bbb' }}
                >
                  &#xe628;
                </i>
              </Tooltip>
            </InputItem>
          ) : null}

          <List.Item
            extra={
              <Switch
                {...getFieldProps('sign_open', {
                  valuePropName: 'checked',
                })}
              />
            }
          >
            会员签到送积分
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="开启会员签到送积分功能"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </List.Item>
          <InputItem
            labelNumber="7"
            {...getFieldProps('sign_score', {
              rules: [{ required: true }],
              initialValue: detail.sign_score,
            })}
            placeholder="请填写每次签到送的积分数"
          >
            每次签到送积分
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户每次签到获取的积分，非负的整数，0表示不给积分"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
        </List>
      </div>
    )
  }
}

export default MemberCardBalance
