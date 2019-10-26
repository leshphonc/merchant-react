import React from 'react'
import { List, Button, Modal, WhiteSpace } from 'antd-mobile'
import NavBar from '@/common/NavBar'

class StoreFrontBusinessServiceList extends React.Component {
  mapList = () => {
    return (
      <List.Item
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
                    onPress: value => console.log(`输入的内容:${value}`),
                  },
                ],
                'default',
                '标识1',
              )
            }
          >
            编辑
          </Button>
        }
      >
        标识1
      </List.Item>
    )
  }

  render() {
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
                      onPress: value => console.log(`输入的内容:${value}`),
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
