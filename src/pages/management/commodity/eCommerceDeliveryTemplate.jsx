import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, WhiteSpace } from 'antd-mobile'
import { Link } from 'react-router-dom'

@inject('commodity')
@observer
class ECommerceDeliveryTemplate extends React.Component {
  componentDidMount() {
    const { commodity } = this.props
    commodity.fetchExpressLists()
  }

  mapList = () => {
    const { commodity, history } = this.props
    return commodity.expressLists.map(item => (
      <List.Item
        key={item.value}
        arrow="horizontal"
        onClick={() => history.push(`/management/commodity/eCommerceDeliveryTemplatePanel/${item.value}`)
        }
      >
        {item.label}
      </List.Item>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          title="运费模版列表"
          goBack
          right={
            <Link
              style={{ color: '#fff' }}
              to="/management/commodity/eCommerceDeliveryTemplatePanel"
            >
              添加
            </Link>
          }
        />
        <WhiteSpace />
        <List>{this.mapList()}</List>
      </React.Fragment>
    )
  }
}

export default ECommerceDeliveryTemplate
