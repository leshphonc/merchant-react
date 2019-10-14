import React from 'react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Checkbox, Drawer, Button, Stepper, DatePicker } from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import Utils from '@/utils'

const { CheckboxItem } = Checkbox

@inject('commodity')
@observer
class ServiceItemsSelectSingle extends React.Component {
  state = { open: false, selected: [], cache: [] }

  componentDidMount() {
    const { commodity } = this.props
    commodity.fetchSingle()
    const cacheData = Utils.getCacheData()
    console.log(cacheData.project_data)
    if (cacheData) {
      this.setState({
        selected:
          typeof cacheData.project_data === 'object'
            ? cacheData.project_data
            : JSON.parse(cacheData.project_data),
        cache:
          typeof cacheData.project_data === 'object'
            ? cacheData.project_data
            : JSON.parse(cacheData.project_data),
      })
    }
  }

  /* <Card key={index}>
        <Card.Body>
          <Flex>
            <Flex.Item>项目名称：{item.name}</Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              数量：
              <Stepper
                showNumber
                max={10}
                min={1}
                value={item.meal_num}
                onChange={val => {
                  const arr = selected
                  arr.splice(index, 1, {
                    ...item,
                    meal_num: val,
                  })
                  this.setState({
                    selected: arr,
                  })
                }}
              />
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <DatePicker mode="date" title="可使用开始时间">
                <div>
                  开始时间：2018-10-20
                  <i className="iconfont" style={{ marginLeft: 10 }}>
                    &#xe634;
                  </i>
                </div>
              </DatePicker>
            </Flex.Item>
            <Flex.Item>
              <DatePicker mode="date" title="可使用结束时间">
                <div>
                  结束时间：2018-10-20
                  <i className="iconfont" style={{ marginLeft: 10 }}>
                    &#xe634;
                  </i>
                </div>
              </DatePicker>
            </Flex.Item>
          </Flex>
        </Card.Body>
      </Card> */
  mapList = () => {
    const { selected } = this.state
    return selected.map((item, index) => (
      <React.Fragment key={index}>
        <List>
          <List.Item extra={item.name}>项目名称：</List.Item>
          <List.Item
            extra={
              <Stepper
                style={{ touchAction: 'none' }}
                showNumber
                min={1}
                value={item.meal_num}
                onChange={val => {
                  const arr = selected
                  arr.splice(index, 1, {
                    ...item,
                    meal_num: val,
                  })
                  this.setState({
                    selected: arr,
                  })
                }}
              />
            }
          >
            包含数量：
          </List.Item>
          <DatePicker
            mode="date"
            title="有效开始日期"
            extra="选填"
            value={item.start_time}
            onChange={val => {
              const arr = selected
              arr.splice(index, 1, {
                ...item,
                start_time: val,
              })
              this.setState({
                selected: arr,
              })
            }}
          >
            <List.Item>有效开始日期：</List.Item>
          </DatePicker>
          <DatePicker
            mode="date"
            title="有效截止日期"
            extra="选填"
            value={item.end_time}
            onChange={val => {
              const arr = selected
              arr.splice(index, 1, {
                ...item,
                end_time: val,
              })
              this.setState({
                selected: arr,
              })
            }}
          >
            <List.Item>有效截止日期：</List.Item>
          </DatePicker>
        </List>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  changeCheckBox = (i, type) => {
    const { cache } = this.state
    if (type === 'insert') {
      this.setState({
        cache: [
          ...cache,
          {
            appoint_id: i.appoint_id,
            name: i.appoint_name,
            meal_num: 1,
            start_time: '',
            end_time: '',
          },
        ],
      })
    } else {
      const index = cache.find(item => item.appoint_id === i.appoint_id)
      const arr = cache
      arr.splice(index, 1)
      this.setState({
        cache: arr,
      })
    }
  }

  saveCacheToSelected = () => {
    const { cache } = this.state
    this.setState({
      selected: cache,
    })
    this.changeOpenStatus()
  }

  changeOpenStatus = () => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  submit = () => {
    const { history } = this.props
    const { selected } = this.state
    Utils.cacheItemToData('project_data', JSON.stringify(selected))
    history.goBack()
  }

  render() {
    const { commodity } = this.props
    const { open } = this.state
    const sidebar = (
      <>
        <List style={{ maxHeight: 'calc(100% - 47px)', overflow: 'auto' }}>
          {commodity.singleServiceList.map((i, index) => {
            const { cache } = this.state
            const flag = cache.find(item => item.appoint_id === i.appoint_id)
            return (
              <CheckboxItem
                defaultChecked={!!flag}
                key={index}
                onChange={e => {
                  if (e.target.checked) {
                    this.changeCheckBox(i, 'insert')
                  } else {
                    this.changeCheckBox(i, 'del')
                  }
                }}
              >
                <img src={i.pic} alt="" style={{ width: 30, height: 30, marginRight: 20 }} />
                {i.appoint_name}
              </CheckboxItem>
            )
          })}
        </List>
        <Button
          type="primary"
          style={{ borderRadius: 0 }}
          onClick={() => this.saveCacheToSelected()}
        >
          确定
        </Button>
      </>
    )
    return (
      <>
        <NavBar
          title="套餐内包含项目"
          goBack
          right={
            <Button
              type="ghost"
              size="small"
              style={{ color: '#fff', border: '1px solid #fff' }}
              onClick={this.changeOpenStatus}
            >
              选择项目
            </Button>
          }
        />
        <WhiteSpace />
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight - 54 }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          sidebar={sidebar}
          position="right"
          open={open}
          onOpenChange={this.changeOpenStatus}
        >
          <WhiteSpace />
          {this.mapList()}
          <Button
            type="primary"
            style={{
              width: '90%',
              marginLeft: '5%',
              marginTop: 20,
              marginBottom: 20,
            }}
            onClick={this.submit}
          >
            确定
          </Button>
        </Drawer>
      </>
    )
  }
}

export default ServiceItemsSelectSingle
