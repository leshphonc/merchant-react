import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, Card } from 'antd-mobile'
import { Link } from 'react-router-dom'

@inject('storeFront')
@observer
class ManagementCategory extends React.Component {
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

  mapList = () => {
    const { storeFront } = this.props
    const { categoryList } = storeFront
    return categoryList.map(item => (
      <React.Fragment key={item.sort_id}>
        <Card>
          <Card.Header title={item.sort_name} />
          <Card.Body>{item.week_str}</Card.Body>
          <Card.Footer
            extra={
              <React.Fragment>
                <Link to="/management/storefront/categoryPanel/编辑" style={{ color: '#888', marginRight: 15 }}>
                  <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                    &#xe634;
                  </i>
                  编辑
                </Link>
                <span>
                  <i className="iconfont" style={{ color: '#ffb000', marginRight: 5 }}>
                    &#xe621;
                  </i>
                  删除
                </span>
              </React.Fragment>
            }
          />
        </Card>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
    const { height } = this.state
    return (
      <React.Fragment>
        <NavBar
          title="商品分类"
          goBack
          right={
            <Link to="/management/storefront/categoryPanel/添加" style={{ color: '#fff' }}>
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

export default ManagementCategory
