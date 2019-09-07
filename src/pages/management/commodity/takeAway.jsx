import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar,
  Picker,
  WhiteSpace,
  WingBlank,
  PullToRefresh,
  Button,
  Card,
  Flex,
  Toast,
} from 'antd-mobile'
import { FilterBox } from '@/styled'

@inject('commodity')
@observer
class TakeAway extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: '全部店铺',
      storeValue: '',
      refreshing: false,
      keyword: '',
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { height } = this.state
    commodity.fetchStoreValues('2', '1')
    sessionStorage.removeItem('spec')
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    commodity.fetchTakeAwayList()
  }

  detele = (id, storeId) => {
    const { commodity } = this.props
    const { storeValue, keyword } = this.state
    commodity.fetchTakeAwayDelete(storeId, id).then(res => {
      if (res) {
        Toast.success('删除成功', 1, () => commodity.resetAndFetchTakeAwayList(storeValue, keyword))
      }
    })
  }

  stand = (id, status, storeId) => {
    const { commodity } = this.props
    const { storeValue, keyword } = this.state
    commodity.takeAwayStandStatus(storeId, id, status === '0' ? 1 : 0).then(res => {
      if (res) {
        Toast.success('状态变更成功', 1, () => commodity.fetchTakeAwayList(storeValue, keyword))
      }
    })
  }

  mapList = () => {
    const { commodity, history } = this.props
    const { takeAwayList } = commodity
    return takeAwayList.map(item => (
      <React.Fragment key={item.goods_id}>
        <Card>
          <Card.Header title={item.name} thumb={item.list_pic} extra={item.store_name} />
          <Card.Body>
            <Flex style={{ color: '#666' }}>
              <Flex.Item>售价: {item.price} 元</Flex.Item>
              <Flex.Item> 状态: {item.statusstr}</Flex.Item>
              <Flex.Item>已售出: {item.sell_count}</Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.detele(item.goods_id, item.store_id)}
                >
                  删除
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(
                    `/management/commodity/takeAwayPanel/编辑/${item.store_id}/${item.goods_id}`,
                  )
                  }
                >
                  编辑
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.stand(item.goods_id, item.status, item.store_id)}
                >
                  {item.statusoptstr}
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    const { storeValue, keyword } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchTakeAwayList(storeValue, keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  findStoreLabelAndFetch = value => {
    const { commodity } = this.props
    const { keyword } = this.state
    const { storeValues } = commodity
    const result = storeValues.find(item => item.value === value[0])
    this.setState({
      store: result.label,
      storeValue: result.value,
    })
    commodity.resetAndFetchTakeAwayList(result.value, keyword)
  }

  render() {
    const {
      refreshing, height, store, storeValue,
    } = this.state
    const { commodity } = this.props
    const { storeValues } = commodity
    return (
      <React.Fragment>
        <NavBar
          title="外卖商品管理"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/commodity/takeAwayPanel/添加">
              添加
            </Link>
          }
        />
        <SearchBar
          placeholder="商品名称"
          onChange={name => {
            this.setState({
              keyword: name,
            })
          }}
          onSubmit={name => commodity.searchTakeAwayList(storeValue, name)}
        />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox>
            <Picker
              data={storeValues}
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
        </WingBlank>
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
      </React.Fragment>
    )
  }
}
export default TakeAway
