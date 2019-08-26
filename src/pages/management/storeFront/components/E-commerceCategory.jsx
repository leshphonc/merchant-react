import React from 'react'
import { List, Checkbox } from 'antd-mobile'

class ECommerceCategory extends React.Component {
  state = {
    check: [],
  }

  checkValue = e => {
    const { check } = this.state
    const index = check.indexOf(e.target.id)
    if (index !== -1) {
      check.splice(index, 1)
      this.setState({
        check: [...check],
      })
    } else {
      this.setState({
        check: [...check, e.target.id],
      })
    }
  }

  mapList = () => {
    const { data } = this.props
    if (!data) return
    // eslint-disable-next-line consistent-return
    return data.map(item => {
      if (item.cat_type === '1' && item.son_list) {
        return (
          <List.Item
            wrap
            key={item.cat_id}
            extra={
              item.son_list
              && item.son_list.map(item2 => (
                <div key={item2.cat_id} style={{ marginRight: 5, display: 'inline-block' }}>
                  <Checkbox id={`${item.cat_id}-${item2.cat_id}`} onChange={this.checkValue}>
                    <span style={{ marginLeft: 5 }}>{item2.cat_name}</span>
                  </Checkbox>
                </div>
              ))
            }
          >
            {item.cat_name}
          </List.Item>
        )
      }
      return null
    })
  }

  render() {
    return <React.Fragment>{this.mapList()}</React.Fragment>
  }
}

export default ECommerceCategory
