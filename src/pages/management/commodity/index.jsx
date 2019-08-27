import React from 'react'
import NavBar from '@/common/NavBar'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { WhiteSpace, List } from 'antd-mobile'
import CateringPanel from './cateringPanel'
import Group from './group'
import GroupPanel from './groupPanel'
import GroupMealAdd from './groupMealAdd'
import Reserve from './reserve'
import reservePanel from './reservePanel'
// import ReserveEdit from './reserveEdit'
import Catering from './catering'
import Retail from './retail'
import RetailPanel from './retailPanel'
import RetailSpread from './retailSpread'
import RetailDiscounts from './retailDiscounts'

const { Item } = List
@inject('commodity')
@observer
class Commodity extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <NavBar title="商品管理" goBack />
        <WhiteSpace />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/group')
            }}
          >
            团购商品
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/reserve')
            }}
          >
            预定商品
          </Item>
          {/* <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/catering')
            }}
          >
            <TextBox>餐饮商品</TextBox>
          </Item> */}
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push('/management/commodity/retail')
            }}
          >
            零售商品
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
    <Route path="/management/commodity/groupPanel/:str/:id?" component={GroupPanel} />
    {/* <Route path="/management/commodity/groupEdit" component={GroupEdit} /> */}
    <Route path="/management/commodity/groupMealAdd" component={GroupMealAdd} />
    <Route path="/management/commodity/reserve" component={Reserve} />
    <Route path="/management/commodity/reservePanel/:str" component={reservePanel} />
    {/* <Route path="/management/commodity/reserveEdit" component={ReserveEdit} /> */}
    <Route path="/management/commodity/catering" component={Catering} />
    <Route path="/management/commodity/retail" component={Retail} />
    <Route path="/management/commodity/retailPanel/:str/:id?/:goodid?" component={RetailPanel} />
    <Route path="/management/commodity/retailSpread/:str/:id?/:goodid?" component={RetailSpread} />
    <Route path="/management/commodity/retailDiscounts/:str/:id?/:goodid?" component={RetailDiscounts} />
  </React.Fragment>
)
