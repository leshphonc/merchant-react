import React from 'react'
import NavBar from '@/common/NavBar'
import {
    WhiteSpace, WingBlank, Card, Flex
  } from 'antd-mobile'
import { CustomTag } from '@/styled';
import { inject, observer } from 'mobx-react'



@inject('smartScreen')
@observer
class PurchaseNum extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
      const { smartScreen } = this.props
      const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
      const mer_id = userInfo ? userInfo.mer_id : ''
      smartScreen.fetchPurchaseNum({
        Imax_id: null,
        mer_id,
        Store_id: null
      })
     
    }

    mapList = () => {
      const { smartScreen } = this.props
      const { purchaseNumList } = smartScreen
      return purchaseNumList.map(item => (
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
                  <CustomTag style={{ marginRight: 5 }}>手机号码: {item.phone} </CustomTag>
              </Flex>
              <Flex>
                  <CustomTag style={{ marginRight: 5 }}>购买时间: {item.add_time} </CustomTag>
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
                  title="购买数量"
                  goBack
                />
                <WhiteSpace />
                <WingBlank size="sm">{this.mapList()}</WingBlank>
            </React.Fragment>
        )
    }
        
    
}

export default PurchaseNum