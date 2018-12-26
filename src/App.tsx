import * as React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import { ActionBar } from './components/action-bar'

let colors = {
  blue: '#65A9D8'
}

let theme = { colors }

let GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
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
        `}
      >
        <Header>
          <AppName>Scoober team</AppName>

          <div>Win the game or win the job</div>
        </Header>

        <Box as="main" flex="1" p="20px">
          messages could be here...
        </Box>

        <ActionBar />
      </Flex>
    </>
  </ThemeProvider>
)

export default App
