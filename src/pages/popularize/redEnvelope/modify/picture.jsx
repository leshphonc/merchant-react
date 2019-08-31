import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import CropperImg from '@/common/UploadImg/CropperImg'

@inject('redEnvelop')
@observer
class ModifyPicture extends React.Component {
  saveImg = async url => {
    const { history, match, redEnvelop } = this.props
    console.log(this.props)
    await redEnvelop[match.params.action](url)
    history.goBack()
  }

  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title="裁剪上传" goBack />
        <CropperImg callback={this.saveImg} aspectratio={match.params.aspectratio - 0} />
      </React.Fragment>
    )
  }
}
export default ModifyPicture
