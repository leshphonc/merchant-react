import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, List, DatePicker, WingBlank, Flex, PullToRefresh, WhiteSpace,
} from 'antd-mobile'
import moment from 'moment'
import { ColorBox, Info } from './styled'
import styles from './index.module.css'

@inject('shopAssistant')
@observer
class ShopAssistant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startdate: '',
      enddate: '',
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { shopAssistant, history } = this.props
    const { height } = this.state
    shopAssistant.fetchFansList(history.location.state.id)
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    /* eslint react/no-find-dom-node: 0 */
  }

  search = () => {
    const { startdate, enddate } = this.state
    const { shopAssistant, history } = this.props
    const searchStartDate = moment(startdate).format('YYYY-MM-DD')
    const searchEndDate = moment(enddate).format('YYYY-MM-DD')
    shopAssistant.fetchScanList(history.location.state.id, searchStartDate, searchEndDate)
  }

  mapList = () => {
    const { shopAssistant } = this.props
    const { fansList } = shopAssistant

    return fansList.map(item => (
      <div style={{ background: '#fff' }}>
        <List className="list" style={{ borderBottom: '1px solid #aaa', padding: '4px 20px' }}>
          <span className="pic" style={{ width: '16vw' }}>
            {item.avatar ? <img src={item.avatar} alt="无" /> : null}
          </span>
          <span style={{ width: '20vw' }}>{item.nickname}</span>
          <span style={{ width: '28vw' }}>
            {moment(item.spread_time * 1000).format('YYYY-MM-DD')}
          </span>
        </List>
      </div>
    ))
  }

  loadMore = async () => {
    const { shopAssistant } = this.props
    this.setState({ refreshing: true })
    await shopAssistant.fetchFansList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { shopAssistant } = this.props
    const { fansListTotal } = shopAssistant
    const {
      startdate, enddate, refreshing, height,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="绑粉记录" goBack />
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item
              className={styles.tops}
              style={{ textAlign: 'center', background: '#ffb000' }}
            >
              今日推广
            </Flex.Item>
            <Flex.Item>
              <ColorBox>
                <DatePicker
                  mode="date"
                  extra="选择时间"
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
                  extra="选择时间"
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
              <Button className={styles.btna} type="primary" onClick={this.search}>
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
          {fansListTotal ? `${fansListTotal}条记录` : '暂无数据'}
        </WingBlank>
        <Info>
          <List>
            <span style={{ width: '16vw', textAlign: 'center' }}>头像</span>
            <span style={{ width: '20vw', textAlign: 'center' }}>昵称</span>
            <span style={{ width: '28vw', textAlign: 'center' }}>绑定时间</span>
          </List>
        </Info>
        {fansListTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </React.Fragment>
        ) : (
          <PullToRefresh
            ref={this.refresh}
            refreshing={refreshing}
            style={{
              height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            onRefresh={this.loadMore}
          >
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </PullToRefresh>
        )}
      </React.Fragment>
    )
  }
}
export default ShopAssistant
