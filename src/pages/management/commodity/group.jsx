import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, List, WhiteSpace, WingBlank, PullToRefresh, Flex, Button,
} from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'
import { DeliverType } from '@/config/constant'

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
    const { commodity, history } = this.props
    const { groupList } = commodity
    const styleSpan = {
      spaner: {
        display: 'inline-block',
        width: '50%',
      },
    }
    return groupList.map(item => {
      let statusText = ''
      if (new Date(item.begin_time * 1000) > new Date()) {
        statusText = '未开团'
      } else if (new Date(item.end_time * 1000) < new Date()) {
        statusText = '已结束'
      } else if (item.type === '3') {
        statusText = '已结束'
      } else if (item.type === '4') {
        statusText = '结束失败'
      } else {
        statusText = '进行中'
      }
      return (
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
                  style={{
                    position: 'initial',
                    fontSize: '14px',
                    color: '#fb6a41',
                    width: '100%',
                  }}
                >
                  <span style={{ display: 'inline-block', width: '50%' }}>
                    团购价: {item.price}
                  </span>
                  {item.old_price ? (
                    <span style={{ display: 'inline-block', width: '50%' }}>
                      原价： {item.old_price}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <WhiteSpace />
                <div
                  className="top-features"
                  style={{
                    position: 'initial',
                    display: 'block',
                    fontSize: '14px',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                  <span style={styleSpan.spaner}>库存：{item.count_num - item.sale_count}</span>
                  <span style={styleSpan.spaner}>销量: {item.sale_count}</span>
                </div>
                <div
                  className="top-features"
                  style={{
                    position: 'initial',
                    display: 'block',
                    fontSize: '14px',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                  <span style={styleSpan.spaner}>运行状态:{statusText}</span>
                  <span style={styleSpan.spaner}>
                    团购状态：{item.status === '1' ? '开启' : '关闭'}
                  </span>
                </div>
                <div
                  className="top-features"
                  style={{
                    position: 'initial',
                    display: 'block',
                    fontSize: '14px',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                  <div style={styleSpan.spaner}>
                    <i className="iconfont" style={{ color: '#ffb000' }}>
                      &#xe6fd;
                    </i>
                    订单列表
                  </div>
                </div>
              </TopContent>
            </ItemTop>
            <Flex style={{ marginTop: '8px' }}>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/management/commodity/groupPanel/编辑/${item.group_id}`)
                  }
                >
                  编辑
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/management/commodity/GroupDiscounts/团购/${item.group_id}/`)
                  }
                >
                  优惠
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/management/commodity/editSpread/group_id/${item.group_id}/`)
                  }
                >
                  佣金
                </Button>
              </Flex.Item>
            </Flex>
          </ListItem>
          <WhiteSpace size="sm" />
        </React.Fragment>
      )
    })
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
