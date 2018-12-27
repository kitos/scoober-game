import * as React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box, Flex } from '@rebass/grid'

import GameContainer from './containers/game-container'

let colors = {
  blue: '#65A9D8'
}

let theme = { colors }

let GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
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

      <Flex
        flexDirection="column"
        css={`
          height: 100%;
          background: #f5f7fa;
        `}
      >
        <Header>
          <AppName>Scoober team</AppName>

          <div>Win the game or win the job</div>
        </Header>

        <Box as={GameContainer} p="20px" flex={1} />
      </Flex>
    </>
  </ThemeProvider>
)

export default App
