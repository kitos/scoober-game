import * as React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

let colors = {
  blue: '#65A9D8'
}

let theme = { colors }

let GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`

let Header = styled.header`
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  padding: 10px 20px;
`

let AppName = styled.h1`
  margin: 0 0 5px;
  font-weight: normal;
`

let App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />

      <Header>
        <AppName>Scoober team</AppName>

        <div>Win the game or win the job</div>
      </Header>
    </>
  </ThemeProvider>
)

export default App
