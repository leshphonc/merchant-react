import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
  List, InputItem, WingBlank, Button, Toast, Picker, Flex,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import { toJS } from 'mobx'

const { Item } = List
// const seckill = [{ label: '固定时间段', value: '1' }, { label: '每天的时间段', value: '0' }]
const disType = [
  { label: '无优惠', value: '0' },
  { label: '百分比(%)', value: '1' },
  { label: '立减', value: '2' },
]
@createForm()
@inject('commodity')
@observer
class GroupDiscounts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // userLevels: [],
      give: [],
      userLevels: [],
      levelType: [],
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
    commodity.fetchscoreAndDhb()
    commodity.fetchCardGroupAll()
    if (!match.params.id) return
    commodity.fetchGiftVoucher()
    commodity.fetchGroupDetail(match.params.id).then(() => {
      const { groupDetail } = commodity
      form.setFieldsValue({
        tagname: groupDetail.tagname,
        packageid: [groupDetail.packageid],
        dhb_get_num: groupDetail.dhb_get_num,
        score_get_num: groupDetail.score_get_num,
        in_group: [groupDetail.in_group],
      })
      commodity.getLevelList().then(() => {
        const { levelList, groupDetail } = commodity
        const { userLevels } = this.state
        levelList.forEach((item, index) => {
          userLevels.push({})
          userLevels[index][`leveloff[${item.id}][lid]`] = ''
          userLevels[index][`leveloff[${item.id}][lname]`] = item.name
          userLevels[index][`leveloff[${item.id}][type]`] = '0'
          userLevels[index][`leveloff[${item.id}][vv]`] = ''
        })

        const levelType = []
        if (groupDetail.leveloff) {
          toJS(groupDetail.leveloff).forEach((item, index) => {
            userLevels[index][`leveloff[${item.level}][lid]`] = item.lid
            userLevels[index][`leveloff[${item.level}][lname]`] = item.lname
            userLevels[index][`leveloff[${item.level}][type]`] = item.type ? `${item.type}` : '0'
            userLevels[index][`leveloff[${item.level}][vv]`] = item.vv
            levelType.push(item.type ? item.type : '0')
          })
        }
        this.setState({
          userLevels,
          levelType,
          give: groupDetail.give || [],
        })
      })
    })

    commodity.fetchGroupPackege().then(() => {
      // const { groupPackage } = commodity
    })
  }

  changeGiveValue = (val, index) => {
    const { give } = this.state
    const cache = Object.assign([], toJS(give))
    // eslint-disable-next-line prefer-destructuring
    cache[index].goods = val[0]
    this.setState({
      give: cache,
    })
  }

  changeGiveNum = (val, index) => {
    const { give } = this.state
    const cache = Object.assign([], toJS(give))
    // eslint-disable-next-line prefer-destructuring
    cache[index].goods_num = val
    this.setState({
      give: cache,
    })
  }

  levelDis = () => {
    const { userLevels, levelType } = this.state
    // const {form } =this.props
    // const { getFieldProps } = form
    if (userLevels) {
      return userLevels.map((item, index) => (
        <React.Fragment key={index}>
          <InputItem
            defaultValue={item[`leveloff[${index + 1}][vv]`]}
            placeholder="请输入优惠值"
            onChange={e => {
              userLevels[index][`leveloff[${index + 1}][vv]`] = e
              this.setState({
                userLevels,
              })
            }}
          >
            {item[`leveloff[${index + 1}][lname]`]}
          </InputItem>
          <Picker
            data={disType}
            cols={1}
            value={[`${levelType[index]}`]}
            onOk={e => {
              levelType[index] = e[0]
              this.setState({
                levelType,
              })
            }}
          >
            <List.Item arrow="horizontal">优惠类型{}</List.Item>
          </Picker>
        </React.Fragment>
      ))
    }
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
        <InputItem defaultValue={item.goods_num} onChange={val => this.changeGiveNum(val, index)}>
          商品张数
        </InputItem>
      </React.Fragment>
    ))
  }

  submit = () => {
    const {
      commodity, form, match, history,
    } = this.props
    const { give, userLevels, levelType } = this.state
    // eslint-disable-next-line camelcase
    const goods_num = []
    const goods = []
    const giveArr = []
    form.validateFields((error, value) => {
      // eslint-disable-next-line camelcase
      const obj_other = []
      if (error) {
        Toast.info('请输入完整信息')
        return
      }
      userLevels.forEach((item, index) => {
        item[`leveloff[${index + 1}][type]`] = levelType[index]
        Object.keys(item).forEach(html => {
          obj_other[html] = item[html]
        })
      })
      if (give.length > 0) {
        give.forEach(item => {
          goods_num.push(item.goods_num)
          goods.push(item.goods)
        })
      }
      giveArr['give[goods]'] = goods
      giveArr['give[goods_num]'] = goods_num
      const obj = {
        ...giveArr,
        ...obj_other,
        dhb_get_num: value.dhb_get_num,
        in_group: value.in_group[0],
        packageid: value.packageid[0],
        score_get_num: value.score_get_num,
        tagname: value.tagname,
      }
      commodity.editGroupDis({ ...obj, group_id: match.params.id }).then(res => {
        if (res) Toast.success('编辑成功', 1, () => history.goBack())
      })
    })
  }

  render() {
    const { commodity, form } = this.props
    const { getFieldProps } = form
    const {
      cardGroupAll, groupPackage, dhbOpen, scoreOpen,
    } = commodity
    const {
      // eslint-disable-next-line camelcase
      give, userLevels, score_name, dhb_name,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="团购优惠设置" goBack />
        <List>
          <Item>
            <div style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>套餐设置</div>
          </Item>
          <InputItem
            {...getFieldProps('tagname', {
              rules: [{ required: false }],
            })}
            placeholder=""
          >
            团购套餐标签：
          </InputItem>
          <Picker
            {...getFieldProps('packageid', {
              rules: [{ required: true }],
            })}
            data={groupPackage}
            cols={1}
          >
            <List.Item arrow="horizontal">选择加入套餐</List.Item>
          </Picker>
          {(dhbOpen === '1' || scoreOpen === '1') && (
            <div>
              <Item>
                <div style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                {dhb_name}{score_name}设置
                </div>
              </Item>
              <Item>
              用户消费赠送比例
                {dhbOpen === '1' && (
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
                )}
                {scoreOpen === '1' && (
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
                )}
              </Item>
            </div>
          )}

          <Item>
            <div style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
              赠送商家优惠券
            </div>
          </Item>
          <List.Item
            extra={
              <Flex justify="between">
                <Button
                  size="small"
                  type="ghost"
                  onClick={() => this.setState({
                    give: give.concat({ goods: '', goods_num: '' }),
                  })
                  }
                >
                  添加
                </Button>
                <Button
                  size="small"
                  type="warning"
                  onClick={() => this.setState({
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
          <Item>
            <div style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
              商家会员福利
            </div>
          </Item>
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
          {userLevels && (
            <Item>
              <div style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                会员优惠设置
              </div>
            </Item>
          )}
          {this.levelDis()}
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
export default GroupDiscounts
