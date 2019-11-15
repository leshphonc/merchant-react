import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { InputItem, List, Picker, WingBlank, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

const levelSet = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
const { Item } = List

@createForm()
@observer
@inject('commodity')
class ServiceSpread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLevels: [],
    }
  }

  componentDidMount() {
    const { commodity, form } = this.props
    // 获取分佣等级
    commodity.getLevelList().then(() => {
      // 是否开启积分兑换币
      commodity.fetchscoreAndDhb().then(() => {
        // 是否开启三级分佣
        commodity.fetchShowCommission().then(() => {
          const { levelList, showThree, openUserSpread } = commodity
          const { userLevels } = this.state
          // levelList.forEach((item, index) => {
          //   if (groupDetail.spread[index]) {
          //     if (showThree === '1' && openUserSpread === '1') {
          //       userLevels.push({
          //         spread_sale: groupDetail.spread[index].spread_sale,
          //         spread_rate: groupDetail.spread[index].spread_rate,
          //         sub_spread_rate: groupDetail.spread[index].sub_spread_rate,
          //         third_spread_rate:
          //           groupDetail.spread[index].third_spread_rate,
          //         level: item.id,
          //         name: item.name,
          //       })
          //     } else {
          //       userLevels.push({
          //         spread_sale: groupDetail.spread[index].spread_sale,
          //         spread_rate: groupDetail.spread[index].spread_rate,
          //         level: item.id,
          //         name: item.name,
          //       })
          //     }
          //   } else {
          //     userLevels.push({
          //       spread_sale: '',
          //       spread_rate: '',
          //       name: item.name,
          //       level: item.id,
          //     })
          //   }
          // })
          // this.setState({
          //   userLevels,
          // })
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
      commodity
        .appointSpreadEdit({ ...obj, appoint_id: match.params.id })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const levelSetValue = form.getFieldValue('level_set')
      ? `${form.getFieldValue('level_set')[0]}`
      : '0'
    return (
      <>
        <NavBar title="服务项目佣金设置" goBack />
        <List>
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
      </>
    )
  }
}

export default ServiceSpread
