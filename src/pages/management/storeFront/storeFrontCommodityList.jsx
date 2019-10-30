import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import {
  Button,
  Card,
  WhiteSpace,
  Modal,
  List,
  Checkbox,
  Flex,
  PullToRefresh,
  Toast,
} from 'antd-mobile'
import Empty from '@/common/Result/Empty'
import moment from 'moment'

@inject('storeFront')
@observer
class StoreFrontCommodityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      refreshing1: false,
      bindHeight: document.documentElement.clientHeight,
      unBindHeight: document.documentElement.clientHeight,
      show: false,
      ids: [],
    }
    this.refresh = React.createRef()
    this.refresh1 = React.createRef()
  }

  componentDidMount() {
    const { storeFront, match } = this.props
    const { bindHeight, unBindHeight } = this.state
    const hei =
      // eslint-disable-next-line react/no-find-dom-node
      bindHeight - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    const hei2 =
      // eslint-disable-next-line react/no-find-dom-node
      unBindHeight - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      bindHeight: hei,
      unBindHeight: hei2,
    })
    storeFront.getStoreCommodityForSale(match.params.id)
  }

  unBindCommodity = id => {
    const { storeFront, match } = this.props
    storeFront.unBindCommodity(match.params.id, id).then(res => {
      if (res) {
        Toast.success('解绑成功', 1, () =>
          storeFront.getStoreCommodityForSale(match.params.id),
        )
      }
    })
  }

  mapList = () => {
    const { storeFront } = this.props
    if (storeFront.storeCommodityForSale.length) {
      return storeFront.storeCommodityForSale.map(item => {
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
                      {moment(item.start_time * 1000).format(
                        'YYYY-MM-DD HH:mm',
                      )}
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
                  <Button
                    type="warning"
                    size="small"
                    onClick={() => this.unBindCommodity(item.id)}
                  >
                    解绑
                  </Button>
                }
              />
              <WhiteSpace />
            </Card>
            <WhiteSpace />
          </React.Fragment>
        )
      })
    } else {
      return <Empty />
    }
  }

  getUnBindStoreCommodityForSale = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStoreCommodityForSale(match.params.id).then(() => {
      this.setState({ show: true })
    })
  }

  loadMoreCommodity = () => {
    const { storeFront, match } = this.props
    storeFront.getStoreCommodityForSale(match.params.id, true)
  }

  loadMoreUnBindCommodity = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStoreCommodityForSale(match.params.id, true)
  }

  mapCommodity = () => {
    const { storeFront } = this.props
    if (storeFront.unBindstoreCommodityForSale.length) {
      return storeFront.unBindstoreCommodityForSale.map(item => {
        return (
          <Checkbox.CheckboxItem
            key={item.appoint_id}
            onChange={() => this.changeCheckBox(item.appoint_id)}
          >
            {item.appoint_name}
          </Checkbox.CheckboxItem>
        )
      })
    } else {
      return <Empty />
    }
  }

  changeCheckBox = item => {
    const { ids } = this.state
    const index = ids.indexOf(item)
    if (index < 0) {
      this.setState({
        ids: [...ids, item],
      })
    } else {
      const arr = ids
      arr.splice(index, 1)
      this.setState({
        ids: [...arr],
      })
    }
  }

  submit = () => {
    const { storeFront, match } = this.props
    const { ids } = this.state
    storeFront
      .bindStoreCommodity(match.params.id, JSON.stringify(ids))
      .then(res => {
        if (res) {
          Toast.success('绑定成功', 1, () => {
            storeFront.getStoreCommodityForSale(match.params.id)
            this.hide()
          })
        }
      })
  }

  hide = () => {
    this.setState({
      show: false,
      ids: [],
    })
  }

  render() {
    const {
      show,
      bindHeight,
      unBindHeight,
      refreshing,
      refreshing1,
    } = this.state
    return (
      <>
        <NavBar
          title="服务项目列表"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={this.getUnBindStoreCommodityForSale}
            >
              添加
            </Button>
          }
        />
        <WhiteSpace />
        <PullToRefresh
          ref={this.refresh}
          refreshing={refreshing}
          style={{
            bindHeight,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉加载更多' }}
          direction="up"
          onRefresh={this.loadMoreCommodity}
        >
          {this.mapList()}
        </PullToRefresh>
        <Modal visible={show}>
          <Flex direction="column" style={{ height: '100vh' }}>
            <Flex.Item>
              <PullToRefresh
                ref={this.refresh1}
                refreshing={refreshing1}
                style={{
                  unBindHeight,
                  overflow: 'auto',
                }}
                indicator={{ deactivate: '上拉加载更多' }}
                direction="up"
                onRefresh={this.loadMoreUnBindCommodity}
              >
                <List>{this.mapCommodity()}</List>
              </PullToRefresh>
            </Flex.Item>
            <div>
              <Flex>
                <Flex.Item>
                  <Button
                    type="ghost"
                    style={{ width: '50vw' }}
                    onClick={this.hide}
                  >
                    取消
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    style={{ width: '50vw' }}
                    onClick={this.submit}
                  >
                    选择
                  </Button>
                </Flex.Item>
              </Flex>
            </div>
          </Flex>
        </Modal>
      </>
    )
  }
}

export default StoreFrontCommodityList
