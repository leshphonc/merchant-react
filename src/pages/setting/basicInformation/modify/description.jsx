import React from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, TextareaItem, Button } from 'antd-mobile'

@inject('basicInformation')
@observer
class ModifyDescription extends React.Component {
  state = {
    desc: null,
  }

  componentDidMount() {
    const { match } = this.props
    this.setState({
      desc: match.params.value,
    })
  }

  submit = async () => {
    const { history, basicInformation } = this.props
    const { desc } = this.state
    await basicInformation.modifyDescription(desc)
    history.goBack()
  }

  render() {
    const { desc } = this.state
    return (
      <React.Fragment>
        <NavBar title="商户描述" goBack />
        <WhiteSpace />
        <List renderFooter="简要描述您的经营类型、范围等">
          <TextareaItem
            placeholder="请输入商户描述"
            rows={6}
            value={desc}
            onChange={val => this.setState({ desc: val })}
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

export default ModifyDescription
