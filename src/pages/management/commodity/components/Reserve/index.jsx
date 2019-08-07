import React from 'react'
// import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem key={index}>
          <ItemTop>
            {item.img ? <img src={item.img} alt="" /> : null}
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>{item.name}</div>
              <WhiteSpace />
              <div className="top-features" style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}>
                定金: {item.ding_money}
              </div>
              <div className="top-features" style={{ position: 'initial', marginBottom: '10px', display: 'inline-block', background: '#ffb000', padding: '2px', color: '#fff' }}>
                {item.way}
              </div>
              <div className="top-features" style={{ position: 'initial', display: 'block', fontSize: '14px', marginBottom: '10px' }}>
                已预约: {item.reserve}
              </div>
              <div style={{ display: 'inline-block' }}>
                <i className="iconfont" style={{ color: '#ffb000' }}>&#xe645;</i>
                编辑
              </div>
            </TopContent>
          </ItemTop>
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
