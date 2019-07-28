import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ManagementList from '@/common/ManagementList'
import { CategoryList } from '@/config/list'

export default () => {
  return (
    <React.Fragment>
      <NavBar
        title="商品分类"
        goBack
        right={
          <Link
            to={{
              pathname: '/management/storefront/categoryPanel',
              state: '添加',
            }}
            style={{ color: '#fff' }}
          >
            添加分类
          </Link>
        }
      />
      <ManagementList list={CategoryList} />
    </React.Fragment>
  )
}
