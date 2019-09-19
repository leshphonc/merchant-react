import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, InputItem, WingBlank, Button,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

@createForm()
@inject('selfManagement')
@observer
class secretKey extends React.Component {
  componentDidMount() {
    const { selfManagement, match } = this.props
    selfManagement.fetchSeePickPwd(match.params.id)
    // const { shopManager, match, form } = this.props
    // if (!match.params.id) return
    // shopManager.fetchClassifyDetail(match.params.id).then(() => {
    //   const { classifyDetail } = shopManager
    //   form.setFieldsValue({
    //     name: classifyDetail.name,
    //   })
    // })
  }

  // submit = () => {
  //   const {
  //     shopManager, form, match, history,
  //   } = this.props
  //   form.validateFields((error, value) => {
  //     if (error) {
  //       Toast.info('请输入完整信息')
  //       return
  //     }
  //     const obj = {
  //       ...value,
  //     }
  //     // console.log(value)
  //     // console.log(obj)
  //     if (match.params.id) {
  //       // console.log(match.params.id)
  //       shopManager.addClassify({ ...obj, id: match.params.id }).then(res => {
  //         if (res) Toast.success('编辑成功', 1, () => history.goBack())
  //       })
  //     } else {
  //       shopManager.modifyClassify({ ...obj }).then(res => {
  //         if (res) Toast.success('新增成功', 1, () => history.goBack())
  //       })
  //     }
  //   })
  // }

  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}登陆密钥`} goBack />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
          >
            登陆密钥
          </InputItem>
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={this.submit}
            >
              更换登陆密钥
            </Button>
          </WingBlank>
        </List>
      </React.Fragment>
    )
  }
}
export default secretKey
