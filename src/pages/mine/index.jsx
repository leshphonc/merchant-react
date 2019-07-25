import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import { Paper } from '@/global'
import { SettingGrid, BusinessGrid, BillGrid } from '@/config/grid'
import { WingBlank, WhiteSpace } from 'antd-mobile'

export default () => (
  <React.Fragment>
    <UserCard />
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={SettingGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={BusinessGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={BillGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
  </React.Fragment>
)
