import React from 'react'
import NavBar from '@/common/NavBar'
import { Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {
  ListItem, ItemTop, TopContent, List,
} from '@/styled'
import moment from 'moment'
import ShopPanel from './shopPanel'
import { Btn } from './styled'
import Classify from './classify'
import ClassifyPanel from './classifyPanel'

@inject('shopManager')
@observer
class ShopManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { shopManager } = this.props
    shopManager.fetchStaffList()
  }

  detele = staffId => {
    const { shopManager } = this.props
    shopManager.fetchStaffDelete(staffId).then(() => {
      shopManager.fetchStaffList()
    })
  }

  mapList = () => {
    const { shopManager, history } = this.props
    const { staffList } = shopManager
    return staffList.map(item => (
      <React.Fragment key={item.staff_id}>
        <ListItem>
          <ItemTop style={{ width: '70%', display: 'inline-block' }}>
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                电话：{item.tel}
              </div>
              <WhiteSpace />
              <div>店员账号: {item.username}</div>
              <WhiteSpace />
              <div>店员姓名: {item.name}</div>
              <WhiteSpace />
              <div>所属店铺: {item.storename}</div>
              <WhiteSpace />
              <div>添加时间: {moment(item.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
            </TopContent>
          </ItemTop>
          <div style={{ width: '20%', display: 'inline-block', float: 'right' }}>
            <Btn>
              <Button
                style={{ marginTop: '20px' }}
                type="button"
                onClick={() => history.push(
                  `/management/shopManager/shopPanel/编辑/${item.store_id}/${item.staff_id}`,
                )
                }
              >
                编辑
              </Button>
            </Btn>
            <Btn>
              <Button
                style={{ display: 'inline-block', marginTop: '30px' }}
                onClick={() => this.detele(item.staff_id)}
              >
                删除
              </Button>
            </Btn>
          </div>
        </ListItem>
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          title="店员管理"
          goBack
          right={
            <Link
              to="/"
              style={{ color: '#fff' }}
              onClick={() => (window.location.href = 'http://cs.7youke.com/packapp/storestaff/index.html')
              }
            >
              登陆
            </Link>
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <List style={{ position: 'fixed', bottom: '0', width: '100%' }}>
          <div
            style={{
              fontWeight: 'bold',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              background: '#fff',
              zIndex: '1000',
              height: '46px',
              alignItems: 'center',
            }}
          >
            <Link
              style={{
                color: '#fff',
                background: '#ffb000',
                width: '140px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                borderRadius: '5px',
              }}
              to="/management/shopManager/shopPanel/添加"
            >
              添加店员
            </Link>
            <Link
              style={{
                color: '#fff',
                background: '#ffb000',
                width: '140px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                borderRadius: '5px',
              }}
              to="/management/shopManager/classify"
            >
              管理分类
            </Link>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/management/shopManager" exact component={ShopManager} />
    <Route path="/management/shopManager/shopPanel/:str/:id?/:staffId?" component={ShopPanel} />
    <Route path="/management/shopManager/classify" component={Classify} />
    <Route path="/management/shopManager/classifyPanel/:str/:id?" component={ClassifyPanel} />
  </React.Fragment>
)
