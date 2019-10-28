import React from 'react'
import { List, Button, Modal, WhiteSpace, Toast } from 'antd-mobile'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'

@inject('storeFront')
@observer
class StoreFrontBusinessServiceList extends React.Component {
  state = {
    list: [],
  }
  componentDidMount() {
    this.getNowStation()
  }

  getNowStation = () => {
    const { storeFront, match } = this.props
    storeFront.getNowStation(match.params.id).then(res => {
      this.setState({
        list: res,
      })
    })
  }

  mapList = () => {
    const { match } = this.props
    const { list } = this.state
    return list.map(item => {
      return (
        <List.Item
          key={item.id}
          extra={
            <Button
              type="primary"
              size="small"
              style={{ width: 60, float: 'right', marginRight: 10 }}
              onClick={() =>
                Modal.prompt(
                  '修改标识名称',
                  '',
                  [
                    { text: '取消' },
                    {
                      text: '确定',
                      onPress: value => {
                        const { storeFront } = this.props
                        storeFront
                          .createStation(1, match.params.id, value, item.id)
                          .then(() => {
                            Toast.success('编辑成功', 1, () =>
                              this.getNowStation(),
                            )
                          })
                      },
                    },
                  ],
                  'default',
                  item.s_name,
                )
              }
            >
              编辑
            </Button>
          }
        >
          {item.s_name}
        </List.Item>
      )
    })
  }

  render() {
    const { match } = this.props
    return (
      <>
        <NavBar
          title="自定义买单标识"
          goBack
          right={
            <Button
              type="ghost"
              size="small"
              style={{ fontSize: 16, color: '#fff' }}
              onClick={() =>
                Modal.prompt(
                  '新增标识',
                  '',
                  [
                    { text: '取消' },
                    {
                      text: '确定',
                      onPress: value => {
                        const { storeFront } = this.props
                        storeFront
                          .createStation(1, match.params.id, value)
                          .then(() => {
                            Toast.success('创建成功', 1, () =>
                              this.getNowStation(),
                            )
                          })
                      },
                    },
                  ],
                  'default',
                  null,
                  ['新增标识名称'],
                )
              }
            >
              添加
            </Button>
          }
        />
        <WhiteSpace />
        <List>{this.mapList()}</List>
      </>
    )
  }
}

export default StoreFrontBusinessServiceList
