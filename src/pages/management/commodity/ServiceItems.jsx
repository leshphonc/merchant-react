import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank, Button, Card, SegmentedControl } from 'antd-mobile'

class ServiceItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cur: '单项目',
    }
  }

  fetchSingle = () => {}

  fetchPackage = () => {}

  mapList = () => {
    const { history } = this.props
    const { cur } = this.state
    return (
      <React.Fragment>
        <Card onClick={() => history.push(`/management/commodity/serviceItemsPanel/编辑/${cur}`)}>
          <Card.Header title="服务名称"></Card.Header>
        </Card>
      </React.Fragment>
    )
  }

  render() {
    const { history } = this.props
    const { cur } = this.state
    return (
      <>
        <NavBar title="服务项目" goBack />
        <WhiteSpace />
        <WingBlank size="md">
          <SegmentedControl
            values={['单项目', '套餐项目']}
            onValueChange={value => {
              if (value === '单项目') {
                this.fetchSingle()
              } else {
                this.fetchPackage()
              }
              this.setState({
                cur: value,
              })
            }}
          />
        </WingBlank>
        <WhiteSpace />
        {this.mapList()}
        <Button
          type="primary"
          onClick={() => history.push(`/management/commodity/serviceItemsPanel/新增/${cur}`)}
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          {`新增${cur}`}
        </Button>
      </>
    )
  }
}

export default ServiceItems
