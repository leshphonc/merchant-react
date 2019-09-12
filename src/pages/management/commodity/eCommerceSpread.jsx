import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Toast, Picker,
} from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

const { Item } = List
const levelSet = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('commodity')
@observer
class ECommerceSpread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLevels: [],
    }
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    commodity.fetchUserLevel(match.params.id, match.params.goodid).then(() => {
      const { userLevels } = commodity
      userLevels.forEach(item => {
        item.level = item.id
      })
      this.setState({
        userLevels,
      })
      commodity.fetchscoreAndDhb()
      commodity.fetchShowCommission()
      if (!match.params.goodid) return
      commodity.fetchECommerceDetail(match.params.id, match.params.goodid).then(() => {
        const { eCommerceDetail } = commodity
        form.setFieldsValue({
          spread_sale: eCommerceDetail.spread_sale,
          spread_rate: eCommerceDetail.spread_rate,
          level_set: [eCommerceDetail.level_set],
        })
        if (eCommerceDetail.spread.length) {
          this.setState({
            userLevels: eCommerceDetail.spread,
          })
        }
      })
    })
  }

  submit = () => {
    const {
      commodity, form, match, history,
    } = this.props
    const { userLevels } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        level_set: `${value.level_set[0]}`,
        spread: userLevels,
      }
      commodity
        .goodsSpread({
          ...obj,
          store_id: match.params.id,
          goods_id: match.params.goodid,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    })
  }

  changeUserLevelsItem = (val, index, key) => {
    const { userLevels } = this.state
    const cache = JSON.parse(JSON.stringify(userLevels))
    cache[index][key] = val
    this.setState({
      userLevels: cache,
    })
  }

  mapList = () => {
    const { userLevels } = this.state
    console.log(userLevels)
    const { commodity } = this.props
    const { showThree, openUserSpread } = commodity
    return userLevels.map((item, index) => (
      <React.Fragment key={index}>
        <Item>
          {item.name}
          <InputItem
            extra="%"
            value={item.spread_sale}
            onChange={val => this.changeUserLevelsItem(val, index, 'spread_sale')}
            labelNumber={7}
            placeholder=" 销售佣金比例"
          >
            销售佣金比例
          </InputItem>
          <InputItem
            extra="%"
            value={item.spread_rate}
            onChange={val => this.changeUserLevelsItem(val, index, 'spread_rate')}
            labelNumber={7}
            placeholder=" 推广佣金比例"
          >
            推广佣金比例
          </InputItem>
          {showThree === '0' && openUserSpread === '1' ? (
            <React.Fragment>
              <InputItem
                extra="%"
                value={item.sub_spread_rate}
                onChange={val => this.changeUserLevelsItem(val, index, 'sub_spread_rate')}
                labelNumber={7}
                placeholder=" 推广佣金比例2"
              >
                推广佣金比例2
              </InputItem>
              <InputItem
                extra="%"
                value={item.third_spread_rate}
                onChange={val => this.changeUserLevelsItem(val, index, 'third_spread_rate')}
                labelNumber={7}
                placeholder=" 推广佣金比例3"
              >
                推广佣金比例3
              </InputItem>
            </React.Fragment>
          ) : null}
        </Item>
      </React.Fragment>
    ))
  }

  render() {
    const { match, form } = this.props
    const { getFieldProps } = form
    // const { spread } = this.state
    const levelSetValue = form.getFieldValue('level_set') ? form.getFieldValue('level_set')[0] : ''
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}推广分佣`} goBack />
        <List>
          <InputItem
            {...getFieldProps('spread_sale', {
              rules: [{ required: true }],
            })}
            labelNumber={7}
            placeholder="请填写佣金比例"
          >
            销售佣金比例
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户分享商品链接后，其他用户点击链接购买该商品后，分享者将获得此佣金（百分比 0-100)"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>

          <InputItem
            {...getFieldProps('spread_rate', {
              rules: [{ required: false }],
            })}
            labelNumber={7}
            placeholder="请填写佣金比例"
          >
            推广佣金比例
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="用户分享网页后，点击网页的新用户将会被绑定为分享者的粉丝，该粉丝在商户产生消费时，分享者将获得此佣金 （百分比 0-100)"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <Picker {...getFieldProps('level_set')} data={levelSet} cols={1}>
            <List.Item arrow="horizontal">等级会员分佣设置</List.Item>
          </Picker>
          {levelSetValue === '0' ? null : (
            <WingBlank size="sm" style={{ paddingBottom: '22vw' }}>
              {this.mapList()}
            </WingBlank>
          )}
        </List>
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
          确定
        </Button>
      </React.Fragment>
    )
  }
}
export default ECommerceSpread
