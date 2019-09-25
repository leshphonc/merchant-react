import React from 'react'
import NavBar from '@/common/NavBar'
import { Icon, Picker } from 'antd-mobile'

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
]

class SmartScreen extends React.Component {
  state = {
    open: false,
    value: ['2013', '夏'],
  }

  render() {
    const { open, value } = this.state
    return (
      <>
        <NavBar
          title="智能屏推广"
          goBack
          right={
            <Picker data={seasons} title="选择季节" cascade={false} value={value}>
              <Icon type="ellipsis" onClick={() => this.setState({ open: !open })} />
            </Picker>
          }
        />
      </>
    )
  }
}

export default SmartScreen
