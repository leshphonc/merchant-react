import styled from 'styled-components'

export const ColorBox = styled.div`
.am-list-item{
  padding-left:0;
  .am-list-line{
    padding-right:0;
    justify-content: center;
    .am-list-arrow{
      position: absolute;
      right:0px;
    }
    .am-list-extra{
      overflow: initial !important;
      text-overflow: inherit !important;
      color:#333 !important;
      font-size: 15px !important;
    }
  }
}
`

export const Pages = styled.div`
  background:#ddd;
  width:100%;
  .am-flexbox{
    padding:10px 20px;
  }
  .am-pagination-wrap-btn-next > a{
    background:#ffb000; 
    font-size:15px;
    height:8vw;
    line-height:8vw;
    padding:0 12px;
  }
  .am-pagination-wrap-btn-prev > a{
    background:#ffb000; 
    font-size:15px;
    height:8vw;
    line-height:8vw;
    padding:0 12px;
  }
`
export const Info = styled.div`
.am-list-body{
  display: flex;
  justify-content: space-around;
  padding:10px 0;
}
`
