import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  PullToRefresh,
  Card,
  Flex,
  Button,
  WingBlank,
  Modal,
  Toast,
} from 'antd-mobile'

@inject('commodity')
@observer
class Package extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { height } = this.state
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    commodity.fetchPackage()
  }

  mapList = () => {
    const { commodity, history } = this.props
    return commodity.packageList.map(item => (
      <React.Fragment key={item.meal_id}>
        <Card>
          <Card.Header thumb={item.pic} title={item.meal_name}></Card.Header>
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
                  {item.flag === 0 ? (
                    <Flex.Item>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                          history.push(
                            `/management/commodity/serviceItemsPanel/编辑/1/${item.meal_id}`,
                          )
                        }
                      >
                        编辑
                      </Button>
                    </Flex.Item>
                  ) : null}
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
              </React.Fragment>
            }
          />
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
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
              Toast.success('删除成功', 1, () => commodity.fetchPackage())
            }
          }),
      },
    ])
  }

  loadMore = () => {
    const { commodity } = this.props
    commodity.fetchPackage(true)
  }

  render() {
    const { history } = this.props
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar
          title="套餐管理"
          goBack
          right={
            <Button
              type="ghost"
              size="small"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={() =>
                history.push(
                  '/management/commodity/serviceItemsPanel/新增/套餐',
                )
              }
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
            height,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.loadMore}
        >
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>
      </>
    )
  }
}

export default Package
