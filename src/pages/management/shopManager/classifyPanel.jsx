import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, WingBlank, Button, Toast, Switch } from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

const pageList = {
  1: {
    page: 'carShop.html',
    name: '汽配订单',
  },
  2: {
    page: 'appoint.html',
    name: '预定订单',
  },
  3: {
    page: 'eCommerce.html',
    name: '电商订单',
  },
  4: {
    page: 'cashier.html',
    name: '店员收银',
  },
  5: {
    page: 'clerkStatistics.html',
    name: '推广统计',
  },
  6: {
    page: 'write_off.html',
    name: '优惠券核销',
  },
  7: {
    page: 'activity.html',
    name: '联盟活动核销',
  },
  8: {
    page: 'store_qrcode.html',
    name: '收款二维码',
  },
  9: {
    page: 'billing.html',
    name: '开单收银',
  },
  10: {
    page: 'group_list.html',
    name: '团购订单',
  },
  11: {
    page: 'foodshop.html',
    name: '餐饮订单',
  },
  12: {
    page: 'hotel.html',
    name: '酒店管理',
  },
  13: {
    page: 'shop.html',
    name: '外卖订单',
  },
  14: {
    page: 'staff_qrcode.html',
    name: '推广二维码',
  },
  15: {
    page: 'service.html',
    name: '服务工单',
  },
  16: {
    page: 'gift.html',
    name: '兑换订单',
  },
  17: {
    page: 'meet.html',
    name: '活动报名',
  },
  18: {
    page: 'retail.html',
    name: '卖场收银',
  },
}

@createForm()
@inject('shopManager')
@observer
class ECommerceAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { shopManager, match, form } = this.props
    shopManager.fetchGetStaffRule(match.params.id).then(() => {
      shopManager.fetchGetSelStaffRule(match.params.staffId).then(() => {
        const { getSelStaffRule } = shopManager
        const selected = {}
        getSelStaffRule.forEach(item => {
          selected[item.staff_menu_id] = true
        })
        setTimeout(() => {
          form.setFieldsValue(selected)
        }, 500)
      })
    })
  }

  submit = () => {
    const { shopManager, form, match, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const keys = Object.keys(value)
      const json = []
      keys.forEach(item => {
        if (value[item]) {
          json.push(item - 0)
        }
      })
      shopManager
        .setStaffRule({
          staff_id: match.params.staffId,
          menu_id: JSON.stringify(json),
        })
        .then(res => {
          if (res) Toast.success('修改成功', 1, () => history.goBack())
        })
    })
  }

  render() {
    const { match, form, shopManager } = this.props
    const { getFieldProps } = form
    const { getStaffRule } = shopManager
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}权限`} goBack />
        <List>
          {getStaffRule.map(i => (
            <List key={i.id}>
              <List.Item
                extra={
                  <Switch
                    {...getFieldProps(i.id, {
                      initialValue: false,
                      valuePropName: 'checked',
                      rules: [{ required: true }],
                    })}
                  />
                }
              >
                {pageList[i.id].name}
              </List.Item>
            </List>
          ))}
          {/* <Picker
            {...getFieldProps('is_change', {
              rules: [{ required: true }],
            })}
            data={seasons}
            cols={1}
          >
            <List.Item arrow="horizontal">能否修改订单价格</List.Item>
          </Picker> */}
          {/* <InputItem
            {...getFieldProps('spread_rato', {
              rules: [{ required: false }],
            })}
            extra="%"
            labelNumber={7}
            placeholder="请填写分佣比例"
          >
            推广用户分佣比例
          </InputItem> */}
          <WingBlank style={{ padding: '10px 0' }}>
            <Button
              type="primary"
              style={{ color: '#333', fontWeight: 'bold' }}
              onClick={this.submit}
            >
              确定
            </Button>
          </WingBlank>
        </List>
      </React.Fragment>
    )
  }
}
export default ECommerceAdd
