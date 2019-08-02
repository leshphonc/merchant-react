import React from 'react'
import NavBar from '@/common/NavBar'
import CardList from './components/Generalize'
import { GeneralizeList } from '@/config/list'

export default () => {
  // const [menu, setMenu] = React.useState(false)
  return (
    <React.Fragment>
      <NavBar
        title="店员列表"
        goBack
      />
      <CardList list={GeneralizeList} />
    </React.Fragment>
  )
}
