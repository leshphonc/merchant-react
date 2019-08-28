import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'

export default props => {
  const mapList = () => props.list.map((item, index) => (
    <React.Fragment key={index}>
      <ListItem key={index}>
        <ItemTop>
          {item.img ? <img src={item.img} alt="" /> : null}
          <TopContent>
            <div className="top-title" style={{ fontSize: '15px' }}>
              {item.name}
            </div>
            <WhiteSpace />
            <div
              className="top-features"
              style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
            >
                售价: {item.price}
            </div>
            <WhiteSpace />
            <div
              className="top-features"
              style={{ position: 'initial', fontSize: '14px', color: '#fb6a41' }}
            >
                状态: {item.state}
            </div>
            <div className="top-features" style={{ position: 'initial' }}>
                已售出: {item.sold}
            </div>
            <WhiteSpace />
            <div style={{ display: 'inline-block' }}>
              <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe645;
              </i>
                下架
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe621;
              </i>
                删除
            </div>
            <Link
              to={{
                pathname: '/management/commodity/eCommerceAdd',
              }}
              style={{ color: '#333' }}
            >
              <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                <i className="iconfont" style={{ color: '#ffb000' }}>
                    &#xe645;
                </i>
                  编辑
              </div>
            </Link>
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
