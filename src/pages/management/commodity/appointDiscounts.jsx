import React from 'react'
import NavBar from '@/common/NavBar'
import { observer, inject } from 'mobx-react'
// import { Route } from 'react-router-dom'
import {
    List, InputItem, WingBlank, Button, Toast, Picker, ImagePicker,
} from 'antd-mobile'
import 'rc-tooltip/assets/bootstrap.css'
import { createForm } from 'rc-form'
import { toJS } from 'mobx'
import Utils from '@/utils'

const { Item } = List
const seckill = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }]
@createForm()
@inject('commodity')
@observer
class AppointDiscounts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // userLevels: [],
            give: [],
            envoList:[]
        }
    }

    componentDidMount() {
        const { commodity, match, form } = this.props
        commodity.fetchCardGroupAll()
        if (!match.params.id) return
        commodity.fetchGiftVoucher()
        commodity.fetchReserveDetail(match.params.id).then(() => {
            const { appointDetail } = commodity
            console.log(toJS(appointDetail.envo_info_list))
            const envo_info_list = toJS(appointDetail.envo_info_list)
            envo_info_list.forEach((item,index) => {
                envo_info_list[index].envo_before_select_pic = [{url:envo_info_list[index].envo_before_select_pic}]
                envo_info_list[index].envo_after_select_pic = [{url:envo_info_list[index].envo_after_select_pic}]
                envo_info_list[index].envo_serving_pic = [{url:envo_info_list[index].envo_serving_pic}]
            })

            this.setState({
                envoList:envo_info_list
            },() => {console.log(this.state.envoList)})
            form.setFieldsValue({
                is_select_car_model: [appointDetail.appoint_list.is_select_car_model],
                is_select_car_license: [appointDetail.appoint_list.is_select_car_license],
                is_select_workerstaff: [appointDetail.appoint_list.is_select_workerstaff],
                dhb_get_num:appointDetail.appoint_list.dhb_get_num ?appointDetail.appoint_list.dhb_get_num : '0',
                score_get_num:appointDetail.appoint_list.score_get_num ?appointDetail.appoint_list.score_get_num : '0',
                envo_area_name:appointDetail.appoint_list.envo_area_name
            })
        })
    }
    addEnv = () => {
        const envoList  = toJS(this.state.envoList)
        envoList.push({
            envo_after_select_pic:[],
            envo_before_select_pic:[],
            envo_name:'',
            envo_screen_num:'',
            envo_serving_pic:[],
        })
       this.setState({
           envoList
       })
    }
    showEnvo = () => {
        const { envoList } = this.state
        if (envoList){
            return envoList.map((item,index) => (
                <React.Fragment key={index}>
                    <InputItem
                        placeholder=""
                        defaultValue={item.envo_name}
                        onChange = {e => {
                            const now_envoList = toJS(envoList)
                            now_envoList[index].envo_name = e
                            this.setState({
                                envoList:now_envoList
                            })
                        }}
                    >
                        环境名称：
                    </InputItem>
                    <InputItem
                        placeholder=""
                        defaultValue={item.envo_screen_num}
                        onChange = {e => {
                            const now_envoList = toJS(envoList)
                            now_envoList[index].envo_name = e
                            this.setState({
                                envoList:now_envoList
                            })
                        }}
                    >
                        每屏数量：
                    </InputItem>
                    <Item>
                        选中前图标
                        <ImagePicker
                            files={item.envo_before_select_pic}
                            onChange={
                                e=>{
                                    console.log(e)
                                    if(e.length<=0){
                                         const now_envoList = toJS(envoList)
                                         console.log(now_envoList[index])
                                         now_envoList[index].envo_before_select_pic.splice(0,1)
                                         this.setState({
                                         envoList:now_envoList
                                         })
                                    }else{
                                        Utils.compressionAndUploadImg(e[0].file)
                                            .then(res => {
                                                const now_envo = toJS(envoList)
                                                now_envo[index].envo_before_select_pic = [{url:res}]
                                                this.setState({
                                                    envoList:now_envo
                                                })
                                            })
                                            .catch(e => Toast.fail(e))
                                    }

                                }
                            }
                            selectable={item.envo_before_select_pic.length<1}
                        />
                    </Item>
                    <Item>
                        选后前图标
                        <ImagePicker
                            files={item.envo_after_select_pic}
                            onChange={
                                e=>{
                                    if(e.length<=0){
                                        const now_envoList = toJS(envoList)
                                        now_envoList[index].envo_after_select_pic.splice(0,1)
                                        this.setState({
                                            envoList:now_envoList
                                        })
                                    }else{
                                        Utils.compressionAndUploadImg(e[0].file)
                                            .then(res => {
                                                const now_envo = toJS(envoList)
                                                now_envo[index].envo_after_select_pic = [{url:res}]
                                                this.setState({
                                                    envoList:now_envo
                                                })
                                            })
                                            .catch(e => Toast.fail(e))
                                    }

                                }
                            }
                            selectable={item.envo_after_select_pic.length<1}
                        />
                    </Item>
                    <Item>
                        服务中图标
                        <ImagePicker
                            files={item.envo_serving_pic}
                            onChange={
                                e=>{
                                    if(e.length<=0){
                                        const now_envoList = toJS(envoList)
                                        console.log(now_envoList[index])
                                        now_envoList[index].envo_serving_pic.splice(0,1)
                                        this.setState({
                                            envoList:now_envoList
                                        })
                                    }else{
                                        Utils.compressionAndUploadImg(e[0].file)
                                            .then(res => {
                                                const now_envo = toJS(envoList)
                                                now_envo[index].envo_serving_pic = [{url:res}]
                                                this.setState({
                                                    envoList:now_envo
                                                })
                                            })
                                            .catch(e => Toast.fail(e))
                                    }

                                }
                            }
                            selectable={item.envo_before_select_pic.length<1}
                        />
                    </Item>
                    <Button
                        type="primary"
                        size="small"
                        style={{ color: '#fff', width: '25%', margin: '1% auto' }}
                        onClick={() =>{
                            const envoList  = toJS(this.state.envoList)
                            envoList.splice(index,1)
                            this.setState({
                                envoList
                            })
                        }}
                    >
                        删除
                    </Button>
                </React.Fragment>
            ))
        }
    }
    submit = () => {
        const {
            commodity, form, match, history,
        } = this.props
        form.validateFields((error, value) => {
            if (error) {
                Toast.info('请输入完整信息')
                return
            }
            console.log(this.state.envoList)
            const envo_after_select_pic = [] ,envo_before_select_pic = [],envo_name=[],envo_screen_num=[],envo_serving_pic=[]
            this.state.envoList.forEach(item => {
                envo_after_select_pic.push(item.envo_after_select_pic[0].url)
                envo_before_select_pic.push(item.envo_before_select_pic[0].url)
                envo_name.push(item.envo_name)
                envo_screen_num.push(item.envo_screen_num)
                envo_serving_pic.push(item.envo_serving_pic[0].url)
            })
            const obj = {
                dhb_get_num:value.dhb_get_num,
                envo_area_name:value.envo_area_name,
                score_get_num:value.score_get_num,
                is_select_car_license:value.is_select_car_license[0],
                is_select_car_model:value.is_select_car_model[0],
                is_select_workerstaff:value.is_select_workerstaff[0],
                envo_after_select_pic,
                envo_before_select_pic,
                envo_name,
                envo_screen_num,
                envo_serving_pic
            }

            commodity
                .editAppointDis({ ...obj, appoint_id: match.params.id })
                .then(res => {
                    if (res) Toast.success('编辑成功', 1, () => history.goBack())
                })
        })
    }

    render() {
        const { form } = this.props
        const { getFieldProps } = form
        return (
            <React.Fragment>
                <NavBar title={`预约优惠设置`} goBack />
                <List>
                    <Picker
                        {...getFieldProps('is_select_car_model', {
                            rules: [{ required: false }],
                        })}
                        data={seckill}
                        cols={1}
                    >
                        <List.Item arrow="horizontal">是否选择车型</List.Item>
                    </Picker>
                    <Picker
                      {...getFieldProps('is_select_car_license', {
                        rules: [{ required: false }],
                      })}
                      data={seckill}
                      cols={1}
                    >
                            <List.Item arrow="horizontal">是否显示服务者</List.Item>
                    </Picker>
                    <Picker
                      {...getFieldProps('is_select_workerstaff', {
                        rules: [{ required: false }],
                      })}
                      data={seckill}
                      cols={1}
                    >
                      <List.Item arrow="horizontal">是否输入车牌</List.Item>
                    </Picker>
                    <Item>
                        用户消费赠送比例
                        <InputItem
                            {...getFieldProps('dhb_get_num', {
                                rules: [{ required: false }],
                            })}
                            labelNumber={7}
                            extra="元宝"
                            placeholder="请填写元宝数量"
                        >
                            每消费1元赠送
                        </InputItem>
                        <InputItem
                            {...getFieldProps('score_get_num', {
                                rules: [{ required: false }],
                            })}
                            extra="金币"
                            labelNumber={7}
                            placeholder="请填写金币数量"
                        >
                            每消费1元赠送
                        </InputItem>
                    </Item>
                    <InputItem
                        {...getFieldProps('envo_area_name', {
                            rules: [{ required: false }],
                        })}
                        placeholder="输入环境专区名称"
                    >
                        环境专区名称
                    </InputItem>
                    {this.showEnvo()}
                    <Button
                        type="primary"
                        size="small"
                        style={{ color: '#fff', width: '30%', margin: '1% auto' }}
                        onClick={this.addEnv}
                    >
                        新增环境
                    </Button>
                    <WingBlank style={{ padding: '10px 0' }}>
                        <Button
                            type="primary"
                            style={{ color: '#333', fontWeight: 'bold' }}
                            onClick={this.submit}
                        >
                            确定
                        </Button>
                    </WingBlank>
                </List>
            </React.Fragment>
        )
    }
}
export default AppointDiscounts
