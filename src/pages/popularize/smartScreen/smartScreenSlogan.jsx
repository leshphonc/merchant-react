import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import { List, TextareaItem, WhiteSpace, Button, Toast } from 'antd-mobile'

@inject('smartScreen')
@observer
class SmartScreenSlogan extends React.Component {
  state = {
    slogan: '',
  }

  componentDidMount() {
    const { smartScreen, match } = this.props
    smartScreen.fetchImaxSlogan(match.params.id).then(() => {
      this.setState({
        slogan: smartScreen.imaxSlogan.slogan_bymer,
      })
    })
  }

  submit = () => {
    const { smartScreen, match, history } = this.props
    const { slogan } = this.state
    smartScreen.upDateSlogan(match.params.id, slogan).then(res => {
      if (res) {
        Toast.success('编辑成功', 1, () => history.goBack())
      }
    })
  }

  render() {
    const { slogan } = this.state
    return (
      <div>
        <NavBar title="修改广告语" goBack />
        <WhiteSpace />
        <List>
          <TextareaItem
            placeholder="智能屏广告语"
            count="100"
            rows="5"
            value={slogan}
            onChange={val => this.setState({ slogan: val })}
          />
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
      </div>
    )
  }
}

export default SmartScreenSlogan
