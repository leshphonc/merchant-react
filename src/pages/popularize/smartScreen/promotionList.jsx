import React from 'react'
import NavBar from '@/common/NavBar'
import { Route, Link } from 'react-router-dom'
import {
  WhiteSpace, WingBlank, Card, Flex, Button
} from 'antd-mobile'
import PromotionPanel from './promotionPanel';
import QrCodeMember from './qrcodeMember';
import ViewTime from './viewTime';
import PurchaseNum from './purchaseNum';
import { CustomTag } from '@/styled'
import { inject, observer } from 'mobx-react';

@inject('smartScreen')
@observer
class PromotionList extends React.Component {
  constructor(props){
    super(props)
  }
  state = {}

  componentDidMount(){
    const { smartScreen } = this.props
    smartScreen.fetchPromotionList({
      mer_id: null // 商家id
    })
  }

  mapList = () => {
    const { history, smartScreen } = this.props
    const { promotionList } = smartScreen
    return promotionList.map((item,index) => (
        <React.Fragment key={index}>
            <Card>
              <Card.Header
                title= {
                  <span style={{ width: 200 }}
                  className="ellipsis"
                  >
                    {item.title}
                  </span>
                }
                thumb= "图片"
                // thumb= {item.img}
              />
              <Card.Body>
                <Flex>
                  <CustomTag style={{ marginRight: 5 }}>触达人数:</CustomTag>
                </Flex>
              </Card.Body>
              <Card.Footer
                content={
                  <React.Fragment>
                    <Flex>
                    <Flex.Item>
                        <Button
                          size="small"
                          type="primary"
                          onClick={ () => history.push(`/popularize/smartScreen/promotionList/PromotionPanel/编辑/${item.id}`)}
                        >
                          基本信息
                        </Button>
                      </Flex.Item>
                      <Flex.Item>
                        <Button
                          size="small"
                          type="primary"
                          onClick={ () => history.push(`/popularize/smartScreen/promotionList/qrcodeMember/${item.id}`)}
                        >
                          扫码人数
                        </Button>
                      </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                    <Flex>
                    <Flex.Item>
                        <Button
                          size="small"
                          type="primary"
                          onClick={ () => history.push(`/popularize/smartScreen/promotionList/viewTime/${item.id}`)}
                        >
                          浏览时长
                        </Button>
                      </Flex.Item>
                      <Flex.Item>
                        <Button
                          size="small"
                          type="primary"
                          onClick={ () => history.push(`/popularize/smartScreen/promotionList/purchaseNum/${item.id}`)}
                        >
                          购买数量
                        </Button>
                      </Flex.Item>
                    </Flex>
                  </React.Fragment>
                }
              >
              </Card.Footer>
            </Card>
            <WhiteSpace size="sm" />
        </React.Fragment>
    ))
}

  render() {
    
    return (
      <React.Fragment>
        <NavBar
          title="智能屏推广"
          goBack
          right={
            <Link style={{ color: '#fff'}} to="/popularize/smartScreen/promotionList/PromotionPanel/添加">
              添加推广内容
            </Link>
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default () => (
  <React.Fragment>
    {/* 推广列表 */}
    <Route path="/popularize/smartScreen/promotionList" exact component={PromotionList} />
    {/* 添加推广内容 */}
    <Route path="/popularize/smartScreen/promotionList/promotionPanel/:str/:id?" component={PromotionPanel}/>
    {/* 扫码人数 */}
    <Route path="/popularize/smartScreen/promotionList/qrcodeMember/:id" component={QrCodeMember}/>
    {/* 浏览时长 */}
    <Route path="/popularize/smartScreen/promotionList/viewTime/:id" component={ViewTime}/>
    {/* 购买数量 */}
    <Route path="/popularize/smartScreen/promotionList/purchaseNum/:id" component={PurchaseNum}/>
  </React.Fragment>
)
