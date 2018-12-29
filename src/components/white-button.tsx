import styled from 'styled-components'

let WhiteButton = styled.button`
  background: #fff;
  border: 2px solid transparent;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 24px;
  font-weight: bold;
  padding: 20px 64px;
  border-radius: 35px;
  outline: none;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  &:active {
    position: relative;
    top: 1px;
  }
`

export default WhiteButton
export { WhiteButton }
