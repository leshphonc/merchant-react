import React from 'react'
import { WhiteSpace, Button } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import E from 'wangeditor'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: '',
    }
    this.editor = React.createRef()
  }

  componentDidMount() {
    const editor = new E(this.editor.current)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html,
      })
    }
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
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
        >
          确定修改
        </Button>
      </React.Fragment>
    )
  }
}

export default Detail
