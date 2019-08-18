import React from 'react'
import {
  List, InputItem, Button, Picker,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import moment from 'moment'

const operating = [
  [
    {
      label: '增加',
      value: '1',
    },
    {
      label: '减少',
      value: 2,
    },
  ],
]

@inject('member')
@observer
class ModifyGroup extends React.Component {
  state = {
    balance: ['1'],
    balanceNum: '',
    integral: ['1'],
    integralNum: '',
    cardNo: '',
    status: [],
    group: [],
  }

  componentDidMount() {
    const { member, location } = this.props
    member.fetchCardGroupUserInfoSelect().then(() => {
      member.fetchCardGroupUserInfo(location.state.id).then(() => {
        this.setState({
          cardNo: member.cardGroupUserInfo.physical_id,
          status: [member.cardGroupUserInfo.status],
          group: [member.cardGroupUserInfo.gid],
        })
      })
    })
  }

  submit = async () => {
    const { location, history, member } = this.props
    const {
      cardNo, status, group, balance, balanceNum, integral, integralNum,
    } = this.state
    await member.modifyCardGroupUserInfo({
      id: location.state.id,
      uid: member.cardGroupUserInfo.uid,
      cardNo,
      group: group[0],
      status: status[0],
      balance: balance[0],
      balanceNum,
      integral: integral[0],
      integralNum,
    })
    history.goBack()
  }

  render() {
    const { location, history, member } = this.props
    const { cardGroupUserInfo } = member
    const {
      balance, balanceNum, integral, integralNum, cardNo, status, group,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="会员卡编辑" goBack />
        <List renderHeader="基本信息">
          <List.Item arrow="empty" extra={cardGroupUserInfo.nickname || '暂无'}>
            会员名称
          </List.Item>
          <List.Item arrow="empty" extra={cardGroupUserInfo.id}>
            会员卡卡号
          </List.Item>
          <List.Item arrow="empty" extra={cardGroupUserInfo.phone || '暂无'}>
            会员手机号
          </List.Item>
        </List>
        <List renderHeader="操作">
          <InputItem
            clear
            placeholder="请输入实体卡号"
            type="number"
            value={cardNo}
            onChange={val => this.setState({
              cardNo: val,
            })
            }
          >
            实体卡号
          </InputItem>
          <List.Item
            arrow="empty"
            extra={
              cardGroupUserInfo.add_time
                ? moment(cardGroupUserInfo.add_time * 1000).format('YYYY-MM-DD HH:mm')
                : '无记录'
            }
          >
            领取时间
          </List.Item>
          <List.Item arrow="empty" extra={`¥ ${cardGroupUserInfo.card_money_give}`}>
            余额
          </List.Item>
          <Picker
            data={operating}
            value={balance}
            title="余额操作"
            cascade={false}
            extra="请选择(可选)"
            onChange={val => {
              this.setState({
                balance: val,
              })
            }}
          >
            <List.Item arrow="horizontal">余额操作</List.Item>
          </Picker>
          <InputItem
            clear
            placeholder="请输入数值"
            type="number"
            value={balanceNum}
            onChange={val => this.setState({
              balanceNum: val,
            })
            }
          >
            余额修改
          </InputItem>
          <List.Item arrow="empty" extra={cardGroupUserInfo.card_score}>
            积分
          </List.Item>
          <Picker
            data={operating}
            value={integral}
            title="余额操作"
            cascade={false}
            extra="请选择(可选)"
            onChange={val => {
              this.setState({
                integral: val,
              })
            }}
          >
            <List.Item arrow="horizontal">积分操作</List.Item>
          </Picker>
          <InputItem
            clear
            placeholder="请输入数值"
            type="number"
            value={integralNum}
            onChange={val => this.setState({
              integralNum: val,
            })
            }
          >
            积分修改
          </InputItem>
          <Picker
            data={[member.cardGroupUserInfoSelect]}
            value={group}
            title="用户分组"
            cascade={false}
            extra="请选择(可选)"
            onChange={val => this.setState({
              group: val,
            })
            }
          >
            <List.Item arrow="horizontal">用户分组</List.Item>
          </Picker>
          <Picker
            data={[
              [
                {
                  label: '正常',
                  value: '1',
                },
                {
                  label: '禁止',
                  value: '0',
                },
              ],
            ]}
            value={status}
            title="状态"
            cascade={false}
            extra="请选择(可选)"
            onChange={val => this.setState({
              status: val,
            })
            }
          >
            <List.Item arrow="horizontal">状态</List.Item>
          </Picker>
          <List.Item
            arrow="horizontal"
            extra="查看"
            onClick={() => {
              history.push({
                pathname: '/management/member/cardGroup/expensesRecord',
                state: {
                  id: location.state.id,
                },
              })
            }}
          >
            消费记录
          </List.Item>
        </List>
        <Button
          type="primary"
          style={{
            width: '90%',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: '5%',
          }}
          onClick={this.submit}
        >
          保存
        </Button>
      </React.Fragment>
    )
  }
}

export default ModifyGroup
