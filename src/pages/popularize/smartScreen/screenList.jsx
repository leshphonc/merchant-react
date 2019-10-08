import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, Card } from 'antd-mobile'

class ScreenList extends React.Component {
  mapList = () => {
    const { history } = this.props
    return (
      <React.Fragment>
        <Card onClick={() => history.push('/popularize/smartScreen/promotionList')}>
          <Card.Header title="新天地店"></Card.Header>
          <Card.Body>
            <div>屏幕地址：新天地</div>
            <WhiteSpace />
            <div>管理员：林俊杰</div>
            <WhiteSpace />
            <div>联系电话：138292819293</div>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    )
  }

  render() {
    return (
      <>
        <NavBar title="本店智能屏列表" goBack />
        <WhiteSpace />
        {this.mapList()}
      </>
    )
  }
}

export default ScreenList
