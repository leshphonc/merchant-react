import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List } from 'antd-mobile'

class Retail extends React.Component {
  render() {
    return (
      <>
        <NavBar title="分销商品列表"></NavBar>
        <WhiteSpace />
        <List>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/dsgl.png')}
          >
            电商
          </List.Item>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/yygl.png')}
          >
            预定
          </List.Item>
          <List.Item
            arrow="horizontal"
            thumb={require('@/assets/image/tggl.png')}
          >
            团购
          </List.Item>
        </List>
      </>
    )
  }
}

export default Retail
