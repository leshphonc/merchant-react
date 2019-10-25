import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank, Card, Button, Flex } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('smartScreen')
@observer
class ScreenList extends React.Component {
  componentDidMount() {
    const { smartScreen } = this.props
    smartScreen.fetchLocalSmartScreen()
  }

  mapList = () => {
    const { history, smartScreen } = this.props
    return smartScreen.smartScreenList.map((item, index) => (
      <React.Fragment key={index}>
        <Card>
          <Card.Header title={item.store_name}></Card.Header>
          <Card.Body>
            <div>设备地址：{item.address}</div>
            <WhiteSpace />
            <div>管理员：{item.contact}</div>
            <WhiteSpace />
            <div>联系电话：{item.tel}</div>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    history.push(
                      `/popularize/smartScreen/smartScreenCustomerSlogan/${item.imax_id}`,
                    )
                  }}
                >
                  顾客见面语
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    history.push(
                      `/popularize/smartScreen/smartScreenSloganManagement/${item.imax_id}`,
                    )
                  }}
                >
                  员工见面语
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    history.push(
                      `/popularize/smartScreen/promotionList/${item.imax_id}`,
                    )
                  }}
                >
                  推广海报
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <>
        <NavBar title="设备列表" goBack />
        <WhiteSpace />
        <WingBlank size="md">{this.mapList()}</WingBlank>
      </>
    )
  }
}

export default ScreenList
