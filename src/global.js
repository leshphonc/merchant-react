import styled from 'styled-components'

export const TabBarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Paper = styled.div`
  padding: 15px;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

export const CustomizeList = styled.div`
  display: flex;
`

export const ListTitle = styled.div`
  flex: 1;
`

export const ListContent = styled.div`
  flex-basis: 65%;
  color: #888;
  &.wrap {
    white-space: normal;
  }
  & > img {
    width: 200px !important;
    height: 200px !important;
  }
`
