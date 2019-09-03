import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, PullToRefresh, WingBlank, Flex,
} from 'antd-mobile'
import moment from 'moment'
import { List } from './styled'

@inject('redEnvelop')
@observer
class RedEnvelope extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 160,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { redEnvelop, match } = this.props
    const { height } = this.state
    redEnvelop.fetchGetLists(match.params.id)
    redEnvelop.fetchGetList(match.params.id)
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    /* eslint react/no-find-dom-node: 0 */
  }

  mapList = () => {
    const { redEnvelop } = this.props
    const { getList } = redEnvelop
    // console.log(toJS(getList))
    return getList.map(item => (
      <React.Fragment key={item.id}>
        <div style={{ background: '#fff' }}>
          <List
            className="list"
            style={{
              borderBottom: '1px solid #aaa',
              padding: '4px 0',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <span style={{ width: '24vw' }}>{item.nickname}</span>
            <span className="pic" style={{ width: '26vw' }}>
              {item.avatar ? <img src={item.avatar} alt="无" /> : null}
            </span>
            <span style={{ width: '26vw' }}>{item.worth}元</span>
            <span style={{ width: '24vw' }}>
              {moment(item.add_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </List>
        </div>
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { redEnvelop, match } = this.props
    this.setState({ refreshing: true })
    await redEnvelop.fetchGetList(match.params.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { refreshing, height } = this.state
    console.log(height)
    const { redEnvelop } = this.props
    const { getListTotal, getLists } = redEnvelop
    console.log(getLists)
    return (
      <React.Fragment>
        <NavBar title="领取记录" goBack />
        <WingBlank size="md" style={{ padding: '10px 0' }}>
          <Flex style={{ marginBottom: '10px' }}>
            <Flex.Item>红包总金额：{getLists.total_money || 0}</Flex.Item>
            <Flex.Item>已领取：{getLists.used_money || 0}</Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>剩余：{getLists.left_money || 0}</Flex.Item>
            <Flex.Item>已领人数：{getLists.person_num || 0}</Flex.Item>
            <Flex.Item>浏览次数：{getLists.read_num || 0}</Flex.Item>
          </Flex>
        </WingBlank>
        <div
          className="info"
          style={{
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0',
          }}
        >
          <span style={{ textAlign: 'center' }}>用户名称</span>
          <span style={{ textAlign: 'center' }}>用户头像</span>
          <span style={{ textAlign: 'center' }}>红包金额</span>
          <span style={{ textAlign: 'center' }}>领取时间</span>
        </div>

        {getListTotal < 10 ? (
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
      </React.Fragment>
    )
  }
}

export default RedEnvelope
