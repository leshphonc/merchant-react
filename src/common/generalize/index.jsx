import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem key={index}>
          <ItemTop style={{ paddingBottom: '10px', borderBottom: '1px solid #aaa' }}>
            {item.img ? <img src={item.img} alt="" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>{item.title}</div>
              <WhiteSpace />
              <div className="top-features" style={{ display: 'block', fontSize: '14px', marginTop: '5px' }}>
                推广佣金: {item.gener_money}
              </div>
              <div className="top-features" style={{ display: 'block', fontSize: '14px' }}>
                销售佣金: {item.market_money}
              </div>
            </TopContent>
          </ItemTop>
          <TopContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div className="top-tags">
              <Link to="/popularize/shopAssistant/scanList">扫码人数</Link>
            </div>
            <div className="top-tags">
              <Link to="/popularize/shopAssistant/fansList">绑粉人数</Link>
            </div>
            <div className="top-tags">
              <Link to="/popularize/shopAssistant/saleList">购买人数</Link>
            </div>
          </TopContent>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  return (
    <React.Fragment>
      <WhiteSpace />
      <WingBlank size="sm">{mapList()}</WingBlank>
      <WhiteSpace />
    </React.Fragment>
  )
}
