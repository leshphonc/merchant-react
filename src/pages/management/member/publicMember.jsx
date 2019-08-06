import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, PullToRefresh } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import { ListItem, ItemTop, ItemBottom } from './styled'

@inject('member')
@observer
class PublicMember extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member } = this.props
    const { height } = this.state
    member.fetchPublicList()
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { publicList } = member

    return publicList.map(item => (
      <ListItem key={item.uid}>
        <ItemTop>
          <img className="avatar" src={item.avatar} alt="" />
          <div className="top-content">
            <div className="content-left">
              <div>编号：{item.id}</div>
              <div>电话号码：{item.mobile || '暂无'}</div>
              <div>性别：{item.gender === '1' ? '男' : '女'}</div>
            </div>
            <div className="content-right">
              <div>昵称：{item.nickname}</div>
              <div className="hide">hide</div>
              <div>注册时间：{moment(item.register_time * 1000).format('YYYY-MM-DD')}</div>
            </div>
          </div>
        </ItemTop>
        <ItemBottom>
          <div>关注时间：{moment(item.dateline * 1000).format('YYYY-MM-DD')}</div>
          <WhiteSpace />
          <div>最后登录：{item.lasted}</div>
          <WhiteSpace />
          <div>获取渠道：{item.type}</div>
        </ItemBottom>
      </ListItem>
    ))
  }

  loadMore = async () => {
    const { member } = this.props
    this.setState({ refreshing: true })
    await member.fetchPublicList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar title="公众号粉丝" goBack />
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
          {this.mapList()}
        </PullToRefresh>
      </React.Fragment>
    )
  }
}
export default PublicMember
