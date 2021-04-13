import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Details from './components/showDetails';
import SearchPage from './components/searchPage';
import HomePage from './components/homePage';

require('dotenv').config();

function App() {
  return (
    <HashRouter>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/:isbn' component={Details} />
          <Route exact path='/books/:book' component={SearchPage} />
        </Switch>
      </ChakraProvider>
    </HashRouter>
  );
}

export default App;