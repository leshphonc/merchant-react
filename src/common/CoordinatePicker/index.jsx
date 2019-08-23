/**
 * @author cc
 * @param lng 动态路由参数传入
 * @param lat 动态路由参数传入
 * @description 此组件为完整页面，包括NavBar
 * 使用方法：
 * 1.路由跳转至 /coordinatePicker/:lng/:lat 附带上当前lng和lat
 * 2.点击确定会将拾取到的lng和lat存入sessionStorage的cacheData的lng和lat中
 */

import React from 'react'
import NavBar from '@/common/NavBar'
import Picker from './Coordinate'
import Utils from '@/utils'

class CoordinatePicker extends React.Component {
  returnValue = (lng, lat) => {
    const { history } = this.props
    Utils.cacheItemToData('long', lng)
    Utils.cacheItemToData('lat', lat)
    // storeFront.saveLngLatAddress(lng, lat, address).then(() => {
    history.goBack()
    // })
  }

  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title="坐标拾取" goBack />
        <Picker callback={this.returnValue} lng={match.params.lng} lat={match.params.lat} />
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
