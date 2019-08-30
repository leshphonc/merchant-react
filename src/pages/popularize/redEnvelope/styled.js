import styled from 'styled-components'

export const TextBox = styled.div`
  font-size:18px;
  padding: 10px 0;
`

export const Editor = styled.div`
  .editor{
    margin-top: 6px;
    text-align:left;
    background:#fff;
    .w-e-toolbar{
      .w-e-menu{
        z-index:1 !important;
      }
    }
    .w-e-text-container{
      z-index:1 !important;
      height: 260px !important;
    }
  }
}
`
export const Info = styled.div`
.am-list-body{
  display: flex;
  justify-content: space-around;
  padding:10px 0;
}
`
export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: inline-block;
    text-align: center;
    & > img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
    }
  }
`
