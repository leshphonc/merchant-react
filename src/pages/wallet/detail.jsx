import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, Tabs } from 'antd-mobile'
import AddCreditRecord from './components/AddCreditRecord'
import WithdrawRecord from './components/WithdrawRecord'
import IncomeRecord from './components/IncomeRecord'

export default () => (
  <React.Fragment>
    <NavBar title="账户明细" goBack />
    <WhiteSpace />
    <Tabs
      tabs={[
        { title: '充值记录', sub: '1' },
        { title: '提现记录', sub: '2' },
        { title: '收支记录', sub: '3' },
      ]}
    >
      <AddCreditRecord />
      <WithdrawRecord />
      <IncomeRecord />
    </Tabs>
  </React.Fragment>
)
