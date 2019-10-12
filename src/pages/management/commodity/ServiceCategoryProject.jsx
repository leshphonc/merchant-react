import React from 'react'
import NavBar from '@/common/NavBar'
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

@inject('commodity')
@observer
class ServiceCategoryProject extends React.Component {
  componentDidMount() {
    const { commodity, match } = this.props
    if (!commodity.serviceCategoryChild.project.length) {
      commodity.fetchCategoryChild(match.params.id)
    }
  }

  mapList = () => {
    const { commodity } = this.props
    return commodity.serviceCategoryChild.project.map(item => (
      <React.Fragment key={item.create_time}>
        <Flex
          justify="center"
          align="center"
          style={{ background: '#fff', borderRadius: 4, padding: 10 }}
          onClick={() => this.goService(item.cat_id)}
        >
          <Flex.Item style={{ flex: 5, lineHeight: '25px' }}>{item.cat_name}</Flex.Item>
          <Flex.Item
            style={{ lineHeight: '25px', color: '#666' }}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            (25)
            <i
              className="iconfont"
              style={{ fontSize: 18, marginLeft: 5, verticalAlign: 'bottom' }}
            >
              &#xe7fe;
            </i>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <>
        <NavBar title="服务项目" goBack />
        <WhiteSpace size="lg" />
        <WingBlank>{this.mapList()}</WingBlank>
      </>
    )
  }
}

export default ServiceCategoryProject
