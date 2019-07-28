import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Placeholder from './styled'

export default withRouter((props) => {
  const { title, goBack, right } = props
  const handler = () => {
    if (goBack) {
      props.history.goBack()
    } else {
      props.history.push(props.goBack)
    }
  }
  return (
    <Placeholder>
      <NavBar
        mode="dark"
        leftContent={<i className="iconfont">&#xe654;</i>}
        rightContent={right}
        onLeftClick={handler}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          zIndex: 99,
        }}
      >
        {title}
      </NavBar>
    </Placeholder>
  )
})
