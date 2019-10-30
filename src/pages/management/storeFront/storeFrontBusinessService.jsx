import React from 'react'
import NavBar from '@/common/NavBar'
import { List, Button, Switch } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('storeFront')
@observer
class StoreFrontBusinessService extends React.Component {
  state = {
    custom: false,
    license: false,
  }
  componentDidMount() {
    this.getStationFlag()
  }

  getStationFlag = () => {
    const { storeFront, match } = this.props
    storeFront.getStationFlag(match.params.id).then(res => {
      if (res.defined === 1) {
        this.setState({
          custom: true,
        })
      }
      if (res.car === 1) {
        this.setState({
          license: true,
        })
      }
    })
  }

  changeOnOff = (type, field) => {
    const { storeFront, match } = this.props
    storeFront.changeOnOff(type, match.params.id).then(res => {
      if (res) {
        this.getStationFlag()
        this.setState({
          [field]: !this.state[field],
        })
      }
    })
  }

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
                {custom ? (
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
                ) : null}
                <Switch
                  checked={custom}
                  onChange={() => {
                    this.changeOnOff(1, 'custom')
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
                  this.changeOnOff(2, 'license')
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
