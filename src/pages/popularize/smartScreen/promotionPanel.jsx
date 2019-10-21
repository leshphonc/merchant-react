import React from 'react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace,
  InputItem,
  List,
  ImagePicker,
  TextareaItem,
  Button,
  Toast,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { inject } from 'mobx-react'
import Utils from '@/utils'
import Tooltip from 'rc-tooltip'

@createForm()
@inject('smartScreen')
class PromotionPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { smartScreen, match, form } = this.props

    const cacheData = Utils.getCacheData()
    if (cacheData) {
      form.setFieldsValue({
        ...cacheData,
      })
      Utils.clearCacheData()
      return false
    }
    // 若是编辑推广内容调用接口，添加则跳过
    if (match.params.str === '编辑') {
      // 接口 获取推广内容
      smartScreen.fetchPromotionInfo(match.params.id).then(() => {
        const { promotionInfo } = smartScreen
        const arr = promotionInfo.keywords.split(',')
        // 整理默认数据放入表单
        form.setFieldsValue({
          title: promotionInfo.title,
          main_key: promotionInfo.main_key,
          keywords: arr[0],
          keywords2: arr[1],
          keywords3: arr[2],
          sort: promotionInfo.sort,
          site_name: promotionInfo.site_name,
          pic: [{ url: promotionInfo.pic }],
          pic_url: promotionInfo.pic_url,
        })
      })
    }
  }

  // cacheData = () => {
  //     const { form } = this.props
  //     const { title, keywords, read_txt, img, url} = this.state
  //     const formData = form.getFieldsValue()
  //     formData.title= title,
  //     formData.keywords= keywords,
  //     formData.read_txt= read_txt,
  //     formData.img= img,
  //     formData.url= url
  // }

  submit = () => {
    const { form, match, smartScreen, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      let { keywords } = value
      if (value.keywords2) {
        keywords += `,${value.keywords2}`
      }
      if (value.keywords3) {
        keywords += `,${value.keywords3}`
      }
      const obj = {
        title: value.title,
        main_key: value.main_key,
        keywords,
        sort: value.sort,
        site_name: value.site_name,
        pic: value.pic.map(item => item.url)[0],
        pic_url: value.pic_url,
        width: '0.32',
      }
      if (match.params.str === '编辑') {
        const { promotionInfo } = smartScreen
        smartScreen
          .modifyPromotionInfo({
            ...obj,
            site_id: promotionInfo.id,
          })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        smartScreen
          .insertPromotionList({ ...obj, site_id: match.params.id, isnew: 1 })
          .then(res => {
            if (res) Toast.success('新增成功', 1, () => history.goBack())
          })
      }
    })
  }

  render() {
    const { form, match, history } = this.props
    const { getFieldProps } = form
    const picArr = form.getFieldValue('pic') ? form.getFieldValue('pic') : []
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}推广内容`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('title', {
              rules: [{ required: true }],
            })}
            placeholder="请输入标题"
          >
            广告标题
          </InputItem>
          <InputItem
            {...getFieldProps('main_key', {
              rules: [{ required: true, min: 2, max: 4 }],
            })}
            placeholder="出现在智能屏上，用于引导用户对话(2-4个字)"
          >
            命令词
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="该词展示在智能屏首页，引导用户对智能屏提出指令"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('keywords', {
              rules: [{ required: true, min: 2, max: 6 }],
            })}
            labelNumber="7"
            placeholder="请输入推广关键字（2-6个字）"
          >
            对话关键词1
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户与智能屏对话时，识别到该关键词将向用户返回本条内容（2-6个字）"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('keywords2', {
              rules: [{ required: false, min: 2, max: 6 }],
            })}
            labelNumber="7"
            placeholder="选填（2-6个字）"
          >
            对话关键词2
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="选填（2-6个字）"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('keywords3', {
              rules: [{ required: false, min: 2, max: 6 }],
            })}
            labelNumber="7"
            placeholder="选填（2-6个字）"
          >
            对话关键词3
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="选填（2-6个字）"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <InputItem
            {...getFieldProps('sort', {
              rules: [{ required: true }],
            })}
            placeholder="推广内容排序"
          >
            排序
          </InputItem>
          <TextareaItem
            placeholder="请输入播报语音"
            {...getFieldProps('site_name', {
              rules: [{ required: true }],
            })}
            title={
              <>
                <span>播报语音</span>
                <Tooltip
                  trigger="click"
                  placement="topLeft"
                  overlay="用户提出播放指令时，智能屏将语音播报本内容"
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <i
                    className="iconfont"
                    style={{ marginLeft: 10, color: '#bbb' }}
                  >
                    &#xe628;
                  </i>
                </Tooltip>
              </>
            }
            rows={3}
            count={100}
          />
          <List.Item arrow="empty">
            海报图片
            <ImagePicker
              {...getFieldProps('pic', {
                valuePropName: 'files',
                rules: [{ required: true }],
              })}
              selectable={picArr.length < 1}
              onAddImageClick={e => {
                const formData = form.getFieldsValue()
                Utils.cacheData(formData)
                history.push('/uploadMultipleImg/裁剪/pic/0.5625')
                e.preventDefault()
              }}
            />
          </List.Item>
          <InputItem
            {...getFieldProps('pic_url', {
              rules: [{ required: true }],
            })}
            placeholder="请输入海报网址"
          >
            海报网址
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户扫描海报上的二维码，将进入本网页"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
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

export default PromotionPanel
