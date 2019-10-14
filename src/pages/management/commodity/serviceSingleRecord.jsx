import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import EmptyPage from '@/common/Result/Empty'

@inject('commodity')
@observer
class ServiceSingleRecord extends React.Component {
  componentDidMount() {
    const { commodity, match } = this.props
    commodity.fetchSingleRecord(match.params.id)
  }

  mapList = () => {
    const { commodity } = this.props
    if (!commodity.packageRecordList.length) {
      return <EmptyPage />
    }
    return commodity.packageRecordList.map(item => <div>123</div>)
  }

  render() {
    return (
      <>
        <NavBar title="项目销售记录" />
        {this.mapList()}
      </>
    )
  }
}

export default ServiceSingleRecord
