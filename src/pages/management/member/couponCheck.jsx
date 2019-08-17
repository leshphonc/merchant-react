import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WingBlank, WhiteSpace, Card, PullToRefresh, Flex, Button, Modal,
} from 'antd-mobile'
import moment from 'moment'

const { prompt } = Modal

@inject('member')
@observer
class CouponCheck extends React.Component {
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
    // const { couponCheckList } = member
    const { height } = this.state
    member.fetchCouponCheckList(match.params.id)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { member } = this.props
    const { couponCheckList } = member
    return couponCheckList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            thumb={item.avatar}
            thumbStyle={{ width: 50, height: 50 }}
            title={item.name}
          />
          <Card.Body style={{ fontSize: 11 }}>
            <Flex>
              <Flex.Item>
                <div>用户昵称：{item.nickname || '暂无'}</div>
                <WhiteSpace />
                <div>用户手机：{item.phone || '暂无'}</div>
                <WhiteSpace />
                <div>
                  领取时间：{moment(item.receive_time * 1000).format('YYYY-MM-DD') || '暂无'}
                </div>
              </Flex.Item>
              <Flex.Item>
                <div>id：{item.id || '暂无'}</div>
                <WhiteSpace />
                <div>领取数量：{item.num || '暂无'}</div>
                <WhiteSpace />
                <div style={{ visibility: 'hidden' }} />
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer
            style={{ alignItems: 'center' }}
            content={item.is_use === '0' ? '未使用' : '已使用'}
            extra={
              item.is_use === '0' ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    prompt('核销', '输入核销码进行核销', [
                      { text: '取消' },
                      { text: '确定', onPress: code => member.checkCouponCode(item.id, code) },
                    ])
                  }}
                >
                  核销
                </Button>
              ) : null
            }
          />
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member, match } = this.props
    this.setState({ refreshing: true })
    await member.fetchCouponCheckList(match.params.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar title="优惠券领用列表" goBack />
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
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>
      </React.Fragment>
    )
  }
}

export default CouponCheck
