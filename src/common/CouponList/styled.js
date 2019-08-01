import styled from 'styled-components'

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-bottom: 1px solid rgb(0, 0, 0, 0.12);
  margin-bottom: 4px;
  color: #444;
`

export const ItemTop = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 4px;
  }

  .top-content {
    display: flex;
    justify-content: space-around;
    flex: 1;
    .content-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .content-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .hide {
        visibility: hidden;
      }
    }
  }
`

export const ItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #eee;
  padding: 10px;
  font-size: 12px;
  .bottom-feature {
    display: flex;
    justify-content: space-between;

    & > a {
      flex-basis: 48%;
    }
  }
`
