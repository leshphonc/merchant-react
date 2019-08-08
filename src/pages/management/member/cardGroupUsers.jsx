import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, PullToRefresh } from 'antd-mobile'
import { ListItem, ItemTop } from './styled'

@inject('member')
@observer
class CardGroupUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member, location } = this.props
    const { cardGroupUsersListTotal } = member
    const { height } = this.state
    if (!cardGroupUsersListTotal) member.fetchCardGroupUsers(location.state.id)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { cardGroupUsersList } = member
    return cardGroupUsersList.map(item => (
      <ListItem key={item.id}>
        <ItemTop>
          <img className="avatar" src={item.avatar} alt="" />
          <div className="top-content">
            <div className="content-left" style={{ flex: 1 }}>
              <div>会员ID：{item.id}</div>
              <div>会员昵称：{item.nickname || '暂无'}</div>
              <Link
                to={{
                  pathname: '/management/member/cardGroup/modifyCardGroupUsers',
                  state: {
                    id: item.gid,
                  },
                }}
              >
                查看详情
              </Link>
            </div>
          </div>
        </ItemTop>
      </ListItem>
    ))
  }

  loadMore = async () => {
    const { member, location } = this.props
    this.setState({ refreshing: true })
    await member.fetchCardGroupUsers(location.state.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <React.Fragment>
        <NavBar title="分组用户" goBack />
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

export default CardGroupUsers
