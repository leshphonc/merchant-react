import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, ItemBottom } from './styled'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => {
      return (
        <ListItem key={index}>
          <ItemTop>
            <img className="avatar" src={item.img} alt="" />
            <div className="top-content">
              <div className="content-left">
                <div>编号：{item.id}</div>
                <div>电话号码：{item.tel}</div>
                <div>性别：{item.sex}</div>
              </div>
              <div className="content-right">
                <div>昵称：{item.name}</div>
                <div className="hide">hide</div>
                <div>注册时间：{item.registerTime}</div>
              </div>
              <div className="content-right" />
            </div>
          </ItemTop>
          {props.bottom ? (
            <ItemBottom>
              <div>关注时间：{item.focus}</div>
              <WhiteSpace />
              <div>最后登录：{item.lasted}</div>
              <WhiteSpace />
              <div>获取渠道：{item.type}</div>
            </ItemBottom>
          ) : null}
        </ListItem>
      )
    })
  return <React.Fragment>{mapList()}</React.Fragment>
}
