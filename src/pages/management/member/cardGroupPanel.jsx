import React from 'react'
import {
  WhiteSpace, List, InputItem, Button, Picker, Flex, Toast,
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
    effdays: '',
    give: [],
  }

  componentDidMount() {
    const { member, match } = this.props
    member.fetchGiftVoucher()
    if (match.params.id) {
      member.fetchCardGroupDetail(match.params.id).then(() => {
        this.setState({
          groupname: member.cardGroupDetail.name,
          comment: member.cardGroupDetail.des,
          discount: member.cardGroupDetail.discount,
          effdays: member.cardGroupDetail.effdays,
          give: member.cardGroupDetail.give,
        })
      })
    }
  }

  changeGiveValue = (val, index) => {
    const { give } = this.state
    const cache = JSON.parse(JSON.stringify(give))
    // eslint-disable-next-line prefer-destructuring
    cache[index].goods = val[0]
    this.setState({
      give: cache,
    })
  }

  changeGiveNum = (val, index) => {
    const { give } = this.state
    const cache = JSON.parse(JSON.stringify(give))
    cache[index].goods_num = val
    this.setState({
      give: cache,
    })
  }

  mapGive = () => {
    const { member } = this.props
    const { give } = this.state
    return give.map((item, index) => (
      <React.Fragment key={index}>
        <Picker
          data={member.giftVoucher}
          value={[item.goods]}
          cols={1}
          onChange={val => this.changeGiveValue(val, index)}
        >
          <List.Item arrow="horizontal">商品</List.Item>
        </Picker>
        <InputItem defaultValue={item.goods_num} onChange={val => this.changeGiveNum(val, index)}>
          商品个数
        </InputItem>
      </React.Fragment>
    ))
  }

  submit = async () => {
    const { match, history, member } = this.props
    const {
      groupname, comment, discount, effdays, give,
    } = this.state
    if (match.params.id) {
      await member
        .operatingCardGroup(groupname, comment, discount, effdays, give, match.params.id)
        .then(res => {
          if (res) {
            Toast.success('编辑成功', 1, () => {
              member.resetCardGroupList()
              history.goBack()
            })
          }
        })
    } else {
      await member.operatingCardGroup(groupname, comment, discount, effdays, give).then(res => {
        if (res) {
          Toast.success('新增成功', 1, () => {
            member.resetCardGroupList()
            history.goBack()
          })
        }
      })
    }
  }

  render() {
    const { match } = this.props
    const {
      groupname, comment, discount, effdays, give,
    } = this.state
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
          <List.Item
            extra={
              <Flex justify="between">
                <Button
                  size="small"
                  type="ghost"
                  onClick={() => this.setState({
                    give: give.concat({ goods: '', goods_num: '' }),
                  })
                  }
                >
                  添加
                </Button>
                <Button
                  size="small"
                  type="warning"
                  onClick={() => this.setState({
                    give: give.slice(0, give.length - 1),
                  })
                  }
                >
                  删除
                </Button>
              </Flex>
            }
          >
            赠送礼品券
          </List.Item>
          {this.mapGive()}
          <InputItem
            placeholder="请输入有效天数"
            type="number"
            value={effdays}
            onChange={val => this.setState({ effdays: val })}
          >
            有效天数
          </InputItem>
        </List>
        <Button
          type="primary"
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: '90%',
            marginLeft: '5%',
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
