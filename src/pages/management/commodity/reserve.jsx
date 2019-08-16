import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, List, WhiteSpace, WingBlank, PullToRefresh,
} from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'
// import CardList from './components/Reserve'
// import { Reserve } from '@/config/list'

const { Item } = List
@inject('commodity')
@observer
class Reserve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { height } = this.state
    commodity.fetchReserveList()
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    /* eslint react/no-find-dom-node: 0 */
  }

  mapList = () => {
    const { commodity } = this.props
    const { reserveList } = commodity
    return reserveList.map(item => (
      <React.Fragment key={item.appoint_id}>
        <ListItem>
          <ItemTop>
            {item.list_pic ? <img src={item.list_pic} alt="商品图片" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                {item.appoint_name}
              </div>
              <WhiteSpace />
              <div
                className="top-features"
                style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
              >
                定金: {item.payment_money}元
              </div>
              {item.appoint_type === 1 ? (
                <div
                  className="top-features"
                  style={{
                    position: 'initial',
                    marginBottom: '10px',
                    display: 'inline-block',
                    background: '#ffb000',
                    padding: '2px',
                    color: '#fff',
                  }}
                >
                  上门
                </div>
              ) : (
                <div
                  className="top-features"
                  style={{
                    position: 'initial',
                    marginBottom: '10px',
                    display: 'inline-block',
                    background: '#ffb000',
                    padding: '2px',
                    color: '#fff',
                  }}
                >
                  到店
                </div>
              )}
              <div
                className="top-features"
                style={{
                  position: 'initial',
                  display: 'block',
                  fontSize: '14px',
                  marginBottom: '10px',
                }}
              >
                已预约: {item.appoint_sum}
              </div>
              <Link
                to={{
                  pathname: '/management/commodity/reserveEdit',
                }}
                style={{ color: '#333' }}
              >
                <div style={{ display: 'inline-block' }}>
                  <i className="iconfont" style={{ color: '#ffb000' }}>
                    &#xe645;
                  </i>
                  编辑
                </div>
              </Link>
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
    await commodity.fetchReserveList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { commodity } = this.props
    const { reserveListTotal } = commodity
    const { refreshing, height } = this.state
    return (
      <React.Fragment>
        <NavBar title="预约商品管理" goBack />
        <SearchBar placeholder="商品名称" maxLength={8} />
        {/* <CardList list={Reserve} /> */}
        {reserveListTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
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
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </PullToRefresh>
        )}
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <List>
          <div
            style={{
              fontWeight: 'bold',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              position: 'fixed',
              bottom: '0',
              background: '#ffb000',
            }}
          >
            <Link to="/management/commodity/reserveAdd">
              <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
                <i className="iconfont" style={{ marginRight: '6px' }}>
                  &#xe61e;
                </i>
                添加预约
              </Item>
            </Link>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default Reserve