import styled from 'styled-components'

export const ColorCard = styled.div`
  border-radius: 8px;
  height: 80px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CardLeft = styled.div`
  color: #fff;
`

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-bottom: 1px solid rgb(0, 0, 0, 0.12);
  color: #444;
`

export const ItemTop = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    padding-right: 12px;
  }

  .top-content {
    display: flex;
    justify-content: start;
    flex: 1;
    max-width: 100%;
    font-size: 12px;
    .content-line {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      min-width: 0;
      div {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .content-left {
      display: flex;
      flex: 1;
      max-width: 50%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      div {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .content-right {
      flex: 1;
      display: flex;
      max-width: 50%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      div {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
  position: relative;
  font-size: 12px;
  .bottom-feature {
    display: flex;
    justify-content: space-between;

    & > a {
      flex-basis: 48%;
    }
  }
`
