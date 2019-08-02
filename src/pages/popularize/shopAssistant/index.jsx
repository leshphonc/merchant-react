import React from 'react'
import NavBar from '@/common/NavBar'
// import { AssistantList } from '@/config/list'
// import CardList from '@/common/Generalize'
import { observer, inject } from 'mobx-react'
import { Button, List, DatePicker, Picker, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'

require('./index.css')

const seasons = [
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
]

// import enUs from 'antd-mobile/lib/date-picker/locale/en_US'
@inject('shopAssistant')
@observer
class ShopAssistant extends React.Component {
  state = {
    selectValue: '',
  }

  timedate = {
    startdate: '',
    enddate: '',

  }

  render() {
    const { selectValue } = this.state
    const { startdate, enddate } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="推广统计"
          goBack
        />
        {/* <CardList list={AssistantList} /> */}
        <WingBlank size="md">
          <div id="box">
            <List className="date-picker-list top">
              <Picker
                data={seasons}
                cascade={false}
                extra="全部店铺"
                value={selectValue}
                onChange={v => {
                  this.setState({
                    selectValue: v,
                  })
                }}
              >
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            </List>
            <List className="date-picker-list top">
              <DatePicker
                mode="date"
                // title="Select Date"
                value={startdate}
                onChange={v => {
                  this.setState({
                    startdate: v,
                  })
                }}
              >
                <List.Item arrow=""></List.Item>
              </DatePicker>
            </List>
            <List className="date-picker-list top">
              <DatePicker
                mode="date"
                // title="Select Date"
                value={enddate}
                onChange={v => {
                  this.setState({
                    enddate: v,
                  })
                }}
              >
                <List.Item arrow=""></List.Item>
              </DatePicker>
            </List>
            <Button className="btn-a" type="primary">查询</Button>
          </div>
        </WingBlank>
        <List className="top" style={{ width: '96%', margin: '0 auto', textAlign: 'center', marginBottom: '10px' }}>
            当前记录
        </List>
        <div id="nav">
          <List>
            <span>扫码总人数</span><span>11111</span>
          </List>
          <List>
            <span>绑粉总人数</span><span>5253</span>
          </List>
          <List>
            <span>购买总人数</span><span>85531</span>
          </List>
          <List>
            <span>销售佣金</span><span>1585</span>
          </List>
          <List>
            <span>推广佣金</span><span>656563</span>
          </List>
        </div>
        <div id="foot">
          <Link
            to={{
              pathname: '/popularize/shopAssistant/list',
            }}
            style={{ color: '#333' }}
          >
              查看推广详情
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
export default ShopAssistant
