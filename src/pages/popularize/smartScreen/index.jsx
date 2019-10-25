import React from 'react'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ReactEcharts from 'echarts-for-react'
import NavBar from '@/common/NavBar'
import { FilterBox } from '@/styled'
import {
  List,
  Icon,
  Picker,
  WhiteSpace,
  WingBlank,
  DatePicker,
} from 'antd-mobile'
import moment from 'moment'
import ScreenList from './screenList'
import PromotionList from './promotionList'
import SmartScreenSlogan from './smartScreenSlogan'
import PromotionPanel from './promotionPanel'
import QrCodeMember from './qrcodeMember'
import ViewTime from './viewTime'
import PurchaseNum from './purchaseNum'
import SmartScreenSloganManagement from './smartScreenSloganManagement'
import SmartScreenCustomerSlogan from './smartScreenCustomerSlogan'
import SmartScreenShopAssistantSlogan from './smartScreenShopAssistantSlogan'
import SmartScreenSloganCRU from './smartScreenSloganCRU'

const FilterData1 = [
  { label: '日', value: '1' },
  { label: '月', value: '2' },
  { label: '年', value: '3' },
]
const seasones = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
]
@inject('smartScreen', 'home')
@observer
class SmartScreen extends React.Component {
  state = {
    open: false,
    value: [],
    filterLabel1: '日',
    filterValue1: '1',
    filterLabel2: '2019-08-07',
    filterValue2: '',
    aiData: [],
  }

  componentDidMount() {
    const { smartScreen, home } = this.props
    const { filterValue1, filterLabel2, filterStoreValue } = this.state
    smartScreen.fetchIMax()
    smartScreen.fetchUserCome()
    smartScreen.fetchStoreMer()
    home
      .getAllFaceVisit(filterValue1, filterLabel2, filterStoreValue)
      .then(() => {
        this.setState({
          aiData: home.aiData,
        })
      })
  }

  getOption = () => {
    let xData = []
    let custom = false
    const { filterValue1, aiData, seriesLabel2 } = this.state
    if (filterValue1 === '1') {
      xData = aiData.map((item, index) => `${(index + 1) * 2}点`)
      custom = true
    } else if (filterValue1 === '2') {
      xData = aiData.map((item, index) => `${index + 1}号`)
      custom = false
    } else if (filterValue1 === '3') {
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
        aiData: [],
      },
      () => {
        // const { cur, searchType } = this.state
        // this.changeEchartType(cur, searchType)
      },
    )
  }

  changeFilter2 = () => {
    console.log('changeFilter2')
  }

  changeYear = val => {
    const { home } = this.props
    const { filterValue1, filterStoreValue } = this.state
    home
      .getAllFaceVisit(
        filterValue1,
        moment(val).format('YYYY'),
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          filterLabel2: `${moment(val).format('YYYY')}`,
        })
      })
  }

  changeMonth = val => {
    const { home } = this.props
    const { filterValue1, filterStoreValue } = this.state
    home
      .getAllFaceVisit(
        filterValue1,
        moment(val).format('YYYY-MM'),
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          filterLabel2: moment(val).format('YYYY-MM'),
        })
      })
  }

  changeDay = val => {
    const { home } = this.props
    const { filterValue1, filterStoreValue } = this.state
    home
      .getAllFaceVisit(
        filterValue1,
        moment(val).format('YYYY-MM-DD'),
        filterStoreValue,
      )
      .then(() => {
        this.setState({
          aiData: home.aiData,
          filterLabel2: moment(val).format('YYYY-MM-DD'),
        })
      })
  }

  render() {
    const { history } = this.props
    const { open, value, filterLabel1, filterValue1, filterLabel2 } = this.state
    return (
      <>
        <NavBar
          title="智能屏推广"
          goBack
          right={
            <Picker
              title=""
              cascade={false}
              cols={2}
              data={seasones}
              value={value}
            >
              <Icon
                type="ellipsis"
                onClick={() => this.setState({ open: !open })}
              />
            </Picker>
          }
        />
        <WingBlank size="sm">
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
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          {/* <FilterBox style={{ marginRight: 5 }}>
            <Picker data={[]} value={[filterValue2]} cols={1} onChange={this.changeFilter2}>
              <div>
                <span>{filterLabel2}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox> */}
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
        </WingBlank>
        <ReactEcharts
          option={this.getOption()}
          style={{ height: 250, background: '#fff' }}
        />
        <List style={{ marginTop: 10 }}>
          <List.Item
            arrow="horizontal"
            // onClick={() => history.push('/popularize/smartScreen/promotionList404')}
          >
            购买广告
          </List.Item>
          <List.Item
            arrow="horizontal"
            // onClick={() => history.push('/popularize/smartScreen/promotionList404')}
          >
            广告订单
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => history.push('/popularize/smartScreen/screenList')}
          >
            智能屏推广海报
          </List.Item>
          {/* <List.Item
            arrow="horizontal"
            onClick={() => history.push('/popularize/smartScreen/promotionList')}
          >
            同城智能屏推广海报
          </List.Item> */}
        </List>
      </>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/popularize/smartScreen" exact component={SmartScreen} />
    {/* 本店智能屏推广海报屏幕列表 */}
    <Route
      path="/popularize/smartScreen/screenList"
      exact
      component={ScreenList}
    />
    {/* 屏幕内推广内容列表 */}
    <Route
      path="/popularize/smartScreen/promotionList/:id"
      exact
      component={PromotionList}
    />
    {/* 顾客见面语列表 */}
    <Route
      path="/popularize/smartScreen/smartScreenCustomerSlogan/:id"
      exact
      component={SmartScreenCustomerSlogan}
    />
    {/* 员工见面语列表 */}
    <Route
      path="/popularize/smartScreen/smartScreenShopAssistantSlogan/:imax/:id"
      exact
      component={SmartScreenShopAssistantSlogan}
    />
    {/* 编辑见面语 */}
    <Route
      path="/popularize/smartScreen/smartScreenSloganCRU/:type/:imax/:show/:id?"
      exact
      component={SmartScreenSloganCRU}
    />
    {/* 员工见面语配置 */}
    <Route
      path="/popularize/smartScreen/smartScreenSloganManagement/:id"
      exact
      component={SmartScreenSloganManagement}
    />
    {/* 编辑屏幕广告语 */}
    <Route
      path="/popularize/smartScreen/smartScreenSlogan/:id"
      exact
      component={SmartScreenSlogan}
    />
    {/* 添加推广内容 */}
    <Route
      path="/popularize/smartScreen/promotionList/promotionPanel/:str/:id"
      component={PromotionPanel}
    />
    {/* 扫码人数 */}
    <Route
      path="/popularize/smartScreen/promotionList/qrcodeMember/:id"
      component={QrCodeMember}
    />
    {/* 浏览时长 */}
    <Route
      path="/popularize/smartScreen/promotionList/viewTime/:id"
      component={ViewTime}
    />
    {/* 购买数量 */}
    <Route
      path="/popularize/smartScreen/promotionList/purchaseNum/:id"
      component={PurchaseNum}
    />
  </React.Fragment>
)
