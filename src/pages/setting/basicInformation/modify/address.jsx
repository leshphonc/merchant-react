import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import {
  WhiteSpace, List, Button, TextareaItem,
} from 'antd-mobile'

@inject('basicInformation')
@observer
class Modifyaddress extends React.Component {
  state = {
    address: null,
  }

  componentDidMount() {
    const { match } = this.props
    this.setState({
      address: match.params.value,
    })
  }

  submit = async () => {
    const { history, basicInformation } = this.props
    const { address } = this.state
    await basicInformation.modifyAddress(address)
    history.goBack()
  }

  render() {
    const { address } = this.state
    return (
      <React.Fragment>
        <NavBar title="详细地址" goBack />
        <WhiteSpace />
        <List renderFooter="商户的详细地址">
          <TextareaItem
            placeholder="请输入详细地址"
            value={address}
            onChange={val => this.setState({ address: val })}
          />
        </List>
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            width: '90%',
            left: '5%',
          }}
          onClick={this.submit}
        >
          确定修改
        </Button>
      </React.Fragment>
    )
  }
}
export default Modifyaddress
