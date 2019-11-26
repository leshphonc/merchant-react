import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import { Card, PullToRefresh, WhiteSpace, Flex } from 'antd-mobile'
import moment from 'moment'

@inject('member')
@observer
class MemberCardRecord extends React.Component {
  state = {
    page: 0,
    list: [],
    refreshing: false,
    height: document.documentElement.clientHeight,
  }
  componentDidMount() {
    const { height } = this.state
    // eslint-disable-next-line react/no-find-dom-node
    const hei = height - ReactDOM.findDOMNode(this.ptr).offsetTop
    this.setState({
      height: hei,
    })
    this.getList()
  }

  getList = () => {
    const { member, match } = this.props
    const { page, list } = this.state
    member.getMemberCardRecord(match.params.id, page + 1).then(res => {
      if (res.list.length < 10) {
        this.setState({
          list: [...list, ...res.list],
        })
      } else {
        this.setState({
          page: page + 1,
          list: [...list, ...res.list],
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
            <Card.Header
              title={item.nickname || '未知会员'}
              extra={item.phone || '未知手机号'}
            />
            <Card.Body style={{ fontSize: 13, color: '#888' }}>
              <Flex>
                <Flex.Item>
                  <div>
                    金额增加（元）：
                    <span className="font-green">{item.money_add}</span>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div>
                    金额减少（元）：
                    <span className="font-red">{item.money_use}</span>
                  </div>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <div>
                    金币增加（分）：
                    <span className="font-green">{item.score_add}</span>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div>
                    金币减少（分）：
                    <span className="font-red">{item.score_use}</span>
                  </div>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <div>
                    优惠券增加（元）：
                    <span className="font-green">{item.coupon_add}</span>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div>
                    优惠券减少（元）：
                    <span className="font-red">{item.coupon_use}</span>
                  </div>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
            </Card.Body>
            <Card.Footer
              content={item.desc}
              extra={
                <div>{moment(item.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
              }
            />
          </Card>
          <WhiteSpace />
        </div>
      )
    })
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <div>
        <NavBar title="会员卡充值记录" goBack />
        <PullToRefresh
          ref={el => (this.ptr = el)}
          style={{
            height: height,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          refreshing={refreshing}
          onRefresh={() => {
            this.getList()
          }}
        >
          {this.mapList()}
        </PullToRefresh>
      </div>
    )
  }
}

export default MemberCardRecord
