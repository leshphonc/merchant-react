import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  SearchBar, List, WhiteSpace, WingBlank, PullToRefresh, Flex, Button,
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
      keyword: '',
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { height, keyword } = this.state
    commodity.fetchReserveList(keyword)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 44
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { commodity, history } = this.props
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
              <div className="top-features" style={{ position: 'initial', fontSize: '14px' }}>
                定金状态: {item.payment_status === '1' ? '收定金' : '不收定金'}
              </div>
              {item.payment_status === '1' ? (
                <div
                  className="top-features"
                  style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
                >
                  定金: {item.payment_money}元
                </div>
              ) : (
                ''
              )}

              {item.appoint_type === '1' ? (
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
              <div
                className="top-features"
                style={{
                  position: 'initial',
                  display: 'block',
                  fontSize: '14px',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '50%',
                  }}
                >
                  活动状态：{item.appoint_status === '1' ? '关闭' : '开启'}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '50%',
                  }}
                >
                  审核状态：{item.check_status ? '通过' : '待审核'}
                </span>
              </div>
              <div style={{ display: 'inline-block', color: '#333', marginRight: '30px' }}>
                <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe6fd;
                </i>
                订单列表
              </div>
            </TopContent>
          </ItemTop>
          <Flex style={{ marginTop: '8px' }}>
            <Flex.Item>
              <Button
                type="primary"
                size="small"
                onClick={() => history.push(`/management/commodity/reservePanel/编辑/${item.appoint_id}`)
                }
              >
                编辑
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                type="primary"
                size="small"
                onClick={() => history.push(`/management/commodity/AppointDiscounts/edit/${item.appoint_id}/`)
                }
              >
                优惠
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                type="primary"
                size="small"
                onClick={() => history.push(`/management/commodity/editSpread/appoint_id/${item.appoint_id}/`)
                }
              >
                佣金
              </Button>
            </Flex.Item>
          </Flex>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    const { keyword } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchReserveList(keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { commodity } = this.props
    const { refreshing, height, keyword } = this.state
    return (
      <React.Fragment>
        <NavBar title="预约商品管理" goBack />
        <SearchBar
          placeholder="商品名称"
          value={keyword}
          onChange={e => {
            this.setState({
              keyword: e,
            })
          }}
          onSubmit={() => {
            commodity.resetAndFetchReserveList(keyword)
          }}
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
            <Link to="/management/commodity/reservePanel/添加">
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
