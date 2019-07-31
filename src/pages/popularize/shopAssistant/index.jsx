import React from 'react'
import NavBar from '@/common/NavBar'
// import { Menu, Icon } from 'antd-mobile'
// import { MenuMask } from '@/global'
import { AssistantList } from '@/config/list'
import CardList from '@/common/generalize'

export default () => {
  return (
    <div>
      <NavBar
        title="推广统计"
        goBack
      />
      <CardList list={AssistantList} />
    </div>
  )
}
