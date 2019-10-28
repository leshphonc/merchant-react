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
      storeId: 0,
      beginTime: moment(new Date(new Date() - 30 * 24 * 3600 * 1000)).format(
        'YYYY-MM-DD',
      ),
      // eslint-disable-next-line react/no-unused-state
      endTime: moment(new Date()).format('YYYY-MM-DD'),
      storeName: '全部店鋪',
    })
    const { match, shopManager } = this.props
    const { beginTime, endTime, storeId } = this.state
    if (e.nativeEvent.selectedSegmentIndex === 0) {
      shopManager.resetFetchGetStaffDuty(
        match.params.staffId,
        storeId,
        beginTime,
        endTime,
      )
    } else if (e.nativeEvent.selectedSegmentIndex === 2) {
      shopManager.resetFetchOpenOrderList(
        storeId,
        match.params.staffId,
        beginTime,
        endTime,
      )
    } else if (e.nativeEvent.selectedSegmentIndex === 3) {
      shopManager.resetFetchGetStaffSale(
        match.params.staffId,
        storeId,
        beginTime,
        endTime,
      )
    }
  }

  mapList = () => {
    const { cur } = this.state
    if (cur === 0) {
      return this.mapStation()
    } else if (cur === 3) {
      return this.mapSales()
    } else if (cur === 1) {
      return this.mapServices()
    } else if (cur === 2) {
      return this.mapOpenOrder()
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
      shopManager.fetchGetStaffDuty(
        match.params.staffId,
        storeId,
        beginTime,
        endTime,
      )
    } else if (cur === 3) {
      shopManager.fetchGetStaffSale(
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
    const { shopManager } = this.props
    const { staffSaleList } = shopManager
    return staffSaleList.map(item => (
      <React.Fragment key={item.id}>
        <div className="staffList">
          <Card>
            <Card.Header
              thumb={item.pic}
              title={
                <Flex direction="column" style={{ marginLeft: '8px' }}>
                  <Flex.Item style={{ display: 'block', width: '100%' }}>
                    {item.goods_name}
                  </Flex.Item>
                  <WhiteSpace />
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    订单编号：{item.order_id}
                  </Flex.Item>
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    下单时间：{' '}
                    {moment(item.addtime * 1000).format('YYYY-MM-DD H:mm:ss')}
                  </Flex.Item>
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    所属店铺：{item.store_name}
                  </Flex.Item>
                </Flex>
              }
            />
            <Card.Body>
              <Flex>
                <Flex.Item style={{ textAlign: 'left' }}>
                  用户：{item.user_name}
                </Flex.Item>
                <Flex.Item style={{ textAlign: 'center' }}>
                  用户id：{item.uid}
                </Flex.Item>
                <Flex.Item style={{ textAlign: 'right' }}>
                  数量:{item.num}
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item style={{ textAlign: 'left' }}>
                  金额：{item.order_money}
                </Flex.Item>
                <Flex.Item style={{ textAlign: 'center' }}>
                  销售报酬：{item.first_spread_by_take}
                </Flex.Item>
                <Flex.Item style={{ textAlign: 'right' }}>
                  状态：
                  {item.settlement_time === 0 ? (
                    <span style={{ color: 'red' }}>结算中</span>
                  ) : (
                    <span style={{ color: 'blue' }}>已结算</span>
                  )}
                </Flex.Item>
              </Flex>
              <WhiteSpace />
            </Card.Body>
          </Card>
          <WhiteSpace />
        </div>
      </React.Fragment>
    ))
  }

  mapOpenOrder = () => {
    const { shopManager } = this.props
    const { openOrderList } = shopManager

    return openOrderList.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        <div className="staffList">
          <Card>
            <Card.Header
              thumb={item.pic_info}
              title={
                <Flex direction="column" style={{ marginLeft: '8px' }}>
                  <Flex.Item style={{ display: 'block', width: '100%' }}>
                    开单标识: {item.station_name}
                  </Flex.Item>
                  <WhiteSpace />
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    订单编号：{item.order_id}
                  </Flex.Item>
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    下单时间：
                    {moment(item.pay_time * 1000).format('YYYY-MM-DD H:mm:ss')}
                  </Flex.Item>
                  <Flex.Item
                    style={{ color: '#666', fontSize: 13, marginBottom: '4px' }}
                  >
                    所属店铺：{item.name}
                  </Flex.Item>
                </Flex>
              }
            />
            <Card.Body>
              <Flex>
                <Flex.Item>消费用户：{item.nickname}</Flex.Item>
                <Flex.Item>用户id：{item.uid}</Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item> 数量:{item.goods_num}</Flex.Item>
                <Flex.Item>金额：{item.payment_money}</Flex.Item>
              </Flex>
              <WhiteSpace />
            </Card.Body>
          </Card>
          <WhiteSpace />
        </div>
      </React.Fragment>
    ))
  }

  changeFilterStore = val => {
    const { shopManager, match } = this.props
    const { storeList, beginTime, endTime, cur } = this.state
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
    if (cur === 0) {
      shopManager.resetFetchGetStaffDuty(
        match.params.staffId,
        val[0],
        beginTime,
        endTime,
      )
    } else if (cur === 3) {
      shopManager.resetFetchGetStaffSale(
        match.params.staffId,
        val[0],
        beginTime,
        endTime,
      )
    }
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
    return <div style={{ textAlign: 'center' }}>暂无记录</div>
    // return (
    // <Card>
    //   <Card.Header
    //     thumb={require('@/assets/image/avatar.jpeg')}
    //     title={
    //       <Flex direction="column">
    //         <Flex.Item>名称</Flex.Item>
    //         <WhiteSpace />
    //         <Flex.Item style={{ color: '#666', fontSize: 14 }}>
    //           订单编号：1202130045912
    //         </Flex.Item>
    //       </Flex>
    //     }
    //   />
    //   <Card.Body>
    //     <Flex>
    //       <Flex.Item>消费用户：测试</Flex.Item>
    //       <Flex.Item>消费时间：2019-02-01</Flex.Item>
    //     </Flex>
    //     <WhiteSpace />
    //     <Flex>
    //       <Flex.Item>数量：20</Flex.Item>
    //       <Flex.Item>消费金额：2000</Flex.Item>
    //     </Flex>
    //     <WhiteSpace />
    //     <Flex>
    //       <Flex.Item>服务报酬：100</Flex.Item>
    //       <Flex.Item>结算时间：2019-02-02</Flex.Item>
    //     </Flex>
    //     <WhiteSpace />
    //     <Flex>
    //       <Flex.Item>所在店铺：1号店铺</Flex.Item>
    //     </Flex>
    //   </Card.Body>
    // </Card>
    // )
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
            values={['到岗记录', '服务记录', '开单记录', '销售记录']}
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
