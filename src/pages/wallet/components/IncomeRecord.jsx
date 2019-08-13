import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, WingBlank, PullToRefresh, Card, Picker, DatePicker,
} from 'antd-mobile'
import { FilterBox } from '@/styled'
import moment from 'moment'

@inject('wallet')
@observer
class IncomeRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      cateGory: '全部分类',
      cateGoryValue: '',
      store: '全部店铺',
      storeValue: '',
      beginTime: '',
      endTime: '',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { wallet } = this.props
    const { incomeList } = wallet
    const { height } = this.state
    wallet.fetchIncomeCategoryList().then(() => {
      this.setState({
        cateGoryValue: wallet.incomeCategory[0].value,
      })
      wallet.fetchIncomeStoreList().then(() => {
        this.setState(
          {
            storeValue: wallet.incomeStore[0].value,
          },
          () => {
            const {
              cateGoryValue, storeValue, beginTime, endTime,
            } = this.state
            if (!incomeList.length) wallet.fetchIncomeRecord(cateGoryValue, storeValue, beginTime, endTime)
          },
        )
      })
    })

    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 106.5
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { wallet } = this.props
    const { incomeList } = wallet
    return incomeList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            title={
              item.income === '1' ? (
                <span style={{ color: '#690' }}>收入</span>
              ) : (
                <span style={{ color: '#dd4a68' }}>支出</span>
              )
            }
            extra={
              item.income === '1' ? (
                <span style={{ color: '#690' }}>¥ +{item.money}</span>
              ) : (
                <span style={{ color: '#dd4a68' }}>¥ -{item.money}</span>
              )
            }
          />
          <Card.Body style={{ fontSize: 13, color: '#555' }}>
            <div>{item.desc}</div>
            <WhiteSpace />
            <WhiteSpace />
            <div>余额：{item.now_mer_money}</div>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer content={moment(item.use_time * 1000).format('YYYY-MM-DD hh:mm:ss')} />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  findCategoryLabelAndFetch = value => {
    const { wallet } = this.props
    const { incomeCategory } = wallet
    const result = incomeCategory.find(item => item.value === value[0])
    this.setState({
      cateGory: result.label,
      cateGoryValue: result.value,
    })
    const { storeValue, beginTime, endTime } = this.state
    wallet.resetAndFetchIncomeRecord(
      result.value,
      storeValue,
      beginTime ? moment(beginTime).format('YYYY-MM-DD') : '',
      endTime ? moment(endTime).format('YYYY-MM-DD') : '',
    )
  }

  findStoreLabelAndFetch = value => {
    const { wallet } = this.props
    const { incomeStore } = wallet
    const result = incomeStore.find(item => item.value === value[0])
    this.setState({
      store: result.label,
      storeValue: result.value,
    })
    const { cateGoryValue, beginTime, endTime } = this.state
    wallet.resetAndFetchIncomeRecord(
      cateGoryValue,
      result.value,
      beginTime ? moment(beginTime).format('YYYY-MM-DD') : '',
      endTime ? moment(endTime).format('YYYY-MM-DD') : '',
    )
  }

  changeStartTime = value => {
    const { wallet } = this.props
    this.setState({
      beginTime: value,
    })
    const { cateGoryValue, storeValue, endTime } = this.state
    wallet.resetAndFetchIncomeRecord(
      cateGoryValue,
      storeValue,
      moment(value).format('YYYY-MM-DD'),
      endTime ? moment(endTime).format('YYYY-MM-DD') : '',
    )
  }

  changeEndTime = value => {
    const { wallet } = this.props
    this.setState({
      endTime: value,
    })
    const { cateGoryValue, storeValue, beginTime } = this.state
    wallet.resetAndFetchIncomeRecord(
      cateGoryValue,
      storeValue,
      beginTime ? moment(beginTime).format('YYYY-MM-DD') : '',
      moment(value).format('YYYY-MM-DD'),
    )
  }

  loadMore = async () => {
    const { wallet } = this.props
    const {
      cateGoryValue, storeValue, beginTime, endTime,
    } = this.state
    this.setState({ refreshing: true })
    await wallet.fetchIncomeRecord(cateGoryValue, storeValue, beginTime, endTime)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { wallet } = this.props
    const {
      height,
      refreshing,
      cateGory,
      cateGoryValue,
      store,
      storeValue,
      beginTime,
      endTime,
    } = this.state
    return (
      <React.Fragment>
        <WhiteSpace />
        <WingBlank>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={wallet.incomeCategory}
              cols={1}
              value={[cateGoryValue]}
              onChange={val => this.findCategoryLabelAndFetch(val)}
            >
              <div>
                <span>{cateGory}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox>
            <Picker
              data={wallet.incomeStore}
              cols={1}
              value={[storeValue]}
              onChange={val => this.findStoreLabelAndFetch(val)}
            >
              <div>
                <span>{store}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <WhiteSpace />
          <FilterBox>
            <DatePicker mode="date" value={beginTime} onChange={val => this.changeStartTime(val)}>
              <div>{beginTime ? moment(beginTime).format('YYYY-MM-DD') : '开始时间'}</div>
            </DatePicker>
          </FilterBox>
          <span style={{ color: '#999' }}> - </span>
          <FilterBox>
            <DatePicker mode="date" value={endTime} onChange={val => this.changeEndTime(val)}>
              <div>{endTime ? moment(endTime).format('YYYY-MM-DD') : '结束时间'}</div>
            </DatePicker>
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

export default IncomeRecord
