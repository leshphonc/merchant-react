import React from 'react'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ReactEcharts from 'echarts-for-react'
import NavBar from '@/common/NavBar'
import { FilterBox } from '@/styled'
import { List, Icon, Picker, WhiteSpace, WingBlank, Badge } from 'antd-mobile'
import PromotionList from './promotionList'

@inject('smartScreen')
@observer
class SmartScreen extends React.Component {
  state = {
    open: false,
    value: [],
    filterLabel1: '年',
    filterValue1: '',
    filterLabel2: '2019',
    filterValue2: '',
  }

  componentDidMount() {
    const { smartScreen } = this.props
    smartScreen.fetchIMax()
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
        const str = params[0].axisValue.substr(0, params[0].axisValue.length - 1)
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
        top: '8%',
        bottom: '10%',
        right: '2%',
        left: '6%',
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
          name: '人数',
        },
      ],
      series: [
        {
          name: seriesLabel,
          type: 'line',
          data: echartData,
        },
      ],
    }
  }

  changeFilter1 = () => {
    console.log('changeFilter1')
  }

  changeFilter2 = () => {
    console.log('changeFilter2')
  }

  render() {
    const { history } = this.props
    const { open, value, filterLabel1, filterValue1, filterLabel2, filterValue2 } = this.state
    return (
      <>
        <NavBar
          title="智能屏推广"
          goBack
          right={
            <Picker title="选择季节" cascade={false} cols={2} data={[]} value={value}>
              <Icon type="ellipsis" onClick={() => this.setState({ open: !open })} />
            </Picker>
          }
        />
        <WingBlank size="sm">
          <WhiteSpace />
          <FilterBox style={{ marginRight: 5 }}>
            <Picker data={[]} value={[filterValue1]} cols={1} onChange={this.changeFilter1}>
              <div>
                <span>{filterLabel1}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker data={[]} value={[filterValue2]} cols={1} onChange={this.changeFilter2}>
              <div>
                <span>{filterLabel2}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <WhiteSpace />
        </WingBlank>

        <ReactEcharts option={this.getOption()} style={{ height: 200, background: '#fff' }} />
        <List style={{ marginTop: 10 }}>
          <List.Item
            arrow="horizontal"
            onClick={() => history.push('/popularize/smartScreen/promotionList')}
          >
            购买广告
          </List.Item>
          <List.Item
            arrow="horizontal"
            extra={<Badge text={77} overflowCount={100} />}
            onClick={() => history.push('/popularize/smartScreen/promotionList')}
          >
            广告订单
          </List.Item>
          <List.Item
            arrow="horizontal"
            extra={<Badge text={77} overflowCount={55} />}
            onClick={() => history.push('/popularize/smartScreen/promotionList')}
          >
            推广列表
          </List.Item>
        </List>
      </>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/popularize/smartScreen" exact component={SmartScreen} />
    <Route path="/popularize/smartScreen/promotionList" component={PromotionList} />
  </React.Fragment>
)
