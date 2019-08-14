import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, WingBlank, PullToRefresh, Card, Picker,
} from 'antd-mobile'
import { FilterBox } from '@/styled'

const TypeData = [
  {
    value: '1',
    label: '提现到对公账户',
  },
  {
    value: '2',
    label: '提现到微信钱包',
  },
]
@inject('wallet')
@observer
class WithdrawRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      typeLabel: '提现到对公账户',
      typeValue: '1',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { wallet } = this.props
    const { withdrawRecordList } = wallet
    const { height, typeValue } = this.state
    if (!withdrawRecordList.length) wallet.fetchWithdrawRecord(typeValue)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 106.5
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { wallet } = this.props
    const { withdrawRecordList } = wallet
    return withdrawRecordList.map(item => (
      <React.Fragment key={item.id + Math.random()}>
        <Card>
          <Card.Header
            title={
              item.status === '1' ? (
                <span style={{ color: '#690' }}>已通过</span>
              ) : (
                <span style={{ color: '#dd4a68' }}>被驳回</span>
              )
            }
            extra={`¥ ${item.money}`}
          />
          <Card.Body style={{ fontSize: 13, color: '#555' }}>
            <div>{item.remark}</div>
            <WhiteSpace />
            <WhiteSpace />
            <div dangerouslySetInnerHTML={{ __html: item.desc }} />
          </Card.Body>
          <WhiteSpace />
          <Card.Footer content={item.withdraw_time} />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { wallet } = this.props
    const { typeValue } = this.state
    this.setState({ refreshing: true })
    await wallet.fetchWithdrawRecord(typeValue)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  resetAndFetchWithdrawRecord = value => {
    const { wallet } = this.props
    const result = TypeData.find(item => item.value === value[0])
    this.setState({
      typeLabel: result.label,
      typeValue: result.value,
    })
    wallet.resetAndFetchWithdrawRecord(value[0])
  }

  render() {
    const {
      height, refreshing, typeLabel, typeValue,
    } = this.state
    return (
      <React.Fragment>
        <WhiteSpace />
        <WingBlank>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={TypeData}
              cols={1}
              value={[typeValue]}
              onChange={val => this.resetAndFetchWithdrawRecord(val)}
            >
              <div>
                <span>{typeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
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

export default WithdrawRecord
