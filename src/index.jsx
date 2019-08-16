import React from 'react'
import ReactDOM from 'react-dom'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './global.css'
import ErrorCode from '@/config/ErrorCode'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    Toast.loading('Loading...', 0)
    config.data = qs.stringify(config.data) // 转为formdata数据格式
    return config
  },
  error => Promise.error(error),
)

axios.interceptors.response.use(config => {
  Toast.hide()
  if (config.data.errorCode !== ErrorCode.SUCCESS) {
    if (config.data.errorCode === ErrorCode.NOTICKET) {
      window.location.href = '/#/login'
    }
    if (config.data.error === ErrorCode.SUCCESS) {
      return config
    }
    Toast.fail(config.data.errorMsg, 2)
  }
  return config
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
