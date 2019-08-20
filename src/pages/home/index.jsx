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
  { label: '日', value: '1' },
  { label: '月', value: '2' },
  { label: '年', value: '3' },
]

@inject('home')
@observer
class Home extends React.Component {
  state = {
    filterValue1: '1',
    filterLabel1: '日',
    filterLabel2: '2019-08-07',
    echartData: [],
    cur: '1',
    searchType: 'all_money',
  }

  componentDidMount() {
    const { home } = this.props
    const { filterValue1, filterLabel2, searchType } = this.state
    const ticket = localStorage.getItem('ticket')
    if (!ticket) return
    home.fetchEchartData(filterValue1, filterLabel2, searchType).then(() => this.setState({
      echartData: home.echartData,
    }))
    home.fetchIndexData()
  }

  getOption = () => {
    let xData = []
    const { filterValue1, echartData } = this.state
    if (filterValue1 === '1') {
      xData = echartData.map((item, index) => `${(index + 1) * 2}点`)
    } else if (filterValue1 === '2') {
      xData = echartData.map((item, index) => `${index + 1}号`)
    } else if (filterValue1 === '3') {
      xData = echartData.map((item, index) => `${index + 1}月`)
    }
    return {
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
        right: 0,
        left: '13%',
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
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
          data: echartData,
        },
      ],
    }
  }

  changeFilter1 = val => {
    const result = FilterData1.find(item => item.value === val[0])
    this.setState({
      filterValue1: result.value,
      filterLabel1: result.label,
      filterLabel2: '二级筛选',
    })
  }

  changeYear = val => {
    const { home } = this.props
    const { filterValue1, searchType } = this.state
    home.fetchEchartData(filterValue1, moment(val).format('YYYY'), searchType).then(() => this.setState({
      echartData: home.echartData,
      filterLabel2: `${moment(val).format('YYYY')}年`,
    }))
  }

  changeMonth = val => {
    const { home } = this.props
    const { filterValue1, searchType } = this.state
    home.fetchEchartData(filterValue1, moment(val).format('YYYY-MM'), searchType).then(() => this.setState({
      echartData: home.echartData,
      filterLabel2: moment(val).format('YYYY-MM'),
    }))
  }

  changeDay = val => {
    const { home } = this.props
    const { filterValue1, searchType } = this.state
    home.fetchEchartData(filterValue1, moment(val).format('YYYY-MM-DD'), searchType).then(() => this.setState({
      echartData: home.echartData,
      filterLabel2: moment(val).format('YYYY-MM-DD'),
    }))
  }

  changeEchartType = (num, type) => {
    const { home } = this.props
    const { filterValue1, filterLabel2 } = this.state
    home.fetchEchartData(filterValue1, filterLabel2, type).then(() => this.setState({
      echartData: home.echartData,
    }))
    this.setState({
      cur: num,
      searchType: type,
    })
  }

  mapAd = () => {
    const { home } = this.props
    const { indexData } = home
    if (!indexData.wap_MerchantAd) {
      return false
    }
    return (
      <Carousel autoplay infinite>
        {indexData.wap_MerchantAd.map(item => (
          <img key={item.id} src={item.pic} alt="" />
        ))}
      </Carousel>
    )
  }

  render() {
    const { home } = this.props
    const {
      filterValue1, filterLabel1, filterLabel2, cur,
    } = this.state
    return (
      <React.Fragment>
        {this.mapAd()}
        {/* <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565972301653&di=cadc8eb6cb7d3a25cb455d27ee8342d0&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F62e712378860c2e9ac3bf8186f8ecf6a3cb24c07.jpg"
            style={{ height: 230 }}
            alt=""
          />
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565972301652&di=86ecc8c335b139f0c52413c3dedbb1dd&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20130122%2F5056611_155036805000_2.jpg"
            style={{ height: 230 }}
            alt=""
          /> */}

        <UserCard />
        <WhiteSpace />
        <WingBlank size="md">
          <Paper>
            <GridCard data={ManagementGrid} col={4} imgSize={45} />
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <FlexBox
                  className={cur === '1' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('1', 'all_money')}
                >
                  <div>收入总数</div>
                  <div>{home.indexData.total_earn || 0}</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox
                  className={cur === '2' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('2', 'all_order')}
                >
                  <div>订单总数</div>
                  <div>{home.indexData.total_order || 0}</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox
                  className={cur === '3' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('3', 'all_visit')}
                >
                  <div>访问人数</div>
                  <div>{home.indexData.total_visit || 0}</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox
                  className={cur === '4' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('4', 'all_fans')}
                >
                  <div>粉丝人数</div>
                  <div>{home.indexData.total_fans || 0}</div>
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
            {filterValue1 === '3' ? (
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
            {filterValue1 === '1' ? (
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
