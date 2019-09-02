import React from 'react'
import NavBar from '@/common/NavBar'
import ReactDOM from 'react-dom'
import { Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  Button, Flex, Card, WhiteSpace, PullToRefresh, WingBlank,
} from 'antd-mobile'
import moment from 'moment'
import { toJS } from 'mobx'
import Utils from '@/utils'
import RedEnvelopePanel from './redEnvelopePanel'
import GetList from './getList'
import RedAdd from './redAdd'


const seasons = [{ label: '未开启', value: '0' }, { label: '已开启', value: '1' }]
const isFabu = [
  { label: '未发布', value: '0' },
  { label: '已下架', value: '1' },
  { label: '已上架', value: '2' },
  { label: '已完结', value: '3' },
]
@inject('redEnvelop')
@observer
class RedEnvelope extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { redEnvelop } = this.props
    const { height } = this.state
    redEnvelop.fetchRedEnvelopList()
    if (this.refresh.current) {
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      this.setState({
        height: hei,
      })
    }
    Utils.clearCacheData()
    /* eslint react/no-find-dom-node: 0 */
  }

  loadMore = async () => {
    const { redEnvelop } = this.props
    this.setState({ refreshing: true })
    await redEnvelop.fetchRedEnvelopList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  detele = id => {
    const { redEnvelop } = this.props
    redEnvelop.fetchPacketDel(id).then(() => {
      redEnvelop.fetchRedEnvelopList()
    })
  }

  fabu = id => {
    const { redEnvelop } = this.props
    redEnvelop.fetchFabu(id).then(() => {
      // redEnvelop.fetchRedEnvelopList()
    })
  }

  mapList = () => {
    const { redEnvelop, history } = this.props
    const { redEnvelopList } = redEnvelop
    console.log(toJS(redEnvelopList))
    return redEnvelopList.map(item => (
      <React.Fragment key={item.id}>
        <Card>
          <Card.Header
            title={
              <span style={{ width: 200 }} className="ellipsis">
                {item.title}
              </span>
            }
            thumb={item.pic}
            extra={
              <span>
                <div style={{ fontSize: '14px' }}>{seasons[item.is_open].label}</div>
                <div style={{ fontSize: '14px', marginTop: '5px' }}>
                  {isFabu[item.is_fabu].label}
                </div>
              </span>
            }
          />
          <Card.Body style={{ minHeight: '22px' }}>
            <Flex>
              <Flex.Item>总金额: {item.item_sum}</Flex.Item>
              <Flex.Item>金额上限: {item.item_max}</Flex.Item>
              <Flex.Item>金额下限: {item.item_min}</Flex.Item>
            </Flex>
            <Flex style={{ marginTop: '10px' }}>
              <Flex.Item>领取人数: {item.people}</Flex.Item>
              <Flex.Item>领取次数： {item.get_number}</Flex.Item>
            </Flex>
            <Flex style={{ marginTop: '10px', marginBottom: '5px' }}>
              <Flex.Item>
                活动时间:{moment(item.start_time * 1000).format('YYYY-MM-DD hh:mm')}~
                {moment(item.end_time * 1000).format('YYYY-MM-DD hh:mm')}
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
                    style={{ padding: '0 10px' }}
                    onClick={() => history.push(`/popularize/redEnvelope/getList/${item.id}`)}
                  >
                    领取记录
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => history.push(`/popularize/redEnvelope/redEnvelopePanel/修改/${item.id}`)
                    }
                  >
                    修改
                  </Button>
                </Flex.Item>
                {item.is_fabu === '0' ? (
                  <Flex.Item>
                    <Button type="primary" size="small" onClick={() => this.detele(item.id)}>
                      删除
                    </Button>
                  </Flex.Item>
                ) : (
                  ''
                )}
                {item.is_fabu === '0' ? (
                  <Flex.Item>
                    <Button type="primary" size="small" onClick={() => this.fabu(item.id)}>
                      发布
                    </Button>
                  </Flex.Item>
                ) : (
                  ''
                )}
              </Flex>
            }
          />
          <WhiteSpace />
        </Card>
      </React.Fragment>
    ))
  }

  render() {
    const { refreshing, height } = this.state
    const { redEnvelop } = this.props
    const { redEnvelopListTotal } = redEnvelop
    return (
      <React.Fragment>
        <NavBar
          title="红包列表"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/popularize/redEnvelope/redAdd/添加">
              添加
            </Link>
          }
        />
        {redEnvelopListTotal < 10 ? (
          <React.Fragment>
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </React.Fragment>
        ) : (
          <PullToRefresh
            ref={this.refresh}
            refreshing={refreshing}
            style={{
              height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            onRefresh={this.loadMore}
          >
            <WhiteSpace />
            <WingBlank size="sm">{this.mapList()}</WingBlank>
          </PullToRefresh>
        )}
      </React.Fragment>
    )
  }
}

// export default RedEnvelop
export default () => (
  <React.Fragment>
    <Route path="/popularize/redEnvelope" exact component={RedEnvelope} />
    <Route path="/popularize/redEnvelope/redEnvelopePanel/:str/:id?" component={RedEnvelopePanel} />
    <Route path="/popularize/redEnvelope/getList/:id" component={GetList} />
    <Route path="/popularize/redEnvelope/redAdd/:str/:id?" component={RedAdd} />
  </React.Fragment>
)
