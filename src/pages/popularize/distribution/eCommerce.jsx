import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { createForm } from 'rc-form'
import {
  SearchBar,
  Picker,
  WhiteSpace,
  PullToRefresh,
  WingBlank,
  Button,
  Flex,
  Toast,
} from 'antd-mobile'
import { ListItem, ItemTop, TopContent, FilterBox } from '@/styled'

@createForm()
@inject('commodity')
@observer
class ECommerce extends React.Component {
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
    const { eCommerceList } = commodity
    const { height } = this.state
    commodity.fetchStoreValuesE('1', '1')
    sessionStorage.removeItem('spec')
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    if (!eCommerceList.length) commodity.fetchECommerceList()
  }

  detele = (id, storeId) => {
    const { commodity } = this.props
    const { storeValue, keyword } = this.state
    commodity.fetchECommerceDelete(storeId, id).then(res => {
      if (res) {
        Toast.success('删除成功', 1, () =>
          commodity.resetAndFetchECommerceList(storeValue, keyword),
        )
      }
    })
  }

  stand = (id, status, storeId) => {
    const { commodity } = this.props
    commodity.changeECommerceStand(storeId, id, status === '0' ? 1 : 0)
  }

  mapList = () => {
    const { commodity, history } = this.props
    const { eCommerceList } = commodity
    return eCommerceList.map(item => (
      <React.Fragment key={item.goods_id}>
        <ListItem>
          <ItemTop>
            {item.list_pic ? <img src={item.list_pic} alt="商品图片" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                {item.s_name}
              </div>
              <WhiteSpace />
              <div>售价: {item.price} 元</div>
              <WhiteSpace />
              <div>
                库存:
                {item.stock_num !== '-1'
                  ? item.stock_num - item.sell_count
                  : '不限'}
              </div>
              <WhiteSpace />
              <div>已售出: {item.sell_count}</div>
            </TopContent>
          </ItemTop>
          <Flex style={{ marginTop: '8px' }}>
            <Flex.Item>
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  history.push(
                    `/management/commodity/eCommerceSpread/编辑/${item.store_id}/${item.goods_id}`,
                  )
                }
              >
                佣金设置
              </Button>
            </Flex.Item>
          </Flex>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    const { storeValue, keyword } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchECommerceList(storeValue, keyword)
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
    commodity.resetAndFetchECommerceList(result.value, keyword)
  }

  render() {
    const { storeValue, store, refreshing, height } = this.state
    const { commodity } = this.props
    const { storeValues } = commodity
    return (
      <React.Fragment>
        <NavBar title="电商商品管理" goBack />
        <SearchBar
          placeholder="商品名称"
          onChange={name => {
            this.setState({
              keyword: name,
            })
          }}
          onSubmit={name => commodity.searchECommerceList(storeValue, name)}
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
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
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
export default ECommerce
