import React from 'react'
import {
  WhiteSpace, List, InputItem, Button,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'

@inject('member')
@observer
class ModifyGroup extends React.Component {
  state = {
    groupname: '',
    comment: '',
    discount: '',
  }

  componentDidMount() {
    const { match } = this.props
    console.log(match)
    if (match.params.type === '编辑') {
      this.setState({
        groupname: match.params.name,
        comment: match.params.comment,
        discount: match.params.discount,
      })
    }
  }

  submit = async () => {
    const { match, history, member } = this.props
    const { groupname, comment, discount } = this.state
    if (match.params.type === '编辑') {
      await member.operatingCardGroup(groupname, comment, discount, match.params.id)
    } else {
      await member.operatingCardGroup(groupname, comment, discount)
    }
    history.goBack()
  }

  render() {
    const { match } = this.props
    const { groupname, comment, discount } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}分组`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="请输入分组名称"
            type="text"
            value={groupname}
            onChange={val => this.setState({ groupname: val })}
          >
            分组名称
          </InputItem>
          <InputItem
            placeholder="请输入注释"
            type="text"
            value={comment}
            onChange={val => this.setState({ comment: val })}
          >
            分组注释
          </InputItem>
          <InputItem
            placeholder="请输入折扣数"
            type="number"
            value={discount}
            onChange={val => this.setState({ discount: val })}
          >
            折扣数
          </InputItem>
        </List>
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定
        </Button>
      </React.Fragment>
    )
  }
}

export default ModifyGroup
