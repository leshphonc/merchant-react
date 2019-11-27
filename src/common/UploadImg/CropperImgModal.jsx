import React from 'react'
import { Button, ImagePicker, Toast, Modal } from 'antd-mobile'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Utils from '@/utils'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M

class CropperImgModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      file: null,
      resultImgUrl: null,
    }
    this.cropper = React.createRef()
  }

  changeFile = files => {
    const { file, url } = files[0]
    if (file.size < MAX_FILE_SIZE) {
      this.setState({
        files,
        file: url,
      })
    } else {
      Toast.fail('文件超过5M，无法上传')
    }
  }

  intercept = () => {
    this.cropper.current.getCroppedCanvas().toBlob(async blob => {
      Utils.compressionAndUploadImg(blob)
        .then(res => {
          this.setState({
            files: [],
            file: null,
            resultImgUrl: res,
          })
        })
        .catch(e => Toast.fail(e))
    }, 'image/jpeg')
  }

  save = () => {
    const { cropper } = this.props
    const { resultImgUrl } = this.state
    cropper(resultImgUrl)
    // // 创造提交表单数据对象
    // const formData = new FormData()
    // // 添加要上传的文件
    // formData.append('file', blob, filename)
    // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
    // this.setState({submitting: true})
    // 上传图片
    // const resp = await http.post(url, formData)
    // 拿到服务器返回的数据(resp)
    // console.log(resp)
    // 提示上传完毕
    // this.setState({submitting: false})
    // 把选中裁切好的的图片传出去
  }
  render() {
    const { aspectratio, open, close } = this.props
    const { files, file, resultImgUrl } = this.state
    console.log(resultImgUrl)
    return (
      <Modal
        style={{ height: '100vh' }}
        popup
        visible={open}
        animationType="slide-up"
        afterClose={() => {
          this.setState({
            files: [],
            file: null,
            resultImgUrl: null,
          })
        }}
      >
        <React.Fragment>
          {file ? (
            <Cropper
              ref={this.cropper}
              src={file}
              style={{ height: '50vh', width: '100%' }}
              // Cropper.js options
              aspectRatio={aspectratio}
              guides={false}
            />
          ) : null}
          {files.length < 1 && !resultImgUrl ? (
            <ImagePicker
              files={files}
              onChange={this.changeFile}
              selectable={files.length < 1}
            />
          ) : null}

          {resultImgUrl ? (
            <img src={resultImgUrl} style={{ width: '100%' }} alt="" />
          ) : null}
          {resultImgUrl ? (
            <Button
              type="primary"
              style={{
                position: 'fixed',
                bottom: 20,
                width: '40%',
                left: '55%',
              }}
              onClick={this.save}
            >
              保存图片
            </Button>
          ) : null}
          {file ? (
            <Button
              type="primary"
              style={{
                position: 'fixed',
                bottom: 20,
                width: '40%',
                left: '55%',
              }}
              onClick={this.intercept}
            >
              截取
            </Button>
          ) : null}
          {resultImgUrl || file ? (
            <Button
              type="primary"
              style={{
                position: 'fixed',
                bottom: 20,
                width: '40%',
                left: '5%',
              }}
              onClick={close}
            >
              关闭
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                position: 'fixed',
                bottom: 20,
                width: '90%',
                left: '5%',
              }}
              onClick={close}
            >
              关闭
            </Button>
          )}
        </React.Fragment>
      </Modal>
    )
  }
}

export default CropperImgModal
