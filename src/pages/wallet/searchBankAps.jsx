import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import {
  List,
  Picker,
  WhiteSpace,
  WingBlank,
  Button,
  Toast,
  InputItem,
  PullToRefresh,
  Radio,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { BankList } from '@/config/constant'
import { createForm } from 'rc-form'
import Utils from '@/utils'

@createForm()
@inject('common', 'wallet')
@observer
class SearchBankAps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _BankList: [],
      checked: '',
      checkedLabel: '',
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { common } = this.props
    const { height } = this.state
    const bankList = []
    BankList.forEach(item => {
      if (item === '其他银行') {
        bankList.push({
          value: '',
          label: item,
        })
        return false
      }
      bankList.push({
        value: item,
        label: item,
      })
    })
    this.setState({
      _BankList: bankList,
    })
    common.fetchProvince()
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei =
        height - ReactDOM.findDOMNode(this.refresh.current).offsetTop - 50
      this.setState({
        height: hei,
      })
    }
  }

  search = () => {
    const { wallet, form, common } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const { provinceOption, cityOption } = common
      const province = provinceOption.find(
        item => item.value === value.province[0],
      )
      const city = cityOption.find(item => item.value === value.city[0])
      wallet.resetAndFetchBankAps(
        value.bank[0],
        province.label,
        city.label,
        value.key,
      )
    })
  }

  mapList = () => {
    const { wallet } = this.props
    const { checked } = this.state
    return wallet.bankAps.map(item => (
      <Radio.RadioItem
        key={item.bankCode}
        checked={checked === item.bankCode}
        onChange={() =>
          this.setState({
            checked: item.bankCode,
            checkedLabel: item.lName,
          })
        }
      >
        {item.lName}
      </Radio.RadioItem>
    ))
  }

  submit = () => {
    const { history } = this.props
    const { checked, checkedLabel } = this.state
    Utils.cacheItemToData('acctopenbranchname', checked)
    Utils.cacheItemToData('acctopenbranchnameLabel', checkedLabel)
    history.goBack()
  }

  loadMore = () => {
    const { wallet, common, form } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const { provinceOption, cityOption } = common
      const province = provinceOption.find(
        item => item.value === value.province[0],
      )
      const city = cityOption.find(item => item.value === value.city[0])
      wallet.fetchBankAps(value.bank[0], province.label, city.label, value.key)
    })
  }

  render() {
    const { form, common } = this.props
    const { getFieldProps } = form
    const { _BankList, refreshing, height, checked } = this.state
    return (
      <>
        <NavBar title="开户行查询" goBack />
        <WhiteSpace />
        <List>
          <Picker
            {...getFieldProps('bank', {
              rules: [{ required: true }],
            })}
            data={_BankList}
            cols={1}
          >
            <List.Item arrow="horizontal">选择银行</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('province', {
              rules: [{ required: true }],
              getValueFromEvent: item => {
                common.fetchCity(item[0])
                return item
              },
            })}
            data={common.provinceOption}
            cols={1}
          >
            <List.Item arrow="horizontal">选择省份</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('city', {
              rules: [{ required: true }],
            })}
            data={common.cityOption}
            cols={1}
          >
            <List.Item arrow="horizontal">选择城市</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('key', {
              rules: [{ required: false }],
            })}
            placeholder="银行名称关键词"
          >
            关键词
          </InputItem>
          <WhiteSpace />
          <WingBlank>
            <Button type="primary" onClick={this.search}>
              查询
            </Button>
          </WingBlank>
          <WhiteSpace />
        </List>
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
          <WingBlank size="sm">
            <List>{this.mapList()}</List>
          </WingBlank>
        </PullToRefresh>
        {checked ? (
          <Button type="primary" onClick={this.submit} style={{ marginTop: 3 }}>
            选择
          </Button>
        ) : null}
      </>
    )
  }
}

export default SearchBankAps
