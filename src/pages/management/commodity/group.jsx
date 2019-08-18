import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, List, WhiteSpace, WingBlank, PullToRefresh,
} from 'antd-mobile'
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
      keyword: '',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { height, keyword } = this.state
    commodity.fetchGroupList(keyword)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 44
    this.setState({
      height: hei,
    })
  }

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
                to={`/management/commodity/groupPanel/编辑/${item.group_id}`}
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
    const { keyword } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchGroupList(keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { history, commodity } = this.props
    const { refreshing, height, keyword } = this.state
    return (
      <React.Fragment>
        <NavBar title="团购商品管理" goBack />
        <SearchBar
          placeholder="商品名称"
          value={keyword}
          onChange={val => this.setState({ keyword: val })}
          onSubmit={() => commodity.resetAndFetchGroupList(keyword)}
        />
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
                history.push('/management/commodity/groupPanel/添加')
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
