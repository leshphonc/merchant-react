import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import CropperImg from '@/common/CropperImg'

@inject('basicInformation')
@observer
class ModifyPicture extends React.Component {
  saveImg = async url => {
    console.log(url)
    const { history, basicInformation } = this.props
    await basicInformation[history.location.state.action](url)
    history.goBack()
  }

  render() {
    const { history } = this.props
    return (
      <React.Fragment>
        <NavBar title="裁剪上传" goBack />
        <CropperImg callback={this.saveImg} aspectratio={history.location.state.aspectratio} />
      </React.Fragment>
    )
  }
}
export default ModifyPicture
