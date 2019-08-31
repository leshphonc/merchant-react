import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, PullToRefresh, WingBlank,
} from 'antd-mobile'
import moment from 'moment'
import { toJS } from 'mobx'
import { List } from './styled'

@inject('redEnvelop')
@observer
class RedEnvelope extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { redEnvelop, match } = this.props
    const { height } = this.state
    console.log(this.props)
    redEnvelop.fetchGetList(match.params.id)
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    /* eslint react/no-find-dom-node: 0 */
  }

  loadMore = async () => {
    const { redEnvelop } = this.props
    this.setState({ refreshing: true })
    await redEnvelop.fetchRedEnvelopList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  mapList = () => {
    const { redEnvelop } = this.props
    const { getList } = redEnvelop
    console.log(toJS(getList))
    return getList.map(item => (
      <React.Fragment key={item.id}>
        <div style={{ background: '#fff' }}>
          <List className="list" style={{ borderBottom: '1px solid #aaa', padding: '4px 0', display: 'flex', justifyContent: 'space-around' }}>
            <span style={{ width: '24vw' }}>{item.nickname}</span>
            <span className="pic" style={{ width: '26vw' }}>
              {item.avatar ? <img src={item.avatar} alt="无" /> : null}
            </span>
            <span style={{ width: '26vw' }}>{item.worth}元</span>
            <span style={{ width: '24vw' }}>
              {moment(item.add_time * 1000).format('YYYY-MM-DD hh:mm:ss')}
            </span>
          </List>
        </div>
      </React.Fragment>
    ))
  }

  render() {
    const { refreshing, height } = this.state
    const { redEnvelop } = this.props
    const { retailListTotal } = redEnvelop
    return (
      <React.Fragment>
        <NavBar title="领取记录" goBack />
        <div className="info" style={{ background: '#fff', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
          <span style={{ textAlign: 'center' }}>用户名称</span>
          <span style={{ textAlign: 'center' }}>用户头像</span>
          <span style={{ textAlign: 'center' }}>红包金额</span>
          <span style={{ textAlign: 'center' }}>领取时间</span>
        </div>

        {retailListTotal < 10 ? (
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
