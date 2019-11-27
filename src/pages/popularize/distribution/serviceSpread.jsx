import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  InputItem,
  List,
  Picker,
  WingBlank,
  Toast,
  Button,
  Switch,
} from 'antd-mobile'
import { createForm } from 'rc-form'

const levelSet = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
const { Item } = List

@createForm()
@inject('commodity')
@observer
class ServiceSpread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {},
      userLevels: [],
      dhbName: '',
      scoreName: '',
    }
  }

  componentDidMount() {
    const { commodity, match, form } = this.props
    const alias = JSON.parse(localStorage.getItem('alias'))
    alias.forEach(item => {
      if (item.name === 'score_name') {
        this.setState({
          scoreName: item.value,
        })
      }
      if (item.name === 'dhb_name') {
        this.setState({
          dhbName: item.value,
        })
      }
    })
    // 获取分佣等级
    commodity.getLevelList().then(() => {
      // 是否开启积分兑换币
      commodity.fetchscoreAndDhb().then(() => {
        // 是否开启三级分佣
        commodity.fetchShowCommission().then(() => {
          const { levelList, showThree, openUserSpread } = commodity
          const { userLevels } = this.state
          console.log(showThree)
          commodity.fetchSingleServiceDetail(match.params.id).then(() => {
            const { singleServiceDetail } = commodity
            this.setState({
              detail: singleServiceDetail,
            })
            const cache = JSON.parse(JSON.stringify(singleServiceDetail))
            form.setFieldsValue({
              level_set: [cache.level_set],
            })
            levelList.forEach((item, index) => {
              if (cache.spread[index]) {
                if (showThree === '1' && openUserSpread === '1') {
                  userLevels.push({
                    spread_sale: cache.spread[index].spread_sale,
                    spread_rate: cache.spread[index].spread_rate,
                    sub_spread_rate: cache.spread[index].sub_spread_rate,
                    third_spread_rate: cache.spread[index].third_spread_rate,
                    level: item.id,
                    name: item.name,
                  })
                } else {
                  userLevels.push({
                    spread_sale: cache.spread[index].spread_sale,
                    spread_rate: cache.spread[index].spread_rate,
                    level: item.id,
                    name: item.name,
                  })
                }
              } else {
                userLevels.push({
                  spread_sale: '',
                  spread_rate: '',
                  name: item.name,
                  level: item.id,
                })
              }
            })
            this.setState({
              userLevels,
            })
          })
        })
      })
    })
  }

  mapList = () => {
    const { userLevels } = this.state
    const { commodity } = this.props
    const { showThree, openUserSpread } = commodity
    return userLevels.map((item, index) => (
      <React.Fragment key={index}>
        <Item>
          {item.name}
          <InputItem
            extra="%"
            value={item.spread_sale}
            onChange={val => {
              this.changeUserLevelsItem(val, index, 'spread_sale')
            }}
            labelNumber={7}
            placeholder=" 销售佣金比例"
          >
            销售佣金比例
          </InputItem>
          <InputItem
            extra="%"
            value={item.spread_rate}
            onChange={val =>
              this.changeUserLevelsItem(val, index, 'spread_rate')
            }
            labelNumber={7}
            placeholder=" 推广佣金比例1"
          >
            推广佣金比例1
          </InputItem>
          {showThree === '1' && openUserSpread === '1' ? (
            <React.Fragment>
              <InputItem
                extra="%"
                value={item.sub_spread_rate}
                onChange={val =>
                  this.changeUserLevelsItem(val, index, 'sub_spread_rate')
                }
                labelNumber={7}
                placeholder=" 推广佣金比例2"
              >
                推广佣金比例2
              </InputItem>
              <InputItem
                extra="%"
                value={item.third_spread_rate}
                onChange={val =>
                  this.changeUserLevelsItem(val, index, 'third_spread_rate')
                }
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

  changeUserLevelsItem = (val, index, key) => {
    const { userLevels } = this.state
    const cache = JSON.parse(JSON.stringify(userLevels))
    cache[index][key] = val
    this.setState({
      userLevels: cache,
    })
  }

  submit = () => {
    const { commodity, form, match, history } = this.props
    const { userLevels } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      const obj = {
        ...value,
        level_set: value.level_set[0],
        spread: userLevels,
      }
      obj.is_fx = obj.is_fx ? '1' : '0'
      obj.fx_type = obj.fx_type[0]
      commodity
        .serviceSpreadEdit({ ...obj, app_id: match.params.id })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { detail, dhbName, scoreName } = this.state
    const levelSetValue = form.getFieldValue('level_set')
      ? `${form.getFieldValue('level_set')[0]}`
      : '0'
    return (
      <>
        <NavBar title="服务项目佣金设置" goBack />
        <List>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_fx', {
                  valuePropName: 'checked',
                  initialValue: detail.is_fx === '1',
                })}
              />
            }
          >
            是否发布到分销市场
          </List.Item>
          {form.getFieldValue('is_fx') === true ? (
            <div>
              <Picker
                {...getFieldProps('fx_type', {
                  rules: [{ required: true }],
                  initialValue: [detail.fx_type],
                })}
                data={[
                  {
                    label: '固定金额',
                    value: '0',
                  },
                  {
                    label: '售价百分比',
                    value: '1',
                  },
                ]}
                cols={1}
              >
                <List.Item arrow="horizontal">分润类型</List.Item>
              </Picker>
              <InputItem
                {...getFieldProps('fx_money', {
                  rules: [{ required: true }],
                  initialValue: detail.fx_money,
                })}
                placeholder="分润金额"
              >
                分润金额
              </InputItem>
              <List renderHeader="购买者赠送">
                <InputItem
                  {...getFieldProps('fx_buyer_dhb', {
                    rules: [{ required: true }],
                    initialValue: detail.fx_buyer_dhb,
                  })}
                  placeholder={`请填写获得${dhbName}数量`}
                >
                  {dhbName}
                </InputItem>
                <InputItem
                  {...getFieldProps('fx_buyer_score', {
                    rules: [{ required: true }],
                    initialValue: detail.fx_buyer_score,
                  })}
                  placeholder={`请填写获得${scoreName}数量`}
                >
                  {scoreName}
                </InputItem>
              </List>
              <List renderHeader="销售者获得">
                <InputItem
                  {...getFieldProps('fx_seller_dhb', {
                    rules: [{ required: true }],
                    initialValue: detail.fx_seller_dhb,
                  })}
                  placeholder={`请填写获得${dhbName}数量`}
                >
                  {dhbName}
                </InputItem>
                <InputItem
                  {...getFieldProps('fx_seller_score', {
                    rules: [{ required: true }],
                    initialValue: detail.fx_seller_score,
                  })}
                  placeholder={`请填写获得${scoreName}数量`}
                >
                  {scoreName}
                </InputItem>
              </List>
            </div>
          ) : null}

          <Picker
            {...getFieldProps('level_set', {
              rules: [{ required: false }],
            })}
            data={levelSet}
            cols={1}
          >
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
      </>
    )
  }
}

export default ServiceSpread
