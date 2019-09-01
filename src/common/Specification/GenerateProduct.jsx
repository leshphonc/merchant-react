/* eslint-disable array-callback-return */
import React from 'react'
import { List } from 'antd-mobile'

class GenerateProduct extends React.Component {
  renderList = []

  mapList = () => {
    const { specification, attribute } = this.props
    console.log(attribute)
    const result = []
    specification.forEach(item => {
      result.push(item.spec_val)
    })
    const len = result.length
    let i = 0
    if (len > 1) {
      result[0].map(item => {
        const arr = []
        i += 1
        arr.push(item, ...this.forEachItem(result, i, len))
      })
    } else {
      result[i].map(item => {
        this.renderList.push(item)
      })
    }

    console.log(result)
  }

  forEachItem = (result, i, len) => {
    let count = i
    result[i].forEach(item => {
      if (count === len) {
        return false
      }
      this.renderList.push(item)
      count += 1
      this.forEachItem(result, i, len)
    })
  }

  render() {
    return (
      <React.Fragment>
        <List />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default GenerateProduct
