import React from 'react'
import NavBar from '@/common/NavBar'
import { List, Button, Switch } from 'antd-mobile'

class StoreFrontBusinessService extends React.Component {
  state = {
    custom: false,
    license: false,
  }
  componentDidMount() {}

  render() {
    const { match, history } = this.props
    const { custom, license } = this.state
    return (
      <>
        <NavBar title="服务配置" goBack />
        <List>
          <List.Item
            extra={
              <React.Fragment>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    width: 60,
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: 15,
                  }}
                  onClick={() => {
                    history.push(
                      `/management/storefront/storeFrontBusinessServiceList/${match.params.id}`,
                    )
                  }}
                >
                  编辑
                </Button>
                <Switch
                  checked={custom}
                  onChange={() => {
                    this.setState({
                      custom: !custom,
                    })
                  }}
                />
              </React.Fragment>
            }
          >
            自定义买单标识
          </List.Item>
          <List.Item
            extra={
              <Switch
                checked={license}
                onChange={() => {
                  this.setState({
                    license: !license,
                  })
                }}
              />
            }
          >
            车牌买单标识
          </List.Item>
        </List>
      </>
    )
  }
}

export default StoreFrontBusinessService
