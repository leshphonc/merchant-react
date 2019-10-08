import React from 'react'
import NavBar from '@/common/NavBar'
import {
    WhiteSpace, InputItem, List, ImagePicker, TextareaItem, Button, Toast
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { inject } from 'mobx-react'

@createForm()
@inject('smartScreen')
class PromotionPanel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            keywords:'',
            read_txt:'',
            img:'',
            url:''
        }
    }

    componentDidMount() {
        const { smartScreen, match, form } = this.props

        // 若是编辑推广内容调用接口，添加则跳过
        if(match.params.id){
        // 接口 获取推广内容
            
            smartScreen.fetchPromotionInfo(match.params.id).then(() => {
                const { promotionInfo } = smartScreen
                // 整理默认数据存入state
                this.setState({
                    title: promotionInfo.title,
                    keywords: promotionInfo.keywords,
                    read_txt: promotionInfo.read_txt,
                    // img: promotionInfo.img,
                    url: promotionInfo.url
                })

                // 整理默认数据放入表单
                form.setFieldsValue({
                    title: promotionInfo.title,
                    keywords: promotionInfo.keywords,
                    read_txt: promotionInfo.read_txt,
                    // img: promotionInfo.img,
                    url: promotionInfo.url
                })

            })
        }

    }

    // cacheData = () => {
    //     const { form } = this.props
    //     const { title, keywords, read_txt, img, url} = this.state
    //     const formData = form.getFieldsValue()
    //     formData.title= title,
    //     formData.keywords= keywords,
    //     formData.read_txt= read_txt,
    //     formData.img= img,
    //     formData.url= url
    // }

    submit = () => {
        const { form, match, smartScreen,history } = this.props
        form.validateFields((error, value) => {
            console.log(value)
            if (error) {
                Toast.info('请输入完整信息')
                return
            }
            const obj = {
                title: value.title,
                keywords: value.keywords,
                img: value.img.map(item => item.url),
                read_txt: value.read_txt,
                url: value.url,
                Imax_id: null, // 屏号id
                pid: null // 推广id
            }
            if (match.params.id) {
                smartScreen.modifyPromotionInfo({ ...obj, 
                Imax_id: match.params.id, 
                pid: null // 推广id
            })
                  .then(res => {
                    if (res) Toast.success('编辑成功', 1, () => history.goBack())
                  })
              } else {
                smartScreen.insertPromotionList(obj).then(res => {
                  if (res) Toast.success('新增成功', 1, () => history.goBack())
                })
              }
        })


    }
    
    render(){
        const { form, match, history } = this.props
        const { getFieldProps } = form
        const pic = form.getFieldValue('img') ? form.getFieldValue('img') : []
        return(
        <React.Fragment>
            <NavBar
                title={`${match.params.str}推广内容`}
                goBack
            />
            <WhiteSpace />
            <List>
                <InputItem
                   {...getFieldProps('title', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入标题"
                >标题
                </InputItem>
                <InputItem
                   {...getFieldProps('keywords', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入推广关键字（至少三个）"
                > 推广关键字
                </InputItem>
                <TextareaItem
                    placeholder="请输入语音文字"
                    {...getFieldProps('read_txt', {
                    rules: [{ required: true }],
                    })}
                    title="语音文字"
                    rows={3}
                    count={100}
                />
                <List.Item arrow="empty">
                    海报图片
                    <ImagePicker
                        {...getFieldProps('img', {
                            valuePropName: 'files',
                            rules: [{ required: true }],
                            })}
                        selectable={pic.length < 5}
                        // onAddImageClick={e => {
                        //     history.push('/uploadMultipleImg/裁剪/pic/2')
                        //     e.preventDefault()
                        // }}
                    >
                    </ImagePicker>
                </List.Item>
                <InputItem
                   {...getFieldProps('url', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入海报网址"
                >海报网址
                </InputItem>
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

export default PromotionPanel