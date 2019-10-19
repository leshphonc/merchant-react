import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Button } from 'antd-mobile'

class SmartScreenCustomerSlogan extends React.Component {
  mapList = () => {
    const { history } = this.props
    return (
      <List.Item
        arrow="horizontal"
        extra="修改"
        onClick={() => {
          history.push(`/popularize/smartScreen/smartScreenSloganCRU/${1}`)
        }}
      >
        见面语1
        <List.Item.Brief>见面语播报详细内容</List.Item.Brief>
      </List.Item>
    )
  }
  render() {
    const { history } = this.props
    return (
      <>
        <NavBar
          title="顾客见面配置"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={() =>
                history.push('/popularize/smartScreen/smartScreenSloganCRU')
              }
            >
              添加
            </Button>
          }
        ></NavBar>
        <WhiteSpace></WhiteSpace>
        {this.mapList()}
      </>
    )
  }
}

export default SmartScreenCustomerSlogan
