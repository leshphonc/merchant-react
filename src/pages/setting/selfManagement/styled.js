import styled from 'styled-components'

export const Btn = styled.div`
  display:inline-block !important;
  display: flex;
  justify-content: space-between;
  height: 24px;
  align-items: center
  .am-button{
    font-size: 16px;
    overflow: initial;
    height: 0;
    line-height:1;
    background: #ffb000;
    height: 24px;
    line-height: 24px;
    width: 60px;
    color:#fff;
  }
  .am-button::before{
    border:0 !important;
  }
`
export const Btns = styled.div`
    display: flex;
    align-items: center;
.am-button{
  font-size: 16px;
  overflow: initial;
  height: 0;
  background: #ffb000;
  height: 24px;
  line-height: 22px;
  width: 60px;
  color:#fff;
  display: initial;
  margin-left:30px;
  span{
    padding: 0px 10px;
    font-size: 14px;
  }
}
.am-button::before{
  border:0 !important;
}
`
