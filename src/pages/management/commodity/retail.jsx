import React from 'react'
import NavBar from '@/common/NavBar'
import { SearchBar, Picker, List } from 'antd-mobile'
import CardList from './components/Retail'
import { Link } from 'react-router-dom'
import { CateringList } from '@/config/list'


const { Item } = List
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
]
class Retail extends React.Component {
  state = {
    selectValue: '',
  }

  render() {
    const { selectValue } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="零售商品管理"
          goBack
        />
        <List>
          <Picker
            data={seasons}
            cascade={false}
            extra="请选择"
            value={selectValue}
            onChange={v => {
              this.setState({
                selectValue: v,
              })
            }}
          >
            <List.Item arrow="horizontal">全部店铺</List.Item>
          </Picker>
        </List>
        <SearchBar placeholder="商品名称" maxLength={8} />
        <CardList list={CateringList} />
        <List>
          <div style={{ fontWeight: 'bold', width: '100%', display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: '0', background: '#ffb000' }}>
            <Link to="/management/commodity/retailAdd">
              <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
                <i className="iconfont" style={{ marginRight: '6px' }}>&#xe61e;</i>
                添加商品
              </Item>
            </Link>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default Retail
