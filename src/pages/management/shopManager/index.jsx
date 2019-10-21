import React from 'react'
import NavBar from '@/common/NavBar'
import { Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  WingBlank,
  WhiteSpace,
  Button,
  Modal,
  Picker,
  List,
  Toast,
  SegmentedControl,
  Card,
  Flex,
} from 'antd-mobile'
import moment from 'moment'
import { createForm } from 'rc-form'
import ShopPanel from './shopPanel'
import Classify from './classify'
import ClassifyPanel from './classifyPanel'
import ShopManagerWorkRecord from './shopManagerWorkRecord'

@createForm()
@inject('shopManager')
@observer
class ShopManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal1: false,
    }
  }

  componentDidMount() {
    const { shopManager } = this.props
    shopManager.fetchECommerceValues()
    shopManager.fetchStaffList()
  }

  detele = staffId => {
    const { shopManager } = this.props
    shopManager.fetchStaffDelete(staffId).then(() => {
      shopManager.fetchStaffList()
    })
  }

  showModal = (key, storeId, staffId) => e => {
    const { shopManager, form } = this.props
    e.preventDefault() // 修复 Android 上点击穿透
    shopManager.fetchStaffDetail(storeId, staffId).then(() => {
      const { staffDetail } = shopManager
      form.setFieldsValue({
        store_id: [staffDetail.store_id],
      })
    })
    this.setState({
      [key]: true,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }

  mapList = () => {
    const { shopManager, history } = this.props
    const { staffList } = shopManager
    return staffList.map(item => (
      <React.Fragment key={item.staff_id}>
        <Card>
          <Card.Header
            thumb={
              <img
                src={require('@/assets/image/avatar.jpeg')}
                alt=""
                style={{ borderRadius: 50, marginRight: 10 }}
              />
            }
            title={item.name}
            extra={item.tel}
          />
          <Card.Body>
            <i
              style={{ position: 'absolute', top: 10, right: 20, fontSize: 20 }}
              className="iconfont"
              onClick={() =>
                history.push(
                  `/management/shopManager/shopPanel/编辑/${item.store_id}/${item.staff_id}`,
                )
              }
            >
              &#xe634;
            </i>
            <Flex>
              <Flex.Item>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: '100%',
                  }}
                >
                  账号: {item.username}
                </div>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: '100%',
                  }}
                >
                  销售报酬: 123
                </div>
              </Flex.Item>
              <Flex.Item>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: '100%',
                  }}
                >
                  服务报酬: 1234
                </div>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: '100%',
                  }}
                >
                  所属店铺: {item.storename}
                </div>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: '100%',
                  }}
                >
                  添加时间：
                  {moment(item.time * 1000).format('YYYY-MM-DD HH:mm')}
                </div>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <Flex>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      history.push(
                        `/management/shopManager/classifyPanel/修改/${item.store_id}/${item.staff_id}`,
                      )
                    }
                  >
                    权限
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={this.showModal(
                      'modal1',
                      item.store_id,
                      item.staff_id,
                    )}
                  >
                    调岗
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      history.push(
                        '/management/shopManager/shopManagerWorkRecord',
                      )
                    }
                  >
                    工作记录
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="warning"
                    size="small"
                    onClick={() => this.detele(item.staff_id)}
                  >
                    禁用
                  </Button>
                </Flex.Item>
              </Flex>
            }
          ></Card.Footer>
          <WhiteSpace></WhiteSpace>
        </Card>
        <WhiteSpace></WhiteSpace>
      </React.Fragment>
    ))
  }

  // <ListItem>
  //         <ItemTop style={{ width: '70%', display: 'inline-block' }}>
  //           <TopContent>
  //             <div className="top-title" style={{ fontSize: '15px' }}>
  //               电话：{item.tel}
  //             </div>
  //             <WhiteSpace />
  //             <div>店员账号: {item.username}</div>
  //             <WhiteSpace />
  //             <div>店员姓名: {item.name}</div>
  //             <WhiteSpace />
  //             <div>所属店铺: {item.storename}</div>
  //             <WhiteSpace />
  //             <div>
  //               添加时间: {moment(item.time * 1000).format('YYYY-MM-DD HH:mm')}
  //             </div>
  //           </TopContent>
  //         </ItemTop>
  //         <div
  //           style={{ width: '20%', display: 'inline-block', float: 'right' }}
  //         >
  //           <Btn>
  //             <Button
  //               // style={{ marginTop: '20px' }}
  //               type="button"
  //               onClick={() =>
  //                 history.push(
  //                   `/management/shopManager/shopPanel/编辑/${item.store_id}/${item.staff_id}`,
  //                 )
  //               }
  //             >
  //               编辑
  //             </Button>
  //           </Btn>
  //           <Btn>
  //             <Button
  //               style={{ marginTop: '10px' }}
  //               onClick={() => this.detele(item.staff_id)}
  //             >
  //               删除
  //             </Button>
  //           </Btn>
  //           <Btn>
  //             <Button
  //               style={{ marginTop: '10px' }}
  //               type="button"
  //               onClick={() =>
  //                 history.push(
  //                   `/management/shopManager/classifyPanel/修改/${item.store_id}/${item.staff_id}`,
  //                 )
  //               }
  //             >
  //               权限
  //             </Button>
  //           </Btn>
  //           <Btn>
  //             <Button
  //               style={{ marginTop: '10px' }}
  //               onClick={this.showModal('modal1', item.store_id, item.staff_id)}
  //             >
  //               调岗
  //             </Button>
  //           </Btn>
  //         </div>
  //       </ListItem>
  //       <WhiteSpace size="sm" />

  render() {
    const { shopManager, form, history } = this.props
    const { eCommerceValues, staffDetail } = shopManager
    const { getFieldProps } = form
    const { modal1 } = this.state
    // console.log(toJS(eCommerceValues))
    return (
      <React.Fragment>
        <NavBar
          title="店员管理"
          goBack
          right={
            <Button
              type="ghost"
              size="small"
              style={{ color: '#fff', fontSize: 16 }}
              onClick={() => {
                history.push('/management/shopManager/shopPanel/添加')
              }}
            >
              添加
            </Button>
          }
        />
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl values={['在岗', '离岗', '禁用']} />
        </WingBlank>
        <WhiteSpace />
        <WingBlank>{this.mapList()}</WingBlank>
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
                width: '240px',
                height: '32px',
                lineHeight: '32px',
                textAlign: 'center',
                borderRadius: '5px',
              }}
              to="/"
              onClick={() =>
                (window.location.href =
                  'http://www.czg365.cn/packapp/storestaff/login.html?back=index')
              }
            >
              店员登陆
            </Link>
          </div>
        </List>
        <Modal
          visible={modal1}
          transparent
          maskClosable
          onClose={this.onClose('modal1')}
          title="调岗"
          footer={[
            {
              text: '取消',
              onPress: () => {
                this.onClose('modal1')()
              },
            },
            {
              text: '确定',
              onPress: () => {
                shopManager
                  .fetchRelocationPost(
                    form.getFieldValue('store_id')[0],
                    staffDetail.id,
                  )
                  .then(() => {
                    Toast.success('调岗成功', 1, () => {
                      shopManager.fetchStaffList()
                    })
                  })
                this.onClose('modal1')()
              },
            },
          ]}
        >
          <Picker
            {...getFieldProps('store_id', {
              rules: [{ required: true }],
            })}
            data={eCommerceValues}
            cols={1}
            extra="请选择"
          >
            <List.Item arrow="horizontal">选择店铺</List.Item>
          </Picker>
        </Modal>
      </React.Fragment>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/management/shopManager" exact component={ShopManager} />
    <Route
      path="/management/shopManager/shopPanel/:str/:id?/:staffId?"
      component={ShopPanel}
    />
    <Route path="/management/shopManager/classify" component={Classify} />
    <Route
      path="/management/shopManager/classifyPanel/:str/:id?/:staffId?"
      component={ClassifyPanel}
    />
    <Route
      path="/management/shopManager/shopManagerWorkRecord"
      component={ShopManagerWorkRecord}
    />
  </React.Fragment>
)
