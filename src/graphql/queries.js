import { gql } from '@apollo/client';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const GET_GROUPS = gql`
  {
    groups {
      _id
      name
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages($groupId: ID!) {
    messages(groupId: $groupId) {
      _id
      email
      message
      createdAt
      group {
        _id
      }
    }
  }
`;

const SEND_MESSAGE = gql`
mutation AddMessage($email: String!, $message: String!, $groupId: ID!) {
  addMessage(email: $email, message: $message, groupId: $groupId) {
    _id
    message
    email
    createdAt
  }
}
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      _id
      email
      message
      createdAt
      group {
        _id
      }
    }
  }
`;

export {
  LOGIN,
  GET_GROUPS,
  GET_MESSAGES,
  SEND_MESSAGE,
  MESSAGES_SUBSCRIPTION
}