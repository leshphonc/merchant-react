import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace,
  WingBlank,
  PullToRefresh,
  Flex,
  Button,
  Card,
} from 'antd-mobile'

@inject('commodity')
@observer
class Package extends React.Component {
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
    commodity.fetchPackageList().then(res => {
      this.setState({
        list: res,
      })
    })
  }

  loadMore = async () => {
    const { commodity } = this.props
    const { page } = this.state
    this.setState({ refreshing: true })
    await commodity.fetchPackageList(page + 1).then(res => {
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
    return list.map(item => (
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
                          `/popularize/distribution/packageSpread/${item.meal_id}`,
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
    ))
  }

  render() {
    const { refreshing, height } = this.state
    return (
      <>
        <NavBar title="套餐列表" goBack />
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

export default Package
