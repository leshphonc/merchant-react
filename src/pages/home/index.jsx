import React from 'react'
import UserCard from '@/common/UserCard'
import GridCard from '@/common/GridCard'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/grid'
import { withRouter } from 'react-router-dom'
import { Paper, FilterBox } from '@/styled'
import { observer, inject } from 'mobx-react'
import { ManagementGrid, PopularizeGrid, AllianceGrid } from '@/config/grid'
import {
  WingBlank,
  WhiteSpace,
  Carousel,
  Flex,
  Picker,
  DatePicker,
} from 'antd-mobile'
import moment from 'moment'
import FlexBox from './styled'

const ScreenWidth = document.documentElement.clientWidth

const FilterData1 = [
  { label: '日', value: '1' },
  { label: '月', value: '2' },
  { label: '年', value: '3' },
]

@withRouter
@inject('home', 'smartScreen')
@observer
class Home extends React.Component {
  state = {
    filterStoreLabel: '全部店铺',
    filterStoreValue: '',
    filterValue1: '1',
    filterLabel1: '日',
    filterLabel2: moment().format('YYYY-MM-DD'),
    aifilterStoreLabel: '全部店铺',
    aifilterStoreValue: '',
    aifilterValue1: '1',
    aifilterLabel1: '日',
    aifilterLabel2: moment().format('YYYY-MM-DD'),
    echartData: [],
    aiData: [],
    cur: '1',
    searchType: 'all_money',
    seriesLabel: '收入',
    seriesLabel2: '进店人数',
    showAI: false,
  }

  componentDidMount() {
    const { home, smartScreen } = this.props
    const {
      filterValue1,
      filterLabel2,
      searchType,
      filterStoreValue,
    } = this.state
    const ticket = localStorage.getItem('ticket')
    window.scrollTo(0, 0)
    if (!ticket) return
    smartScreen.fetchLocalSmartScreen().then(() => {
      const { smartScreenList } = smartScreen
      if (smartScreenList.length) {
        home
          .getAllFaceVisit(filterValue1, filterLabel2, filterStoreValue)
          .then(() => {
            this.setState({
              aiData: home.aiData,
            })
          })
        this.setState({
          showAI: true,
        })
      }
    })
    home.fetchStoreList()
    home
      .fetchEchartData(filterValue1, filterLabel2, searchType, filterStoreValue)
      .then(() => {
        this.setState({
          echartData: home.echartData,
        })
      })
    const json = {
      action: 'SendJPushIdToServer',
      type: 'merchant',
      uid: JSON.parse(localStorage.getItem('merchant_user')).mer_id,
      BaseUrl: window.location.origin.split('.')[1],
    }
    this.invokeAndroid(json)
  }

  invokeAndroid = json => {
    if (
      navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1
    ) {
      window.android.invokeMethods(JSON.stringify(json))
    } else if (
      navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1
    ) {
      window.location.href = 'ios:' + JSON.stringify(json)
    }
  }

