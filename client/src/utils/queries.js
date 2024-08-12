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
      profilePicture
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
        profilePicture
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

export const QUERY_TIME_OFF_REQUESTS = gql`
  query timeOffRequests {
    timeOffRequests {
      _id
      userId {
        username
      }
      startDate
      endDate
      status
      createdAt
      notes
    }
  }
`;

export const QUERY_USER_TIME_OFF_REQUESTS = gql`
  query userTimeOffRequests($userId: ID!) {
    userTimeOffRequests(userId: $userId) {
      _id
      startDate
      endDate
      status
      createdAt
      notes
    }
  }
`;
