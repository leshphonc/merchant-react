import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, Picker, List, WhiteSpace, WingBlank, PullToRefresh, Button,
} from 'antd-mobile'
import {
  ListItem, ItemTop, TopContent, FilterBox, Buttons,
} from '@/styled'

const { Item } = List
@inject('commodity')
@observer
class Catering extends React.Component {
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
    const { cateringList } = commodity
    const { height } = this.state
    // commodity.fetchCateringList()
    commodity.fetchCateringValues()
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    commodity.fetchCateringList().then(() => {
      this.setState({
        storeValue: commodity.cateringValues[0].value,
      }, () => {
        const { storeValue } = this.state
        if (!cateringList.length) commodity.fetchCateringList(storeValue)
      })
    })
    /* eslint react/no-find-dom-node: 0 */
  }

  detele = (id, storeId) => {
    const { commodity } = this.props
    commodity.fetchCateringDelete(storeId, id).then(() => {
      commodity.fetchCateringList()
    })
  }

  stand = (id, status, storeId) => {
    const { commodity } = this.props
    commodity.fetchCateringStand(storeId, id, status === '0' ? 1 : 0).then(() => {
      commodity.fetchCateringList()
    })
  }

  mapList = () => {
    const { commodity, history } = this.props
    const { cateringList } = commodity
    return cateringList.map(item => (
      <React.Fragment key={item.goods_id}>
        <ListItem>
          <ItemTop>
            {item.list_pic ? <img src={item.list_pic} alt="商品图片" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                {item.name}
              </div>
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
              <div className="top-features" style={{ position: 'initial' }}>
                已售出: {item.sell_count}
              </div>
              <WhiteSpace />
              <Buttons>
                <Button
                  style={{ display: 'inline-block' }}
                  onClick={() => this.stand(item.goods_id, item.status, item.store_id)}
                >
                  <i className="iconfont" style={{ color: '#ffb000' }}>
                    &#xe645;
                  </i>
                  {item.statusoptstr}
                </Button>
              </Buttons>
              <Buttons>
                <Button
                  style={{ display: 'inline-block', marginLeft: '20px' }}
                  onClick={() => this.detele(item.goods_id, item.store_id)}
                >
                  <i className="iconfont" style={{ color: '#ffb000' }}>
                    &#xe621;
                  </i>
                  删除
                </Button>
              </Buttons>
              <Buttons>
                <Button
                  type="button"
                  style={{ color: '#333', marginLeft: '20px' }}
                  onClick={() => history.push(
                    `/management/commodity/cateringPanel/编辑/${item.store_id}/${item.goods_id}/`,
                  )
                  }
                >
                  <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                    &#xe634;
                  </i>
                  编辑
                </Button>
              </Buttons>
            </TopContent>
          </ItemTop>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    this.setState({ refreshing: true })
    await commodity.fetchCateringList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  findStoreLabelAndFetch = value => {
    const { commodity } = this.props
    const { cateringValues } = commodity
    const result = cateringValues.find(item => item.value === value[0])
    this.setState({
      store: result.label,
      storeValue: result.value,
    })
    commodity.fetchCateringList(result.value)
  }

  render() {
    const {
      refreshing, height, store, storeValue,
    } = this.state
    const { commodity } = this.props
    const { cateringListTotal, cateringValues } = commodity
    return (
      <React.Fragment>
        <NavBar title="餐饮商品管理" goBack />
        <SearchBar placeholder="商品名称" maxLength={8} />
        <WingBlank>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={cateringValues}
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
        {cateringListTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm" style={{ paddingBottom: '24vw' }}>
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
            <WingBlank size="sm" style={{ paddingBottom: '22vw' }}>
              {this.mapList()}
            </WingBlank>
          </PullToRefresh>
        )}
        <List style={{ position: 'fixed', bottom: '0', width: '100%' }}>
          <div
            style={{
              fontWeight: 'bold',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              background: '#ffb000',
              zIndex: '1000',
            }}
          >
            <Link to="/management/commodity/cateringPanel/添加">
              <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
                <i className="iconfont" style={{ marginRight: '6px' }}>
                  &#xe61e;
                </i>
                添加商品
              </Item>
            </Link>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default Catering
