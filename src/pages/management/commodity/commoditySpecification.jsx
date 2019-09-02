import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace } from 'antd-mobile'
import Specification from '@/common/Specification'

class ECommerceSpecification extends React.Component {
  render() {
    const { match } = this.props
    return (
      <React.Fragment>
        <NavBar title="规格属性设置" goBack />
        <WhiteSpace />
        <Specification type={match.params.type} />
      </React.Fragment>
    )
  }
}

export default ECommerceSpecification
