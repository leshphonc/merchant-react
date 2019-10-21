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
    storeFront.getStorePackageForSale(match.params.id)
  }

  unBindPackage = id => {
    const { storeFront, match } = this.props
    storeFront.unBindPackage(match.params.id, id).then(res => {
      if (res) {
        Toast.success('解绑成功', 1, () =>
          storeFront.getStorePackageForSale(match.params.id),
        )
      }
    })
  }

  mapList = () => {
    const { storeFront } = this.props
    if (storeFront.storePackageForSale.length) {
      return storeFront.storePackageForSale.map(item => {
        return (
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
                  <Button
                    type="warning"
                    size="small"
                    onClick={() => this.unBindPackage(item.id)}
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

  getUnBindStorePackageForSale = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStorePackageForSale(match.params.id).then(() => {
      this.setState({ show: true })
    })
  }

  loadMorePackage = () => {
    const { storeFront, match } = this.props
    storeFront.getStorePackageForSale(match.params.id, true)
  }

  loadMoreUnBindPackage = () => {
    const { storeFront, match } = this.props
    storeFront.getUnBindStorePackageForSale(match.params.id, true)
  }

  mapPackage = () => {
    const { storeFront } = this.props
    if (storeFront.unBindstorePackageForSale.length) {
      return storeFront.unBindstorePackageForSale.map(item => {
        return (
          <Checkbox.CheckboxItem
            key={item.meal_id}
            onChange={() => this.changeCheckBox(item.meal_id)}
          >
            {item.meal_name}
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
      .bindStorePackage(match.params.id, JSON.stringify(ids))
      .then(res => {
        if (res) {
          Toast.success('绑定成功', 1, () => {
            storeFront.getStorePackageForSale(match.params.id)
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
          title="套餐列表"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={this.getUnBindStorePackageForSale}
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
          onRefresh={this.loadMorePackage}
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
                onRefresh={this.loadMoreUnBindPackage}
              >
                <List>{this.mapPackage()}</List>
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
