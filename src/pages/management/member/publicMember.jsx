import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  PullToRefresh,
  Button,
  DatePicker,
  WingBlank,
} from 'antd-mobile'
import NavBar from '@/common/NavBar'
import moment from 'moment'
import { ListItem, ItemTop, ItemBottom } from './styled'
import { FilterBox } from '@/styled'

@inject('member')
@observer
class PublicMember extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      // eslint-disable-next-line react/no-unused-state
      beginTime: moment(new Date(new Date() - 30 * 24 * 3600 * 1000)).format(
        'YYYY-MM-DD',
      ),
      // eslint-disable-next-line react/no-unused-state
      endTime: moment(new Date()).format('YYYY-MM-DD'),
      publicListTotalNum: 0,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member } = this.props
    const { publicList } = member
    const { height, beginTime, endTime } = this.state
    if (!publicList.length)
      member.fetchPublicList(beginTime, endTime).then(() => {
        const { publicListTotalNum } = member
        this.setState({
          publicListTotalNum,
        })
      })
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member, history } = this.props
    const { publicList } = member

    return publicList.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        <ListItem>
          <ItemTop>
            <img className="avatar" src={item.avatar} alt="" />
            <div className="top-content">
              <div className="content-left" style={{ alignItems: 'start' }}>
                <div>昵称：{item.nickname}</div>
                <div>编号：{item.uid}</div>
              </div>
              <div className="content-right" style={{ alignItems: 'start' }}>
                <div>性别：{item.sex === '1' ? '男' : '女'}</div>
                <div>电话号码：{item.phone || '暂无'}</div>
              </div>
            </div>
          </ItemTop>
          <ItemBottom>
            {/* <div>
              关注时间：{moment(item.dateline * 1000).format('YYYY-MM-DD H:mm:ss')}
            </div> */}
            <WhiteSpace />
            <div>
              最后访问：
              {item.last_time
                ? moment(item.last_time * 1000).format('YYYY-MM-DD    hh:mm:ss')
                : '暂无数据'}
            </div>
            <WhiteSpace />
            {/* <div>
              注册时间：
              {item.add_time
                ? moment(item.add_time * 1000).format('YYYY-MM-DD')
                : '暂无数据'}
            </div> */}
            <Button
              style={{ position: 'absolute', bottom: 10, right: 10 }}
              size="small"
              type="primary"
              onClick={() => {
                history.push(`/management/member/userBehavior/${item.uid}`)
              }}
            >
              用户行为
            </Button>
          </ItemBottom>
        </ListItem>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member } = this.props
    const { beginTime, endTime } = this.state
    this.setState({ refreshing: true })
    await member.fetchPublicList(beginTime, endTime)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }
  setBeiginTime = data => {
    const { member } = this.props
    const { endTime } = this.state
    this.setState({
      beginTime: moment(data).format('YYYY-MM-DD'),
    })
    member
      .resetFetchPublicList(moment(data).format('YYYY-MM-DD'), endTime)
      .then(() => {
        const { publicListTotalNum } = member
        this.setState({
          publicListTotalNum,
        })
      })
  }

  setEndTime = data => {
    const { member } = this.props
    const { beginTime } = this.state
    this.setState({
      endTime: moment(data).format('YYYY-MM-DD'),
    })
    member
      .resetFetchPublicList(beginTime, moment(data).format('YYYY-MM-DD'))
      .then(() => {
        const { publicListTotalNum } = member
        this.setState({
          publicListTotalNum,
        })
      })
  }
  render() {
    const {
      height,
      refreshing,
      beginTime,
      endTime,
      publicListTotalNum,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="在线访问用户" goBack />
        <WhiteSpace />
        <WingBlank>
          {/* <SegmentedControl values={['全部用户', '消费用户', '到店用户']} /> */}
          <FilterBox>
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
          </FilterBox>
          <span>-&nbsp;</span>
          <FilterBox>
            <span>共{publicListTotalNum}条记录</span>
          </FilterBox>
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
export default PublicMember
