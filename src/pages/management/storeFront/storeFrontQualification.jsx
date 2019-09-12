import React from 'react'
import NavBar from '@/common/NavBar'
import { List, ImagePicker, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import Utils from '@/utils'

@createForm()
@inject('storeFront')
@observer
class StoreFrontQualification extends React.Component {
  componentDidMount() {
    const { storeFront, match, form } = this.props
    storeFront.fetchAuthFiles(match.params.id).then(() => {
      const { authFiles } = storeFront
      console.log(authFiles)
      form.setFieldsValue({
        auth_files: authFiles,
      })
    })
  }

  submit = () => {}

  render() {
    const { form, storeFront } = this.props
    const { authStatus } = storeFront
    const { getFieldProps } = form
    const auth_files = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    return (
      <React.Fragment>
        <NavBar title="资质审核" goBack />
        <WhiteSpace />
        <List>
          <List.Item extra={authStatus === '0' ? '未通过' : '已通过'} arrow="empty">
            审核状态
          </List.Item>
          <List.Item arrow="empty">
            资质图片
            <ImagePicker
              {...getFieldProps('auth_files', {
                valuePropName: 'files',
                getValueFromEvent: item => Utils.compressionAndUploadImgArr(item),
                rules: [{ required: true }],
              })}
              selectable={auth_files.length < 5}
            />
          </List.Item>
        </List>
      </React.Fragment>
    )
  }
}

export default StoreFrontQualification
