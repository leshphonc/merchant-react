import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List } from 'antd-mobile'
import { TextBox } from './styled'
import CateringPanel from './cateringPanel'
import Group from './group'
import GroupAdd from './groupAdd'
import GroupEdit from './groupEdit'
import GroupMealAdd from './groupMealAdd'
import Reserve from './reserve'
import ReserveAdd from './reserveAdd'
import ReserveEdit from './reserveEdit'
import Catering from './catering'
import Retail from './retail'
import RetailPanel from './retailPanel'

const { Item } = List
@inject('commodity')
@observer
class Commodity extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <NavBar title="店铺管理" goBack />
        <WhiteSpace />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/group')
            }}
          >
            <TextBox>团购商品</TextBox>
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/reserve')
            }}
          >
            <TextBox>预定商品</TextBox>
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/catering')
            }}
          >
            <TextBox>餐饮商品</TextBox>
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/retail')
            }}
          >
            <TextBox>零售商品</TextBox>
          </Item>
        </List>
      </div>
    )
  }
}
export default () => (
  <React.Fragment>
    <Route path="/management/commodity" exact component={Commodity} />
    <Route
      path="/management/commodity/cateringPanel/:str/:id?/:goodid?"
      component={CateringPanel}
    />
    <Route path="/management/commodity/group" component={Group} />
    <Route path="/management/commodity/groupAdd" component={GroupAdd} />
    <Route path="/management/commodity/groupEdit" component={GroupEdit} />
    <Route path="/management/commodity/groupMealAdd" component={GroupMealAdd} />
    <Route path="/management/commodity/reserve" component={Reserve} />
    <Route path="/management/commodity/reserveAdd" component={ReserveAdd} />
    <Route path="/management/commodity/reserveEdit" component={ReserveEdit} />
    <Route path="/management/commodity/catering" component={Catering} />
    <Route path="/management/commodity/retail" component={Retail} />
    <Route path="/management/commodity/retailPanel/:str/:id?/:goodid?" component={RetailPanel} />
  </React.Fragment>
)
