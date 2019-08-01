import React from 'react'
import { WhiteSpace, Button } from 'antd-mobile'
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
                <div>id：{item.id}</div>
                <div>使用类别：{item.tel}</div>
                <div>使用系统：{item.sex}</div>
              </div>
              <div className="content-right">
                <div>名称：{item.name}</div>
                <div>使用分类：{item.registerTime}</div>
                <div className="hide">hide</div>
              </div>
              <div className="content-right" />
            </div>
          </ItemTop>
          {props.bottom ? (
            <ItemBottom>
              <div>总数：{item.total}</div>
              <WhiteSpace />
              <div>起始时间：{item.startTime} - {item.endTime}</div>
              <WhiteSpace />
              <div>满减条件：{item.condition}</div>
              <WhiteSpace />
              <div className="bottom-feature">
                <Button type="primary" size="small">
                  已领取{item.used}张
                </Button>
                <Button type="primary" size="small">
                  {item.enable ? '禁用' : '启用'}
                </Button>
              </div>
            </ItemBottom>
          ) : null}
        </ListItem>
      )
    })
  return <React.Fragment>{mapList()}</React.Fragment>
}
