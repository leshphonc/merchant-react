import React from 'react'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, Button } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import E from 'wangeditor'

@inject('basicInformation')
@observer
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: '',
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { match } = this.props
    this.setState({
      editorContent: match.params.value,
    })
    const editor = new E(this.editor.current)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html,
      })
    }
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'undo', // 撤销
      'redo', // 重复
    ]
    editor.create()
    editor.txt.html(sessionStorage.getItem('content') || '')
  }

  submit = async () => {
    const { history, basicInformation } = this.props
    const { editorContent } = this.state
    await basicInformation.modifyDetail(editorContent)
    history.goBack()
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="用户详情" goBack />
        <WhiteSpace />
        <div ref={this.editor} style={{ textAlign: 'left', background: '#fff' }} />
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定修改
        </Button>
      </React.Fragment>
    )
  }
}

export default Detail
