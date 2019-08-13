import React from 'react'
import NavBar from '@/common/NavBar'
import { SearchBar, List, WhiteSpace } from 'antd-mobile'
import CardList from './components/Group'
import { Groups } from '@/config/list'

const { Item } = List
class Group extends React.Component {
  state = {}

  render() {
    const { history } = this.props
    return (
      <React.Fragment>
        <NavBar title="团购商品管理" goBack />
        <SearchBar placeholder="商品名称" maxLength={8} />
        <CardList list={Groups} />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
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
            <Item
              style={{ paddingLeft: '0', background: '#ffb000' }}
              onClick={() => {
                history.push({
                  pathname: '/management/commodity/groupMealAdd',
                })
              }}
            >
              <i className="iconfont" style={{ marginRight: '6px' }}>
                &#xe61e;
              </i>
              添加套餐
            </Item>
            <Item
              style={{ paddingLeft: '0', background: '#ffb000' }}
              onClick={() => {
                history.push({
                  pathname: '/management/commodity/groupAdd',
                })
              }}
            >
              <i className="iconfont" style={{ marginRight: '6px' }}>
                &#xe61e;
              </i>
              添加商品
            </Item>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default Group
