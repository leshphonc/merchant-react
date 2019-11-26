import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'

@inject('member')
@observer
class MemberCardRecord extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <NavBar title="会员卡充值记录" goBack />
      </div>
    )
  }
}

export default MemberCardRecord
