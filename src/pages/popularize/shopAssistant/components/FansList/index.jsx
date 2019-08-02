import React from 'react'
// import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { List } from '@/styled'

export default props => {
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <div style={{ background: '#fff' }}>
          <List key={index} className="list" style={{ borderBottom: '1px solid #aaa', padding: '4px 20px' }}>
            <span className="pic" style={{ width: '16vw' }}>{item.img ? <img src={item.img} alt="" /> : null}</span>
            <span style={{ width: '20vw' }}>{item.name}</span>
            <span style={{ width: '28vw' }}>{item.fans_time}</span>
          </List>
        </div>
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
