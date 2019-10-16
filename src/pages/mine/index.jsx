import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import { Paper } from '@/styled'
import { SettingGrid, BillGrid } from '@/config/grid'
import { WingBlank, WhiteSpace } from 'antd-mobile'

export default () => (
  <div>
    <UserCard />
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={SettingGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    {/* <WingBlank size="md">
      <Paper>
        <GridCard data={BusinessGrid} col={4} />
      </Paper>
    </WingBlank> */}
    <WingBlank size="md">
      <Paper>
        <GridCard data={BillGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    <div style={{ height: 50 }} />
  </div>
)
