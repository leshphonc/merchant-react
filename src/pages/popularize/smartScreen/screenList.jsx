import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank, Card } from 'antd-mobile'
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
        <Card onClick={() => history.push(`/popularize/smartScreen/promotionList/${item.imax_id}`)}>
          <Card.Header title={item.store_name}></Card.Header>
          <Card.Body>
            <div>屏幕地址：{item.address}</div>
            <WhiteSpace />
            <div>管理员：{item.contact}</div>
            <WhiteSpace />
            <div>联系电话：{item.tel}</div>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <>
        <NavBar title="本店智能屏列表" goBack />
        <WhiteSpace />
        <WingBlank size="md">{this.mapList()}</WingBlank>
      </>
    )
  }
}

export default ScreenList
