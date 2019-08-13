import React from 'react'
import NavBar from '@/common/NavBar'
import { SearchBar, List } from 'antd-mobile'
import { Link } from 'react-router-dom'
import CardList from './components/Reserve'
import { Reserve } from '@/config/list'

const { Item } = List
export default () => (
  <React.Fragment>
    <NavBar title="预约商品管理" goBack />
    <SearchBar placeholder="商品名称" maxLength={8} />
    <CardList list={Reserve} />
    <List>
      <div
        style={{
          fontWeight: 'bold',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          position: 'fixed',
          bottom: '0',
          background: '#ffb000',
        }}
      >
        <Link to="/management/commodity/reserveAdd">
          <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
            <i className="iconfont" style={{ marginRight: '6px' }}>
                &#xe61e;
            </i>
              添加预约
          </Item>
        </Link>
      </div>
    </List>
  </React.Fragment>
)
