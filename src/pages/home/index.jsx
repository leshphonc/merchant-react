import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import ReactEcharts from 'echarts-for-react'
import { Paper } from '@/styled'
import { ManagementGrid, PopularizeGrid, AllianceGrid } from '@/config/grid'
import { WingBlank, WhiteSpace, Carousel } from 'antd-mobile'

export default () => {
  const getOption = () => ({
    color: ['#ffb000'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999',
        },
      },
    },
    grid: {
      top: 10,
      bottom: 30,
      right: '5%',
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '元',
      },
    ],
    series: [
      {
        name: '收入',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
    ],
  })
  return (
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
          <ReactEcharts option={getOption()} style={{ height: 200 }} />
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
}
