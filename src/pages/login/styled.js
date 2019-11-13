import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  height: 100vh;
  overflow: hidden;
`

export const Box = styled.div`
  max-width: 300px;
  margin: 0 auto;
`
export const Avatar = styled.div`
  width: 30vw;
  height: 30vw;
  border-radius: 40vw;
  overflow: hidden;
  margin: 10vh auto 3vh;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px 1px #ccc;
  img {
    width: 90%;
    height: 90%;
    margin-top: 5%;
    margin-left: 5%;
    border-radius: 90%;
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
