import React from 'react'
import { TabBar } from 'antd-mobile'
import { TabBarContainer } from '@/global'
import Home from '@/pages/home'
import Order from '@/pages/order'
import Marketing from '@/pages/marketing'
import Mine from '@/pages/mine'

export default () => {
  const [cur, setCur] = React.useState('Home')
  return (
    <TabBarContainer>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
        prerenderingSiblingsNumber={0}
      >
        <TabBar.Item
          title="首页"
          key="Home"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selected={cur === 'Home'}
          onPress={() => setCur('Home')}
          data-seed="logId"
        >
          <Home />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="订单"
          key="order"
          selected={cur === 'order'}
          onPress={() => setCur('order')}
          data-seed="logId1"
        >
          <Order />
        </TabBar.Item>
        <div>123</div>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="营销活动"
          key="marketing"
          selected={cur === 'marketing'}
          onPress={() => setCur('marketing')}
        >
          <Marketing />
        </TabBar.Item>
        <TabBar.Item
          icon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
          }}
          selectedIcon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
          }}
          title="我的"
          key="mine"
          selected={cur === 'mine'}
          onPress={() => setCur('mine')}
        >
          <Mine />
        </TabBar.Item>
      </TabBar>
    </TabBarContainer>
  )
}
