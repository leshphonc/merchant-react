import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  SegmentedControl,
  WingBlank,
  Card,
  Flex,
  Picker,
  DatePicker,
} from 'antd-mobile'
import { FilterBox } from '@/styled'

class ShopManagerWorkRecord extends React.Component {
  state = {
    cur: 0,
  }

  curOnChange = e => {
    this.setState({
      cur: e.nativeEvent.selectedSegmentIndex,
    })
  }

  mapList = () => {
    const { cur } = this.state
    if (cur === 0) {
      return this.mapSales()
    } else {
      return this.mapServices()
    }
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
    const { cur } = this.state
    return (
      <>
        <NavBar title="店员工作记录" goBack></NavBar>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <SegmentedControl
            values={['销售记录', '服务记录']}
            selectedIndex={cur}
            onChange={this.curOnChange}
          ></SegmentedControl>
          <WhiteSpace />
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={[]}
              value={[]}
              cols={1}
              onChange={this.changeFilterStore}
            >
              <div>
                <span>全部店铺</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker>
              <div>
                <span>2019-02-10</span>
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
          <FilterBox style={{ marginRight: 5 }}>
            <DatePicker>
              <div>
                <span>2019-02-10</span>
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
        <WhiteSpace></WhiteSpace>
        {this.mapList()}
      </>
    )
  }
}

export default ShopManagerWorkRecord
