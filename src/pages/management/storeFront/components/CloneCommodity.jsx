import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
import {
  List, Checkbox, Button, Toast,
} from 'antd-mobile'

const { CheckboxItem } = Checkbox

@inject('storeFront')
@observer
class CloneCommodity extends React.Component {
  state = {
    ids: [],
  }

  componentDidMount() {
    const { storeFront } = this.props
    storeFront.fetchStoreList()
  }

  mapList = () => {
    const { storeFront, match } = this.props
    return storeFront.storeList.map(item => (
      <CheckboxItem
        key={item.store_id}
        disabled={item.store_id === match.params.id}
        onChange={e => this.onChecked(e, item.store_id)}
      >
        {item.name}
      </CheckboxItem>
    ))
  }

  onChecked = (e, i) => {
    const { ids } = this.state
    const index = ids.indexOf(i)
    if (index) {
      this.setState({
        ids: [...ids, i],
      })
    } else {
      ids.splice(index, 1)
      this.setState({
        ids: [...ids],
      })
    }
  }

  submit = () => {
    const { storeFront, history, match } = this.props
    const { ids } = this.state
    storeFront.cloneCommodity(match.params.id, ids).then(res => {
      if (res) Toast.success('克隆成功', 1, () => history.goBack())
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="商品克隆" goBack />
        <List>{this.mapList()}</List>
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

export default CloneCommodity
