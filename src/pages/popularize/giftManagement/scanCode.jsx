import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Button, Toast, Flex, Card,
} from 'antd-mobile'
import { createForm } from 'rc-form'
// import Utils from '@/utils'

@createForm()
@inject('giftManagement')
@observer
class ScanCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: [],
      giftPass: '',
      giftPassArr: [],
    }
  }

  componentDidMount() {
    const { giftManagement, match } = this.props
    console.log(this.props)
    // giftManagement.fetchExpressList(match.params.orderId)
    giftManagement.fetchGiftOrderDetail(match.params.orderId).then(() => {
      const { giftOrderDetail } = giftManagement
      if (giftOrderDetail.pass_array === '1') {
        giftManagement.fecthGiftPassArray(match.params.orderId).then(() => {
          const { giftOrderPass } = giftManagement
          console.log(giftOrderPass)
          this.setState({
            giftPassArr: giftOrderPass.pass_array,
          })
        })
      }
      this.setState({
        detail: giftOrderDetail,
        giftPass: giftOrderDetail.gift_pass,
      })
    })
  }

  verificBtn = orderId => {
    const { giftManagement, history } = this.props
    window.wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode', 'barCode'],
      success(res) {
        giftManagement.checkCouponCode(orderId, res.resultStr).then(res => {
          if (res) Toast.success('验证成功', 1, () => history.goBack())
        })
      },
    })
  }

  giftPassList = passArr => passArr.map((item, index) => (
    <Flex key={index}>
      <Flex.Item style={{ flex: 'none', width: '60%' }}>
        <div>核销码:{item.gift_pass}</div>
      </Flex.Item>
      <Flex.Item style={{ flex: 'none' }}>
        <div>
          {item.status === '1' ? (
            '已验证'
          ) : (
            <Button
              type="primary"
              size="small"
              style={{ width: '60%', margin: '0px 40px 0' }}
              onClick={() => this.verificBtn(this.state.detail.order_id)}
            >
                验证
            </Button>
          )}
        </div>
      </Flex.Item>
    </Flex>
  ))

  render() {
    const { giftManagement, history } = this.props
    const { giftPass, giftPassArr, detail } = this.state
    return (
      <React.Fragment>
        <NavBar title="审核详情" goBack />
        <Card style={{ marginTop: '10px' }}>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="核销信息"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            {detail.store_id !== '0' && giftPassArr.length < 1 && giftPass && (
              <Flex>
                <Flex.Item style={{ flex: 'none', width: '60%' }}>
                  <div style={{ marginTop: '6px' }}>核销码:{giftPass}</div>
                </Flex.Item>
                <Flex.Item style={{ flex: 'none' }}>
                  <div>
                    <Button
                      type="primary"
                      size="small"
                      style={{ width: '60%', margin: '0px 40px 0' }}
                      onClick={() => {
                        window.wx.scanQRCode({
                          needResult: 1,
                          scanType: ['qrCode', 'barCode'],
                          success(res) {
                            giftManagement
                              .checkCouponCode(detail.order_id, res.resultStr)
                              .then(res => {
                                if (res) Toast.success('验证成功', 1, () => history.goBack())
                              })
                          },
                        })
                      }}
                    >
                      验证
                    </Button>
                  </div>
                </Flex.Item>
              </Flex>
            )}
            {detail.store_id !== '0' && giftPassArr.length > 1 && this.giftPassList(giftPassArr)}
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}
export default ScanCode
