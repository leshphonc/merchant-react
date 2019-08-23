import React from 'react'
import NavBar from '@/common/NavBar'
import Picker from '@/common/CoordinatePicker'
import Utils from '@/utils'

class CoordinatePicker extends React.Component {
  saveLngLat = (lng, lat) => {
    const { history } = this.props
    Utils.cacheItemToData('long', lng)
    Utils.cacheItemToData('lat', lat)
    history.goBack()
  }

  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title="商户坐标拾取" goBack />
        <Picker lng={match.params.lng} lat={match.params.lat} callback={this.saveLngLat} />
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
