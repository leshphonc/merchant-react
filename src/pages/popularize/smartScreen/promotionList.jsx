import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import { WhiteSpace, WingBlank, Card, Flex, Button } from 'antd-mobile'
import { inject, observer } from 'mobx-react'

const STATUS = {
  1: '审核成功',
  2: '待审核',
  3: '审核失败',
  9: '不需要审核',
}

@inject('smartScreen')
@observer
class PromotionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { smartScreen, match } = this.props
    smartScreen.fetchPromotionList(match.params.id)
  }

  mapList = () => {
    const { history, smartScreen } = this.props
    const { promotionList } = smartScreen
    if (promotionList[0]) {
      return promotionList[0].itemList.map((item, index) => (
        <React.Fragment key={index}>
          <Card>
            <Card.Header
              title={
                <span style={{ width: 200 }} className="ellipsis">
                  {item.title}
                </span>
              }
              thumb={item.pic}
              extra={STATUS[item.ai.status]}
              // thumb= {item.img}
            />
            <Card.Body>
              <Flex>
                <Flex.Item>触达人数：111</Flex.Item>
                <Flex.Item>播报次数：111</Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>浏览人数：111</Flex.Item>
                <Flex.Item>下单人数：111</Flex.Item>
              </Flex>
              <WhiteSpace />
              <div style={{ color: '#777' }}>命令词：{item.main_key}</div>
              <WhiteSpace />
              <div style={{ color: '#777' }}>对话关键词：{item.main_key}</div>
              <WhiteSpace />
              <div style={{ color: '#777' }}>播报语音：{item.site_name}</div>
            </Card.Body>
            <WhiteSpace />
            <Card.Footer
              content={
                <React.Fragment>
                  {item.ai.is_shelves === '1' ? (
                    <Flex>
                      <Flex.Item>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => this.changeStatus(item.ai.id)}
                        >
                          下架
                        </Button>
                      </Flex.Item>
                    </Flex>
                  ) : (
                    <React.Fragment>
                      <Flex>
                        <Flex.Item>
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => history.push(
                              `/popularize/smartScreen/promotionList/PromotionPanel/编辑/${item.id}`,
                            )
                            }
                          >
                            编辑
                          </Button>
                        </Flex.Item>
                        <Flex.Item>
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => this.changeStatus(item.ai.id)}
                          >
                            上架
                          </Button>
                        </Flex.Item>
                        <Flex.Item>
                          <Button
                            size="small"
                            type="warning"
                            onClick={() => this.deletePromotion(item.id)}
                          >
                            删除
                          </Button>
                        </Flex.Item>
                      </Flex>
                      <WhiteSpace />
                    </React.Fragment>
                  )}
                </React.Fragment>
              }
            >
            </Card.Footer>
            <WhiteSpace />
          </Card>
          <WhiteSpace size="sm" />
        </React.Fragment>
      ))
    }
  }

  changeStatus = id => {
    const { smartScreen, match } = this.props
    smartScreen.changeStatus(id, match.params.id)
  }

  deletePromotion = id => {
    const { smartScreen, match } = this.props
    smartScreen.deletePromotion(id, match.params.id)
  }

  render() {
    const { smartScreen } = this.props
    const { promotionList } = smartScreen
    const { site_id } = promotionList[0] ? promotionList[0] : {}
    return (
      <React.Fragment>
        <NavBar
          title="智能屏推广列表"
          goBack
          right={
            <Link
              style={{ color: '#fff' }}
              to={`/popularize/smartScreen/promotionList/PromotionPanel/添加/${site_id}`}
            >
              添加
            </Link>
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">{this.mapList()}</WingBlank>
      </React.Fragment>
    )
  }
}

export default PromotionList

// <React.Fragment>
//                   <Flex>
//                     <Flex.Item>
//                       <Button
//                         size="small"
//                         type="primary"
//                         onClick={() => history.push(
//                           `/popularize/smartScreen/promotionList/PromotionPanel/编辑/${item.id}`,
//                         )
//                         }
//                       >
//                         基本信息
//                       </Button>
//                     </Flex.Item>
//                     <Flex.Item>
//                       <Button
//                         size="small"
//                         type="primary"
//                         onClick={() => history.push(
//                           `/popularize/smartScreen/promotionList/qrcodeMember/${item.id}`,
//                         )
//                         }
//                       >
//                         扫码人数
//                       </Button>
//                     </Flex.Item>
//                   </Flex>
//                   <WhiteSpace />
//                   <Flex>
//                     <Flex.Item>
//                       <Button
//                         size="small"
//                         type="primary"
//                         onClick={() => history.push(`/popularize/smartScreen/promotionList/viewTime/${item.id}`)
//                         }
//                       >
//                         浏览时长
//                       </Button>
//                     </Flex.Item>
//                     <Flex.Item>
//                       <Button
//                         size="small"
//                         type="primary"
//                         onClick={() => history.push(
//                           `/popularize/smartScreen/promotionList/purchaseNum/${item.id}`,
//                         )
//                         }
//                       >
//                         购买数量
//                       </Button>
//                     </Flex.Item>
//                   </Flex>
//                 </React.Fragment>
