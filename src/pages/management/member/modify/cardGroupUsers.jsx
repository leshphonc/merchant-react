import React from 'react'
import {
  List, InputItem, Button, Picker,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
]
@inject('member')
@observer
class ModifyGroup extends React.Component {
  componentDidMount() {
    const { member, location } = this.props
    member.fetchCardGroupUserInfo(location.state.id)
    // this.setState({
    //   groupname: location.state.name,
    //   comment: location.state.comment,
    //   discount: location.state.discount,
    // })
  }

  submit = async () => {
    // const { location, history, member } = this.props
    // const { groupname, comment, discount } = this.state
    // await member.operatingCardGroup(groupname, comment, discount, location.state.id)
    // history.goBack()
    const { form } = this.props
    form.validateFields(error => {
      console.log(error)
      if (error) return
    })
  }

  render() {
    const { history } = this.props
    return (
      <React.Fragment>
        <NavBar title="会员卡编辑" goBack />
        <List renderHeader="基本信息">
          <List.Item arrow="empty" extra="cc">
            会员名称
          </List.Item>
          <List.Item arrow="empty" extra="123457000">
            会员卡卡号
          </List.Item>
          <List.Item arrow="empty" extra="18087878787">
            会员手机号
          </List.Item>
        </List>
        <List renderHeader="操作">
          <InputItem clear placeholder="请输入实体卡号" type="number">
            实体卡号
          </InputItem>
          <List.Item arrow="empty" extra="2018-09-18">
            领取时间
          </List.Item>
          <List.Item arrow="empty" extra="¥20">
            余额
          </List.Item>
          <InputItem clear placeholder="请输入余额操作" type="number">
            余额操作
          </InputItem>
          <List.Item arrow="empty" extra="178">
            积分
          </List.Item>
          <InputItem clear placeholder="请输入积分操作" type="number">
            积分操作
          </InputItem>
          <Picker data={seasons} title="用户分组" cascade={false} extra="请选择(可选)">
            <List.Item arrow="horizontal">用户分组</List.Item>
          </Picker>
          <Picker data={seasons} title="状态" cascade={false} extra="请选择(可选)">
            <List.Item arrow="horizontal">状态</List.Item>
          </Picker>
          <List.Item
            arrow="horizontal"
            extra="查看"
            onClick={() => {
              history.push('/management/member/cardGroup/expensesRecord')
            }}
          >
            记录表
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
