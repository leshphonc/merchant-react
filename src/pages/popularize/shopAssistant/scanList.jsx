import React from 'react'
import NavBar from '@/common/NavBar'
// import CardList from '@/common/ScanList'
// import { ScanList } from '@/config/list'
import { Button, List, DatePicker } from 'antd-mobile'
import CardList from '@/common/ScanList'
import { ScanList } from '@/config/list'

require('./index.css')

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
          title="扫码记录"
          goBack
        />
        {/* <CardList list={AssistantList} /> */}
        <div id="box">
          <List className="date-picker-list top">
            今日推广
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
        <List className="top bg" style={{ width: '96%', margin: '0 auto', textAlign: 'center', marginBottom: '10px' }}>
            当前记录
        </List>
        <List className="list-top">
          <span style={{ width: '16vw', textAlign: 'center' }}>头像</span>
          <span style={{ width: '20vw', textAlign: 'center' }}>昵称</span>
          <span style={{ width: '28vw', textAlign: 'center' }}>扫码时间</span>
          <span style={{ width: '25vw', textAlign: 'center' }}>推广内容</span>
        </List>
        <CardList list={ScanList} />
      </React.Fragment>
    )
  }
}
export default ShopAssistant
