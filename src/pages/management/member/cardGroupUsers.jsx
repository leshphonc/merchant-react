import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
// import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, PullToRefresh, Button } from 'antd-mobile'
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
    const { member, match } = this.props
    const { cardGroupUsersList } = member
    const { height } = this.state
    if (!cardGroupUsersList.length) member.fetchCardGroupUsers(match.params.id)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member, history } = this.props
    const { cardGroupUsersList } = member
    return cardGroupUsersList.map(item => (
      <React.Fragment key={item.id}>
        <ListItem>
          <ItemTop>
            <img
              className="avatar"
              src={item.avatar}
              style={{ borderRadius: '50%' }}
              alt=""
            />
            <div className="top-content" style={{width: '80%'}}>
              <div
                style={{
                  width: '65%',
                  lineHeight: '25px',
                  fontSize: 14,
                  marginLeft: 5,
                }}
              >
                <div>会员ID：{item.id}</div>
                <div
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '100%'
                  }}
                >
                  会员昵称：{item.nickname || '暂无'}
                </div>
              </div>
              <Button
                type="primary"
                size="small"
                style={{ width: 100, height: 30, marginTop: 10 }}
                onClick={() => {
                  history.push({
                    pathname: `/management/member/cardGroup/modifyCardGroupUsers/${item.id}`,
                  })
                }}
              >
                查看详情
              </Button>
            </div>
          </ItemTop>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member, match } = this.props
    this.setState({ refreshing: true })
    await member.fetchCardGroupUsers(match.params.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <React.Fragment>
        <NavBar title="分组用户" goBack />
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

export default CardGroupUsers
