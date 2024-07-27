import { gql }  from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      createdAt
      clockedIn
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      isAdmin
      createdAt
      clockedIn
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers{
    users {
        username
        email
        isAdmin
        createdAt
        clockedIn
      }
  }
`;

export const QUERY_LOGS = gql`
  query logs {
    logs {
      _id
      userId {
        username
      }
      action
      timestamp
    }
  }
`;

