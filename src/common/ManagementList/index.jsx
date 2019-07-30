import React from 'react'
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
              <div className="top-title">{item.title}</div>
              <WhiteSpace />
              {item.day.map((val, index) => (
                <div key={index} className="top-subtitle">
                  {val}
                </div>
              ))}

              <WhiteSpace />
              <div className="top-features">
                <i className="iconfont">&#xe6fd;</i>
                商品管理
              </div>
              <div className="top-features">
                <i className="iconfont">&#xe621;</i>
                删除
              </div>
              <div className="top-features">
                <i className="iconfont">&#xe645;</i>
                编辑
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
