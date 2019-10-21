import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { Button, Flex, List, DatePicker, Picker, WingBlank } from 'antd-mobile'
import { Link, Route } from 'react-router-dom'
import moment from 'moment'
import { ColorBox } from './styled'
import styles from './index.module.css'
import ShopAssistantList from './list'
import ScanList from './scanList'
import SaleList from './saleList'
import FansList from './fansList'

const { Item } = List
// const seasons = [selectValues]
// console.log(seasons)
@inject('shopAssistant')
@observer
class ShopAssistant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      startdate: '',
      enddate: '',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { shopAssistant } = this.props
    shopAssistant.fetchStatisticsInfo()
    shopAssistant.fetchSelectValues()
  }

  search = () => {
    const { startdate, enddate, selectValue } = this.state
    const { shopAssistant } = this.props
    const searchStartDate = moment(startdate).format('YYYY-MM-DD')
    const searchEndDate = moment(enddate).format('YYYY-MM-DD')
    // console.log(searchStartDate)
    // console.log(searchEndDate)
    shopAssistant.fetchStatisticsInfo(
      selectValue[0],
      searchStartDate,
      searchEndDate,
    )
    this.setState({ selectValue: '', startdate: '', enddate: '' })
  }

  render() {
    const { selectValue, startdate, enddate } = this.state
    const { shopAssistant } = this.props
    const { statisticsInfo, selectValues } = shopAssistant
    return (
      <React.Fragment>
        <NavBar title="推广统计" goBack />
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item>
              <ColorBox>
                <Picker
                  data={[selectValues]}
                  cascade={false}
                  extra="全部店铺"
                  value={selectValue}
                  onChange={v => {
                    this.setState({
                      selectValue: v,
                    })
                    shopAssistant.fetchStatisticsInfo(v[0])
                  }}
                >
                  <List.Item className={styles.top} />
                </Picker>
              </ColorBox>
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
                  <List.Item className={styles.top} />
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
                  <List.Item className={styles.top} />
                </DatePicker>
              </ColorBox>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.btna}
                type="primary"
                onClick={this.search}
              >
                查询
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WingBlank
          size="md"
          className={styles.tops}
          style={{
            width: '96%',
            margin: '10px auto',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          当前记录
        </WingBlank>
        <div className={styles.nav}>
          <List className="my-list">
            <Item extra={statisticsInfo.scan || 0}>扫码总人数</Item>
          </List>
          <List className="my-list">
            <Item extra={statisticsInfo.fans || 0}>绑粉总人数</Item>
          </List>
          <List className="my-list">
            <Item extra={statisticsInfo.sale || 0}>购买总人数</Item>
          </List>
          <List className="my-list">
            <Item extra={statisticsInfo.sale_money || 0}>销售佣金</Item>
          </List>
          <List className="my-list">
            <Item extra={statisticsInfo.spread_money || 0}>推广佣金</Item>
          </List>
        </div>
        {selectValue ? (
          <div className={styles.foot}>
            <Link
              to={`/popularize/shopAssistant/list/${selectValue[0]}`}
              style={{ color: '#fff' }}
            >
              查看推广详情
            </Link>
          </div>
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/popularize/shopAssistant" exact component={ShopAssistant} />
    <Route
      path="/popularize/shopAssistant/list/:id"
      component={ShopAssistantList}
    />
    <Route path="/popularize/shopAssistant/scanList/:id" component={ScanList} />
    <Route path="/popularize/shopAssistant/saleList/:id" component={SaleList} />
    <Route path="/popularize/shopAssistant/fansList/:id" component={FansList} />
  </React.Fragment>
)
