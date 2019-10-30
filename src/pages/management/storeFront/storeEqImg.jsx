import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'

@inject('storeFront')
@observer
class StoreEqImg extends React.Component {
  componentDidMount() {
    // this.getStationFlag()
  }
  render() {
    const { match } = this.props
    console.log(match.params)
    let url ="/Appapi.php?g=Appapi&c=Imax2&a=geth5Qrcode&url="+encodeURIComponent(window.location.origin+"/wap.php?g=Wap&c=UserOrder&a=userOrderSheet&store_id="+match.params.storeId+"&s_id="+match.params.sId)
    return (
      <>
        <NavBar title="二维码" goBack />
        <img src={url} alt="" style={{width:'50vw',height:'50vw', position:'absolute',left:'25vw',top:'25vw'}}/>
      </>
    )
  }
}

export default StoreEqImg
