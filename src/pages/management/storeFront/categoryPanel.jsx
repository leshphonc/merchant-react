import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List, InputItem, Picker, Checkbox, Flex, Button, Toast } from 'antd-mobile'
import Tooltip from 'rc-tooltip'
import { CustomizeList, ListTitle, ListContent } from '@/styled'

const { Item } = List
const pickerOptions = [
  {
    label: '开启',
    value: '1',
  },
  {
    label: '关闭',
    value: '0',
  },
]

@inject('storeFront')
@observer
class CateGoryPanel extends React.Component {
  state = {
    sortName: '',
    sort: '0',
    weekShow: '0',
    week: [],
    sortDiscount: '',
  }

  componentDidMount() {
    const { storeFront, match } = this.props
    if (!match.params.stid) return
    storeFront
      .fetchCategoryDetail(match.params.id, match.params.type, match.params.stid)
      .then(() => {
        const { categoryDetail } = storeFront
        this.setState({
          sortName: categoryDetail.sort_name,
          sort: categoryDetail.sort,
          weekShow: categoryDetail.is_weekshow,
          week: categoryDetail.week,
          sortDiscount: categoryDetail.sort_discount,
        })
      })
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
      week.splice(week.indexOf(e.target.value), 1)
      this.setState({
        week: arr,
      })
    }
  }

  submit = () => {
    const { storeFront, match, history } = this.props
    const { sortName, sort, weekShow, week, sortDiscount } = this.state
    if (!sortName && !sort && sortDiscount) {
      Toast.info('请填写完整信息')
      return
    }
    if (match.params.stid) {
      storeFront
        .modifyCategory({
          sort_name: sortName,
          sort,
          is_weekshow: weekShow,
          week,
          sort_discount: sortDiscount,
          stid: match.params.stid,
          store_id: match.params.id,
          store_type: match.params.type,
        })
        .then(res => {
          if (res) Toast.success('编辑成功', 1, () => history.goBack())
        })
    } else {
      storeFront
        .addCategory({
          sort_name: sortName,
          sort,
          is_weekshow: weekShow,
          week,
          sort_discount: sortDiscount,
          store_id: match.params.id,
          store_type: match.params.type,
        })
        .then(res => {
          if (res) Toast.success('新增成功', 1, () => history.goBack())
        })
    }
  }

  render() {
    const { match } = this.props
    const { sortName, sort, weekShow, week, sortDiscount } = this.state
    return (
      <React.Fragment>
        <NavBar title={`${match.params.str}分类`} goBack />
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="请输入分类名称"
            value={sortName}
            onChange={val => this.setState({
              sortName: val,
            })
            }
          >
            分类名称
          </InputItem>
          <InputItem
            placeholder="请输入店铺排序"
            value={sort}
            onChange={val => this.setState({
              sort: val,
            })
            }
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
          <Picker
            data={pickerOptions}
            cols={1}
            value={[weekShow]}
            onChange={val => this.setState({
              weekShow: val[0],
            })
            }
          >
            <Item arrow="horizontal">是否开启星期几显示</Item>
          </Picker>
          {weekShow === '1' ? (
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
            placeholder="请输入产品折扣率"
            value={sortDiscount}
            onChange={val => this.setState({
              sortDiscount: val,
            })
            }
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
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定
        </Button>
      </React.Fragment>
    )
  }
}

export default CateGoryPanel
