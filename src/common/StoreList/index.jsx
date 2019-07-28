import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/global'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem key={index}>
          <ItemTop>
            {item.img ? <img src={item.img} alt="" /> : null}
            <TopContent>
              <div className="top-title">{item.title}</div>
              <WhiteSpace />
              <div className="top-tag">
                <Link to="/management/storefront/managementCategory">分类管理</Link>
              </div>
              <div className="top-tag">
                <Link to="/management/storefront/managementCategory">店铺优惠</Link>
              </div>
              <WhiteSpace />
              <div className="top-features">
                <i className="iconfont">&#xe645;</i>
                编辑店铺
              </div>
              <div className="top-features">
                <i className="iconfont">&#xe61e;</i>
                添加分类
              </div>
              {item.extra ? (
                <div className="top-extra">{item.extra}</div>
              ) : null}
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
