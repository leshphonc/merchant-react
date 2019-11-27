import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List,
  InputItem,
  WingBlank,
  Button,
  Toast,
  Picker,
  Switch,
} from 'antd-mobile'
// import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'

const { Item } = List
const levelSet = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('commodity')
@observer
class EditSpread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLevels: [],
      userLevelList: [],
      detail: {},
      dhbName: '',
      scoreName: '',
    }
  }

  componentDidMount() {
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
    const { commodity, match, form } = this.props
    commodity.getLevelList().then(() => {
      const { levelList } = commodity
      this.setState({
        userLevelList: levelList,
      })
    })
    commodity.fetchscoreAndDhb().then(() => {
      commodity.fetchShowCommission().then(() => {
        const { showThree, openUserSpread } = commodity
        if (match.params.str === 'group_id') {
          commodity.fetchGroupDetail(match.params.id).then(() => {
            const { groupDetail, levelList } = commodity
            this.setState({
              detail: groupDetail,
            })
            const { userLevels } = this.state
            form.setFieldsValue({
              spread_sale: groupDetail.spread_sale,
              spread_rate: groupDetail.spread_rate,
              level_set: [groupDetail.level_set],
              level_spread: groupDetail.level_spread,
              spread: groupDetail.spread,
            })
            levelList.forEach((item, index) => {
              if (groupDetail.spread[index]) {
                if (showThree === '1' && openUserSpread === '1') {
                  userLevels.push({
                    spread_sale: groupDetail.spread[index].spread_sale,
                    spread_rate: groupDetail.spread[index].spread_rate,
                    sub_spread_rate: groupDetail.spread[index].sub_spread_rate,
                    third_spread_rate:
                      groupDetail.spread[index].third_spread_rate,
                    level: item.id,
                    name: item.name,
                  })
                } else {
                  userLevels.push({
                    spread_sale: groupDetail.spread[index].spread_sale,
                    spread_rate: groupDetail.spread[index].spread_rate,
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
        } else {
          commodity.fetchReserveDetail(match.params.id).then(() => {
            const { appointDetail, levelList } = commodity
            const { userLevels } = this.state
            form.setFieldsValue({
              spread_sale: appointDetail.appoint_list.spread_sale,
              spread_rate: appointDetail.appoint_list.spread_rate,
              level_set: [appointDetail.appoint_list.level_set],
              level_spread: appointDetail.appoint_list.level_spread,
              spread: appointDetail.appoint_list.spread,
            })
            levelList.forEach((item, index) => {
              if (appointDetail.appoint_list.spread[index]) {
                userLevels.push({
                  spread_sale:
                    appointDetail.appoint_list.spread[index].spread_sale,
                  spread_rate:
                    appointDetail.appoint_list.spread[index].spread_rate,
                  sub_spread_rate:
                    appointDetail.appoint_list.spread[index].sub_spread_rate,
                  third_spread_rate:
                    appointDetail.appoint_list.spread[index].third_spread_rate,
                  level: item.id,
                  name: item.name,
                })
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
        }
      })
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
      if (match.params.str === 'group_id') {
        obj.is_fx = obj.is_fx ? '1' : '0'
        obj.fx_type = obj.fx_type[0]
        commodity
          .groupSpreadEdit({ ...obj, group_id: match.params.id })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      } else {
        commodity
          .appointSpreadEdit({ ...obj, appoint_id: match.params.id })
          .then(res => {
            if (res) Toast.success('编辑成功', 1, () => history.goBack())
          })
      }
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

  render() {
    const { form, match } = this.props
    const { getFieldProps } = form
    // const { spread } = this.state
    const { detail, dhbName, scoreName } = this.state
    const levelSetValue = form.getFieldValue('level_set')
      ? `${form.getFieldValue('level_set')[0]}`
      : '0'
    return (
      <React.Fragment>
        <NavBar title="编辑推广分佣" goBack />
        <List>
          {match.params.str === 'group_id' ? (
            <div>
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
export default EditSpread
