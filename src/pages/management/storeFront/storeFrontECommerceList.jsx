import React from 'react'
import NavBar from '@/common/NavBar'
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

@inject('storeFront')
@observer
class StoreFrontPackageList extends React.Component {
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
    storeFront.getStoreECommerceForSale(match.params.id)
  }

  unbindECommerce = id => {
    const { storeFront, match } = this.props
    storeFront.unbindECommerce(match.params.id, id).then(res => {
      if (res) {
        Toast.success('解绑成功', 1, () =>
          storeFront.getStoreECommerceForSale(match.params.id),
        )
      }
    })
  }

  mapList = () => {
    const { storeFront } = this.props
    if (storeFront.storeECommerceForSale.length) {
      return storeFront.storeECommerceForSale.map(item => {
        return (
          <React.Fragment key={item.goods_id}>
            <Card>
              <Card.Header
                title={item.s_name}
                thumb={item.list_pic}
                extra={item.store_name}
              />
              <Card.Body>
                <Flex style={{ color: '#666' }}>
                  <Flex.Item>售价: {item.price} 元</Flex.Item>
                  <Flex.Item>
                    库存:
                    {item.stock_num !== '-1'
                      ? item.stock_num - item.sell_count
                      : '不限'}
                  </Flex.Item>
                  <Flex.Item>已售出: {item.sell_count}</Flex.Item>
                </Flex>
              </Card.Body>
              <Card.Footer
                content={
                  <Button
                    type="warning"
                    size="small"
                    onClick={() => this.unbindECommerce(item.goods_id)}
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

  getUnBindStoreECommerceForSale = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStoreECommerceForSale(match.params.id).then(() => {
      this.setState({ show: true })
    })
  }

  loadMoreEcommerce = () => {
    const { storeFront, match } = this.props
    storeFront.getStoreECommerceForSale(match.params.id, true)
  }

  loadMoreUnBindECommerce = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStoreECommerceForSale(match.params.id, true)
  }

  mapECommerce = () => {
    const { storeFront } = this.props
    if (storeFront.unBindstoreECommerceForSale.length) {
      return storeFront.unBindstoreECommerceForSale.map(item => {
        return (
          <Checkbox.CheckboxItem
            key={item.goods_id}
            onChange={() => this.changeCheckBox(item.goods_id)}
          >
            {item.s_name}
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
    storeFront.bindECommerce(match.params.id, JSON.stringify(ids)).then(res => {
      if (res) {
        Toast.success('绑定成功', 1, () => {
          storeFront.getStoreECommerceForSale(match.params.id)
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
          title="电商产品列表"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={this.getUnBindStoreECommerceForSale}
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
          onRefresh={this.loadMoreEcommerce}
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
                onRefresh={this.loadMoreUnBindECommerce}
              >
                <List>{this.mapECommerce()}</List>
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

export default StoreFrontPackageList
