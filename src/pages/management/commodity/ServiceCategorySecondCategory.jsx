import React from 'react'
import NavBar from '@/common/NavBar'
import { Button, Modal, Flex, WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import { observer, inject } from 'mobx-react'

const { alert, prompt } = Modal

@inject('commodity')
@observer
class ServiceCategorySecondCategory extends React.Component {
  componentDidMount() {
    const { commodity, match } = this.props
    if (!commodity.serviceCategoryChild.twoCate.length) {
      commodity.fetchCategoryChild(match.params.id)
    }
  }

  mapList = () => {
    const { commodity, match } = this.props
    return commodity.serviceCategoryChild.twoCate.map(item => (
      <React.Fragment key={item.create_time}>
        <Flex
          justify="center"
          align="center"
          style={{ background: '#fff', borderRadius: 4, padding: 10 }}
          onClick={() => this.goService(item.cat_id)}
        >
          <Flex.Item style={{ flex: 9, lineHeight: '25px' }}>{item.cat_name}</Flex.Item>
          <Flex.Item
            style={{ lineHeight: '25px', color: '#666' }}
            onClick={e => {
              e.stopPropagation()
              prompt(
                '编辑二级分类名称',
                '',
                [
                  {
                    text: '取消',
                  },
                  {
                    text: '确定',
                    onPress: value => {
                      commodity.modifySecondCategory(
                        {
                          cat_name: value,
                          cat_id: item.cat_id,
                        },
                        match.params.id,
                      )
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
              alert('删除二级分类', '二级分类内的项目将会自动解绑', [
                {
                  text: '取消',
                },
                {
                  text: '确定',
                  style: { color: 'red' },
                  onPress: () => {
                    commodity.deleteSecondCategory(item.cat_id).then(res => {
                      if (res) {
                        Toast.success('删除成功', 1, () => commodity.fetchCategoryChild(match.params.id))
                      }
                    })
                  },
                },
              ])
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

  goService = id => {
    const { history } = this.props
    history.push(`/management/commodity/serviceCategoryProject/${id}`)
  }

  createCategory = () => {
    const { commodity, match } = this.props
    // () => history.push('/management/commodity/serviceCategoryPanel/添加')
    prompt('新增二级分类', '请输入二级分类名称', [
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress: value => {
          commodity.createSecondCategory(
            JSON.stringify([
              {
                cat_fid: match.params.id,
                cat_name: value,
              },
            ]),
            match.params.id,
          )
        },
      },
    ])
  }

  render() {
    return (
      <>
        <NavBar
          title="二级分类"
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

export default ServiceCategorySecondCategory
