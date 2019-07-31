import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import { Paper } from '@/styled'
import { ManagementGrid, PopularizeGrid, AllianceGrid } from '@/config/grid'
import { WingBlank, WhiteSpace } from 'antd-mobile'

export default () => (
  <React.Fragment>
    <UserCard />
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={ManagementGrid} col={4} imgSize={45} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={PopularizeGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
    <WingBlank size="md">
      <Paper>
        <GridCard data={AllianceGrid} col={4} />
      </Paper>
    </WingBlank>
    <WhiteSpace />
  </React.Fragment>
)
