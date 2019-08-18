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
    const hei = height - ReactDOM.findDOMNode(this.listView.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { list, type, history } = this.props
    const storeType = sessionStorage.getItem('storeType')
    console.log(storeType)
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
                      `/management/storefront/categoryManagement/${item.store_id}/${type}`,
                    )
                  }}
                >
                  分类管理
                </Button>
                <WhiteSpace />
                {storeType !== '1' ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      history.push(`/management/storefront/storeDiscount/${item.store_id}`)
                    }}
                  >
                    店铺优惠
                  </Button>
                ) : null}
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    history.push(
                      `/management/storefront/categoryPanel/新增/${item.store_id}/${type}`,
                    )
                  }}
                >
                  <i className="iconfont" style={{ marginRight: 4 }}>
                    &#xe633;
                  </i>
                  添加分类
                </Button>
                <WhiteSpace />
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/management/storefront/storePanel/编辑/${item.store_id}`)
                  }
                >
                  <i className="iconfont" style={{ marginRight: 4 }}>
                    &#xe634;
                  </i>
                  编辑店铺
                </Button>
              </Flex.Item>
              {storeType === '2' ? (
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/management/storefront/storePanel/编辑/${item.store_id}`)
                    }
                  >
                    <i className="iconfont" style={{ marginRight: 4 }}>
                      &#xe6fd;
                    </i>
                    桌台管理
                  </Button>
                  <WhiteSpace />
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      history.push(`/management/storefront/diningInformation/${item.store_id}`)
                    }}
                  >
                    <i className="iconfont" style={{ marginRight: 4 }}>
                      &#xe629;
                    </i>
                    餐饮信息
                  </Button>
                </Flex.Item>
              ) : null}
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
