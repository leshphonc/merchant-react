import styled from 'styled-components'

export default styled.div`
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px 4px 12px 4px;
  border: 2px solid #f7f7f7;
  border-radius: 4px;
  div:nth-child(1) {
    font-size: 20px;
  }
  div:nth-child(2) {
    font-size: 12px;
    font-weight: bold;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    color: #888;
    text-align: center;
  }
  &.cur {
    border: 2px solid #0d969c;
    box-sizing: border-box;
  }
`
