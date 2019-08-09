import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import Picker from '@/common/CoordinatePicker'

@inject('basicInformation')
@observer
class CoordinatePicker extends React.Component {
  getCoordinate = (lng, lat, address) => {
    const { basicInformation, history } = this.props
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
