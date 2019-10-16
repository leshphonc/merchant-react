import React from 'react'
import NavBar from '@/common/NavBar'
import { List, InputItem, Flex, Checkbox, WhiteSpace, Switch, Toast, Button } from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import { createForm } from 'rc-form'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

@createForm()
@inject('commodity')
@observer
class eCommerceCategoryPanel extends React.Component {
  state = {
    week: [],
  }

  componentDidMount() {
    const { match, location, history, commodity, form } = this.props
    if (match.params.type === '新增' && !location.state) {
      history.goBack()
    }
    if (match.params.type === '编辑') {
      commodity.fetchShopCategoryDetail(match.params.id).then(() => {
        const { shopCategoryDetail } = commodity
        form.setFieldsValue({
          discount: shopCategoryDetail.sort_discount,
          is_week: shopCategoryDetail.is_weekshow === '1',
          name: shopCategoryDetail.sort_name,
          sort: shopCategoryDetail.sort,
        })
        this.setState({
          week: toJS(shopCategoryDetail.week),
        })
      })
    }
  }

  checkChange = e => {
    const { week } = this.state
    if (e.target.checked) {
      if (week.indexOf(e.target.value) === -1) {
        this.setState({
          week: [...week, e.target.value],
        })
      }
    } else if (week.indexOf(e.target.value) !== -1) {
      const arr = week
      arr.splice(week.indexOf(e.target.value), 1)
      this.setState({
        week: arr,
      })
    }
  }

  submit = () => {
    const { form, match, commodity, history, location } = this.props
    const { week } = this.state
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return
      }
      const obj = {
        ...value,
        is_week: value.is_week ? '1' : '0',
        week: week.join(),
      }
      if (match.params.id) {
        obj.sort_id = match.params.id
      }
      if (match.params.level === '1') {
        commodity.modifyShopFirstCategory(obj).then(res => {
          if (res) {
            Toast.success('操作成功！', 1, () => history.goBack())
          }
        })
      } else {
        if (match.params.type === '新增') {
          obj.fid = location.state
        }
        commodity.modifyShopSecondCategory(obj).then(res => {
          if (res) {
            Toast.success('操作成功！', 1, () => history.goBack())
          }
        })
      }
    })
  }

  render() {
    const { match, form } = this.props
    const { week } = this.state
    const { getFieldProps } = form
    const is_week = form.getFieldValue('is_week')
    return (
      <>
        <NavBar title={`${match.params.type}电商分类`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            placeholder="请输入分类名称"
          >
            分类名称
          </InputItem>
          <InputItem
            {...getFieldProps('sort', {
              rules: [{ required: true }],
            })}
            placeholder="请输入店铺排序"
          >
            店铺排序
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="默认添加顺序排序！数值越大，排序越靠前"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('is_week', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: true }],
                })}
              />
            }
          >
            是否开启星期几显示
          </List.Item>
          {is_week ? (
            <List.Item>
              <CustomizeList>
                <ListTitle>星期几显示</ListTitle>
                <ListContent style={{ fontSize: 13 }}>
                  <Flex justify="around">
                    <Checkbox
                      onChange={this.checkChange}
                      value="1"
                      checked={week.indexOf('1') !== -1}
                    >
                      星期一
                    </Checkbox>
                    <Checkbox
                      onChange={this.checkChange}
                      value="2"
                      checked={week.indexOf('2') !== -1}
                    >
                      星期二
                    </Checkbox>
                    <Checkbox
                      onChange={this.checkChange}
                      value="3"
                      checked={week.indexOf('3') !== -1}
                    >
                      星期三
                    </Checkbox>
                  </Flex>
                  <WhiteSpace />
                  <Flex justify="around">
                    <Checkbox
                      onChange={this.checkChange}
                      value="4"
                      checked={week.indexOf('4') !== -1}
                    >
                      星期四
                    </Checkbox>
                    <Checkbox
                      onChange={this.checkChange}
                      value="5"
                      checked={week.indexOf('5') !== -1}
                    >
                      星期五
                    </Checkbox>
                    <Checkbox
                      onChange={this.checkChange}
                      value="6"
                      checked={week.indexOf('6') !== -1}
                    >
                      星期六
                    </Checkbox>
                  </Flex>
                  <WhiteSpace />
                  <Flex justify="around">
                    <Checkbox
                      onChange={this.checkChange}
                      value="0"
                      checked={week.indexOf('0') !== -1}
                    >
                      星期日
                    </Checkbox>
                  </Flex>
                </ListContent>
              </CustomizeList>
            </List.Item>
          ) : null}
          <InputItem
            {...getFieldProps('discount', {
              rules: [{ required: true }],
            })}
            placeholder="请输入产品折扣率"
          >
            折扣率
            <Tooltip
              trigger="click"
              placement="topLeft"
              overlay="分类下产品折扣率，请输入0～10之间的数字，支持一位小数。例：8.5 代表 85折，0或者10代表无折扣"
            >
              <i className="iconfont" style={{ marginLeft: 5, color: '#bbb' }}>
                &#xe628;
              </i>
            </Tooltip>
          </InputItem>
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

export default eCommerceCategoryPanel
