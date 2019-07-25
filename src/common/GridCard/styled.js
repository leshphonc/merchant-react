import styled from 'styled-components'

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 5px;
`

export const LinkBox = styled.div`
  width: 100%;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  display: block;
  -webkit-tap-highlight-color: transparent;
  a:link,
  a:visited {
    color: #444;
    text-decoration: none;
  }
  a:hover {
    color: #888;
  }
  img {
    width: 35px;
    margin-bottom: 8px;
  }
`
