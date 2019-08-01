import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, Tabs } from 'antd-mobile'

export default () => {
  return (
    <React.Fragment>
      <NavBar title="账户明细" goBack />
      <WhiteSpace />
      <Tabs
        tabs={[
          { title: '充值记录', sub: '1' },
          { title: '提现记录', sub: '2' },
        ]}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff',
          }}
        >
          充值记录
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff',
          }}
        >
          提现记录
        </div>
      </Tabs>
    </React.Fragment>
  )
}
