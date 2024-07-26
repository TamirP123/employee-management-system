import { gql }  from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      createdAt
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
      }
  }
`;
