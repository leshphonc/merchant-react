import React from 'react'
import NavBar from '@/common/NavBar'
import { Tabs, Badge, Menu, Icon } from 'antd-mobile'
import { MenuMask } from '@/styled'
import CardList from '@/common/StoreList'
import { StoreList } from '@/config/list'

export default () => {
  const [menu, setMenu] = React.useState(false)
  const tabs = [
    { title: <Badge text="3">全部</Badge> },
    { title: <Badge text="20">正常</Badge> },
    { title: <Badge dot>待审核</Badge> },
  ]
  const menuEl = (
    <Menu
      className="menu-position "
      data={[
        {
          value: '1',
          label: '网店',
        },
        {
          value: '2',
          label: '餐饮',
        },
      ]}
      value={['1']}
      level={1}
      onChange={() => setMenu(false)}
    />
  )
  return (
    <div>
      <NavBar
        title="店铺管理"
        goBack
        right={<Icon onClick={() => setMenu(!menu)} type="ellipsis" />}
      />
      <Tabs tabs={tabs} initialPage={1}>
        <CardList list={StoreList} />
        <CardList list={StoreList} />
        <CardList list={StoreList} />
      </Tabs>
      {menu ? menuEl : null}
      {menu ? <MenuMask onClick={() => setMenu(false)} /> : null}
    </div>
  )
}
