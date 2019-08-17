import styled from 'styled-components'

export default styled.div`
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 4px 5px 4px;
  div:nth-child(1) {
    font-size: 12px;
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: bold;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    // word-wrap:break-word;
  }
  &.cur {
    background: #eee;
    border: 1px solid #ccc;
  }
`
