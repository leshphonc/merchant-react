import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List, ImagePicker, WhiteSpace, Toast, Button,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import Utils from '@/utils'

const AuthStatus = {
  0: '未提交',
  1: '审核中',
  2: '已拒绝',
  3: '已通过',
  4: '审核中',
  5: '已驳回',
}

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

  submit = () => {
    const {
      storeFront, form, match, history,
    } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.fail('请上传资质证件照')
        return false
      }
      storeFront.modifyAuth(match.params.id, value.auth_files.map(item => item.url)).then(res => {
        if (res) {
          Toast.success('编辑成功', 1, () => history.goBack())
        }
      })
    })
  }

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
          <List.Item extra={AuthStatus[authStatus]} arrow="empty">
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
        <Button
          type="primary"
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            marginBottom: 20,
          }}
          onClick={this.submit}
        >
          确定
        </Button>
      </React.Fragment>
    )
  }
}

export default StoreFrontQualification
