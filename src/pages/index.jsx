import React from 'react'
import { TabBar } from 'antd-mobile'
import { TabBarContainer, AddBtnBox, AddBtn } from '@/styled'
import Home from '@/pages/home'
import Order from '@/pages/order'
import Marketing from '@/pages/marketing'
import Mine from '@/pages/mine'

export default () => {
  const [cur, setCur] = React.useState(sessionStorage.getItem('currentTab') || 'home')
  // const [cur, setCur] = React.useState()
  return (
    <TabBarContainer>
      <TabBar tintColor="#ffb000" tabBarPosition="bottom" prerenderingSiblingsNumber={0}>
        <TabBar.Item
          title="首页"
          key="home"
          icon={
            <img
              src={require('@/assets/image/home_gray.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          selectedIcon={
            <img
              src={require('@/assets/image/home.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          selected={cur === 'home'}
          onPress={() => {
            setCur('home')
            sessionStorage.setItem('currentTab', 'home')
          }}
        >
          <Home />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <img
              src={require('@/assets/image/order_gray.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          selectedIcon={
            <img
              src={require('@/assets/image/order.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          title="订单"
          key="order"
          selected={cur === 'order'}
          onPress={() => {
            setCur('order')
            sessionStorage.setItem('currentTab', 'order')
          }}
        >
          <Order />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <AddBtnBox>
              <AddBtn>
                <div>
                  <i className="iconfont">&#xe61e;</i>
                </div>
              </AddBtn>
              <div className="text">发布商品</div>
              <div className="mask" />
            </AddBtnBox>
          }
        />
        <TabBar.Item
          icon={
            <img
              src={require('@/assets/image/marketing_gray.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          selectedIcon={
            <img
              src={require('@/assets/image/marketing.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          title="营销活动"
          key="marketing"
          selected={cur === 'marketing'}
          onPress={() => {
            setCur('marketing')
            sessionStorage.setItem('currentTab', 'marketing')
          }}
        >
          <Marketing />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <img
              src={require('@/assets/image/mine_gray.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          selectedIcon={
            <img
              src={require('@/assets/image/mine.png')}
              style={{ width: 22, height: 22, marginBottom: 2 }}
              alt=""
            />
          }
          title="我的"
          key="mine"
          selected={cur === 'mine'}
          onPress={() => {
            setCur('mine')
            sessionStorage.setItem('currentTab', 'mine')
          }}
        >
          <Mine />
        </TabBar.Item>
      </TabBar>
    </TabBarContainer>
  )
}
