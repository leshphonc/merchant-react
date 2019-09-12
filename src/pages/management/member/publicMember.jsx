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
    const { publicList } = member
    const { height } = this.state
    if (!publicList.length) member.fetchPublicList()
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
      <React.Fragment key={item.uid}>
        <ListItem>
          <ItemTop>
            <img className="avatar" src={item.avatar} alt="" />
            <div className="top-content">
              <div className="content-left" style={{ alignItems: 'start' }}>
                <div>编号：{item.uid}</div>
                <div>电话号码：{item.phone || '暂无'}</div>
                <div>性别：{item.sex === '1' ? '男' : '女'}</div>
              </div>
              <div className="content-right" style={{ alignItems: 'start' }}>
                <div>昵称：{item.nickname}</div>
                <div className="hide">hide</div>
                <div>
                  注册时间：
                  {item.add_time
                    ? moment(item.add_time * 1000).format('YYYY-MM-DD')
                    : '暂无数据'}
                </div>
              </div>
            </div>
          </ItemTop>
          <ItemBottom>
            <div>关注时间：{moment(item.dateline * 1000).format('YYYY-MM-DD')}</div>
            <WhiteSpace />
            <div>
              最后登录：
              {item.last_time ? moment(item.last_time * 1000).format('YYYY-MM-DD') : '暂无数据'}
            </div>
            <WhiteSpace />
            <div>获取渠道：{item.type}</div>
          </ItemBottom>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
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
          {this.mapList()}
        </PullToRefresh>
      </React.Fragment>
    )
  }
}
export default PublicMember
