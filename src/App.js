
import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Container } from 'react-bootstrap';

import client from './graphql/client';

import SignInScreen from './screens/SignIn/SignIn';
import DashboardScreen from './screens/Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Container fluid>
        <h3 className="text-align-center">Welcome to Chatbook !</h3>
        <hr/>
        {
          !isLoggedIn ? <SignInScreen setIsLoggedIn={setIsLoggedIn} /> : <DashboardScreen />
        }
      </Container>
    </ApolloProvider>
  );
}

export default App;
