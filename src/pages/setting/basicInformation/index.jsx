import React from 'react'
import NavBar from '@/common/NavBar'
import {
  List, InputItem, Switch, Stepper, Range, Button,
} from 'antd-mobile'
import { createForm } from 'rc-form'

const { Item } = List
export default createForm((props) => {
  const onSubmit = () => {
    props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(props.form.getFieldsValue())
      } else {
        alert('Validation failed')
      }
    })
  }
  const onReset = () => {
    props.form.resetFields()
  }
  const validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback()
    } else {
      callback(new Error('At least four characters for account'))
    }
  }

  const { getFieldProps, getFieldError } = props.form
  return (
    <React.Fragment>
      <NavBar title="基本信息" goBack />
      <form>
        <List
          renderHeader={() => 'Form Validation'}
          renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
        >
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: 'Please input account' },
                { validator: validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'))
            }}
            placeholder="please input account"
          >
            Account
          </InputItem>
          <InputItem
            {...getFieldProps('password')}
            placeholder="please input password"
            type="password"
          >
            Password
          </InputItem>
          <Item
            extra={
              <Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />
            }
          >
            Confirm Infomation
          </Item>
          <Item>
            <div style={{ padding: 7 }}>
              <Range defaultValue={[20, 80]} />
            </div>
          </Item>
          <Item
            extra={(
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                size="small"
                defaultValue={20}
              />
)}
          >
            Number of Subscribers
          </Item>
          <Item>
            <Button type="primary" size="small" inline onClick={onSubmit}>
              Submit
            </Button>
            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={onReset}>
              Reset
            </Button>
          </Item>
        </List>
      </form>
    </React.Fragment>
  )
})
