import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, List, WhiteSpace, WingBlank, PullToRefresh,
} from 'antd-mobile'
// import CardList from './components/Group'
// import { Groups } from '@/config/list'
import { ListItem, ItemTop, TopContent } from '@/styled'

const { Item } = List
@inject('commodity')
@observer
class Group extends React.Component {
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
    commodity.fetchGroupList()
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    /* eslint react/no-find-dom-node: 0 */
  }

  // componentDidMount() {
  //   const { commodity } = this.props
  //   commodity.fetchGroupList()
  // }
  mapList = () => {
    const { commodity } = this.props
    const { groupList } = commodity
    return groupList.map(item => (
      <React.Fragment key={item.group_id}>
        <ListItem>
          <ItemTop>
            {item.list_pic ? <img src={item.list_pic} alt="商品图片" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                {item.s_name}
              </div>
              <WhiteSpace />
              <div
                className="top-features"
                style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
              >
                现金: {item.price} 元
              </div>
              <WhiteSpace />
              <div
                className="top-features"
                style={{
                  position: 'initial',
                  display: 'block',
                  fontSize: '14px',
                  marginBottom: '10px',
                }}
              >
                已售出: {item.sale_count}
              </div>
              <Link
                to={{
                  pathname: '/management/commodity/groupEdit',
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
              <div style={{ display: 'inline-block', marginLeft: '30px' }}>
                <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe6fd;
                </i>
                评论展示
              </div>
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
    await commodity.fetchGroupList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { commodity, history } = this.props
    const { groupListTotal } = commodity
    const { refreshing, height } = this.state
    // const { history } = this.props
    return (
      <React.Fragment>
        <NavBar title="团购商品管理" goBack />
        <SearchBar placeholder="商品名称" maxLength={8} />
        {/* <CardList list={Groups} /> */}
        {groupListTotal < 10 ? (
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
            <Item
              style={{ paddingLeft: '0', background: '#ffb000' }}
              onClick={() => {
                history.push({
                  pathname: '/management/commodity/groupMealAdd',
                })
              }}
            >
              <i className="iconfont" style={{ marginRight: '6px' }}>
                &#xe61e;
              </i>
              添加套餐
            </Item>
            <Item
              style={{ paddingLeft: '0', background: '#ffb000' }}
              onClick={() => {
                history.push({
                  pathname: '/management/commodity/groupAdd',
                })
              }}
            >
              <i className="iconfont" style={{ marginRight: '6px' }}>
                &#xe61e;
              </i>
              添加商品
            </Item>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default Group
