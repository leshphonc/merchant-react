import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, InputItem, Button, Toast, Picker, Flex } from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

const { Item } = List

@createForm()
@inject('commodity')
@observer
class PackageDiscounts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      give: [],
      score_name: '',
      dhb_name: '',
    }
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    const alias = JSON.parse(localStorage.getItem('alias'))
    alias.forEach(item => {
      if (item.name === 'score_name') {
        this.setState({
          score_name: item.value,
        })
      }
      if (item.name === 'dhb_name') {
        this.setState({
          dhb_name: item.value,
        })
      }
    })
    commodity.fetchCardGroupAllE()
    commodity.fetchGiftVoucherE()
    commodity.fetchscoreAndDhbE()
    if (!match.params.id) return
    commodity.fetchPackageDetail(match.params.id).then(() => {
      const { packageDetail } = commodity
      const cache = JSON.parse(JSON.stringify(packageDetail[0]))
      form.setFieldsValue({
        // seckill_price: cache.seckill_price,
        // seckill_stock: cache.seckill_stock,
        // seckill_type: [cache.seckill_type],
        // seckill_open_time: new Date(cache.seckill_open_time * 1000),
        // seckill_close_time: new Date(cache.seckill_close_time * 1000),
        dhb_get_num: cache.dhb_get_num,
        score_get_num: cache.score_get_num,
        in_group: [cache.in_group],
      })
      this.setState({
        give: cache.give,
      })
    })
  }

  changeGiveValue = (val, index) => {
    const { give } = this.state
    const cache = Object.assign([], give)
    // eslint-disable-next-line prefer-destructuring
    cache[index].goods = val[0]
    this.setState({
      give: cache,
    })
  }

  changeGiveNum = (val, index) => {
    const { give } = this.state
    const cache = Object.assign([], give)
    // eslint-disable-next-line prefer-destructuring
    cache[index].goods_num = val
    this.setState({
      give: cache,
    })
  }

  mapGive = () => {
    const { commodity } = this.props
    const { give } = this.state
    return give.map((item, index) => (
      <React.Fragment key={index}>
        <Picker
          data={commodity.giftVoucher}
          value={[item.goods]}
          cols={1}
          onChange={val => this.changeGiveValue(val, index)}
        >
          <List.Item arrow="horizontal">商品</List.Item>
        </Picker>
        <InputItem
          defaultValue={item.goods_num}
          onChange={val => this.changeGiveNum(val, index)}
        >
          赠送数量
        </InputItem>
      </React.Fragment>
    ))
  }

  submit = () => {
    const { commodity, form, match, history } = this.props
    const { give } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        in_group: value.in_group[0],
        // seckill_type: value.seckill_type[0],
        // seckill_open_time: moment(value.seckill_open_time).format(
        //   'YYYY-MM-DD HH:mm',
        // ),
        // seckill_close_time: moment(value.seckill_close_time).format(
        //   'YYYY-MM-DD HH:mm',
        // ),
        give,
      }
      commodity
        .packageDiscount({
          ...obj,
          meal_id: match.params.id,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    })
  }

  render() {
    const { commodity, form } = this.props
    const { getFieldProps } = form
    const { cardGroupAll, scoreOpen, dhbOpen } = commodity
    const { give, dhb_name, score_name } = this.state
    return (
      <React.Fragment>
        <NavBar title="优惠设置" goBack />
        <List>
          {/* <InputItem
            {...getFieldProps('seckill_price', {
              rules: [{ required: false }],
            })}
            labelNumber={6}
            placeholder="请填写限时价"
          >
            商品限时价
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="0表示无限时价。"
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
            {...getFieldProps('seckill_stock', {
              rules: [{ required: false }],
            })}
            labelNumber={6}
            placeholder="请填写库存"
          >
            限时价库存
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="-1表示无限量。"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <i className="iconfont" style={{ marginLeft: 10, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>

          <Picker
            {...getFieldProps('seckill_type', {
              rules: [{ required: false }],
            })}
            data={seckill}
            cols={1}
          >
            <List.Item arrow="horizontal">现时价类型</List.Item>
          </Picker>
          <DatePicker
            {...getFieldProps('seckill_open_time', {
              rules: [{ required: false }],
            })}
            mode="datetime"
          >
            <List.Item arrow="horizontal">开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('seckill_close_time', {
              rules: [{ required: false }],
            })}
            mode="datetime"
          >
            <List.Item arrow="horizontal">结束时间</List.Item>
          </DatePicker> */}
          {dhbOpen !== '0' || scoreOpen !== '0' ? (
            <Item>
              用户消费赠送比例
              {dhbOpen !== '0' ? (
                <InputItem
                  {...getFieldProps('dhb_get_num', {
                    rules: [{ required: false }],
                  })}
                  labelNumber={7}
                  extra={dhb_name}
                  placeholder={`请填写${dhb_name}数量`}
                >
                  每消费1元赠送
                </InputItem>
              ) : null}
              {scoreOpen !== '0' ? (
                <InputItem
                  {...getFieldProps('score_get_num', {
                    rules: [{ required: false }],
                  })}
                  extra={score_name}
                  labelNumber={7}
                  placeholder={`请填写${score_name}数量`}
                >
                  每消费1元赠送
                </InputItem>
              ) : null}
            </Item>
          ) : null}
          <List.Item
            extra={
              <Flex justify="between">
                <Button
                  size="small"
                  type="ghost"
                  onClick={() =>
                    this.setState({
                      give: give.concat({ goods: '', goods_num: '' }),
                    })
                  }
                >
                  添加
                </Button>
                <Button
                  size="small"
                  type="warning"
                  onClick={() =>
                    this.setState({
                      give: give.slice(0, give.length - 1),
                    })
                  }
                >
                  删除
                </Button>
              </Flex>
            }
          >
            赠送商家优惠券
          </List.Item>
          {this.mapGive()}
          <Picker
            {...getFieldProps('in_group', {
              rules: [{ required: false }],
            })}
            data={cardGroupAll}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择会员分组</List.Item>
          </Picker>
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
export default PackageDiscounts