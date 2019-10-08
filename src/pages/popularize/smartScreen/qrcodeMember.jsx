import React from 'react'
import NavBar from '@/common/NavBar'
import {
    WhiteSpace, WingBlank, Card, Flex
  } from 'antd-mobile'
import { CustomTag } from '@/styled';
import { inject, observer } from 'mobx-react'



@inject('smartScreen')
@observer
class QrCodeMember extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
      const { smartScreen, match } = this.props
      const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
      
      console.log(match.params.id)
      const mer_id = userInfo ? userInfo.mer_id : ''
      smartScreen.fetchScanMember({
        Imax_id: null,
        mer_id,
        Store_id: null
      })
    }

    mapList = () => {
      const { smartScreen } = this.props
      const { scanMemberList } = smartScreen
      return scanMemberList.map(item => (
        <React.Fragment key={item.uid}>
          <Card>
            <Card.Header
              title= {
                <span style={{ width: 200 }}
                className="ellipsis"
                >
                  {item.nickname}
                </span>
              }
              thumb= {item.header}
            />
            <Card.Body>
              <Flex>
                  <CustomTag style={{ marginRight: 5 }}>扫码时间: {item.add_time} </CustomTag>
              </Flex>
              <Flex>
                  <CustomTag style={{ marginRight: 5 }}>手机号码: {item.phone} </CustomTag>
              </Flex>
            </Card.Body>
          </Card>
          <WhiteSpace />
        </React.Fragment>
      ))
    }

    render(){
        return(
            <React.Fragment>
                <NavBar
                  title="扫码人数"
                  goBack
                />
                <WhiteSpace />
                <WingBlank size="sm">{this.mapList()}</WingBlank>
            </React.Fragment>
        )
    }
        
    
}

export default QrCodeMember