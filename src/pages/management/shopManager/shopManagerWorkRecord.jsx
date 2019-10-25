import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  SegmentedControl,
  WingBlank,
  Card,
  Flex,
  Picker,
  DatePicker,
  PullToRefresh,
} from 'antd-mobile'
import moment from 'moment'
import { FilterBox } from '@/styled'

@inject('shopManager')
@observer
class ShopManagerWorkRecord extends React.Component {
  state = {
    cur: 0,
    // eslint-disable-next-line react/no-unused-state
    beginTime: moment(new Date(new Date() - 30 * 24 * 3600 * 1000)).format(
      'YYYY-MM-DD',
    ),
    // eslint-disable-next-line react/no-unused-state
    endTime: moment(new Date()).format('YYYY-MM-DD'),
    // eslint-disable-next-line react/no-unused-state
    storeId: 0,
    height: document.documentElement.clientHeight,
    refreshing: false,
    storeList: [],
    storeName: '全部店鋪',
  }

  componentDidMount() {
    const { match, shopManager } = this.props
    const { cur, beginTime, endTime, storeId, height } = this.state
    const hei = height - 150
    this.setState({
      height: hei,
    })
    shopManager.fetchStoreList().then(() => {
      const { storeList } = shopManager
      const arr = [{ label: '全部店鋪', value: 0 }]
      storeList.forEach(item => {
        arr.push({ label: item.name, value: item.store_id })
      })
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        storeList: arr,
      })
    })
    if (cur === 0) {
      shopManager.resetFetchGetStaffDuty(
        match.params.staffId,
        storeId,
        beginTime,
        endTime,
      )
    }
  }

  curOnChange = e => {
    this.setState({
      cur: e.nativeEvent.selectedSegmentIndex,
    })
  }

  mapList = () => {
    const { cur } = this.state
    if (cur === 0) {
      return this.mapStation()
    } else if (cur === 2) {
      return this.mapSales()
    } else if (cur === 1) {
      return this.mapServices()
    }
  }

  mapStation = () => {
    const { shopManager } = this.props
    const { staffDutyList } = shopManager
    return staffDutyList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            title={
              <Flex direction="column">
                <Flex.Item>{item.store_name}</Flex.Item>
              </Flex>
            }
          />
          <Card.Body>
            <Flex>
              <Flex.Item>
                状态：
                {item.type === 'up' ? (
                  <span style={{ color: 'green' }}> 到岗 </span>
                ) : (
                  <span style={{ color: 'red' }}>离岗</span>
                )}
              </Flex.Item>
              <Flex.Item>
                时间：{moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>备注：{item.desc ? item.desc : '无'}</Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }
  loadMore = () => {
    const { match, shopManager } = this.props
    const { cur, beginTime, endTime, storeId } = this.state
    if (cur === 0) {
      // console.log(match.params.staffI)
      // debugger
      shopManager.fetchGetStaffDuty(
        match.params.staffId,
        storeId,
        beginTime,
        endTime,
      )
    }
    setTimeout(() => {
      this.mapList()
      this.setState({ refreshing: false })
    }, 100)
  }
  mapSales = () => {
    return (
      <Card>
        <Card.Header
          thumb={require('@/assets/image/avatar.jpeg')}
          title={
            <Flex direction="column">
              <Flex.Item>名称</Flex.Item>
              <WhiteSpace />
              <Flex.Item style={{ color: '#666', fontSize: 14 }}>
                订单编号：1202130045912
              </Flex.Item>
            </Flex>
          }
        />
        <Card.Body>
          <Flex>
            <Flex.Item>消费用户：测试</Flex.Item>
            <Flex.Item>消费时间：2019-02-01</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>数量：20</Flex.Item>
            <Flex.Item>金额：2000</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>销售报酬：100</Flex.Item>
            <Flex.Item>结算时间：2019-02-02</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>所在店铺：1号店铺</Flex.Item>
          </Flex>
        </Card.Body>
      </Card>
    )
  }

  changeFilterStore = val => {
    const { shopManager, match } = this.props
    const { storeList, beginTime, endTime } = this.state
    storeList.forEach(item => {
      if (item.value === val[0]) {
        this.setState({
          storeName: item.label,
        })
      }
    })
    this.setState({
      storeId: val[0],
    })
    shopManager.resetFetchGetStaffDuty(
      match.params.staffId,
      val[0],
      beginTime,
      endTime,
    )
  }

  setEndTime = data => {
    const { shopManager, match } = this.props
    const { storeId, beginTime } = this.state
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      endTime: moment(data).format('YYYY-MM-DD'),
    })
    shopManager.resetFetchGetStaffDuty(
      match.params.staffId,
      storeId,
      beginTime,
      moment(data).format('YYYY-MM-DD'),
    )
  }

  setBeiginTime = data => {
    const { shopManager, match } = this.props
    const { storeId, endTime } = this.state
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      beginTime: moment(data).format('YYYY-MM-DD'),
    })
    shopManager.resetFetchGetStaffDuty(
      match.params.staffId,
      storeId,
      moment(data).format('YYYY-MM-DD'),
      endTime,
    )
  }

  mapServices = () => {
    return (
      <Card>
        <Card.Header
          thumb={require('@/assets/image/avatar.jpeg')}
          title={
            <Flex direction="column">
              <Flex.Item>名称</Flex.Item>
              <WhiteSpace />
              <Flex.Item style={{ color: '#666', fontSize: 14 }}>
                订单编号：1202130045912
              </Flex.Item>
            </Flex>
          }
        />
        <Card.Body>
          <Flex>
            <Flex.Item>消费用户：测试</Flex.Item>
            <Flex.Item>消费时间：2019-02-01</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>数量：20</Flex.Item>
            <Flex.Item>金额：2000</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>服务报酬：100</Flex.Item>
            <Flex.Item>结算时间：2019-02-02</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>所在店铺：1号店铺</Flex.Item>
          </Flex>
        </Card.Body>
      </Card>
    )
  }

  render() {
    const {
      cur,
      refreshing,
      height,
      storeList,
      storeId,
      storeName,
      beginTime,
      endTime,
    } = this.state
    return (
      <>
        <NavBar title="店员工作记录" goBack />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            values={['到岗记录', '服务记录', '销售记录']}
            selectedIndex={cur}
            onChange={this.curOnChange}
          />
          <WhiteSpace />
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={storeList}
              value={[storeId]}
              cols={1}
              onChange={this.changeFilterStore}
            >
              <div>
                <span>{storeName}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox>
            <DatePicker mode="date" onChange={this.setBeiginTime}>
              <div>
                <span>{beginTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <span>-&nbsp;</span>
          <FilterBox>
            <DatePicker mode="date" onChange={this.setEndTime}>
              <div>
                <span>{endTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
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
          {this.mapList()}
        </PullToRefresh>
      </>
    )
  }
}

export default ShopManagerWorkRecord
