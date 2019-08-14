import React from 'react'
import NavBar from '@/common/NavBar'
import CropperImg from '@/common/CropperImg'

export default props => {
  const saveImg = url => {
    const { callback } = props
    callback(url)
  }
  return (
    <React.Fragment>
      <NavBar title="发票上传" goBack />
      <CropperImg callback={saveImg} />
    </React.Fragment>
  )
}
