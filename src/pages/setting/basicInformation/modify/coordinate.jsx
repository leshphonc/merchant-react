import React from 'react'
import { observer, inject } from 'mobx-react'
import { Toast } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import Picker from '@/common/CoordinatePicker/Coordinate'

@inject('basicInformation')
@observer
class CoordinatePicker extends React.Component {
  getCoordinate = (lng, lat, address) => {
    const { basicInformation, history } = this.props
    if (!address) {
      Toast.fail('地址不能为空')
      return
    }
    basicInformation.modifyCoordinate(lng, lat, address).then(() => {
      history.goBack()
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="商户坐标拾取" goBack />
        <Picker callback={this.getCoordinate} />
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
