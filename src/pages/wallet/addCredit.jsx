import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, InputItem, Button, Checkbox, Toast,
} from 'antd-mobile'
import utils from '@/utils'

@inject('wallet', 'login')
@observer
class AddCredit extends React.Component {
  state = {
    money: '',
  }

  componentDidMount() {
    const { wallet } = this.props
    const code = utils.getUrlParam('code')
    console.log(code)
    if (!code) {
      wallet.getWxCode()
    }
  }

  createOrder = async () => {
    const { wallet } = this.props
    const { money } = this.state
    await wallet.createOrder(money)
    const { wxConfig } = wallet
    // window.wx.chooseWXPay({
    //   timestamp: wxConfig.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //   nonceStr: wxConfig.nonceStr, // 支付签名随机串，不长于 32 位
    //   package: wxConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //   signType: wxConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //   paySign: wxConfig.paySign, // 支付签名
    //   success(res) {
    //     Toast.success(res)
    //     // 支付成功后的回调函数
    //   },
    //   error(res) {
    //     Toast.fail(res)
    //   },
    // })
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: wxConfig.appId, // 公众号名称，由商户传入
        timeStamp: wxConfig.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: wxConfig.nonceStr, // 随机串
        package: wxConfig.package,
        signType: wxConfig.signType, // 微信签名方式：
        paySign: wxConfig.paySign, // 微信签名
      },
      res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          Toast.success('支付成功')
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
      },
    )
  }

  render() {
    const { money } = this.state
    return (
      <React.Fragment>
        <NavBar title="充值" goBack="/wallet" />
        <List renderHeader="充值方式">
          <List.Item thumb={require('@/assets/image/addCredit.jpeg')} extra={<Checkbox checked />}>
            使用微信支付
          </List.Item>
        </List>
        <List renderHeader="充值金额">
          <InputItem
            placeholder="请输入充值的金额"
            value={money}
            labelNumber={2}
            onChange={val => this.setState({
              money: val,
            })
            }
          >
            ¥
          </InputItem>
        </List>
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.createOrder}
        >
          充值
        </Button>
      </React.Fragment>
    )
  }
}

export default AddCredit