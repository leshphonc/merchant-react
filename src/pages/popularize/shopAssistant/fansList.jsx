import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Button, List, DatePicker, WingBlank, Pagination, Flex,
} from 'antd-mobile'
import CardList from './components/FansList'
import { FansList } from '@/config/list'
import { ColorBox, Pages, Info } from './styled'
import styles from './index.module.css'

class ShopAssistant extends React.Component {
  state = {
    startdate: '',
    enddate: '',
  }

  locale = {
    prevText: 'Prev',
    nextText: 'Next',
  }

  render() {
    const { startdate, enddate } = this.state
    return (
      <React.Fragment>
        <NavBar title="绑粉记录" goBack />
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item className={styles.tops} style={{ textAlign: 'center', background: '#ffb000' }}>
              今日推广
            </Flex.Item>
            <Flex.Item>
              <ColorBox>
                <DatePicker
                  mode="date"
                  value={startdate}
                  onChange={v => {
                    this.setState({
                      startdate: v,
                    })
                  }}
                >
                  <List.Item arrow="" className={styles.top} />
                </DatePicker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <ColorBox>
                <DatePicker
                  mode="date"
                  value={enddate}
                  onChange={v => {
                    this.setState({
                      enddate: v,
                    })
                  }}
                >
                  <List.Item arrow="" className={styles.top} />
                </DatePicker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <Button className={styles.btna} type="primary">
                查询
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WingBlank
          size="md"
          className={styles.bg}
          style={{ width: '96%', margin: '10px auto', textAlign: 'center' }}
        >
          当前记录
        </WingBlank>
        <Info>
          <List>
            <span style={{ width: '16vw', textAlign: 'center' }}>头像</span>
            <span style={{ width: '20vw', textAlign: 'center' }}>昵称</span>
            <span style={{ width: '28vw', textAlign: 'center' }}>绑定时间</span>
          </List>
        </Info>
        <Pages>
          <CardList list={FansList} />
          <Pagination total={5} current={1} locale="locale" />
        </Pages>
      </React.Fragment>
    )
  }
}
export default ShopAssistant
