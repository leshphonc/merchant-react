import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import { Paper } from '@/styled'
import { ManagementGrid, PopularizeGrid, AllianceGrid } from '@/config/grid'
import { WingBlank, WhiteSpace, Carousel } from 'antd-mobile'

export default () => (
  <React.Fragment>
    <Carousel autoplay infinite>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565935010&di=4a3ce9fddc96c25766ca138ce92c7f9f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic33.nipic.com%2F20130911%2F12483715_163813947000_2.jpg"
        style={{ height: 230 }}
        alt=""
      />
      <img
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3528640992,1418471262&fm=26&gp=0.jpg"
        style={{ height: 230 }}
        alt=""
      />
    </Carousel>
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
