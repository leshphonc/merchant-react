import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, WingBlank, Card, Flex } from 'antd-mobile'
import { CustomTag } from '@/styled'
import { inject, observer } from 'mobx-react'

@inject('smartScreen')
@observer
class ViewTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { smartScreen } = this.props
    const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
    const mer_id = userInfo ? userInfo.mer_id : ''
    smartScreen.fetchViewTime({
      Imax_id: null,
      mer_id,
      Store_id: null,
    })
  }

  mapList = () => {
    const { smartScreen } = this.props
    const { viewTimeList } = smartScreen
    // console.log(viewTimeList)
    return viewTimeList.map(item => (
      <React.Fragment key={item.uid}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.nickname}
              </span>
            }
            thumb={item.header}
          />
          <Card.Body>
            <Flex>
              <CustomTag style={{ marginRight: 5 }}>
                手机号码: {item.phone}{' '}
              </CustomTag>
            </Flex>
            <Flex>
              <CustomTag style={{ marginRight: 5 }}>
                浏览时间: {item.add_time}{' '}
              </CustomTag>
            </Flex>
            <Flex>
              <CustomTag style={{ marginRight: 5 }}>
                浏览时长: {item.wait_time} 分钟
              </CustomTag>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="浏览时长" goBack />
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default ViewTime
