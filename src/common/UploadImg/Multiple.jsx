/**
 * @author cc
 * @param title navbar名称
 * @param aspectratio 截图比,不传则不控制
 * @param key 要存入的参数名
 * @callback callback
 * @description
 * 使用方法：
 * 1.路由跳转至 /uploadSingleImg/:title/:key/:ratio
 * title: NavBar的title
 * key: 要存入sessionStorage的cacheData的键名
 * ratio: 图片截取比例
 * 2.点击保存会将图片保存至sessionStorage的cacheData对应键名中
 */

import React from 'react'
import NavBar from '@/common/NavBar'
import CropperImg from './CropperImg'

class Multiple extends React.Component {
  saveImg = url => {
    const { match, history } = this.props
    const { key } = match.params
    const data = JSON.parse(sessionStorage.getItem('cacheData')) || {}
    if (data[key] && data[key].length) {
      data[key].push({ url })
    } else {
      data[key] = [{ url }]
    }
    sessionStorage.setItem('cacheData', JSON.stringify(data))
    history.goBack()
  }

  render() {
    const { match } = this.props
    return (
      <>
        <NavBar title={match.params.title} goBack />
        <CropperImg aspectratio={match.params.ratio} callback={this.saveImg} />
      </>
    )
  }
}

export default Multiple
