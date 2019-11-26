import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WingBlank,
  WhiteSpace,
  Card,
  PullToRefresh,
  Flex,
  Button,
  Modal,
  Toast,
} from 'antd-mobile'
import Utils from '@/utils'
import moment from 'moment'

const { prompt } = Modal

@inject('member', 'login')
@observer
class CouponCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { member, match, login } = this.props
    login.wxConfigFun()
    // const { couponCheckList } = member
    const { height } = this.state
    member.fetchCouponCheckList(match.params.id)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
    window['couponCheckCallback'] = code => {
      member.checkCouponCode(null, code, false).then(res2 => {
        if (res2) Toast.success('核销成功')
      })
    }
  }

  mapList = () => {
    const { member } = this.props
    const { couponCheckList } = member
    return couponCheckList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            thumb={item.avatar}
            thumbStyle={{ width: 50, height: 50 }}
            title={item.name}
          />
          <Card.Body style={{ fontSize: 11 }}>
            <Flex>
              <Flex.Item>
                <div>用户昵称：{item.nickname || '暂无'}</div>
                <WhiteSpace />
                <div>用户手机：{item.phone || '暂无'}</div>
                <WhiteSpace />
                <div>
                  领取时间：
                  {moment(item.receive_time * 1000).format('YYYY-MM-DD') ||
                    '暂无'}
                </div>
              </Flex.Item>
              <Flex.Item>
                <div>id：{item.id || '暂无'}</div>
                <WhiteSpace />
                <div>领取数量：{item.num || '暂无'}</div>
                <WhiteSpace />
                <div style={{ visibility: 'hidden' }} />
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer
            style={{ alignItems: 'center' }}
            content={item.is_use === '0' ? '未使用' : '已使用'}
            extra={
              item.is_use === '0' ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    prompt('核销', '输入核销码进行核销', [
                      { text: '取消' },
                      {
                        text: '确定',
                        onPress: code =>
                          member
                            .checkCouponCode(item.id, code, true)
                            .then(res => {
                              if (res) Toast.success('核销成功')
                            }),
                      },
                    ])
                  }}
                >
                  核销
                </Button>
              ) : null
            }
          />
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { member, match } = this.props
    this.setState({ refreshing: true })
    await member.fetchCouponCheckList(match.params.id)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  scanQRCode = () => {
    const { member, login } = this.props
    if (
      navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !==
        -1 ||
      navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1
    ) {
      const json = { callback: 'couponCheckCallback', action: 'ScanQRCode' }
      window._invokeAndroid(json)
    } else {
      window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success(res) {
          const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          const code = Utils.getUrlParam('code', result)
          if (code) {
            member.checkCouponCode(null, code, false).then(res2 => {
              if (res2) Toast.success('核销成功')
            })
          } else {
            Toast.info('未识别到code，无法核销')
          }
        },
        fail() {
          login.wxConfigFun().then(res => {
            if (res) {
              this.scanQRCode()
            }
          })
        },
      })
    }
  }

  render() {
    const { height, refreshing } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="优惠券领用列表"
          goBack
          right={
            <Button
              type="ghost"
              style={{ color: '#fff', border: '1px solid #fff' }}
              size="small"
              onClick={() => {
                this.scanQRCode()
              }}
            >
              扫码核销
            </Button>
          }
        />
        <PullToRefresh
          ref={this.refresh}
          refreshing={refreshing}
          style={{
            height,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.loadMore}
        >
          <WhiteSpace />
          <WingBlank>{this.mapList()}</WingBlank>
        </PullToRefresh>
      </React.Fragment>
    )
  }
}

export default CouponCheck
