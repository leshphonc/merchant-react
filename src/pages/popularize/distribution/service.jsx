import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  WingBlank,
  PullToRefresh,
  Flex,
  Card,
  Button,
} from 'antd-mobile'
import moment from 'moment'

@inject('commodity')
@observer
class Service extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 54,
      list: [],
      page: 1,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    commodity.fetchSingleServiceList().then(res => {
      this.setState({
        list: res,
      })
    })
  }

  loadMore = async () => {
    const { commodity } = this.props
    const { page } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchSingleServiceList(page + 1).then(res => {
      if (res.length !== 0) {
        this.setState({
          page: page + 1,
        })
      }
      this.setState({
        refreshing: false,
      })
    })
  }

  mapList = () => {
    const { history } = this.props
    const { list } = this.state
    return list.map(item => {
      return (
        <React.Fragment key={item.appoint_id}>
          <Card>
            <Card.Header
              title={item.appoint_name}
              thumb={item.pic}
              extra={item.appoint_type === '1' ? '上门' : '到店'}
            />
            <Card.Body>
              <div style={{ color: '#777' }}>{item.appoint_content}</div>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <span>原价：{item.old_price} 元</span>
                </Flex.Item>
                <Flex.Item>
                  {item.payment_status === '1' ? (
                    <span>定金：{item.payment_money} 元</span>
                  ) : null}
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <span>可提前预约天数：{item.appoint_date_num} 天</span>
                </Flex.Item>
                <Flex.Item>
                  <span>耗时：{item.expend_time} 分钟</span>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <span>
                    预约开始时间：
                    {moment(item.start_time * 1000).format('YYYY-MM-DD HH:mm')}
                  </span>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <span>
                    预约结束时间：
                    {moment(item.end_time * 1000).format('YYYY-MM-DD HH:mm')}
                  </span>
                </Flex.Item>
              </Flex>
            </Card.Body>
            <WhiteSpace />
            <Card.Footer
              content={
                <React.Fragment>
                  <Flex>
                    <Flex.Item>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                          history.push(
                            `/popularize/distribution/serviceSpread/${item.appoint_id}`,
                          )
                        }
                      >
                        佣金设置
                      </Button>
                    </Flex.Item>
                  </Flex>
                </React.Fragment>
              }
            />
            <WhiteSpace />
          </Card>
          <WhiteSpace />
        </React.Fragment>
      )
    })
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar title="服务项目列表" goBack />
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
      </>
    )
  }
}

export default Service
