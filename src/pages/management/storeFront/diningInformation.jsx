import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List,
  InputItem,
  TextareaItem,
  Picker,
  DatePicker,
  Checkbox,
  Flex,
  Button,
} from 'antd-mobile'
import { CustomizeList, ListTitle, ListContent } from '@/styled'
import { createForm } from 'rc-form'

const SupportOptions = [{ label: '不支持', value: '0' }, { label: '支持', value: '1' }]

@createForm()
@inject('storeFront')
@observer
class DiningInformation extends React.Component {
  render() {
    const { form, storeFront } = this.props
    const { getFieldProps } = form
    return (
      <React.Fragment>
        <NavBar title="餐饮信息" goBack />
        <List>
          <TextareaItem
            {...getFieldProps('name', {
              rules: [{ required: true }],
            })}
            labelNumber={7}
            placeholder="请输入店铺名称"
            title="店铺公告"
            rows={2}
          />
          <Picker
            {...getFieldProps('ismain', {
              rules: [{ required: true }],
            })}
            data={SupportOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">开发票</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('fp', {
              rules: [{ required: true }],
            })}
            labelNumber={7}
            placeholder="金额满多少可以开发票"
          >
            发票最低金额
          </InputItem>
          <Picker
            {...getFieldProps('yd', {
              rules: [{ required: true }],
            })}
            data={SupportOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">预订</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('fp', {
              rules: [{ required: true }],
            })}
            labelNumber={7}
            placeholder="可提前预订多少天后的桌台"
          >
            预订时长
          </InputItem>
          <DatePicker
            {...getFieldProps('stime', {
              rules: [{ required: true }],
            })}
          >
            <List.Item arrow="horizontal">预订开始时间</List.Item>
          </DatePicker>
          <DatePicker
            {...getFieldProps('etime', {
              rules: [{ required: true }],
            })}
          >
            <List.Item arrow="horizontal">预订结束时间</List.Item>
          </DatePicker>
          <InputItem
            {...getFieldProps('fp', {
              rules: [{ required: true }],
            })}
            labelNumber={7}
            placeholder="可提前预订多少天后的桌台"
          >
            预订间隔时长
          </InputItem>
          <Picker
            {...getFieldProps('paihao', {
              rules: [{ required: true }],
            })}
            data={SupportOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">排号</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('waisong', {
              rules: [{ required: true }],
            })}
            data={SupportOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">外送</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('tingche', {
              rules: [{ required: true }],
            })}
            data={SupportOptions}
            cols={1}
          >
            <List.Item arrow="horizontal">停车位</List.Item>
          </Picker>
        </List>
        <List renderHeader="选择分类">
          <List.Item>
            <CustomizeList>
              <ListTitle>料理</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    韩国料理
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    日本料理
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item>
            <CustomizeList>
              <ListTitle>烘培</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    蛋黄酥
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    泡芙
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    虎皮蛋糕
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item>
            <CustomizeList>
              <ListTitle>甜点</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    慕斯蛋糕
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    椰奶小方
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    焦糖布丁
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item>
            <CustomizeList>
              <ListTitle>西餐</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    海鲜
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    牛排
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    自助餐
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item>
            <CustomizeList>
              <ListTitle>咖啡</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    茶水
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    饮料
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
          <List.Item>
            <CustomizeList>
              <ListTitle>中餐</ListTitle>
              <ListContent style={{ fontSize: 13 }}>
                <Flex>
                  <Checkbox onChange={this.checkChange} value="1">
                    食韵家菜馆
                  </Checkbox>
                  <Checkbox onChange={this.checkChange} value="1">
                    日本料理
                  </Checkbox>
                </Flex>
              </ListContent>
            </CustomizeList>
          </List.Item>
        </List>
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
      </React.Fragment>
    )
  }
}

export default DiningInformation
