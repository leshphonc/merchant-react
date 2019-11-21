import React from 'react'
import { TabBar, ActionSheet } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { TabBarContainer, AddBtnBox, AddBtn } from '@/styled'
import Home from '@/pages/home'
import Order from '@/pages/order'
import Marketing from '@/pages/marketing'
import Mine from '@/pages/mine'

@inject('home', 'wallet')
@observer
class Index extends React.Component {
  state = {
    cur: sessionStorage.getItem('currentTab') || 'home',
  }

  componentDidMount() {
    console.log(process.env)
    const { home, history } = this.props
    const ticket = localStorage.getItem('ticket')
    if (!ticket) {
      history.replace('/login')
      return
    }
    // 获取余额轮播等首页数据
    home.fetchIndexData()
  }

  render() {
    const { wallet } = this.props
    const { cur } = this.state
    return (
      <TabBarContainer>
        <TabBar
          tintColor="#00A29A"
          tabBarPosition="bottom"
          prerenderingSiblingsNumber={0}
        >
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
              this.setState({
                cur: 'home',
              })
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
              this.setState({
                cur: 'order',
              })
              sessionStorage.setItem('currentTab', 'order')
            }}
          >
            <Order />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <AddBtnBox
                onClick={async () => {
                  const info = JSON.parse(localStorage.getItem('merchant_user'))
                  const ticket = localStorage.getItem('ticket')
                  const uidInfo = await wallet.getUID(info.mer_id)
                  if (uidInfo.uid) {
                    window.location.href =
                      window.location.origin +
                      `/wap.php?g=Wap&c=merchant&a=map&mer_id=${info.mer_id}&uid=${uidInfo.uid}&ticket=${ticket}`
                  } else {
                    window.location.href =
                      window.location.origin +
                      `/wap.php?g=Wap&c=merchant&a=map&mer_id=${info.mer_id}`
                  }
                }}
              >
                <AddBtn>
                  <div>
                    <i
                      className="iconfont"
                      style={{ fontSize: 26, display: 'block' }}
                    >
                      &#xe605;
                    </i>
                  </div>
                </AddBtn>
                <div className="text">进入店铺</div>
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
              this.setState({
                cur: 'marketing',
              })
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
              this.setState({
                cur: 'mine',
              })
              sessionStorage.setItem('currentTab', 'mine')
            }}
          >
            <Mine />
          </TabBar.Item>
        </TabBar>
      </TabBarContainer>
    )
  }
}

export default Index
