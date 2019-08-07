import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'

@inject('member')
@observer
class ExpensesRecord extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar title="会员消费记录" goBack />
        123ß
      </React.Fragment>
    )
  }
}

export default ExpensesRecord
