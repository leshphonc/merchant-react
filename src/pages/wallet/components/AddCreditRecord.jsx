import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, WingBlank, PullToRefresh, Card,
} from 'antd-mobile'
import moment from 'moment'

@inject('wallet')
@observer
class AddCreditRecord extends React.Component {
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
    const { addCreditList } = wallet
    const { height } = this.state
    if (!addCreditList.length) wallet.fetchAddCreditRecord()
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 106.5
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { wallet } = this.props
    const { addCreditList } = wallet
    return addCreditList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            title={item.desc}
            extra={<span style={{ color: '#690' }}>¥ {item.money}</span>}
          />
          <Card.Body style={{ fontSize: 13, color: '#555' }}>
            <div>订单编号：{item.order_id}</div>
            <WhiteSpace />
            <WhiteSpace />
            <div>余额：{item.now_mer_money}</div>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer content={moment(item.use_time * 1000).format('YYYY-MM-DD HH:mm:ss')} />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { wallet } = this.props
    this.setState({ refreshing: true })
    await wallet.fetchAddCreditRecord()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <WhiteSpace />
        <PullToRefresh
          style={{
            height,
            overflow: 'auto',
          }}
          ref={this.refresh}
          refreshing={refreshing}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.loadMore}
        >
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>
      </React.Fragment>
    )
  }
}

export default AddCreditRecord
