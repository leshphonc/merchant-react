import React from 'react'
import NavBar from '@/common/NavBar'
import { Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {
  ListItem, ItemTop, TopContent, List,
} from '@/styled'
import SelfMentionPanel from './selfMentionPanel'
// import ModifyCoordinate from './modify/coordinate'
import CoordinatePicker from './modify/coordinate'
import SecretKey from './secretKey'
import Utils from '@/utils'
// import { ShopManager } from '@/config/list'
import { Btn, Btns } from './styled'

@inject('selfManagement')
@observer
class SelfManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { selfManagement } = this.props
    selfManagement.fetchPickLists()
    Utils.clearCacheData()
  }

  detele = id => {
    const { selfManagement } = this.props
    selfManagement.fetchPickAddressDel(id).then(() => {
      selfManagement.fetchPickLists()
    })
  }

  mapList = () => {
    const { history, selfManagement } = this.props
    const { pickLists } = selfManagement
    console.log(pickLists)
    return pickLists.map(item => (
      <React.Fragment key={item.array_key}>
        <ListItem>
          <ItemTop style={{ width: '70%', display: 'inline-block' }}>
            <TopContent>
              <div className="top-title" style={{ fontSize: '15px' }}>
                编号：{item.array_key}
              </div>
              <WhiteSpace />
              <div>区域1: {item.area_info.province}</div>
              <WhiteSpace />
              <div>区域2: {item.area_info.city}</div>
              <WhiteSpace />
              <div>区域3: {item.area_info.area}</div>
              <WhiteSpace />
              <div>自提点名称: {item.name}</div>
              <WhiteSpace />
              <div className="top-title" style={{ fontSize: '15px' }}>
                自提点电话：{item.phone}
              </div>
              <WhiteSpace />
              <Btns>
                登陆密钥:
                <Button
                  // style={{ marginTop: '20px' }}
                  type="button"
                  onClick={() => history.push(`/setting/selfManagement/secretKey/查看/${item.pick_addr_id}`)
                  }
                >
                  查看
                </Button>
              </Btns>
            </TopContent>
          </ItemTop>
          <div style={{ width: '20%', display: 'inline-block', float: 'right' }}>
            <Btn>
              <Button
                style={{ marginTop: '20px' }}
                type="button"
                onClick={() => history.push(`/setting/selfManagement/selfMentionPanel/编辑/${item.pick_addr_id}`)
                }
              >
                编辑
              </Button>
            </Btn>
            <Btn>
              <Button
                style={{ display: 'inline-block', marginTop: '30px' }}
                onClick={() => this.detele(item.pick_addr_id)}
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
        <NavBar title="自提点管理" goBack />
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
              to="/setting/selfManagement/selfMentionPanel/添加"
            >
              添加自提点
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
              to="1"
            >
              自提点登陆
            </Link>
          </div>
        </List>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/setting/selfManagement" exact component={SelfManagement} />
    <Route path="/setting/selfManagement/selfMentionPanel/:str/:id?" component={SelfMentionPanel} />
    {/* <Route
      path="/setting/selfManagement/modify/coordinate/:lng?/:lat?"
      component={ModifyCoordinate}
    /> */}
    <Route
      path="/management/storefront/coordinatePicker/:lng?/:lat?"
      component={CoordinatePicker}
    />
    <Route path="/setting/selfManagement/secretKey/:str/:id" component={SecretKey} />
  </React.Fragment>
)
