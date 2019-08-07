import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, List, DatePicker, Picker, WingBlank,
} from 'antd-mobile'
import { Link } from 'react-router-dom'
import { ColorBox } from './styled'

import styles from './index.module.css'

const { Item } = List
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
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item>
              <ColorBox>
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
                  <List.Item arrow="horizontal" className={styles.top}></List.Item>
                </Picker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <ColorBox>
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
                  <List.Item arrow="" className={styles.top}></List.Item>
                </DatePicker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <ColorBox>
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
                  <List.Item arrow="" className={styles.top}></List.Item>
                </DatePicker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <Button className={styles.btna} type="primary">查询</Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WingBlank size="md" className={styles.tops} style={{ width: '96%', margin: '10px auto', textAlign: 'center' }}>
          当前记录
        </WingBlank>
        <div className={styles.nav}>
          <List className="my-list">
            <Item extra="7652">扫码总人数</Item>
          </List>
          <List className="my-list">
            <Item extra="11">绑粉总人数</Item>
          </List>
          <List className="my-list">
            <Item extra="6511">购买总人数</Item>
          </List>
          <List className="my-list">
            <Item extra="4541">销售佣金</Item>
          </List>
          <List className="my-list">
            <Item extra="11486">推广佣金</Item>
          </List>
        </div>
        <div className={styles.foot}>
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
