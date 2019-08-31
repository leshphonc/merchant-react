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
