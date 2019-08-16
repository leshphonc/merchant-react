import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import Picker from '@/common/CoordinatePicker'

@inject('storeFront')
@observer
class CoordinatePicker extends React.Component {
  returnValue = (lng, lat, address) => {
    const { storeFront, history } = this.props
    storeFront.saveLngLatAddress(lng, lat, address).then(() => {
      history.goBack()
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="商户坐标拾取" goBack />
        <Picker callback={this.returnValue} />
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
