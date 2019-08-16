import React from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/styled'

export default props => {
  const mapList = () => props.list.map((item, index) => (
    <React.Fragment key={index}>
      <ListItem key={index}>
        <ItemTop>
          <TopContent>
            <div className="top-title" style={{ fontSize: '15px' }}>
              ({index}) 电话：{item.tal}
            </div>
            <WhiteSpace />
            <div>
                店员账号: {item.num}
            </div>
            <WhiteSpace />
            <div>
                店员性名: {item.name}
            </div>
            <WhiteSpace />
            <div>
                所属店铺: {item.sold}
            </div>
            <WhiteSpace />
            <Link
              to={{
                pathname: '/management/shopManager/shopEdit',
              }}
              style={{ color: '#333' }}
            >
              <div style={{ display: 'inline-block' }}>
                <i className="iconfont" style={{ color: '#ffb000' }}>
                    &#xe645;
                </i>
                  编辑
              </div>
            </Link>
            <div style={{ display: 'inline-block', marginLeft: '30px' }}>
              <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe837;
              </i>
                登陆
            </div>
            <div style={{ display: 'inline-block', marginLeft: '30px' }}>
              <i className="iconfont" style={{ color: '#ffb000' }}>
                  &#xe621;
              </i>
                删除
            </div>
          </TopContent>
        </ItemTop>
      </ListItem>
      <WhiteSpace size="sm" />
    </React.Fragment>
  ))
  return (
    <React.Fragment>
      <WhiteSpace />
      <WingBlank size="sm">{mapList()}</WingBlank>
      <WhiteSpace />
    </React.Fragment>
  )
}
