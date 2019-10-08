import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank, PullToRefresh, Card, Flex } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('wallet')
@observer
class BankWithDrawRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { wallet } = this.props
    const { height } = this.state
    wallet.fetchWithDrawRecord(true)
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
  }

  mapList = () => {
    const { wallet } = this.props
    return wallet.withDrawList.map((item, index) => (
      <React.Fragment key={index}>
        <Card>
          <Card.Header title={item.name} extra={item.addtime}></Card.Header>
          <Card.Body>
            <Flex>
              <Flex.Item>
                <div>
                  提现金额：<span style={{ color: 'green' }}>{item.money}</span> 元
                </div>
              </Flex.Item>
              <Flex.Item>
                <div>
                  手续费：<span style={{ color: 'red' }}>{item.takecashcommission}</span> 元
                </div>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            extra={
              <div>
                实际到账：<span style={{ color: '#ffb000', fontSize: 16 }}>{item.cashamt}</span> 元
              </div>
            }
          >
          </Card.Footer>
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = () => {
    const { wallet } = this.props
    wallet.fetchWithDrawRecord()
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <div>
        <NavBar title="银行卡提现记录" goBack />
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
          <WingBlank size="sm">{this.mapList()}</WingBlank>
        </PullToRefresh>
      </div>
    )
  }
}

export default BankWithDrawRecord
