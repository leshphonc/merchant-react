import React from 'react'
// import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { List } from '@/styled'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <List key={index} className="list">
          <span className="pic" style={{ width: '16vw' }}>{item.img ? <img src={item.img} alt="" /> : null}</span>
          <span style={{ width: '20vw' }}>dfvd</span>
          <span style={{ width: '28vw' }}>2019-01-06</span>
          <span style={{ width: '25vw' }}>查看</span>
        </List>
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
