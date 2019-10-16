import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Placeholder from './styled'

export default withRouter(props => {
  const { title, goBack, right } = props
  const handler = () => {
    if (goBack === true) {
      props.history.goBack()
    } else {
      props.history.push(props.goBack)
    }
  }
  return (
    <Placeholder>
      <NavBar
        mode="dark"
        leftContent={
          goBack ? (
            <i className="iconfont" style={{ fontSize: 20 }}>
              &#xe654;
            </i>
          ) : null
        }
        rightContent={right}
        onLeftClick={handler}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          zIndex: 99999,
        }}
      >
        {title}
      </NavBar>
    </Placeholder>
  )
})
