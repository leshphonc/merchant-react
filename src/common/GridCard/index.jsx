import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'antd-mobile'
import { Title, LinkBox } from './styled'

export default props => {
  const {
    data, col, imgSize, style,
  } = props
  const { title } = data
  const mapGrid = item => {
    if (item.path === 'http://cs.7youke.com/wap.php?g=Wap&c=Wapactivity&a=activity_list') {
      return (
        <LinkBox style={style}>
          <a href={item.path} style={{ display: 'block' }}>
            <img src={item.enable} alt="" style={{ width: imgSize }} />
            <div>{item.name}</div>
          </a>
        </LinkBox>
      )
    }
    return (
      <LinkBox style={style}>
        <Link to={item.path} style={{ display: 'block' }}>
          <img src={item.enable} alt="" style={{ width: imgSize }} />
          <div>{item.name}</div>
        </Link>
      </LinkBox>
    )
  }
  return (
    <React.Fragment>
      {title ? <Title>{title}</Title> : ''}
      <Grid data={data.list} columnNum={col} renderItem={mapGrid} hasLine={false} square={false} />
    </React.Fragment>
  )
}
