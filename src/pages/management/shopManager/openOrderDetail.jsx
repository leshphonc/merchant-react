import React from 'react'
import { Card, Flex, WhiteSpace } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
// import { CustomizeList, ListTitle, ListContent, MenuMask } from '@/styled'
import 'rc-tooltip/assets/bootstrap.css'

@inject('shopManager')
@observer
class OpenOrderDetail extends React.Component {
  state = {}

  componentDidMount() {
    const { match, shopManager } = this.props
    // console.log(match.params.orderId)
    shopManager.fetchOpenOrderDetail(match.params.orderId)
  }

  render() {
    const { shopManager } = this.props
    const { openOrderDetail } = shopManager
    return (
      <React.Fragment>
        <NavBar title="订单详情" goBack />
        {openOrderDetail.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="staffList">
            <Card>
              <Card.Header
                thumb={item.goods_img}
                title={
                  <Flex direction="column" style={{ marginLeft: '8px' }}>
                    <Flex.Item style={{ display: 'block', width: '100%' }}>
                      {item.name}
                    </Flex.Item>
                    <WhiteSpace />
                    <Flex.Item
                      style={{
                        color: '#666',
                        fontSize: 13,
                        marginBottom: '4px',
                      }}
                    >
                      产品价格：{item.pay_price}
                    </Flex.Item>
                    <Flex.Item
                      style={{
                        color: '#666',
                        fontSize: 13,
                        marginBottom: '4px',
                      }}
                    >
                      产品数量：{item.goods_num}
                    </Flex.Item>
                  </Flex>
                }
              />
            </Card>
            <WhiteSpace />
          </div>
        ))}
      </React.Fragment>
    )
  }
}
export default OpenOrderDetail
