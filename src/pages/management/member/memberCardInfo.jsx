import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class MemberCardInfo extends React.Component {
  state = {}
  componentDidMount() {}

  render() {
    const { history } = this.props
    return (
      <div>
        <WhiteSpace />
        <List>
          <List.Item
            arrow="horizontal"
            onClick={() =>
              history.push('/management/member/cardGroup/memberCardBasicInfo')
            }
          >
            会员卡基本信息
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() =>
              history.push('/management/member/cardGroup/memberCardBalance')
            }
          >
            会员卡余额管理
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() =>
              history.push('/management/member/cardGroup/memberCardInWx')
            }
          >
            微信会员卡信息
          </List.Item>
        </List>
      </div>
    )
  }
}

export default MemberCardInfo
