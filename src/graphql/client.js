import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getToken } from '../utils/helper';

const httpLink = createHttpLink({
  uri: 'https://group-chat-app-server.herokuapp.com',
});

const wsLink = new WebSocketLink({
  uri: `wss://group-chat-app-server.herokuapp.com/graphql`,
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // if (token) {
  //   headers['token'] = token;
  // }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? token : ''
    }
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

export default client;