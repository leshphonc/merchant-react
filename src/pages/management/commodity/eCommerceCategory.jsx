import React from 'react'
import NavBar from '@/common/NavBar'
import { Button, WhiteSpace, WingBlank, Flex, Modal, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { alert } = Modal

@inject('commodity')
@observer
class eCommerceCategory extends React.Component {
  componentDidMount() {
    const { commodity } = this.props
    commodity.fetchShopCategory()
  }

  mapList = () => {
    const { commodity, history } = this.props
    return commodity.shopCategory.map(item => (
      <React.Fragment key={item.sort_id}>
        <div
          style={{ background: '#fff', borderRadius: 4, padding: 10 }}
          onClick={() => this.goSecond(item.sort_id)}
        >
          <Flex justify="center" align="center">
            <Flex.Item style={{ flex: 9, lineHeight: '25px' }}>{item.sort_name}</Flex.Item>
            <Flex.Item
              style={{ lineHeight: '25px', color: '#666' }}
              onClick={e => {
                e.stopPropagation()
                history.push(`/management/commodity/eCommerceCategoryPanel/编辑/1/${item.sort_id}`)
              }}
            >
              <i
                className="iconfont"
                style={{ fontSize: 18, marginLeft: 5, verticalAlign: 'bottom' }}
              >
                &#xe7fe;
              </i>
            </Flex.Item>
            <Flex.Item
              style={{ lineHeight: '25px', color: '#666' }}
              onClick={e => {
                e.stopPropagation()
                alert(
                  '删除一级分类',
                  '是否删除一级分类下的子分类，（子分类内的项目将会自动解绑）',
                  [
                    {
                      text: '取消',
                    },
                    {
                      text: '确定',
                      style: { color: 'red' },
                      onPress: () => {
                        commodity.deleteShopFirstCategory(item.sort_id).then(res => {
                          if (res) {
                            Toast.success('删除成功', 1, () => commodity.fetchShopCategory())
                          }
                        })
                      },
                    },
                  ],
                )
              }}
            >
              <i
                className="iconfont"
                style={{ fontSize: 18, marginLeft: 5, verticalAlign: 'bottom', color: 'red' }}
              >
                &#xe621;
              </i>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex style={{ color: '#666' }}>
            <Flex.Item>开启周几显示：{item.is_weekshow === '1' ? '开启' : '关闭'}</Flex.Item>
          </Flex>
          <WhiteSpace />
          {item.is_weekshow === '1' ? (
            <Flex style={{ color: '#666' }}>
              <Flex.Item>
                {item.week.split(',').map(i => (
                  <span style={{ marginRight: 6 }} key={i}>
                    星期{i === '0' ? '7' : i}
                  </span>
                ))}
              </Flex.Item>
            </Flex>
          ) : null}

          <WhiteSpace />
          <Flex style={{ color: '#666' }}>
            <Flex.Item>折扣率：{item.sort_discount}</Flex.Item>
          </Flex>
          <WhiteSpace />
        </div>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  goSecond = id => {
    const { commodity, history } = this.props
    commodity.fetchShopSecondCategory(id).then(() => {
      if (commodity.shopCategoryChild.project.length) {
        history.push(`/management/commodity/shopCategoryProject/${id}`)
      } else if (commodity.shopCategoryChild.twoCate.length) {
        history.push(`/management/commodity/eCommerceSecondCategory/${id}`)
      } else {
        history.push(`/management/commodity/eCommerceSecondCategory/${id}`)
      }
    })
  }

  render() {
    const { history } = this.props
    return (
      <>
        <NavBar
          title="服务分类管理"
          goBack
          right={
            <Button
              size="small"
              type="ghost"
              style={{ color: '#fff', border: '1px solid #fff' }}
              onClick={() => history.push({
                pathname: '/management/commodity/eCommerceCategoryPanel/新增/1',
                state: 1,
              })
              }
            >
              添加
            </Button>
          }
        />
        <WhiteSpace size="lg" />
        <WingBlank>{this.mapList()}</WingBlank>
      </>
    )
  }
}

export default eCommerceCategory
