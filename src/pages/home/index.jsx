import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import ReactEcharts from 'echarts-for-react'
import { Paper, FilterBox } from '@/styled'
import { observer, inject } from 'mobx-react'
import { ManagementGrid, PopularizeGrid, AllianceGrid } from '@/config/grid'
import {
  WingBlank, WhiteSpace, Carousel, Flex, Picker, DatePicker,
} from 'antd-mobile'
import moment from 'moment'
import FlexBox from './styled'

const FilterData1 = [
  { label: '年', value: '1' },
  { label: '月', value: '2' },
  { label: '日', value: '3' },
]

@inject('home')
@observer
class Home extends React.Component {
  state = {
    filterValue1: '',
    filterLabel1: '一级筛选',
    filterValue2: '',
    filterLabel2: '二级筛选',
  }

  componentDidMount() {
    // const { home } = this.props
  }

  getOption = () => ({
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

  changeFilter1 = val => {
    const result = FilterData1.find(item => item.value === val[0])
    this.setState({
      filterValue1: result.value,
      filterLabel1: result.label,
      filterValue2: '',
      filterLabel2: '二级筛选',
    })
  }

  changeYear = val => {
    this.setState({
      filterLabel2: `${moment(val).format('YYYY')}年`,
    })
  }

  changeMonth = val => {
    this.setState({
      filterLabel2: moment(val).format('YYYY-MM'),
    })
  }

  changeDay = val => {
    this.setState({
      filterLabel2: moment(val).format('YYYY-MM-DD'),
    })
  }

  render() {
    const { filterValue1, filterLabel1, filterLabel2 } = this.state
    return (
      <React.Fragment>
        <Carousel autoplay infinite>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565972301653&di=cadc8eb6cb7d3a25cb455d27ee8342d0&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F62e712378860c2e9ac3bf8186f8ecf6a3cb24c07.jpg"
            style={{ height: 230 }}
            alt=""
          />
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565972301652&di=86ecc8c335b139f0c52413c3dedbb1dd&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20130122%2F5056611_155036805000_2.jpg"
            style={{ height: 230 }}
            alt=""
          />
        </Carousel>
        <UserCard />
        <WhiteSpace />
        <WingBlank size="md">
          <Paper>
            <GridCard data={ManagementGrid} col={4} imgSize={45} />
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <FlexBox>
                  <div>收入总数</div>
                  <div>2000</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox>
                  <div>订单总数</div>
                  <div>2000</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox>
                  <div>访问次数</div>
                  <div>2000</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox>
                  <div>访问人数</div>
                  <div>2000</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox>
                  <div>粉丝人数</div>
                  <div>2000</div>
                </FlexBox>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <FilterBox style={{ marginRight: 5 }}>
              <Picker
                data={FilterData1}
                value={[filterValue1]}
                cols={1}
                onChange={this.changeFilter1}
              >
                <div>
                  <span>{filterLabel1}</span>
                  <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                    &#xe6f0;
                  </i>
                </div>
              </Picker>
            </FilterBox>
            {/* 筛选一选年份 */}
            {filterValue1 === '1' ? (
              <FilterBox style={{ marginRight: 5 }}>
                <DatePicker mode="year" onChange={this.changeYear}>
                  <div>
                    <span>{filterLabel2}</span>
                    <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                      &#xe6f0;
                    </i>
                  </div>
                </DatePicker>
              </FilterBox>
            ) : null}
            {filterValue1 === '2' ? (
              <FilterBox style={{ marginRight: 5 }}>
                <DatePicker mode="month" onChange={this.changeMonth}>
                  <div>
                    <span>{filterLabel2}</span>
                    <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                      &#xe6f0;
                    </i>
                  </div>
                </DatePicker>
              </FilterBox>
            ) : null}
            {filterValue1 === '3' ? (
              <FilterBox style={{ marginRight: 5 }}>
                <DatePicker mode="date" onChange={this.changeDay}>
                  <div>
                    <span>{filterLabel2}</span>
                    <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                      &#xe6f0;
                    </i>
                  </div>
                </DatePicker>
              </FilterBox>
            ) : null}
            <WhiteSpace />
            <ReactEcharts option={this.getOption()} style={{ height: 200 }} />
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
}

export default Home
