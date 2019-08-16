import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import CardList from './components/Manager'
import { ShopManager } from '@/config/list'

class Group extends React.Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <NavBar
          title="店员管理"
          goBack
          right={
            <Link
              to={{
                pathname: '/management/shopManager/shopAdd',
              }}
              style={{ color: '#fff' }}
            >
              添加
            </Link>
          }
        />
        <CardList list={ShopManager} />
      </React.Fragment>
    )
  }
}
export default Group
