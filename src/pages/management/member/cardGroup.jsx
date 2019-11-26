import React from 'react'
import { runInAction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Route, Link } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  Button,
  PullToRefresh,
  SegmentedControl,
  WingBlank,
  Card,
} from 'antd-mobile'
import moment from 'moment'
import { ListItem, ItemTop } from './styled'
import CardGroupPanel from './cardGroupPanel'
import CardGroupUsers from './cardGroupUsers'
import MemberCRU from './memberCRU'
import ModifyCardGroupUsers from './modify/cardGroupUsers'
import ExpensesRecord from './expensesRecord'
import MemberCardInfo from './memberCardInfo'
import MemberCardBasicInfo from './memberCardBasicInfo'
import MemberCardBalance from './memberCardBalance'
import MemberCardRecord from './memberCardRecord'
import MemberCardInWx from './memberCardInWx'

@inject('member')
@observer
class CardGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      cur: 0,
      list: [],
      page: 1,
      height: document.documentElement.clientHeight - 90,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member } = this.props
    const { cardGroupList } = member
    if (!cardGroupList.length) member.fetchCardGroupList()
    member.getMemberCardList(1).then(res => {
      console.log(res.lists)
      this.setState({ list: res.lists })
    })
    /* eslint react/no-find-dom-node: 0 */
  }

  onValueChange = value => {
    if (value === '会员卡信息') {
      this.setState({
        cur: 0,
      })
    } else if (value === '领卡会员') {
      this.setState({
        cur: 1,
      })
    } else if (value === '会员卡分组') {
      this.setState({
        cur: 2,
      })
    }
  }

  mapList = () => {
    const { member, history } = this.props
    const { cardGroupList } = member
    return cardGroupList.map(item => (
      <React.Fragment key={item.id}>
        <ListItem>
          <ItemTop style={{ boxSizing: 'border-box' }}>
            <div className="top-content" style={{ maxWidth: '100%' }}>
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
                  onClick={() =>
                    history.push(
                      `/management/member/cardGroup/cardGroupPanel/编辑/${item.id}`,
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
                      pathname: `/management/member/cardGroup/cardGroupUsers/${item.id}`,
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

  loadMore2 = async () => {
    const { member } = this.props
    const { page, list } = this.state
    this.setState({ refreshing: true })
    await member.getMemberCardList(page + 1).then(res => {
      if (res.lists.length !== 0) {
        this.setState({
          page: page + 1,
        })
      }
      this.setState({
        list: [...list, ...res.lists],
      })
    })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  mapList2 = () => {
    const { history } = this.props
    const { list } = this.state
    console.log(list)
    return list.map(item => {
      return (
        <React.Fragment key={item.id}>
          <Card>
            <Card.Header
              thumb={item.avatar}
              title={item.nickname}
              extra={item.phone}
            />
            <Card.Body>
              <div>
                会员卡余额：
                {item.card_money}
              </div>
              <WhiteSpace />
              <div>
                赠送金额：
                {item.card_money_give}
              </div>
              <WhiteSpace />
              <div>
                会员卡积分数量：
                {item.card_score}
              </div>
              <WhiteSpace />
              <div>
                领卡时间：
                {moment(item.add_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </Card.Body>
            <Card.Footer
              extra={
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    history.push(
                      `/management/member/cardGroup/memberCardRecord/${item.id}`,
                    )
                  }
                >
                  会员卡充值记录
                </Button>
              }
            />
          </Card>
          <WhiteSpace />
        </React.Fragment>
      )
    })
  }

  render() {
    const { height, refreshing, cur } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="会员卡分组"
          goBack
          right={
            cur === 2 ? (
              <Link
                style={{ color: '#fff' }}
                to="/management/member/cardGroup/cardGroupPanel/添加"
              >
                添加分组
              </Link>
            ) : cur === 1 ? (
              <Link
                style={{ color: '#fff' }}
                to="/management/member/cardGroup/memberCRU/添加"
              >
                添加会员
              </Link>
            ) : (
              ''
            )
          }
        />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            onValueChange={this.onValueChange}
            selectedIndex={cur}
            values={['会员卡信息', '领卡会员', '会员卡分组']}
          />
        </WingBlank>
        {cur === 2 ? (
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
        ) : null}
        {cur === 1 ? (
          <PullToRefresh
            ref={this.refresh}
            refreshing={refreshing}
            style={{
              height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            onRefresh={this.loadMore2}
          >
            <WhiteSpace />
            {this.mapList2()}
          </PullToRefresh>
        ) : null}
        {cur === 0 ? <MemberCardInfo /> : null}
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    <Route path="/management/member/cardGroup" exact component={CardGroup} />
    <Route
      path="/management/member/cardGroup/cardGroupPanel/:str/:id?"
      component={CardGroupPanel}
    />
    <Route
      path="/management/member/cardGroup/memberCRU/:str"
      component={MemberCRU}
    />
    <Route
      path="/management/member/cardGroup/memberCardBasicInfo"
      component={MemberCardBasicInfo}
    />
    <Route
      component={MemberCardInWx}
      path="/management/member/cardGroup/memberCardInWx"
    />
    <Route
      path="/management/member/cardGroup/memberCardBalance"
      component={MemberCardBalance}
    />
    <Route
      path="/management/member/cardGroup/memberCardRecord/:id"
      component={MemberCardRecord}
    />
    <Route
      path="/management/member/cardGroup/cardGroupUsers/:id"
      component={CardGroupUsers}
    />
    <Route
      path="/management/member/cardGroup/modifyCardGroupUsers/:id"
      component={ModifyCardGroupUsers}
    />
    <Route
      path="/management/member/cardGroup/expensesRecord/:id"
      component={ExpensesRecord}
    />
  </React.Fragment>
)
