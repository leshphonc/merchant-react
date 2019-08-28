import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'

@inject('redEnvelop')
@observer
class RedEnvelop extends React.Component {
  componentDidMount() {
    const { redEnvelop } = this.props
    redEnvelop.fetchRedEnvelopList()
  }

  mapList = () => <div>123</div>

  render() {
    return (
      <React.Fragment>
        <NavBar title="红包推广" goBack />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default RedEnvelop
