import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import moment from 'moment'
import { ListItem, ItemTop, ItemBottom } from './styled'

export default props => {
  const mapList = () => props.list.map(item => (
    <ListItem key={item.id}>
      <ItemTop>
        <img className="avatar" src={item.avatar} alt="" />
        <div className="top-content">
          <div className="content-left">
            <div>编号：{item.id}</div>
            <div>电话号码：{item.mobile || '暂无'}</div>
            <div>性别：{item.gender === '1' ? '男' : '女'}</div>
          </div>
          <div className="content-right">
            <div>昵称：{item.nickname}</div>
            <div className="hide">hide</div>
            <div>注册时间：{moment(item.register_time * 1000).format('YYYY-MM-DD')}</div>
          </div>
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
  ))
  return <React.Fragment>{mapList()}</React.Fragment>
}
