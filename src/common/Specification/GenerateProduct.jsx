/* eslint-disable array-callback-return */
import React from 'react'
import {
  List, InputItem, Button, Toast,
} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { createForm } from 'rc-form'

@withRouter
@createForm()
class GenerateProduct extends React.Component {
  specs = []

  specId = []

  specVal = []

  specValId = []

  properties = []

  propertiesId = []

  propertiesVal = []

  propertiesNum = []

  mapList = () => {
    const { specification, attribute, form } = this.props
    console.log(specification)
    console.log(attribute)
    const { getFieldProps } = form
    const result = []
    const specs = []
    const specId = []
    const specVal = []
    const specValId = []
    const properties = []
    const propertiesId = []
    const propertiesVal = []
    const propertiesNum = []
    specification.forEach(item => {
      result.push(item.spec_val)
      specs.push(item.spec_name)
      specId.push(0)
      specVal.push(item.spec_val)
      const arr = []
      item.spec_val.forEach(() => {
        arr.push(0)
      })
      specValId.push(arr)
    })
    attribute.forEach(item => {
      properties.push(item.attr_name)
      propertiesId.push(0)
      propertiesVal.push(item.attr_val)
      const arr = []
      item.attr_val.forEach(() => {
        arr.push(0)
      })
      propertiesNum.push(arr)
    })
    this.specs = specs
    this.specId = specId
    this.specVal = specVal
    this.specValId = specValId
    this.properties = properties
    this.propertiesId = propertiesId
    this.propertiesVal = propertiesVal
    this.propertiesNum = propertiesNum
    const renderList = this.forEachItem(specification)
    console.log(renderList)
    // const len = result.length
    // const i = 0
    // if (len > 1) {
    //   result.map(item => {
    //     const arr = []
    //     this.renderList[i].push(arr)
    //   })
    // } else {
    //   result[i].map(item => {
    //     this.renderList.push(item)
    //   })
    // }

    return renderList.map((item, index) => (
      <React.Fragment key={item.name}>
        <List renderHeader={item.name}>
          <InputItem
            {...getFieldProps(`cost_prices${index}`, {
              rules: [{ required: true }],
            })}
            placeholder="请填写进价"
          >
            进价
          </InputItem>
          <InputItem
            {...getFieldProps(`prices${index}`, {
              rules: [{ required: true }],
            })}
            placeholder="请填写现价"
          >
            现价
          </InputItem>
          <InputItem
            {...getFieldProps(`seckill_prices${index}`, {
              rules: [{ required: true }],
            })}
            placeholder="请填写限时价"
          >
            限时价
          </InputItem>
          <InputItem {...getFieldProps(`numbers${index}`, {})} placeholder="请填写商品条形码">
            商品条形码
          </InputItem>
          <InputItem
            {...getFieldProps(`stock_nums${index}`, {
              rules: [{ required: true }],
            })}
            placeholder="请填写库存"
          >
            库存
          </InputItem>
          {attribute.map((item2, index2) => (
            <InputItem
              {...getFieldProps(`num${index2}${index}`, {
                rules: [{ required: true }],
              })}
              key={index2}
              placeholder="请填写可选个数"
            >
              {item2.attr_name}可选个数
            </InputItem>
          ))}
        </List>
      </React.Fragment>
    ))
  }

  forEachItem = arrs => arrs.reduce((a, b) => {
    const arr = []
    console.log(a)
    a.spec_val.forEach(i => {
      b.spec_val.forEach(j => {
        arr.push({
          name: `${i}_${j}`,
        })
      })
    })
    return arr
  })

  submit = () => {
    const { attribute, form, history } = this.props
    form.validateFields((error, value) => {
      if (error) {
        Toast.info('请填写完整信息')
        return false
      }
      console.log(value)
      const numbers = []
      const costPrices = []
      const prices = []
      const seckillPrices = []
      const stockNums = []
      const num0 = []
      const num1 = []
      const num2 = []
      const num3 = []
      const num4 = []
      const num5 = []
      const keys = Object.keys(value)
      console.log(keys)
      keys.forEach(item => {
        const str = item.substr(0, item.length - 1)
        if (str === 'numbers') {
          numbers.push(value[item])
        }
        if (str === 'cost_prices') {
          costPrices.push(value[item])
        }
        if (str === 'prices') {
          prices.push(value[item])
        }
        if (str === 'seckill_prices') {
          seckillPrices.push(value[item])
        }
        if (str === 'stock_nums') {
          stockNums.push(value[item])
        }
        attribute.forEach((item2, index) => {
          if (str === `num${index}`) {
            eval(`num${index}`).push(value[item])
          }
        })
      })
      const obj = {
        specs: this.specs,
        spec_id: this.specId,
        spec_val: this.specVal,
        spec_val_id: this.specValId,
        properties: this.properties,
        properties_id: this.propertiesId,
        properties_val: this.propertiesVal,
        properties_num: this.propertiesNum,
        numbers,
        cost_prices: costPrices,
        prices,
        seckill_prices: seckillPrices,
        stock_nums: stockNums,
      }
      attribute.forEach((item, index) => {
        obj[`num${index}`] = eval(`num${index}`)
        item.attr_val.forEach((item2, index2) => {
          obj[`propertise_val_status_${index}_${index2}`] = 1
        })
      })
      sessionStorage.setItem('spec', JSON.stringify(obj))
      history.goBack()
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.mapList()}
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
      </React.Fragment>
    )
  }
}

export default GenerateProduct
