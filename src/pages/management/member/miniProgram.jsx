import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, PullToRefresh } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import { ListItem, ItemTop } from './styled'

@inject('member')
@observer
class MiniProgram extends React.Component {
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
    const { miniProgramList } = member
    const { height } = this.state
    if (!miniProgramList.length) member.fetchMiniProgramList()
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { miniProgramList } = member
    return miniProgramList.map(item => (
      <React.Fragment key={item.id}>
        <ListItem>
          <ItemTop>
            <img className="avatar" src={item.avatar} alt="" />
            <div className="top-content">
              <div className="content-left" style={{ flex: 2 }}>
                <div>编号：{item.id}</div>
                <div>电话号码：{item.mobile || '暂无'}</div>
                <div>性别：{item.gender === '1' ? '男' : '女'}</div>
              </div>
              <div className="content-right" style={{ flex: 3 }}>
                <div>昵称：{item.nickname}</div>
                <div className="hide">hide</div>
                <div>注册时间：{moment(item.register_time * 1000).format('YYYY-MM-DD')}</div>
              </div>
            </div>
          </ItemTop>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member } = this.props
    this.setState({ refreshing: true })
    await member.fetchMiniProgramList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar title="小程序粉丝" goBack />
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
export default MiniProgram
