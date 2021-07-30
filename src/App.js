import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './components/showDetails';
import SearchPage from './components/searchPage';
import HomePage from './components/homePage';
import customTheme from './theme';

require('dotenv').config();

function App() {
  return (
    <Router>
      <ChakraProvider theme={customTheme}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/:isbn' component={Details} />
          <Route exact path='/books/:book' component={SearchPage} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
