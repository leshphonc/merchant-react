import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  PullToRefresh,
  Button,
  // DatePicker,
  WingBlank,
} from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import { ListItem, ItemTop } from '../styled'
// import { FilterBox } from '@/styled'

@inject('member')
@observer
class UserBehavior extends React.Component {
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
    // const { userBehaviorList } = member
    const { height } = this.state
    // if (!userBehaviorList.length)
    member.resetFetchUserBehavior(match.params.uid)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { userBehaviorList } = member

    return userBehaviorList.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        <ListItem>
          <ItemTop>
            <div className="top-content">
              <div className="content-left" style={{ alignItems: 'start' }}>
                <div style={{ marginBottom: '4' }}>行为编号:{item.biz_id}</div>
                <div style={{ lineHeight: '30px', marginTop: '5px' }}>
                  事件名：{item.name}
                </div>
              </div>
              <div className="content-right" style={{ alignItems: 'start' }}>
                <div style={{ marginBottom: '4' }}>
                  发生时间：
                  {moment(item.date * 1000).format('YYYY-MM-DD H:mm:ss')}
                </div>
                <div
                  style={{
                    lineHeight: '30px',
                    marginTop: '5px',
                    width: '100%',
                  }}
                >
                  {item.url ? (
                    <Button
                      size="small"
                      type="primary"
                      style={{ float: 'right' }}
                      onClick={() => { 
                        window.location.href=item.url
                      }}
                    >
                      访问链接
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
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
    await member.fetchUserBehavior(match.params.uid)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }
  // setBeiginTime = data => {
  //   const { member } = this.props
  //   const { endTime } = this.state
  //   this.setState({
  //     beginTime: moment(data).format('YYYY-MM-DD'),
  //   })
  //   member
  //     .resetFetchPublicList(moment(data).format('YYYY-MM-DD'), endTime)
  //     .then(() => {
  //       const { publicListTotalNum } = member
  //       this.setState({
  //         publicListTotalNum,
  //       })
  //     })
  // }

  // setEndTime = data => {
  //   const { member } = this.props
  //   const { beginTime } = this.state
  //   this.setState({
  //     endTime: moment(data).format('YYYY-MM-DD'),
  //   })
  //   member
  //     .resetFetchPublicList(beginTime, moment(data).format('YYYY-MM-DD'))
  //     .then(() => {
  //       const { publicListTotalNum } = member
  //       this.setState({
  //         publicListTotalNum,
  //       })
  //     })
  // }
  render() {
    const {
      height,
      refreshing,
      // beginTime,
      // endTime,
      // publicListTotalNum,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="用户行为" goBack />
        <WhiteSpace />
        <WingBlank>
          {/* <SegmentedControl values={['全部用户', '消费用户', '到店用户']} /> */}
          {/* <FilterBox>
            <DatePicker mode="date" onChange={this.setBeiginTime}>
              <div>
                <span>{beginTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox>
          <span>-&nbsp;</span>
          <FilterBox>
            <DatePicker mode="date" onChange={this.setEndTime}>
              <div>
                <span>{endTime}</span>
                <i
                  className="iconfont"
                  style={{ fontSize: 10, marginLeft: 5, color: '#999' }}
                >
                  &#xe6f0;
                </i>
              </div>
            </DatePicker>
          </FilterBox> */}
          {/* <span>-&nbsp;</span>
          <FilterBox>
            <span>共{publicListTotalNum}条记录</span>
          </FilterBox> */}
        </WingBlank>
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
export default UserBehavior
