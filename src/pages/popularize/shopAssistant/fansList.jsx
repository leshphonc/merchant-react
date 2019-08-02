import React from 'react'
import NavBar from '@/common/NavBar'
// import CardList from '@/common/ScanList'
// import { ScanList } from '@/config/list'
import { Button, List, DatePicker, WingBlank } from 'antd-mobile'
import CardList from './components/FansList'
import { FansList } from '@/config/list'
import './index.module.css'


class ShopAssistant extends React.Component {
  state = {
    startdate: '',
    enddate: '',

  }

  render() {
    const { startdate, enddate } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="绑粉记录"
          goBack
        />
        {/* <CardList list={AssistantList} /> */}
        <WingBlank size="md">
          <div id="box">
            <List className="top" style={{ textAlign: 'center' }}>
              今日推广
            </List>
            <List className="top">
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
            <List className="top">
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
        <List className="top bg" style={{ width: '95%', margin: '0 auto', textAlign: 'center', marginBottom: '10px' }}>
            当前记录
        </List>
        <List className="info">
          <span style={{ width: '16vw', textAlign: 'center' }}>头像</span>
          <span style={{ width: '20vw', textAlign: 'center' }}>昵称</span>
          <span style={{ width: '28vw', textAlign: 'center' }}>绑定时间</span>
        </List>
        <CardList className="sfsd" list={FansList} />
      </React.Fragment>
    )
  }
}
export default ShopAssistant
