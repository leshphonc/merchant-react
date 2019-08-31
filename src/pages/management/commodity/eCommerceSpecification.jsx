import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace } from 'antd-mobile'
import Specification from '@/common/Specification'

class ECommerceSpecification extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar title="规格属性设置" goBack />
        <WhiteSpace />
        <Specification />
      </React.Fragment>
    )
  }
}

export default ECommerceSpecification
