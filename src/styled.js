import styled from 'styled-components'

// 底部导航栏组件
export const TabBarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

// 公用白底阴影组件
export const Paper = styled.div`
  padding: 15px;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

// 列表样式组件
export const CustomizeList = styled.div`
  display: flex;
  align-items: center;
`

export const ListTitle = styled.div`
  flex: 1;
`

export const ListContent = styled.div`
  flex-basis: 65%;
  color: #888;
  &.wrap {
    white-space: normal;
    padding: 10px 0;
  }
  & > img {
    width: 200px !important;
    height: 200px !important;
  }
`

// Menu遮罩组件
export const MenuMask = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
  z-index: 89;
`

// 循环Card列表组件
export const ListItem = styled.div`
  background: #fff;
  box-shadow: 0px 2px 5px 0px #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
`

export const ItemTop = styled.div`
  display: flex;
  position: relative;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    margin-right: 10px;
  }
`

export const TopContent = styled.div`
  flex: 1;
  position: relative;
  & > .top-title {
    font-size: 16px;
    font-weight: 600;
    opacity: 0.78;
  }
  & > .top-subtitle {
    color: #666;
    display: inline-block;
    margin-right: 5px;
  }
  & > .top-tag {
    display: inline-block;
    padding: 2px 5px;
    margin-right: 5px;
    border-radius: 4px;
    background: #ffb000;
    & > a {
      color: #fff;
    }
  }
  & > .top-tags{
    display: inline-block;
    background: #ffb000;
    width: 30vw;
    height: 8vw;
    text-align: center;
    line-height: 8vw;
    & > a {
      color: #333;
    }
  }
  & > .top-extra {
    position: absolute;
    top: 0;
    right: 0;
    color: #ffb000;
  }
  & > .top-features {
    display: inline-block;
    position: absolute;
    bottom: 0px;
    margin-right: 10px;
    color: #606060;
    font-size: 13px;
    & > .iconfont {
      font-size: 13px;
      margin-right: 5px;
      color: #ffb000;
    }
  }
`
export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    display: inline-block;
    text-align: center;
    & > img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
    }
  }
  `
