import styled from 'styled-components'

let Circle = styled.div`
  background: ${({ theme }) => theme.colors.blue};
  height: 60px;
  width: 60px;
  line-height: 60px;
  padding: 10px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`

export default Circle

export { Circle }
