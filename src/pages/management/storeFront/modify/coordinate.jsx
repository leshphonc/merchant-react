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
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title="商户坐标拾取" goBack />
        <Picker callback={this.returnValue} lng={match.params.lng} lat={match.params.lat} />
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
