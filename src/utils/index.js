import Compressor from 'compressorjs'
import crypto from 'crypto'
import axios from 'axios'
import { Toast } from 'antd-mobile'

/**
 * @author cc
 * @description 公共函数
 */

export default {
  // 传入键名 获取地址栏参数
  getUrlParam(name, url) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)`)
    let result = null
    if (url) {
      result = new URL(url).search.substr(1).match(reg)
    } else {
      result = window.location.search.substr(1).match(reg)
    }
    if (result !== null) return decodeURIComponent(result[2])
    return ''
  },
  // 生成随机数
  createNonceStr() {
    return Math.random()
      .toString(36)
      .substr(2, 15)
  },
  // 生成时间戳
  createTimeStamp() {
    return `${new Date().getTime() / 1000}`
  },
  // Object转换成json并排序
  raw(args) {
    const keys = Object.keys(args).sort()
    const obj = {}
    keys.forEach(key => {
      obj[key] = args[key]
    })
    // 将对象转为&分割的参数
    let val = ''
    for (const k in obj) {
      val += `&${k}=${obj[k]}`
    }
    return val.substr(1)
  },
  // 富文本编辑器上传图片
  edtiorUploadImg(arr) {
    return new Promise(resolve => {
      arr.forEach((item, index) => {
        this.compressionAndUploadImg(item)
          .then(res => {
            arr.splice(index, 1, res)
            if (arr.length === index + 1) {
              resolve(arr)
            }
          })
          .catch(e => Toast.fail(e))
      })
    })
  },
  // 上传数组图片
  compressionAndUploadImgArr(arr) {
    arr.forEach((item, index) => {
      if (item.file) {
        this.compressionAndUploadImg(item.file)
          .then(res => {
            arr.splice(index, 1, { url: res })
            console.log(arr)
          })
          .catch(e => Toast.fail(e))
      }
    })
    return arr
  },
  // 上传单个图片
  compressionAndUploadImg(blob) {
    console.log(blob)
    return new Promise((resolve, reject) => {
      /* eslint no-new: 0 */
      new Compressor(blob, {
        quality: 0.1,
        success: result => {
          const reader = new window.FileReader()
          reader.readAsDataURL(result)
          reader.onloadend = () => {
            // Send the compressed image file to server with XMLHttpRequest.
            axios
              .post('/appapi.php?c=Merchantapp&a=base64change', {
                imgBase: reader.result,
                ticket: localStorage.getItem('ticket'),
              })
              .then(response => {
                if (response.data.error === 0) {
                  resolve(response.data.msg)
                }
              })
              .catch(e => {
                reject(e)
              })
          }
        },
        error: err => {
          alert(`压缩错误：${err}`)
        },
      })
    })
  },
  // 将 10:10:10 转成date供插件使用
  conversionTimeStringToDate(str) {
    const date = new Date()
    date.setHours(str.substr(0, 2))
    date.setMinutes(str.substr(3, 2))
    date.setSeconds(str.substr(6, 2))
    return date
  },
  // 微信分享
  initShareInfo(wx) {
    const shareInfo = {
      title: '分享标题', // 分享标题
      desc: '分享描述', // 分享描述
      link: 'http://m.cs.com/#/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
    }
    // 分享给朋友及QQ
    // wx.updateAppMessageShareData(shareInfo)
    // 分享给朋友圈及QQ空间
    // wx.updateTimelineShareData(shareInfo)

    // 分享给朋友（即将废弃 now:2019.6.22）
    wx.onMenuShareAppMessage(shareInfo)
    // 分享到朋友圈（即将废弃 now:2019.6.22）
    wx.onMenuShareTimeline(shareInfo)
    // 分享到QQ（即将废弃 now:2019.6.22）
    wx.onMenuShareQQ(shareInfo)
    // 分享到QQ空间（即将废弃 now:2019.6.22）
    wx.onMenuShareQZone(shareInfo)
  },
  md5(str) {
    const md5 = crypto.createHash('md5')
    md5.update(str)
    return md5.digest('hex')
  },
  // 公用正则
  matchExp(rule, value) {
    const REGS = {
      name: '/^[\\u4e00-\\u9fa5A-Za-z()]+$/',
      number: '/^[0-9.]*$/',
      account: '/^[A-Za-z0-9]{1,30}$/',
      password: '/^(\\w){6,16}$/',
      tel: '/^[1][3-9][0-9]{9}$/',
      email: '/^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$/',
    }
    return new RegExp(REGS[rule]).test(value)
  },
  cacheData(data) {
    sessionStorage.setItem('cacheData', JSON.stringify(data))
  },
  cacheItemToData(key, value) {
    const data = JSON.parse(sessionStorage.getItem('cacheData'))
    data[key] = value
    sessionStorage.setItem('cacheData', JSON.stringify(data))
  },
  clearCacheData() {
    sessionStorage.removeItem('cacheData')
  },
}
