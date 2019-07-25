import styled from 'styled-components'
import BackGroundImg from '@/assets/image/user_card_bg.jpg'

export const Container = styled.div`
  position: relative;
  background: url(${BackGroundImg}) no-repeat;
  background-size: cover;
  padding: 20px 0;
`

export const Avatar = styled.div`
  width: 100px;
  & > img {
    width: 60px;
    border-radius: 30px;
    margin-left: 15px;
  }
`
export const Content = styled.div`
  flex: 1;
  position: relative;
  color: #fff;
  & > div {
    font-weight: 600;
    font-size: 16px;
    margin: 10px 0;
  }
  & > div:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
  }
  & > div:nth-child(3) {
    font-size: 18px;
  }
`

export const Wallet = styled.div`
  color: #000;
  opacity: 0.88;
  margin-right: 15px;
`

export const Setting = styled.div`
  position: absolute;
  top: -5px;
  right: 10px;
  color: #000;
  & > i {
    font-size: 22px;
  }
`
