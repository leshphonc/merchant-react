import React from 'react'
import { List, Picker, InputItem } from 'antd-mobile'

class MemberDiscount extends React.Component {
  state = {
    leveloff: [
      {
        name: '青铜会员',
        type: '0',
        vv: '',
        id: '9',
      },
      {
        name: '白银会员',
        type: '0',
        vv: '',
        id: '10',
      },
      {
        name: '黄金会员',
        type: '0',
        vv: '',
        id: '11',
      },
      {
        name: '城市合伙人',
        type: '0',
        vv: '',
        id: '12',
      },
      {
        name: '区域合伙人',
        type: '0',
        vv: '',
        id: '13',
      },
      {
        name: '总部合伙人',
        type: '0',
        vv: '',
        id: '14',
      },
    ],
  }

  mapList = () => {
    const { leveloff } = this.state
    return leveloff.map((item, index) => (
      <React.Fragment key={item.name}>
        <Picker
          title="优惠方式"
          extra="请选择"
          cols={1}
          data={[
            {
              label: '无优惠',
              value: '0',
            },
            {
              label: '百分比（%）',
              value: '1',
            },
          ]}
          value={[item.type]}
          onChange={val => {
            // eslint-disable-next-line prefer-destructuring
            leveloff[index].type = val[0]
            this.setState({
              leveloff,
            })
          }}
        >
          <List.Item arrow="horizontal">{item.name}</List.Item>
        </Picker>
        {item.type !== '0' ? (
          <InputItem
            placeholder="请填写优惠值"
            value={item.vv}
            onChange={val => {
              // eslint-disable-next-line prefer-destructuring
              leveloff[index].vv = val
              this.setState({
                leveloff,
              })
            }}
          >
            优惠数值
          </InputItem>
        ) : null}
      </React.Fragment>
    ))
  }

  render() {
    return <React.Fragment>{this.mapList()}</React.Fragment>
  }
}

export default MemberDiscount
