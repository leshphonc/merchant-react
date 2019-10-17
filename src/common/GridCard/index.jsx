import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'antd-mobile'
import { Title, LinkBox } from './styled'

export default props => {
  const { data, col, imgSize, style } = props
  const { title } = data
  const result = JSON.parse(JSON.stringify(data.list))
  const index = result.findIndex(item => item.name === '红包推广' && process.env.CUR !== 'cs')
  if (index !== -1) {
    result.splice(index, 1)
  }
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
    if (item.name === '红包推广') {
      if (process.env.CUR === 'cs') {
        return (
          <LinkBox style={style}>
            <Link to={item.path} style={{ display: 'block' }}>
              <img src={item.enable} alt="" style={{ width: imgSize }} />
              <div>{item.name}</div>
            </Link>
          </LinkBox>
        )
      }
      return null
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
      <Grid data={result} columnNum={col} renderItem={mapGrid} hasLine={false} square={false} />
    </React.Fragment>
  )
}
