import React from 'react'
import NavBar from '@/common/NavBar'
import { Button, WhiteSpace, WingBlank, Flex, Modal, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { alert, prompt } = Modal

@inject('commodity')
@observer
class ServiceCategory extends React.Component {
  componentDidMount() {
    const { commodity } = this.props
    commodity.fetchServiceCategory()
  }

  mapList = () => {
    const { commodity } = this.props
    return commodity.serviceCategory.map(item => (
      <React.Fragment key={item.create_time}>
        <Flex
          justify="center"
          align="center"
          style={{ background: '#fff', borderRadius: 4, padding: 10 }}
          onClick={() => this.goSecond(item.cat_id)}
        >
          <Flex.Item style={{ flex: 9, lineHeight: '25px' }}>{item.cat_name}</Flex.Item>
          <Flex.Item
            style={{ lineHeight: '25px', color: '#666' }}
            onClick={e => {
              e.stopPropagation()
              prompt(
                '编辑一级分类名称',
                '',
                [
                  {
                    text: '取消',
                  },
                  {
                    text: '确定',
                    onPress: value => {
                      commodity.modifyFirstCategory({
                        cat_name: value,
                        cat_id: item.cat_id,
                      })
                    },
                  },
                ],
                'default',
                item.cat_name,
              )
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
                '是否删除一级分类下的子分类',
                [
                  {
                    text: '取消',
                  },
                  {
                    text: '确定',
                    style: { color: 'red' },
                    onPress: () => {
                      commodity.deleteFirstCategory(item.cat_id).then(res => {
                        if (res) {
                          Toast.success('删除成功', 1, () => commodity.fetchServiceCategory())
                        }
                      })
                    },
                  },
                ],
                'default',
                item.cat_name,
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
        <WhiteSpace size="lg" />
      </React.Fragment>
    ))
  }

  goSecond = id => {
    const { commodity, history } = this.props
    commodity.fetchCategoryChild(id).then(() => {
      if (commodity.serviceCategoryChild.project.length) {
        history.push(`/management/commodity/serviceCategoryProject/${id}`)
      } else if (commodity.serviceCategoryChild.twoCate.length) {
        history.push(`/management/commodity/serviceCategorySecondCategory/${id}`)
      } else {
        history.push(`/management/commodity/serviceCategorySecondCategory/${id}`)
      }
    })
  }

  createCategory = () => {
    const { commodity } = this.props
    // () => history.push('/management/commodity/serviceCategoryPanel/添加')
    prompt('新增一级分类', '请输入一级分类名称', [
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress: value => {
          commodity.createFirstCategory(value)
        },
      },
    ])
  }

  render() {
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
              onClick={this.createCategory}
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

export default ServiceCategory
