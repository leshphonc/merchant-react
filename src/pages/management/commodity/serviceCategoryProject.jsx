import React from 'react'
import NavBar from '@/common/NavBar'
import { Flex, WhiteSpace, WingBlank, Button, Card, Modal, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

const { alert } = Modal

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
      <React.Fragment
        key={item.create_time}
        style={{ background: '#fff', borderRadius: 4, padding: 10 }}
      >
        <Card>
          <Card.Header
            title={item.appoint_name}
            thumb={item.pic}
            extra={item.appoint_type === '1' ? '上门' : '到店'}
          >
          </Card.Header>
          <Card.Body>
            <div style={{ color: '#777' }}>{item.appoint_content}</div>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>原价：{item.old_price} 元</span>
              </Flex.Item>
              <Flex.Item>
                {item.payment_status === '1' ? <span>定金：{item.payment_money} 元</span> : null}
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>可提前预约天数：{item.appoint_date_num} 天</span>
              </Flex.Item>
              <Flex.Item>
                <span>耗时：{item.expend_time} 分钟</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>
                  预约开始时间：{moment(item.start_time * 1000).format('YYYY-MM-DD hh:mm')}
                </span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>预约结束时间：{moment(item.end_time * 1000).format('YYYY-MM-DD hh:mm')}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>
                <Button
                  type="warning"
                  size="small"
                  onClick={() => this.unbindCategory(item.appoint_id)}
                >
                  解绑 <i className="iconfont">&#xe64b;</i>
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
        </Card>
        <WhiteSpace size="lg" />
      </React.Fragment>
    ))
  }

  unbindCategory = id => {
    const { commodity, match } = this.props
    alert('解绑项目', '是否将项目与分类解绑？', [
      { text: '取消' },
      {
        text: '解绑',
        onPress: () => {
          commodity.unbindCategory(id).then(res => {
            if (res) {
              Toast.success('解绑成功', 1, () => commodity.fetchCategoryChild(match.params.id))
            }
          })
        },
      },
    ])
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
