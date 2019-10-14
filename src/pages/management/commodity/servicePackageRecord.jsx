import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import EmptyPage from '@/common/Result/Empty'

@inject('commodity')
@observer
class ServicePackageRecord extends React.Component {
  componentDidMount() {
    const { commodity, match } = this.props
    commodity.fetchPackageRecord(match.params.id)
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
        <NavBar title="套餐销售记录" goBack />
        {this.mapList()}
      </>
    )
  }
}

export default ServicePackageRecord
