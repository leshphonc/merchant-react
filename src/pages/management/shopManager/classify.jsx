import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {
  ListItem, ItemTop, TopContent,
} from '@/styled'
import { Btn } from './styled'

@inject('shopManager')
@observer
class Classify extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { shopManager } = this.props
    shopManager.fetchClassify()
  }

  detele = id => {
    const { shopManager } = this.props
    shopManager.fetchClassifyDelete(id).then(() => {
      shopManager.fetchClassify()
    })
  }

  mapList = () => {
    const { shopManager, history } = this.props
    const { classify } = shopManager
    // console.log(toJS(classify))
    return classify.map(item => (
      <React.Fragment key={item.id}>
        <ListItem>
          <ItemTop>
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                编号：{item.id}
              </div>
              <WhiteSpace />
              <div>分类名称: {item.name}</div>
              <WhiteSpace />
              <Btn>
                <Button
                  type="button"
                  onClick={() => history.push(
                    `/management/shopManager/classifyPanel/编辑/${item.id}`,
                  )
                  }
                >
                  编辑
                </Button>
              </Btn>
              <Btn>
                <Button
                  style={{ display: 'inline-block', marginLeft: '30px' }}
                  onClick={() => this.detele(item.id)}
                >
                  删除
                </Button>
              </Btn>
            </TopContent>
          </ItemTop>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          title="管理分类"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/shopManager/classifyPanel/添加">
              添加
            </Link>
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
        <WhiteSpace />
      </React.Fragment>
    )
  }
}

export default Classify
