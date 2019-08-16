import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  WhiteSpace, Card, Modal, Toast,
} from 'antd-mobile'
import { Link } from 'react-router-dom'

const { alert } = Modal

@inject('storeFront')
@observer
class CategoryManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: document.documentElement.clientHeight,
    }
    this.listView = React.createRef()
  }

  componentDidMount() {
    const { storeFront, match } = this.props
    const { height } = this.state
    console.log(this.props)
    storeFront.fetchCategoryList(match.params.id, match.params.type)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.listView.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  deleteCategory = id => {
    const { storeFront, match } = this.props
    storeFront.deleteCategory(match.params.id, match.params.type, id).then(res => {
      if (res) {
        Toast.success('删除成功', 1, () => storeFront.fetchCategoryList(match.params.id, match.params.type))
      }
    })
  }

  mapList = () => {
    const { storeFront, match } = this.props
    const { categoryList } = storeFront
    return categoryList.map(item => (
      <React.Fragment key={item.sort_id}>
        <Card>
          <Card.Header title={item.sort_name} />
          <Card.Body>{item.week_str}</Card.Body>
          <Card.Footer
            extra={
              <React.Fragment>
                <Link
                  to={`/management/storefront/categoryPanel/编辑/${match.params.id}/${
                    match.params.type
                  }/${item.sort_id}`}
                  style={{ color: '#888', marginRight: 15 }}
                >
                  <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                    &#xe634;
                  </i>
                  编辑
                </Link>
                <button
                  type="button"
                  style={{ color: '#888' }}
                  onClick={() => alert('删除', '确定删除此分类？', [
                    { text: '取消' },
                    { text: '删除', onPress: () => this.deleteCategory(item.sort_id) },
                  ])
                  }
                >
                  <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                    &#xe621;
                  </i>
                  删除
                </button>
              </React.Fragment>
            }
          />
        </Card>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
    const { match } = this.props
    const { height } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="商品分类"
          goBack
          right={
            <Link
              to={`/management/storefront/categoryPanel/添加/${match.params.id}/${
                match.params.type
              }`}
              style={{ color: '#fff' }}
            >
              添加分类
            </Link>
          }
        />
        <WhiteSpace />
        <div ref={this.listView} style={{ height, overflow: 'auto' }}>
          {this.mapList()}
        </div>
      </React.Fragment>
    )
  }
}

export default CategoryManagement
