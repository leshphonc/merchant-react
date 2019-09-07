import React from 'react'
import { List, Checkbox } from 'antd-mobile'

class ECommerceCategory extends React.Component {
  state = {
    check: [],
  }

  componentDidMount() {
    console.log('cun')
    const { check } = this.props
    console.log(check)
    this.setState({
      check,
    })
  }

  checkValue = e => {
    const { check } = this.state
    const obj = JSON.parse(JSON.stringify(check))
    const index = check.indexOf(e.target.id)
    if (index !== -1) {
      obj.splice(index, 1)
      this.setState({
        check: [...obj],
      })
    } else {
      this.setState({
        check: [...obj, e.target.id],
      })
    }
  }

  mapList = () => {
    const { data, check, type } = this.props
    if (!data) return
    // eslint-disable-next-line consistent-return
    return data.map(item => {
      if (item.cat_type === type && item.son_list) {
        return (
          <List.Item
            wrap
            key={item.cat_id}
            extra={
              item.son_list
              && item.son_list.map(item2 => {
                const index = check.indexOf(`${item.cat_id}-${item2.cat_id}`)
                return (
                  <div key={item2.cat_id} style={{ marginRight: 5, display: 'inline-block' }}>
                    <Checkbox
                      defaultChecked={index !== -1}
                      id={`${item.cat_id}-${item2.cat_id}`}
                      onChange={this.checkValue}
                    >
                      <span style={{ marginLeft: 5 }}>{item2.cat_name}</span>
                    </Checkbox>
                  </div>
                )
              })
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
