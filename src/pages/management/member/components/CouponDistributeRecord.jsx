import React from 'react'
import { PullToRefresh, Card, WhiteSpace } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import moment from 'moment'

@inject('member')
@observer
class CouponDistribute extends React.Component {
  state = {
    refreshing: false,
    height: document.documentElement.clientHeight,
    page: 1,
    list: [],
  }
  componentDidMount() {
    const { member } = this.props
    const { height } = this.state
    // eslint-disable-next-line react/no-find-dom-node
    const hei = height - ReactDOM.findDOMNode(this.refresh).offsetTop
    this.setState({
      height: hei,
    })
    member.getCouponDistribute().then(res => {
      this.setState({
        list: res,
      })
    })
  }

  loadMore = () => {
    const { member } = this.props
    const { list, page } = this.state
    member.getCouponDistribute(page + 1).then(res => {
      if (res.length < 10) {
        this.setState({
          list: [...list, ...res],
        })
      } else {
        this.setState({
          page: page + 1,
          list: [...list, ...res],
        })
      }
    })
  }

  mapList = () => {
    const { list } = this.state
    return list.map(item => {
      return (
        <div key={item.id}>
          <Card>
            <Card.Header title={item.coupon_name} />
            <Card.Body>
              <div>派发对象： {item.nickname}</div>
            </Card.Body>
            <Card.Footer
              content={`派发时间${moment(item.add_time * 1000).format(
                'YYYY-MM-DD',
              )}`}
              extra={item.msg}
            />
          </Card>
          <WhiteSpace />
        </div>
      )
    })
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <div>
        <PullToRefresh
          ref={el => (this.refresh = el)}
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
      </div>
    )
  }
}

export default CouponDistribute
