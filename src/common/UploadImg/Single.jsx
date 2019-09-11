/**
 * @author cc
 * @param aspectratio 截图比,不传则不控制
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
import { observer, inject } from 'mobx-react'
import CropperImg from './CropperImg'
import Utils from '@/utils'

@inject('common')
@observer
class Single extends React.Component {
  saveImg = url => {
    const { match, history } = this.props
    const { key } = match.params
    Utils.cacheItemToData(key, url)
    history.goBack()
  }

  render() {
    const { match } = this.props
    const ratio = match.params.ratio ? match.params.ratio - 0 : null
    return (
      <React.Fragment>
        <NavBar title={match.params.title} goBack />
        <CropperImg aspectratio={ratio} callback={this.saveImg} />
      </React.Fragment>
    )
  }
}

export default Single
