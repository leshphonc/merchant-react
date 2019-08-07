import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop } from '@/styled'

@inject('member')
@observer
class CardGroupUsers extends React.Component {
  mapList = () => (
    <ListItem>
      <ItemTop>123</ItemTop>
    </ListItem>
  )

  render() {
    return (
      <React.Fragment>
        <NavBar title="分组用户" goBack />
        <WhiteSpace />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default CardGroupUsers
