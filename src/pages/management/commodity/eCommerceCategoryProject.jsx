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
  Switch,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { alert } = Modal
const { RadioItem } = Radio

@inject('commodity')
@observer
class eCommerceCategoryProject extends React.Component {
  state = { open: false, checked: '' }

  componentDidMount() {
    const { commodity, match } = this.props
    if (!commodity.shopCategoryChild.project.length) {
      commodity.fetchShopSecondCategory(match.params.id)
    }
    commodity.fetchNoBindProjectE()
  }

  mapList = () => {
    const { commodity } = this.props
    return commodity.shopCategoryChild.project.map(item => (
      <React.Fragment key={item.goods_id}>
        <Card>
          <Card.Header
            title={item.s_name}
            thumb={item.list_pic}
            extra={item.store_name}
          />
          <Card.Body>
            <Flex style={{ color: '#666' }}>
              <Flex.Item>售价: {item.price} 元</Flex.Item>
              <Flex.Item>
                库存:
                {item.stock_num !== '-1'
                  ? item.stock_num - item.sell_count
                  : '不限'}
              </Flex.Item>
              <Flex.Item>已售出: {item.sell_count}</Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <Button
                  type="warning"
                  size="small"
                  onClick={() => this.unbindCategory(item.goods_id)}
                >
                  解绑 <i className="iconfont">&#xe64b;</i>
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <WhiteSpace />
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
          commodity.unbindCategoryE(id).then(res => {
            if (res) {
              Toast.success('解绑成功', 1, () => {
                commodity.fetchShopSecondCategory(match.params.id)
                commodity.fetchNoBindProjectE()
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
    commodity.bindProjectToCategoryE(checked, match.params.id).then(res => {
      if (res) {
        Toast.success('绑定成功', 1, () => {
          commodity.fetchShopSecondCategory(match.params.id)
          commodity.fetchNoBindProjectE()
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
              checked={checked === i.goods_id}
              onChange={() =>
                this.setState({
                  checked: i.goods_id,
                })
              }
            >
              <img
                src={i.image}
                alt=""
                style={{ width: 30, height: 30, marginRight: 20 }}
              />
              {i.name}
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
          title="电商商品"
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
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
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

export default eCommerceCategoryProject
