import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
// import CardList from './components/Generalize'
// import { GeneralizeList } from '@/config/list'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'

@inject('shopAssistant')
@observer
class ShopAssistant extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { shopAssistant, location } = this.props
    console.log(location)
    shopAssistant.fetchStaffList(location.state.id)
  }

  mapList = () => {
    const { shopAssistant } = this.props
    const { staffList } = shopAssistant
    return staffList.map(item => (
      <ListItem key={item.id}>
        <ItemTop style={{ paddingBottom: '10px', borderBottom: '1px solid #aaa' }}>
          {item.pic ? (
            <img src={item.pic} alt="" />
          ) : (
            <img src="../../../assets/image/avatar.jpeg" alt="" />
          )}
          <TopContent>
            <div className="top-title" style={{ fontSize: '15px' }}>
              {item.name}
            </div>
            <WhiteSpace />
            <div
              className="top-features"
              style={{ position: 'initial', fontSize: '14px', margin: '14px 0' }}
            >
              推广佣金: {item.sale_money || '0'}
            </div>
            <WhiteSpace />
            <div
              className="top-features"
              style={{ position: 'initial', display: 'block', fontSize: '14px' }}
            >
              销售佣金: {item.spread_money || '0'}
            </div>
          </TopContent>
        </ItemTop>
        <TopContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div className="top-tags">
            <Link
              to={{
                pathname: '/popularize/shopAssistant/scanList',
                state: {
                  id: item.id,
                },
              }}
            >
              扫码人数
            </Link>
          </div>
          <div className="top-tags">
            <Link
              to={{
                pathname: '/popularize/shopAssistant/fansList',
                state: {
                  id: item.id,
                },
              }}
            >
              绑粉人数
            </Link>
          </div>
          <div className="top-tags">
            <Link
              to={{
                pathname: '/popularize/shopAssistant/saleList',
                state: {
                  id: item.id,
                },
              }}
            >
              购买人数
            </Link>
          </div>
        </TopContent>
      </ListItem>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="店员列表" goBack />
        {/* <CardList list={GeneralizeList} /> */}
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
        <WhiteSpace />
      </React.Fragment>
    )
  }
}
export default ShopAssistant
