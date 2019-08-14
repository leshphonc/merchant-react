import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, List, Picker, InputItem, TextareaItem, Button, Toast,
} from 'antd-mobile'
import UploadInvoice from './components/UploadInvoice'
import {
  CustomizeList, ListTitle, ListContent, PrimaryTag, MenuMask,
} from '@/styled'

const Receipt = [
  {
    label: '微信钱包',
    value: '3',
  },
  {
    label: '对公账户',
    value: '0',
  },
]

@inject('wallet')
@observer
class WithDraw extends React.Component {
  state = {
    receiptLabel: '微信钱包',
    receiptValue: '3',
    accountLabel: '请选择提款微信账号',
    accountValue: '',
    name: '',
    amount: '',
    remark: '',
    cardUserName: '',
    cardNumber: '',
    bank: '',
    invoice: '',
    accountOption: [],
    showUpload: false,
  }

  componentDidMount() {
    const { wallet } = this.props
    wallet.fetchWithDrawInfo().then(() => {
      const { withDrawInfo } = wallet
      if (!withDrawInfo.bind_wxlist) return
      const option = withDrawInfo.bind_wxlist.map(item => ({
        label: item.nickname,
        value: item.openid,
      }))
      this.setState({
        accountOption: option,
      })
    })
  }

  changeReceipt = value => {
    const result = Receipt.find(item => item.value === value[0])
    this.setState({
      receiptLabel: result.label,
      receiptValue: result.value,
      accountLabel: '请选择提款微信账号',
      accountValue: '',
    })
  }

  changeAccount = value => {
    const { accountOption } = this.state
    const result = accountOption.find(item => item.value === value[0])
    this.setState({
      accountLabel: result.label,
      accountValue: result.value,
    })
  }

  submit = () => {
    const { wallet } = this.props
    const {
      name,
      amount,
      receiptValue,
      accountValue,
      remark,
      cardUserName,
      cardNumber,
      bank,
      invoice,
    } = this.state
    if (receiptValue === '3') {
      if (!name && !amount) {
        Toast.info('请输入完整信息')
        return false
      }
    } else if (receiptValue === '0') {
      if (!name && !amount && !cardUserName && !cardNumber && !bank && !invoice) {
        Toast.info('请输入完整信息')
        return false
      }
    }

    wallet.withDraw({
      receiptValue,
      name,
      amount,
      accountValue,
      remark,
      cardUserName,
      cardNumber,
      bank,
      invoice,
    })
  }

  render() {
    const {
      name,
      amount,
      remark,
      receiptLabel,
      receiptValue,
      accountLabel,
      accountValue,
      accountOption,
      cardUserName,
      cardNumber,
      bank,
      invoice,
      showUpload,
    } = this.state
    return (
      <React.Fragment>
        {!showUpload ? (
          <React.Fragment>
            <NavBar title="申请提现" goBack />
            <WhiteSpace />
            <List>
              <Picker
                data={Receipt}
                value={[receiptValue]}
                cols={1}
                extra={receiptLabel}
                onChange={value => this.changeReceipt(value)}
              >
                <List.Item arrow="horizontal">提现至</List.Item>
              </Picker>
              <InputItem
                value={name}
                labelNumber={7}
                placeholder="请输入提款人真实姓名"
                onChange={value => this.setState({
                  name: value,
                })
                }
              >
                提款人真实姓名
              </InputItem>
              <InputItem
                value={amount}
                labelNumber={7}
                placeholder="最低提现3元"
                onChange={value => this.setState({
                  amount: value,
                })
                }
              >
                提现金额
              </InputItem>
              {receiptValue !== '0' ? (
                <React.Fragment>
                  <Picker
                    data={accountOption}
                    value={[accountValue]}
                    cols={1}
                    extra={accountLabel}
                    onChange={value => this.changeAccount(value)}
                  >
                    <List.Item arrow="horizontal">微信账号</List.Item>
                  </Picker>
                  <TextareaItem
                    title="备注"
                    rows={4}
                    value={remark}
                    placeholder="此条提现记录的备注"
                    labelNumber={7}
                    count={100}
                    onChange={value => this.setState({
                      remark: value,
                    })
                    }
                  />
                </React.Fragment>
              ) : null}
            </List>
            {receiptValue === '0' ? (
              <List
                renderHeader={
                  <p style={{ lineHeight: '20px', margin: 0 }}>
                    开票信息：
                    <br />
                    公司名称：浙江由客企业管理有限公司
                    <br />
                    税号：91330103MA27X12E7D
                    <br />
                    开户银行：中国农业银行杭州市延安路支行
                    <br />
                    银行账号：19036101040026829
                    <br />
                    电话：400-659-9953
                    <br />
                    地址：杭州市下城区岳帅桥10号1幢569室
                    <br />
                    发票类型为：增值税专用发票
                    <br />
                    发票类目：软件服务费
                    <br />
                  </p>
                }
              >
                <InputItem
                  value={cardUserName}
                  labelNumber={7}
                  placeholder="请填写账户名称"
                  onChange={value => this.setState({
                    cardUserName: value,
                  })
                  }
                >
                  账户名称
                </InputItem>
                <InputItem
                  value={cardNumber}
                  labelNumber={7}
                  placeholder="请填写银行卡号"
                  onChange={value => this.setState({
                    cardNumber: value,
                  })
                  }
                >
                  银行卡号
                </InputItem>
                <InputItem
                  value={bank}
                  labelNumber={7}
                  placeholder="请填写开户行"
                  onChange={value => this.setState({
                    bank: value,
                  })
                  }
                >
                  开户行
                </InputItem>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    this.setState({
                      showUpload: true,
                    })
                  }}
                >
                  <CustomizeList>
                    <ListTitle>发票</ListTitle>
                    <ListContent>{invoice ? <img src={invoice} alt="" /> : null}</ListContent>
                  </CustomizeList>
                </List.Item>
                <TextareaItem
                  title="备注"
                  rows={4}
                  value={remark}
                  placeholder="此条提现记录的备注"
                  labelNumber={7}
                  count={100}
                  onChange={value => this.setState({
                    remark: value,
                  })
                  }
                />
              </List>
            ) : null}
            <Button
              type="primary"
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 20,
                marginBottom: 20,
              }}
              onClick={this.submit}
            >
              提现
            </Button>
          </React.Fragment>
        ) : (
          <UploadInvoice
            callback={url => this.setState({
              invoice: url,
              showUpload: false,
            })
            }
          />
        )}
      </React.Fragment>
    )
  }
}

export default WithDraw
