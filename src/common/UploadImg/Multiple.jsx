import React from 'react'
import NavBar from '@/common/NavBar'

class Multiple extends React.Component {
  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title={match.params.title} goBack />
      </React.Fragment>
    )
  }
}

export default Multiple
