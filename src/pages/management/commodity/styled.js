import styled from 'styled-components'

export const TextBox = styled.div`
  font-size:18px;
  padding: 10px 0;
`

export const Title = styled.div`
.am-list-item{
  .am-list-line{
    .am-input-label{
      width:100px;
    } 
  }
}
`
export const SizeBox = styled.div`
.am-list-item{
  .am-textarea-label{
    font-size:14px;
  } 
  .am-textarea-control{
    textarea{
      font-size:14px;
    }
  }
}
`
export const Center = styled.div`
  width: 30vw;
  display: inline-block;
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
        flex-basis: 96%;
        overflow: hidden;
        text-align:center;
        text-overflow: inherit !important;
        color:#333 !important;
        font-size: 15px !important;
      }
    }
  }
}
`
export const Right = styled.div`
  display: inline-block;
}
`
export const NavBox = styled.div`
.am-list{
  .am-list-body{
    .am-list-item{
      padding-left:0;
      .am-list-line{
        padding-left:15px;
      }
    }
  }
}

`
export const Team = styled.div`
  .am-list-item{
    .am-list-line{
      .am-input-label{
        width:150px;
      }
    }
  }
}
`
export const Business = styled.div`
  .am-list-item{
    .am-list-line{
      .am-list-content >div{
        display:inline-block;
        .am-list-item{
          .am-list-line{
            display:inline-block;
            .am-list-extra{
              border: 1px solid #000;
              width: 70px;
              text-align: center;
              font-size: 16px;
              padding-top:3px;
              padding-bottom:3px;
            }
            
          }
        }
      }
    }
  }
}
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
