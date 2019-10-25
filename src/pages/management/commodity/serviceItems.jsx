import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  WingBlank,
  Button,
  Card,
  Flex,
  PullToRefresh,
  Toast,
  Modal,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@inject('commodity')
@observer
class ServiceItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cur: '服务项目',
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { height } = this.state
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei =
        height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 47
      this.setState({
        height: hei,
      })
    }
    this.fetchSingle()
  }

  fetchSingle = flag => {
    const { commodity } = this.props
    commodity.fetchSingle(flag)
  }

  fetchPackage = flag => {
    const { commodity } = this.props
    commodity.fetchPackage(flag)
  }

  mapList = () => {
    const { history, commodity } = this.props
    const { cur } = this.state
    if (cur === '服务项目') {
      return commodity.singleServiceList.map(item => (
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
                    {moment(item.start_time * 1000).format('YYYY-MM-DD hh:mm')}
                  </span>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>
                  <span>
                    预约结束时间：
                    {moment(item.end_time * 1000).format('YYYY-MM-DD hh:mm')}
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
                        size="small"
                        type="primary"
                        onClick={() =>
                          history.push(
                            `/management/commodity/serviceItemsPanel/编辑/${cur}/${item.appoint_id}`,
                          )
                        }
                      >
                        编辑
                      </Button>
                    </Flex.Item>
                    <Flex.Item>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                          history.push(
                            `/management/commodity/serviceSingleRecord/${item.appoint_id}`,
                          )
                        }
                      >
                        销售记录
                      </Button>
                    </Flex.Item>
                    <Flex.Item>
                      <Button
                        size="small"
                        type="warning"
                        onClick={() =>
                          this.deleteSingleService(item.appoint_id)
                        }
                      >
                        删除
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
      ))
    }
    return commodity.packageList.map(item => (
      <React.Fragment key={item.meal_id}>
        <Card>
          <Card.Header title={item.meal_name}></Card.Header>
          <Card.Body>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>套餐价格：{item.price} 元</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>套餐总数量：{item.total_num} 个</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>每人可购买数量：{item.person_num} 个</span>
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
                      size="small"
                      type="primary"
                      onClick={() =>
                        history.push(
                          `/management/commodity/serviceItemsPanel/编辑/${cur}/${item.meal_id}`,
                        )
                      }
                    >
                      编辑
                    </Button>
                  </Flex.Item>
                  <Flex.Item>
                    <Button
                      size="small"
                      type="warning"
                      onClick={() => this.deletePackage(item.meal_id)}
                    >
                      删除
                    </Button>
                  </Flex.Item>
                </Flex>
                <WhiteSpace />
                <Flex>
                  <Flex.Item>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() =>
                        history.push(
                          `/management/commodity/servicePackageRecord/${item.meal_id}`,
                        )
                      }
                    >
                      销售记录
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
    ))
  }

  deleteSingleService = id => {
    const { commodity } = this.props
    Modal.alert('删除服务项目', '确定删除此项目？', [
      { text: '取消' },
      {
        text: '确定',
        style: { color: 'red' },
        onPress: () =>
          commodity.deleteSingleService(id).then(res => {
            if (res) {
              Toast.success('删除成功', 1, () => this.fetchSingle())
            }
          }),
      },
    ])
  }

  deletePackage = id => {
    const { commodity } = this.props
    Modal.alert('删除套餐卡', '确定删除此套餐卡？', [
      { text: '取消' },
      {
        text: '确定',
        style: { color: 'red' },
        onPress: () =>
          commodity.deletePackage(id).then(res => {
            if (res) {
              Toast.success('删除成功', 1, () => this.fetchPackage())
            }
          }),
      },
    ])
  }

  loadMore = () => {
    const { cur } = this.state
    if (cur === '服务项目') {
      this.fetchSingle(true)
    } else {
      this.fetchPackage(true)
    }
  }

  render() {
    const { history } = this.props
    const { cur, height, refreshing } = this.state
    return (
      <>
        <NavBar title="服务项目" goBack />
        <WhiteSpace />
        {/* <WingBlank size="md">
          <SegmentedControl
            selectedIndex={curIndex}
            values={['服务项目', '套餐卡']}
            onValueChange={value => {
              let num = 0
              if (value === '服务项目') {
                this.fetchSingle()
                num = 0
              } else {
                this.fetchPackage()
                num = 1
              }
              this.setState({
                cur: value,
                curIndex: num,
              })
            }}
          />
        </WingBlank>
        <WhiteSpace /> */}
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
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>

        <Button
          type="primary"
          onClick={() =>
            history.push(`/management/commodity/serviceItemsPanel/新增/${cur}`)
          }
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          {`新增${cur}`}
        </Button>
      </>
    )
  }
}

export default ServiceItems
