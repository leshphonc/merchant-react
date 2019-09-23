import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, InputItem, WingBlank, Button } from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

@createForm()
@inject('selfManagement')
@observer
class secretKey extends React.Component {
  componentDidMount() {
    const { selfManagement, match, form } = this.props
    selfManagement.fetchPickAddressDetail(match.params.id).then(() => {
      const { pickAddressDetail } = selfManagement
      form.setFieldsValue({
        pwd: pickAddressDetail.pwd,
      })
    })
  }

  submit = id => {
    const { selfManagement, form } = this.props
    selfManagement.fetchChangePicPwd(id).then(() => {
      const { changePicPwd } = selfManagement
      form.setFieldsValue({
        pwd: changePicPwd.pwd,
      })
    })
  }

  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}登陆密钥`} goBack />
        <List>
          <InputItem
            {...getFieldProps('pwd', {
              rules: [{ required: true }],
            })}
          >
            登陆密钥
          </InputItem>
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={() => this.submit(match.params.id)}
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
