import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Checkbox } from 'antd-mobile'

const { CheckboxItem } = Checkbox
class ServiceItemsSelectSingle extends React.Component {
  componentDidMount() {}

  mapList = () => (
    <>
      <CheckboxItem key="1" defaultChecked>
        项目1
      </CheckboxItem>
      <CheckboxItem key="2" defaultChecked>
        项目2
      </CheckboxItem>
    </>
  )

  render() {
    return (
      <div>
        <NavBar title="套餐内包含项目" goBack />
        <WhiteSpace />
        <List>{this.mapList()}</List>
      </div>
    )
  }
}

export default ServiceItemsSelectSingle
