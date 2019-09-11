import React from 'react'
import { Modal } from 'antd-mobile'
import CropperImg from './CropperImg'

class Multiple extends React.Component {
  saveImg = url => {
    const { callback } = this.props
    callback(url)
  }

  render() {
    const { close, visible, ratio } = this.props
    return (
      <Modal
        visible={visible}
        transparent={false}
        onClose={close}
        title={<div style={{ height: 33 }}>裁剪</div>}
      >
        <CropperImg aspectratio={ratio} callback={this.saveImg} />
      </Modal>
    )
  }
}

export default Multiple
