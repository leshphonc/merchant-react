import React from 'react'
import { observer, inject } from 'mobx-react'
import E from 'wangeditor'
import Utils from '@/utils'

@inject('basicInformation')
@observer
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editor: '',
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const { content } = this.props
    console.log(this.props)
    const editor = new E(this.editor.current)
    this.setState({
      editor,
    })
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.customUploadImg = async (files, insert) => {
      const arr = await Utils.edtiorUploadImg(files)
      arr.forEach(item => {
        insert(item)
      })
    }
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
    console.log(content)
    editor.txt.html(content)
  }

  render() {
    return (
      <div ref={this.editor} style={{ textAlign: 'left', background: '#fff', margin: '10px 0' }} />
    )
  }
}

export default Editor