  getOption = () => {
    let xData = []
    let custom = false
    const { filterValue1, echartData, seriesLabel } = this.state
    if (filterValue1 === '1') {
      xData = echartData.map((item, index) => `${(index + 1) * 2}点`)
      custom = true
    } else if (filterValue1 === '2') {
      xData = echartData.map((item, index) => `${index + 1}号`)
      custom = false
    } else if (filterValue1 === '3') {
      xData = echartData.map((item, index) => `${index + 1}月`)
      custom = false
    }
    let format = null
    if (custom) {
      format = params => {
        const str = params[0].axisValue.substr(
          0,
          params[0].axisValue.length - 1,
        )
        const result = `${str - 2}点 - ${str}点<br />
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ffb000;"></span>${
          params[0].seriesName
        }: ${params[0].data}`
        return result
      }
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
        formatter: format,
      },
      grid: {
        top: 10,
        bottom: 30,
        right: 20,
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
          max: function(value) {
            return parseInt(value.max + 10)
          },
        },
      ],
      series: [
        {
          name: seriesLabel,
          type: 'bar',
          data: echartData,
        },
      ],
    }
  }

  getOption2 = () => {
    let xData = []
    let custom = false
    const { aifilterValue1, aiData, seriesLabel2 } = this.state
    if (aifilterValue1 === '1') {
      xData = aiData.map((item, index) => `${(index + 1) * 2}点`)
      custom = true
    } else if (aifilterValue1 === '2') {
      xData = aiData.map((item, index) => `${index + 1}号`)
      custom = false
    } else if (aifilterValue1 === '3') {
      xData = aiData.map((item, index) => `${index + 1}月`)
      custom = false
    }
    let format = null
    if (custom) {
      format = params => {
        const str = params[0].axisValue.substr(
          0,
          params[0].axisValue.length - 1,
        )
        const result = `${str - 2}点 - ${str}点<br />
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ffb000;"></span>${
          params[0].seriesName
        }: ${params[0].data}`
        return result
      }
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
        formatter: format,
      },
      grid: {
        top: 30,
        bottom: 30,
        right: 20,
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
          name: '进店人数',
          max: function(value) {
            return parseInt(value.max + 10)
          },
        },
      ],
      series: [
        {
          name: seriesLabel2,
          type: 'bar',
          data: aiData,
        },
      ],
    }
  }

  changeFilter1 = val => {
    const result = FilterData1.find(item => item.value === val[0])
    this.setState(
      {
        filterValue1: result.value,
        filterLabel1: result.label,
        filterLabel2: '二级筛选',
        echartData: [],
      },
      () => {
        const { cur, searchType } = this.state
        this.changeEchartType(cur, searchType)
      },
    )
  }

  aichangeFilter1 = val => {
    const { home } = this.props
    const result = FilterData1.find(item => item.value === val[0])
    this.setState(
      {
        aifilterValue1: result.value,
        aifilterLabel1: result.label,
        aifilterLabel2: '二级筛选',
        aiData: [],
      },
      () => {
        const {
          aifilterValue1,
          aifilterLabel2,
          aifilterStoreValue,
        } = this.state
        home
          .getAllFaceVisit(aifilterValue1, aifilterLabel2, aifilterStoreValue)
          .then(() => {
            this.setState({
              aiData: home.aiData,
            })
          })
      },
    )
  }

  changeYear = val => {
    const { home } = this.props
    const { filterValue1, searchType, filterStoreValue } = this.state
    home
      .fetchEchartData(
        filterValue1,
        moment(val).format('YYYY'),
        searchType,
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          echartData: home.echartData,
          filterLabel2: `${moment(val).format('YYYY')}`,
        })
      })
  }
  aichangeYear = val => {
    const { home } = this.props
    const { aifilterValue1, aifilterStoreValue } = this.state
    home
      .getAllFaceVisit(
        aifilterValue1,
        moment(val).format('YYYY'),
        aifilterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          aifilterLabel2: `${moment(val).format('YYYY')}`,
        })
      })
  }

  changeMonth = val => {
    const { home } = this.props
    const { filterValue1, searchType, filterStoreValue } = this.state
    home
      .fetchEchartData(
        filterValue1,
        moment(val).format('YYYY-MM'),
        searchType,
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          echartData: home.echartData,
          filterLabel2: moment(val).format('YYYY-MM'),
        })
      })
  }

  aichangeMonth = val => {
    const { home } = this.props
    const { aifilterValue1, aifilterStoreValue } = this.state
    home
      .getAllFaceVisit(
        aifilterValue1,
        moment(val).format('YYYY-MM'),
        aifilterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          aifilterLabel2: moment(val).format('YYYY-MM'),
        })
      })
  }

  changeDay = val => {
    const { home } = this.props
    const { filterValue1, searchType, filterStoreValue } = this.state
    home
      .fetchEchartData(
        filterValue1,
        moment(val).format('YYYY-MM-DD'),
        searchType,
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          echartData: home.echartData,
          filterLabel2: moment(val).format('YYYY-MM-DD'),
        })
      })
  }

  aichangeDay = val => {
    const { home } = this.props
    const { aifilterValue1, aifilterStoreValue } = this.state
    home
      .getAllFaceVisit(
        aifilterValue1,
        moment(val).format('YYYY-MM-DD'),
        aifilterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          aifilterLabel2: moment(val).format('YYYY-MM-DD'),
        })
      })
  }

  changeFilterStore = val => {
    const { home } = this.props
    const { filterValue1, filterLabel2, searchType } = this.state
    const result = home.storeList.find(item => item.value === val[0])
    home
      .fetchEchartData(filterValue1, filterLabel2, searchType, val[0])
      .then(() => {
        this.setState({
          echartData: home.echartData,
          filterStoreLabel: result.label,
          filterStoreValue: val[0],
        })
      })
  }

  aichangeFilterStore = val => {
    const { home } = this.props
    const { aifilterValue1, aifilterLabel2 } = this.state
    const result = home.storeList.find(item => item.value === val[0])
    home.getAllFaceVisit(aifilterValue1, aifilterLabel2, val[0]).then(() => {
      this.setState({
        aiData: home.aiData,
        aifilterStoreLabel: result.label,
        aifilterStoreValue: val[0],
      })
    })
  }

  changeEchartType = (num, type) => {
    const { home } = this.props
    const { filterValue1, filterLabel2, filterStoreValue } = this.state
    home
      .fetchEchartData(filterValue1, filterLabel2, type, filterStoreValue)
      .then(() => {
        this.setState({
          echartData: home.echartData,
        })
      })
    let label = ''
    switch (num) {
      case '1':
        label = '收入'
        break
      case '2':
        label = '订单'
        break
      case '3':
        label = '新增粉丝'
        break
      case '4':
        label = '新增人数'
        break
      case '5':
        label = '访问次数'
        break
      default:
        label = '收入'
    }
    this.setState({
      cur: num,
      searchType: type,
      seriesLabel: label,
    })
  }

  mapAd = () => {
    const { home } = this.props
    const { indexData } = home
    if (!indexData.wap_MerchantAd) {
      return false
    }
    if (!indexData.wap_MerchantAd.length) {
      return false
    }

    const ratio = indexData.wap_MerchantAd[0].cat_width_height_ratio
    const widthRatio = ratio.split(':')[0] - 0
    const heightRatio = ratio.split(':')[1] - 0
    const height = (ScreenWidth * heightRatio) / widthRatio
    return (
      <Carousel autoplay infinite style={{ height }}>
        {indexData.wap_MerchantAd.map(item => (
          <a href={item.url} key={item.id}>
            <img src={item.pic} alt="" />
          </a>
        ))}
      </Carousel>
    )
  }

  render() {
    const { home, history } = this.props
    const { storeList } = home
    const {
      filterValue1,
      filterLabel1,
      filterLabel2,
      cur,
      filterStoreLabel,
      filterStoreValue,
      aifilterValue1,
      aifilterLabel1,
      aifilterLabel2,
      aifilterStoreLabel,
      aifilterStoreValue,
      showAI,
    } = this.state
    return (
      <div style={{ overflow: 'hidden' }}>
        {this.mapAd()}
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
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <FlexBox
                  className={cur === '3' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('3', 'all_fans')}
                >
                  <div>粉丝人数</div>
                  <div>{home.indexData.total_fans || 0}</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox
                  className={cur === '4' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('4', 'all_visit')}
                >
                  <div>访问人数</div>
                  <div>{home.indexData.total_visit || 0}</div>
                </FlexBox>
              </Flex.Item>
              <Flex.Item>
                <FlexBox
                  className={cur === '5' ? 'cur' : ''}
                  onClick={() => this.changeEchartType('5', 'all_visit_num')}
                >
                  <div>访问次数</div>
                  <div>{home.indexData.total_visit_num || 0}</div>
                </FlexBox>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <FilterBox style={{ marginRight: 5 }}>
              <Picker
                data={storeList}
                value={[filterStoreValue]}
                cols={1}
                onChange={this.changeFilterStore}
              >
                <div>
                  <span>{filterStoreLabel}</span>
                  <i
                    className="iconfont"
                    style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                  >
                    &#xe6f0;
                  </i>
                </div>
              </Picker>
            </FilterBox>
            <FilterBox style={{ marginRight: 5 }}>
              <Picker
                data={FilterData1}
                value={[filterValue1]}
                cols={1}
                onChange={this.changeFilter1}
              >
                <div>
                  <span>{filterLabel1}</span>
                  <i
                    className="iconfont"
                    style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                  >
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
                    <i
                      className="iconfont"
                      style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                    >
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
                    <i
                      className="iconfont"
                      style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                    >
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
                    <i
                      className="iconfont"
                      style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                    >
                      &#xe6f0;
                    </i>
                  </div>
                </DatePicker>
              </FilterBox>
            ) : null}
            <WhiteSpace />
            <ReactEchartsCore
              echarts={echarts}
              option={this.getOption()}
              style={{ height: 200 }}
            />
          </Paper>
        </WingBlank>
        <WhiteSpace />
        {showAI ? (
          <WingBlank size="md">
            <Paper>
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                门店AI助手
              </div>
              <WhiteSpace />
              <FilterBox style={{ marginRight: 5 }}>
                <Picker
                  data={storeList}
                  value={[aifilterStoreValue]}
                  cols={1}
                  onChange={this.aichangeFilterStore}
                >
                  <div>
                    <span>{aifilterStoreLabel}</span>
                    <i
                      className="iconfont"
                      style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                    >
                      &#xe6f0;
                    </i>
                  </div>
                </Picker>
              </FilterBox>
              <FilterBox style={{ marginRight: 5 }}>
                <Picker
                  data={FilterData1}
                  value={[aifilterValue1]}
                  cols={1}
                  onChange={this.aichangeFilter1}
                >
                  <div>
                    <span>{aifilterLabel1}</span>
                    <i
                      className="iconfont"
                      style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                    >
                      &#xe6f0;
                    </i>
                  </div>
                </Picker>
              </FilterBox>
              {aifilterValue1 === '3' ? (
                <FilterBox style={{ marginRight: 5 }}>
                  <DatePicker mode="year" onChange={this.aichangeYear}>
                    <div>
                      <span>{aifilterLabel2}</span>
                      <i
                        className="iconfont"
                        style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                      >
                        &#xe6f0;
                      </i>
                    </div>
                  </DatePicker>
                </FilterBox>
              ) : null}
              {aifilterValue1 === '2' ? (
                <FilterBox style={{ marginRight: 5 }}>
                  <DatePicker mode="month" onChange={this.aichangeMonth}>
                    <div>
                      <span>{aifilterLabel2}</span>
                      <i
                        className="iconfont"
                        style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                      >
                        &#xe6f0;
                      </i>
                    </div>
                  </DatePicker>
                </FilterBox>
              ) : null}
              {aifilterValue1 === '1' ? (
                <FilterBox style={{ marginRight: 5 }}>
                  <DatePicker mode="date" onChange={this.aichangeDay}>
                    <div>
                      <span>{aifilterLabel2}</span>
                      <i
                        className="iconfont"
                        style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                      >
                        &#xe6f0;
                      </i>
                    </div>
                  </DatePicker>
                </FilterBox>
              ) : null}
              <WhiteSpace />
              <ReactEchartsCore
                echarts={echarts}
                option={this.getOption2()}
                style={{ height: 250, background: '#fff' }}
              />
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <FlexBox
                    style={{ minHeight: 50, paddingTop: 4, fontWeight: 600 }}
                  >
                    <div>广告订单</div>
                  </FlexBox>
                </Flex.Item>
                <Flex.Item>
                  <FlexBox
                    style={{ minHeight: 50, paddingTop: 4, fontWeight: 600 }}
                    onClick={() =>
                      history.push('/popularize/smartScreen/screenList')
                    }
                  >
                    <div>推广内容</div>
                  </FlexBox>
                </Flex.Item>
              </Flex>
            </Paper>
            <WhiteSpace />
          </WingBlank>
        ) : null}
        <WingBlank size="md">
          <Paper>
            <GridCard data={PopularizeGrid} col={4} />
          </Paper>
        </WingBlank>
        <WhiteSpace />
        {process.env.REACT_APP_CUR === 'cs' ? (
          <React.Fragment>
            <WingBlank size="md">
              <Paper>
                <GridCard data={AllianceGrid} col={4} />
              </Paper>
            </WingBlank>
            <WhiteSpace />
          </React.Fragment>
        ) : null}
        <div style={{ height: 50 }} />
      </div>
    )
  }
}

export default Home
