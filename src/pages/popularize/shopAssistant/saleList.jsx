import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, List, DatePicker, WingBlank, Flex, PullToRefresh, WhiteSpace,
} from 'antd-mobile'
// import CardList from './components/SaleList'
// import { SaleList } from '@/config/list'
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
    const { shopAssistant, match } = this.props
    const { height } = this.state
    shopAssistant.fetchSaleList(match.params.id)
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
    const { shopAssistant, match } = this.props
    const searchStartDate = moment(startdate).format('YYYY-MM-DD')
    const searchEndDate = moment(enddate).format('YYYY-MM-DD')
    shopAssistant.fetchScanList(match.params.id, searchStartDate, searchEndDate)
  }

  mapList = () => {
    const { shopAssistant } = this.props
    const { saleList } = shopAssistant
    return saleList.map(item => (
      <div style={{ background: '#fff' }}>
        <List className="list" style={{ borderBottom: '1px solid #aaa', padding: '4px 0' }}>
          <span className="pic" style={{ width: '16vw' }}>
            {item.avatar ? <img src={item.avatar} alt="无" /> : null}
          </span>
          <span style={{ width: '20vw' }}>{item.nickname || '暂无'}</span>
          <span style={{ width: '28vw' }}>
            {moment(item.spread_time * 1000).format('YYYY-MM-DD')}
          </span>
          <span style={{ width: '25vw' }}>{item.consum_money}</span>
        </List>
      </div>
    ))
  }

  loadMore = async () => {
    const { shopAssistant } = this.props
    this.setState({ refreshing: true })
    await shopAssistant.fetchSaleList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { shopAssistant } = this.props
    const { saleListTotal } = shopAssistant
    const {
      startdate, enddate, refreshing, height,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="销售记录" goBack />
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item
              className={styles.tops}
              style={{
                textAlign: 'center',
                background: '#ffb000',
                color: '#fff',
                fontSize: '15px',
              }}
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
          {saleListTotal ? `${saleListTotal}条记录` : '暂无数据'}
        </WingBlank>
        <Info>
          <List className="info">
            <span style={{ width: '16vw', textAlign: 'center' }}>头像</span>
            <span style={{ width: '20vw', textAlign: 'center' }}>昵称</span>
            <span style={{ width: '28vw', textAlign: 'center' }}>购买时间</span>
            <span style={{ width: '25vw', textAlign: 'center' }}>销售金额</span>
          </List>
        </Info>
        {saleListTotal < 10 ? (
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
