import React from 'react'
import ReactDOM from 'react-dom'
import { runInAction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Route, Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, Button, PullToRefresh } from 'antd-mobile'
import { ListItem, ItemTop } from './styled'
import ModifyCardGroup from './modify/cardGroup'
import CardGroupUsers from './cardGroupUsers'
import ModifyCardGroupUsers from './modify/cardGroupUsers'
import ExpensesRecord from './expensesRecord'

let defaultScrollTop = 0
@inject('member')
@observer
class CardGroup extends React.Component {
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
    const { cardGroupList } = member
    const { height } = this.state
    if (!cardGroupList.length) member.fetchCardGroupList()
    /* eslint react/no-find-dom-node: 0 */
    const dom = ReactDOM.findDOMNode(this.refresh.current)
    const hei = height - dom.offsetTop
    this.setState(
      {
        height: hei,
      },
      () => {
        dom.scrollTop = defaultScrollTop
      },
    )
  }

  componentWillUnmount() {
    const dom = ReactDOM.findDOMNode(this.refresh.current)
    defaultScrollTop = dom.scrollTop
  }

  mapList = () => {
    const { member, history } = this.props
    const { cardGroupList } = member
    return cardGroupList.map(item => (
      <React.Fragment key={item.id}>
        <ListItem>
          <ItemTop>
            <div className="top-content">
              <div className="content-left">
                <div>分组ID：{item.id}</div>
                <WhiteSpace />
                <div>分组注释：{item.des}</div>
                <WhiteSpace />
                <div>分组折扣：{item.discount}</div>
                <WhiteSpace />
                <Button
                  type="primary"
                  size="small"
                  style={{ width: 120 }}
                  onClick={() => history.push(
                    `/management/member/cardGroup/modifyCardGroup/编辑/${item.id}/${item.name}/${
                      item.des
                    }/${item.discount}`,
                  )
                  }
                >
                  编辑
                </Button>
              </div>
              <div className="content-right">
                <div>分组名称：{item.name}</div>
                <WhiteSpace />
                <div style={{ visibility: 'hidden' }}>empty</div>
                <WhiteSpace />
                <div>分组用户数量：{item.user_count}</div>
                <WhiteSpace />
                <Button
                  type="primary"
                  size="small"
                  style={{ width: 120 }}
                  onClick={() => {
                    runInAction(() => {
                      member.cardGroupUsersList = []
                      member.cardGroupUsersListPage = 1
                      member.cardGroupUsersListSize = 10
                      member.cardGroupUsersListTotal = null
                    })
                    history.push({
                      pathname: '/management/member/cardGroup/cardGroupUsers',
                      state: {
                        id: item.id,
                      },
                    })
                  }}
                >
                  查看分组用户
                </Button>
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
    await member.fetchCardGroupList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="会员卡分组"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/member/cardGroup/modifyCardGroup/添加">
              添加分组
            </Link>
          }
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
          {this.mapList()}
        </PullToRefresh>
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/member/cardGroup" exact component={CardGroup} />
    <Route
      path="/management/member/cardGroup/modifyCardGroup/:str/:id?/:name?/:comment?/:discount?"
      component={ModifyCardGroup}
    />
    <Route path="/management/member/cardGroup/cardGroupUsers" component={CardGroupUsers} />
    <Route
      path="/management/member/cardGroup/modifyCardGroupUsers"
      component={ModifyCardGroupUsers}
    />
    <Route path="/management/member/cardGroup/expensesRecord" component={ExpensesRecord} />
  </React.Fragment>
)
