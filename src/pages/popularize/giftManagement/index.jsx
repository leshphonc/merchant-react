import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, WingBlank,
} from 'antd-mobile'
import { Route } from 'react-router-dom'

@inject('giftManagement')
@observer
class GiftManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // const { giftManagement } = this.props
    // giftManagement.fetchGetGift()
  }

  search = () => {
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="推广统计" goBack />
        <WingBlank size="md" style={{ marginTop: '10px' }}>
          <Flex>
            <Flex.Item>
            </Flex.Item>
            <Flex.Item>
            </Flex.Item>
            <Flex.Item>

            </Flex.Item>
            <Flex.Item>
              <Button type="primary" onClick={this.search}>
                查询
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/popularize/giftManagement" exact component={GiftManagement} />
  </React.Fragment>
)
