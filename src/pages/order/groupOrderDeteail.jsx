import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  Flex, Card, Picker, Button, Toast, InputItem,
} from 'antd-mobile'
// import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const styleSpan = {
  spaner: {
    display: 'inline-block',
    width: '50%',
  },
  flexFont: {
    fontSize: '14',
  },
  topDis: {
    marginTop: '5px',
  },
  spanLeft: {
    display: 'inline-block',
    width: '30%',
  },
  spanRight: {
    display: 'inline-block',
    width: '70%',
    textAlign: 'right',
  },
  payLeft: {
    display: 'inline-block',
    width: '50%',
  },
  payRight: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'right',
  },
  passLeft: {
    display: 'inline-block',
    width: '65%',
  },
  passRight: {
    display: 'inline-block',
    width: '35%',
  },
}

@inject('order')
@observer
class GroupOrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: [],
      user: [],
      expressList: [],
      distribution: [],
      storeList: [],
      storeId: '',
      storeNmae: '',
      expressId: '',
      expressName: '',
      expressNum: '',
      groupPass: '',
      groupPassArr: [],
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { match, order } = this.props
    order.fetchGroupOrderDetai(match.params.orderId).then(() => {
      const { groupOrderDetail } = order
      const expressList = []
      groupOrderDetail.express_list.forEach(item => {
        expressList.push({
          label: item.name,
          value: item.ids,
        })
      })
      if (groupOrderDetail.storelist.length > 0) {
        const storeList = []
        groupOrderDetail.storelist.forEach(item => {
          storeList.push({
            label: item.name,
            value: item.store_id,
          })
        })
        this.setState({
          storeList,
          storeId: storeList[0].value,
          storeNmae: storeList[0].label,
        })
      }
      if (groupOrderDetail.now_order.pass_array === '1') {
        order.fecthGroupPassArray(match.params.orderId).then(() => {
          const { groupOrderPass } = order
          this.setState({
            groupPassArr: groupOrderPass.pass_array,
          })
        })
      }
      this.setState({
        detail: groupOrderDetail.now_order,
        user: groupOrderDetail.user,
        expressList,
        distribution: groupOrderDetail.distribution,
        expressId: groupOrderDetail.distribution.express_type || expressList[0].value,
        expressName: expressList[groupOrderDetail.distribution.express_type].label,
        expressNum: groupOrderDetail.distribution.express_id,
        groupPass: groupOrderDetail.now_order.group_pass,
      })
    })
  }

  verificBtn = orderId => {
    const { order } = this.props
    window.wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode', 'barCode'],
      success(res) {
        order.verificGroup(orderId, res.resultStr).then(resVer => {
          if (resVer) Toast.success('验证成功', 1, () => window.location.reload())
        })
      },
    })
  }

  groupPassList = passArr => passArr.map((item, index) => (
    <Flex style={styleSpan.topDis} key={index}>
      <div style={styleSpan.passLeft}>核销码:{item.group_pass}</div>
      <div style={styleSpan.passRight}>
        {item.status === '1' ? (
          '已验证'
        ) : (
          <Button
            type="primary"
            size="small"
            style={{ width: '60%', margin: '10px auto 0' }}
            onClick={() => this.verificBtn(this.state.detail.order_id)}
          >
              验证
          </Button>
        )}
      </div>
    </Flex>
  ))

  render() {
    const {
      detail,
      user,
      expressList,
      distribution,
      storeList,
      storeId,
      storeNmae,
      expressId,
      expressName,
      expressNum,
      groupPass,
      groupPassArr,
    } = this.state
    const { order } = this.props
    let statusText = ''
    if (detail.type === '1') {
      statusText = '未消费'
    } else if (detail.type === '2') {
      statusText = '未发货'
    } else if (detail.type === '3') {
      statusText = '已消费'
    } else if (detail.type === '4') {
      statusText = '已发货'
    }
    if (detail.status === 1) {
      statusText += ' 已取消'
    } else if (detail.status === 2) {
      statusText += ' 线下未支付'
    } else if (detail.status === 3) {
      statusText += ' 已付款'
    } else if (detail.status === 4) {
      statusText = ' 待评论'
    } else if (detail.status === 5) {
      statusText += ' 已完成'
    } else if (detail.status === 6) {
      statusText += ' 未付款'
    }
    return (
      <React.Fragment>
        <NavBar title="团购订单" goBack />
        <Card>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="商品信息"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            <Flex>
              <img src={detail.pic} style={{ width: '20%', height: '20vw' }} alt="产品图片" />
              <div style={{ width: '75%', marginLeft: '5%' }}>
                <div>
                  <p style={{ fontSize: 14 }}>{detail.s_name}</p>
                  <p>
                    <span style={styleSpan.spaner}>单价：{detail.price}</span>
                    <span style={styleSpan.spaner}>数量：{detail.num}</span>
                  </p>
                </div>
                <p>
                  <span style={styleSpan.spaner}>总价：{detail.total_money}</span>
                  <span style={styleSpan.spaner}>状态：{statusText}</span>
                </p>
              </div>
            </Flex>
          </Card.Body>
        </Card>
        <Card style={{ marginTop: '10px' }}>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="用户信息"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            <Flex>
              <div style={styleSpan.spanLeft}>用户ID:</div>
              <div style={styleSpan.spanRight}>{user.uid}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.spanLeft}>用户名:</div>
              <div style={styleSpan.spanRight}>{user.nickname}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.spanLeft}>手机号:</div>
              <div style={styleSpan.spanRight}>{user.user_phone}</div>
            </Flex>
          </Card.Body>
        </Card>
        {detail.store_id === '0' && storeList.length > 0 && (
          <Card style={{ marginTop: '10px' }}>
            <Card.Header
              style={{ fontSize: 15, color: '#999' }}
              title="将订单归属于店铺"
            >
            </Card.Header>
            <Card.Body style={{ color: '#666', fontSize: 15, textAlign: 'center' }}>
              <Picker
                data={storeList}
                cols={1}
                value={[storeId]}
                onOk={e => {
                  let index = ''
                  storeList.forEach((item, i) => {
                    if (item.value === e[0]) index = i
                  })
                  this.setState({
                    storeId: e[0],
                    storeNmae: storeList[index].label,
                  })
                }}
              >
                <div style={{ border: '1 solid #ccc' }}>
                  <span>{storeNmae}</span>
                  <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                    &#xe6f0;
                  </i>
                </div>
              </Picker>
              <Button
                type="primary"
                size="small"
                style={{ width: '30%', margin: '10px auto 0' }}
                onClick={() => {
                  order.modifyStore(detail.order_id, storeId).then(res => {
                    if (res) Toast.success('选择成功', 1, () => window.location.reload())
                  })
                }}
              >
                选择
              </Button>
            </Card.Body>
          </Card>
        )}
        {detail.store_id && distribution.adress && (
          <div>
            <Card style={{ marginTop: '10px' }}>
              <Card.Header style={{ fontSize: 15, color: '#999' }} title="配送信息"></Card.Header>
              <Card.Body style={{ color: '#666', fontSize: 15 }}>
                <Flex>
                  <div style={styleSpan.spanLeft}>收件人: {distribution.contact_name}</div>
                  <div style={styleSpan.spanRight}>{distribution.phone}</div>
                </Flex>
                <Flex>
                  <div style={{ marginTop: '10px' }}>收货地址：{distribution.adress}</div>
                </Flex>
              </Card.Body>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <Card.Header style={{ fontSize: 15, color: '#999' }} title="快递信息"></Card.Header>
              <Card.Body style={{ color: '#666', fontSize: 15 }}>
                <Picker
                  data={expressList}
                  cols={1}
                  value={[expressId]}
                  onOk={e => {
                    let index = ''
                    expressList.forEach((item, i) => {
                      if (item.value === e[0]) index = i
                    })
                    this.setState({
                      expressId: e[0],
                      expressName: expressList[index].label,
                    })
                  }}
                >
                  <div style={{ border: '1 solid #ccc' }}>
                    <span>{expressName}</span>
                    <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                      &#xe6f0;
                    </i>
                  </div>
                </Picker>
                <InputItem
                  placeholder="请填写快递单号"
                  defaultValue={expressNum}
                  onChange={e => {
                    this.setState({
                      expressNum: e,
                    })
                  }}
                >
                  快递单号
                </InputItem>
                <Button
                  type="primary"
                  size="small"
                  style={{ width: '30%', margin: '10px auto 0' }}
                  onClick={() => {
                    order
                      .modifyGroupExpress(expressId, expressNum, detail.order_id, detail.store_id)
                      .then(res => {
                        if (res) Toast.success('更改成功', 1, () => window.location.reload())
                      })
                  }}
                >
                  保存
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
        <Card style={{ marginTop: '10px' }}>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="订单信息"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            <Flex>
              <div style={styleSpan.spanLeft}>订单类型:</div>
              <div style={styleSpan.spanRight}>{detail.order_type}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.spanLeft}>订单号:</div>
              <div style={styleSpan.spanRight}>{detail.real_orderid}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.spanLeft}>下单时间:</div>
              <div style={styleSpan.spanRight}>{detail.add_time}</div>
            </Flex>
            {detail.pay_time !== '未支付' && (
              <Flex style={styleSpan.topDis}>
                <div style={styleSpan.spanLeft}>付款时间:</div>
                <div style={styleSpan.spanRight}>{detail.pay_time}</div>
              </Flex>
            )}
            {detail.store_id !== '0'
              && detail.type === 1
              && detail.tuan_type !== 2
              && groupPassArr.length < 1
              && groupPass && (
                <Flex style={styleSpan.topDis}>
                  <div style={styleSpan.passLeft}>核销码:{groupPass}</div>
                  <div style={styleSpan.passRight}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ width: '60%', margin: '10px auto 0' }}
                      onClick={() => {
                        window.wx.scanQRCode({
                          needResult: 1,
                          scanType: ['qrCode', 'barCode'],
                          success(res) {
                            order.verificGroup(detail.order_id, res.resultStr).then(resVer => {
                              if (resVer) Toast.success('验证成功', 1, () => window.location.reload())
                            })
                          },
                        })
                      }}
                    >
                      验证
                    </Button>
                  </div>
                </Flex>
            )}

            {detail.store_id !== '0'
              && detail.type === 1
              && detail.tuan_type !== 2
              && groupPassArr.length > 1
              && this.groupPassList(groupPassArr)}

            {detail.store_id !== '0'
              && detail.type === 1
              && detail.tuan_type !== 2
              && groupPassArr.length > 1 && (
                <Flex style={styleSpan.topDis}>
                  <div style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ width: '50%', margin: '10px auto 0' }}
                      onClick={() => {
                        order.verificGroupAll(detail.order_id, detail.store_id).then(res => {
                          if (res) Toast.success('验证成功', 1, () => window.location.reload())
                        })
                      }}
                    >
                      全部验证
                    </Button>
                  </div>
                </Flex>
            )}
          </Card.Body>
        </Card>
        <Card style={{ marginTop: '10px' }}>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="付款信息"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            <Flex>
              <div style={styleSpan.payLeft}>系统余额支付:</div>
              <div style={styleSpan.payRight}>{detail.balance_pay}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.payLeft}>商家会员卡余额支付:</div>
              <div style={styleSpan.payRight}>{detail.merchant_balance}</div>
            </Flex>
            <Flex style={styleSpan.topDis}>
              <div style={styleSpan.payLeft}>在线支付金额:</div>
              <div style={styleSpan.payRight}>{detail.payment_money}</div>
            </Flex>
          </Card.Body>
        </Card>
        <Card style={{ marginTop: '10px' }}>
          <Card.Header style={{ fontSize: 15, color: '#999' }} title="买家留言"></Card.Header>
          <Card.Body style={{ color: '#666', fontSize: 15 }}>
            <Flex>
              <div>{detail.delivery_comment ? detail.delivery_comment : '暂无'}</div>
            </Flex>
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}
export default GroupOrderDetail
