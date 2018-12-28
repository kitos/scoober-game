import styled from 'styled-components'

type Props = {
  background?: string
  size?: string
}

let Circle = styled.div<Props>`
  background: ${({ background, theme }) => background || theme.colors.blue};
  padding: 10px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 26px;

  box-sizing: border-box;
  ${({ size = '80px' }) => `
    height: ${size};
    width: ${size}
  `};
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Circle

export { Circle }
