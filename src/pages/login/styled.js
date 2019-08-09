import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
`

export const Box = styled.div`
  max-width: 300px;
  margin: 0 auto;
`
export const Avatar = styled.div`
  width: 25vw;
  height: 25vw;
  border-radius: 40vw;
  overflow: hidden;
  margin: 10vh auto 10vh;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px 1px #ccc;
  img {
    width: 90%;
    height: 90%;
    margin-top: 5%;
    margin-left: 5%;
  }
`

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;

  .iconfont {
    font-size: 20px;
    color: #aaa;
    margin-left: 15px;
  }

  & > div {
    margin-left: 10px;
    flex: 1;
  }
`
