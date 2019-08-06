import React from 'react'
import NavBar from '@/common/NavBar'

class ModifyGroup extends React.Component {
  submit = () => {
    console.log(this.props)
  }

  render() {
    const { location } = this.props
    return (
      <div>
        <NavBar title={`${location.state.type}分组`} goBack />
      </div>
    )
  }
}

export default ModifyGroup
