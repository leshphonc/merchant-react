import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class MemberCardInfo extends React.Component {
  state = {}
  componentDidMount() {}

  memberCardBasicInfo = () => {
    const { history } = this.props
    console.log(history)
    history.push('/management/member/cardGroup/memberCardBasicInfo')
  }
  render() {
    return (
      <div>
        <WhiteSpace />
        <List>
          <List.Item arrow="horizontal" onClick={this.memberCardBasicInfo}>
            会员卡基本信息
          </List.Item>
          <List.Item arrow="horizontal" onClick={this.memberCardBasicInfo}>
            微信会员卡信息
          </List.Item>
        </List>
      </div>
    )
  }
}

export default MemberCardInfo
