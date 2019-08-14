import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import {
  WingBlank, WhiteSpace, Card, Button, Flex,
} from 'antd-mobile'

const Status = {
  1: {
    label: '正常',
    color: '#690',
  },
  2: {
    label: '审核',
    color: '#ffb000',
  },
  4: {
    label: '禁用',
    color: '#dd4a68',
  },
}

@withRouter
class StoreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: document.documentElement.clientHeight,
    }
    this.listView = React.createRef()
  }

  componentDidMount() {
    const { height } = this.state
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.listView.current).offsetTop - 106.5
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { list, type, history } = this.props
    return list.map(item => (
      <React.Fragment key={item.store_id}>
        <Card>
          <Card.Header
            title={item.name}
            extra={
              <span style={{ color: Status[item.status].color }}>{Status[item.status].label}</span>
            }
          />
          <Card.Body>
            <Flex justify="between">
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    history.push(
                      `/management/storefront/managementCategory/${item.store_id}/${type}`,
                    )
                  }}
                >
                  分类管理
                </Button>
                <WhiteSpace />
                <Button type="primary" size="small">
                  店铺优惠
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button type="primary" size="small">
                  <i className="iconfont" style={{ marginRight: 4 }}>
                    &#xe633;
                  </i>
                  添加分类
                </Button>
                <WhiteSpace />
                <Button type="primary" size="small">
                  <i className="iconfont" style={{ marginRight: 4 }}>
                    &#xe634;
                  </i>
                  编辑店铺
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
    const { height } = this.state
    return (
      <React.Fragment>
        <WhiteSpace />
        <div ref={this.listView} style={{ height, overflow: 'auto' }}>
          <WingBlank size="sm">{this.mapList()}</WingBlank>
        </div>
      </React.Fragment>
    )
  }
}

export default StoreList
