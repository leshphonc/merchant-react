import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, Picker, WingBlank, Button } from 'antd-mobile'
import { toJS } from 'mobx'

const { Item } = List

@inject('giftManagement')
@observer
class OressGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { giftManagement, match } = this.props
    console.log(this.props)
    giftManagement.fetchGiftOrderDetail(match.params.orderId)
  }

  render() {
    const { giftManagement } = this.props
    const { giftOrderDetail } = giftManagement
    console.log(toJS(giftOrderDetail))
    return (
      <React.Fragment>
        <NavBar title="发货详情" goBack />
        {/* <WingBlank size="sm" style={{ marginTop: '10px' }}>
          {this.mapList()}
        </WingBlank> */}
        <List renderHeader="快递信息">
          <Picker>
            <List.Item arrow="horizontal">选择快递</List.Item>
          </Picker>
        </List>
        <WingBlank style={{ padding: '10px 0' }}>
          <Button
            type="primary"
            style={{ color: '#333', fontWeight: 'bold' }}
            onClick={this.submit}
          >
            确定
          </Button>
        </WingBlank>
      </React.Fragment>
    )
  }
}
export default OressGoods
