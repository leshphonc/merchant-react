import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, Picker, List, WhiteSpace, PullToRefresh, WingBlank, Button,
} from 'antd-mobile'
// import CardList from './components/Retail'
// import { CateringList } from '@/config/list'
// import { FilterBox } from '@/styled'
import {
  ListItem, FilterBox, ItemTop, TopContent, Buttons,
} from '@/styled'

const { Item } = List
@inject('commodity')
@observer
class Retail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: '全部店铺',
      storeValue: '',
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { retailList } = commodity
    const { height } = this.state
    commodity.fetchRetailValues()
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    commodity.fetchRetailList().then(() => {
      console.log(retailList)
      this.setState({
      })
    })
    /* eslint react/no-find-dom-node: 0 */
  }

  detele = (id, storeId) => {
    const { commodity } = this.props
    commodity.fetchRetailDelete(storeId, id).then(() => {
      commodity.fetchRetailList()
    })
  }

  stand = (id, status, storeId) => {
    const { commodity } = this.props
    commodity.fetchRetailStand(storeId, id, status === '0' ? 1 : 0).then(() => {
      commodity.fetchRetailList()
    })
  }

  mapList = () => {
    const { commodity, history } = this.props
    const { retailList } = commodity
    return retailList.map(item => (
      <React.Fragment key={item.goods_id}>
        <ListItem>
          <ItemTop>
            {item.list_pic ? <img src={item.list_pic} alt="商品图片" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                {item.s_name}
              </div>
              <WhiteSpace />
              <WhiteSpace />
              <div
                className="top-features"
                style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
              >
                售价: {item.price} 元
              </div>
              <WhiteSpace />
              <div
                className="top-features"
                style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
              >
                状态: {item.statusstr}
              </div>
              <WhiteSpace />
              <div className="top-features" style={{ position: 'initial' }}>
                已售出: {item.sell_count}
              </div>
              <WhiteSpace />
            </TopContent>
          </ItemTop>
          <Item>
            <Buttons>
              <Button
                style={{ display: 'inline-block', color: '#fff' }}
                onClick={() => this.stand(item.goods_id, item.status, item.store_id)}
              >
                {item.statusoptstr}
              </Button>
              <Button
                style={{ display: 'inline-block', color: '#fff', marginLeft: '15px' }}
                onClick={() => this.detele(item.goods_id, item.store_id)}
              >
                删除
              </Button>
              <Button
                type="button"
                style={{ display: 'inline-block', color: '#fff', marginLeft: '15px' }}
                onClick={() => history.push(
                  `/management/commodity/retailPanel/编辑/${item.store_id}/${item.goods_id}/`,
                )
                }
              >
                编辑
              </Button>
              <Button
                type="button"
                style={{ display: 'inline-block', color: '#fff', marginLeft: '15px' }}
                onClick={() => history.push(
                  `/management/commodity/retailDiscounts/编辑/${item.store_id}/${item.goods_id}/`,
                )
                }
              >
                优惠
              </Button>
              <Button
                type="button"
                style={{ display: 'inline-block', color: '#fff', marginLeft: '15px' }}
                onClick={() => history.push(
                  `/management/commodity/retailSpread/编辑/${item.store_id}/${item.goods_id}/`,
                )
                }
              >
                佣金
              </Button>
            </Buttons>
          </Item>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    this.setState({ refreshing: true })
    await commodity.fetchRetailList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  findStoreLabelAndFetch = value => {
    const { commodity } = this.props
    const { retailValues } = commodity
    const result = retailValues.find(item => item.value === value[0])
    this.setState({
      store: result.label,
      storeValue: result.value,
    })
    commodity.fetchRetailList(result.value)
  }

  render() {
    const {
      storeValue, store, refreshing, height,
    } = this.state
    const { commodity } = this.props
    const { retailListTotal, retailValues } = commodity
    return (
      <React.Fragment>
        <NavBar
          title="零售商品管理"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/commodity/retailPanel/添加">
              添加
            </Link>
          }
        />
        <SearchBar
          placeholder="商品名称"
          maxLength={8}
          onChange={name => commodity.fetchRetailLists(name)}
        />
        <WingBlank>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={retailValues}
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
        {/* <CardList list={CateringList} /> */}
        {retailListTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm">
              {this.mapList()}
            </WingBlank>
          </React.Fragment>
        ) : (
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
            <WhiteSpace />
            <WingBlank size="sm">
              {this.mapList()}
            </WingBlank>
          </PullToRefresh>
        )}
      </React.Fragment>
    )
  }
}
export default Retail
