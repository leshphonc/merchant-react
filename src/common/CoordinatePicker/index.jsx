import React from 'react'
import BMap from 'BMap'
import { withRouter } from 'react-router-dom'
import { SearchBar, Button } from 'antd-mobile'

/**
 * @author cc
 * @param lng
 * @param lat
 * @param address
 * @callback callback
 * @description 传入lng和lat用来初始化地图，点击确定将调用callback将lng、lat、address作为参数传出
 */

@withRouter
class CoordinatePicker extends React.Component {
  state = {
    map: null,
    lng: 0,
    lat: 0,
    address: '',
    hidePoint: false,
    mapHeight: 0,
  }

  componentDidMount() {
    const { location } = this.props
    const mapHeight = document.documentElement.clientHeight - 145
    this.setState(
      {
        mapHeight,
        lng: location.state.lng,
        lat: location.state.lat,
        address: location.state.address,
      },
      () => {
        this.initMap()
      },
    )
  }

  componentWillUnmount() {
    this.setState({
      map: null,
    })
  }

  initMap = () => {
    const { map, lng, lat } = this.state
    if (map) return
    setTimeout(() => {
      const bmap = new BMap.Map('container')
      this.setState({
        map: bmap,
      })
      bmap.centerAndZoom(new BMap.Point(lng, lat), 17)
      bmap.enableScrollWheelZoom()

      const geolocation = new BMap.Geolocation()
      const geoc = new BMap.Geocoder()
      geolocation.getCurrentPosition(
        r => {
          if (geolocation.getStatus() === 0) {
            bmap.panTo(r.point)
            this.setState({
              lng: r.point.lng,
              lat: r.point.lat,
            })
            geoc.getLocation(r.point, rs => {
              const addComp = rs.addressComponents
              this.setState({
                address:
                  addComp.province
                  + addComp.city
                  + addComp.district
                  + addComp.street
                  + addComp.streetNumber,
              })
            })
          } else {
            alert(`failed ${geolocation.getStatus()}`)
          }
        },
        { enableHighAccuracy: true },
      )
      bmap.addEventListener('dragend', () => {
        const point = bmap.getCenter()
        this.setState({
          lng: point.lng,
          lat: point.lat,
        })
        geoc.getLocation(point, rs => {
          const addComp = rs.addressComponents
          this.setState({
            address:
              addComp.province
              + addComp.city
              + addComp.district
              + addComp.street
              + addComp.streetNumber,
          })
        })
      })
      return true
    }, 100)
  }

  searchAddress = () => {
    const { map, address } = this.state
    if (address !== '') {
      map.centerAndZoom(address, 17) // 用城市名设置地图中心点
    }
  }

  hidePoint = () => {
    this.setState({
      hidePoint: true,
    })
  }

  showPoint = () => {
    this.setState({
      hidePoint: false,
    })
  }

  render() {
    const { callback } = this.props
    const {
      mapHeight, hidePoint, lng, lat, address,
    } = this.state
    return (
      <React.Fragment>
        <SearchBar
          placeholder="输入地址进行搜索"
          value={address}
          onChange={val => this.setState({ address: val })}
          onSubmit={this.searchAddress}
        />
        <div style={{ position: 'relative' }}>
          <div
            id="container"
            style={{
              width: '100%',
              height: mapHeight,
            }}
          />
          {!hidePoint ? (
            <i
              className="iconfont"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                color: '#ffb000',
                fontSize: 24,
                transform: 'translate(-12px, -27px)',
              }}
            >
              &#xe61f;
            </i>
          ) : null}
        </div>
        <Button type="primary" onClick={() => callback(lng, lat, address)}>
          确定
        </Button>
      </React.Fragment>
    )
  }
}

export default CoordinatePicker
