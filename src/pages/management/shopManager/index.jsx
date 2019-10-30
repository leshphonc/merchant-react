/* eslint-disable no-const-assign */
import React from 'react'
import NavBar from '@/common/NavBar'
import { Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  WingBlank,
  WhiteSpace,
  Button,
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
import OpenOrderDetail from './openOrderDetail'

@createForm()
@inject('shopManager')
@observer
class ShopManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal1: false,
      statusArr: { is_work: 1, status: 1 },
      selected: 0,
    }
  }

  componentDidMount() {
    const { shopManager } = this.props
    const { statusArr } = this.state
    shopManager.fetchECommerceValues()
    shopManager.fetchStaffList(statusArr)
  }

  detele = staffId => {
    const { shopManager } = this.props
    const { statusArr, status } = this.state
    shopManager.fetchStaffDelete(staffId).then(() => {
      shopManager.fetchStaffList(statusArr, status === 2 ? 2 : 1)
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
  changeSe = e => {
    const { shopManager } = this.props
    if (e.nativeEvent.selectedSegmentIndex === 0) {
      this.setState(
        {
          statusArr: { is_work: 1, status: 1 },
          selected: 0,
        },
        () => {
          const { statusArr } = this.state
          shopManager.fetchStaffList(statusArr)
        },
      )
    } else if (e.nativeEvent.selectedSegmentIndex === 1) {
      this.setState(
        {
          statusArr: { is_work: 2, status: 1 },
          selected: 1,
        },
        () => {
          const { statusArr } = this.state
          shopManager.fetchStaffList(statusArr)
        },
      )
    } else {
      this.setState(
        {
          statusArr: { status: 2 },
          selected: 2,
        },
        () => {
          const { statusArr } = this.state
          shopManager.fetchStaffList(statusArr)
        },
      )
    }
  }

  mapList = () => {
    const { shopManager, history, form } = this.props
    const { staffList, eCommerceValues, staffDetail } = shopManager
    const { getFieldProps } = form
    const { selected } = this.state
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
            {item.name !== '门店AI助手-小由' ? (
              <i
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 20,
                  fontSize: 20,
                }}
                className="iconfont"
                onClick={e => {
                  history.push(
                    `/management/shopManager/shopPanel/编辑/${item.store_id}/${item.staff_id}`,
                  )
                }}
              >
                &#xe634;
              </i>
            ) : (
              ''
            )}

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
          {item.name !== '门店AI助手-小由' ? (
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
                    <Picker
                      {...getFieldProps('store_id', {
                        rules: [{ required: true }],
                      })}
                      data={eCommerceValues}
                      cols={1}
                      onOk={() => {
                        shopManager
                          .fetchRelocationPost(
                            form.getFieldValue('store_id')[0],
                            staffDetail.id,
                          )
                          .then(() => {
                            Toast.success('调岗成功', 1, () => {
                              const { statusArr } = this.state
                              shopManager.fetchStaffList(statusArr)
                            })
                          })
                      }}
                      extra="请选择"
                    >
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
                    </Picker>
                  </Flex.Item>
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        history.push(
                          `/management/shopManager/shopManagerWorkRecord/${item.staff_id}`,
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
                      {selected === 2 ? `启用` : `禁用`}
                    </Button>
                  </Flex.Item>
                </Flex>
              }
            />
          ) : (
            ''
          )}

          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    const { history } = this.props

    const { selected } = this.state
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
          <SegmentedControl
            selectedIndex={selected}
            values={['在岗', '离岗', '禁用']}
            onValueChange={this.onValueChange}
            onChange={this.changeSe}
          />
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
                  window.location.origin +
                  '/packapp/storestaff/login.html?back=index')
              }
            >
              店员登陆
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
      path="/management/shopManager/shopManagerWorkRecord/:staffId?"
      component={ShopManagerWorkRecord}
    />
    <Route
      path="/management/shopManager/openOrderDetail/:orderId?"
      component={OpenOrderDetail}
    />
  </React.Fragment>
)
