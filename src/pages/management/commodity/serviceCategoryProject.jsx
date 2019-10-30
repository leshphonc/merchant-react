import React from 'react'
import NavBar from '@/common/NavBar'
import {
  Flex,
  WhiteSpace,
  WingBlank,
  Button,
  Card,
  Modal,
  Toast,
  Drawer,
  List,
  Radio,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

const { alert } = Modal
const { RadioItem } = Radio

@inject('commodity')
@observer
class ServiceCategoryProject extends React.Component {
  state = { open: false, checked: '' }

  componentDidMount() {
    const { commodity, match } = this.props
    if (!commodity.serviceCategoryChild.project.length) {
      commodity.fetchCategoryChild(match.params.id)
    }
    commodity.fetchNoBindProject()
  }

  mapList = () => {
    const { commodity } = this.props
    return commodity.serviceCategoryChild.project.map(item => (
      <React.Fragment key={item.appoint_id}>
        <Card>
          <Card.Header
            title={item.appoint_name}
            thumb={item.pic}
            extra={item.appoint_type === '1' ? '上门' : '到店'}
          />
          <Card.Body>
            <div style={{ color: '#777' }}>{item.appoint_content}</div>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>原价：{item.old_price} 元</span>
              </Flex.Item>
              <Flex.Item>
                {item.payment_status === '1' ? (
                  <span>定金：{item.payment_money} 元</span>
                ) : null}
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
                  预约开始时间：
                  {moment(item.start_time * 1000).format('YYYY-MM-DD HH:mm')}
                </span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>
                  预约结束时间：
                  {moment(item.end_time * 1000).format('YYYY-MM-DD HH:mm')}
                </span>
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
              Toast.success('解绑成功', 1, () => {
                commodity.fetchCategoryChild(match.params.id)
                commodity.fetchNoBindProject()
              })
            }
          })
        },
      },
    ])
  }

  bindProjectToCategory = () => {
    const { commodity, match } = this.props
    const { checked } = this.state
    commodity.bindProjectToCategory(checked, match.params.id).then(res => {
      if (res) {
        Toast.success('绑定成功', 1, () => {
          commodity.fetchCategoryChild(match.params.id)
          commodity.fetchNoBindProject()
          this.changeOpenStatus()
        })
      }
    })
  }

  changeOpenStatus = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      checked: '',
    })
  }

  mapSingleList = () => {}

  render() {
    const { commodity } = this.props
    const { open, checked } = this.state
    const sidebar = (
      <>
        <List style={{ maxHeight: 'calc(100% - 47px)', overflow: 'auto' }}>
          {commodity.noBindProject.map((i, index) => (
            <RadioItem
              key={index}
              checked={checked === i.appoint_id}
              onChange={() =>
                this.setState({
                  checked: i.appoint_id,
                })
              }
            >
              <img
                src={i.pic}
                alt=""
                style={{ width: 30, height: 30, marginRight: 20 }}
              />
              {i.appoint_name}
            </RadioItem>
          ))}
        </List>
        <Button
          type="primary"
          style={{ borderRadius: 0 }}
          onClick={() => this.bindProjectToCategory()}
        >
          确定
        </Button>
      </>
    )
    return (
      <>
        <NavBar
          title="服务项目"
          goBack
          right={
            <Button
              type="ghost"
              size="small"
              style={{ color: '#fff', border: '1px solid #fff' }}
              onClick={this.changeOpenStatus}
            >
              添加
            </Button>
          }
        />
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight - 54 }}
          contentStyle={{ color: '#A6A6A6' }}
          sidebar={sidebar}
          position="right"
          open={open}
          onOpenChange={this.changeOpenStatus}
        >
          <WhiteSpace size="lg" />
          <WingBlank>{this.mapList()}</WingBlank>
        </Drawer>
      </>
    )
  }
}

export default ServiceCategoryProject
