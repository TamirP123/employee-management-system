import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

export const CLOCK_IN = gql`
  mutation clockIn($userId: ID!) {
    clockIn(userId: $userId) {
      _id
      clockedIn
    }
  }
`;

export const CLOCK_OUT = gql`
  mutation clockOut($userId: ID!) {
    clockOut(userId: $userId) {
      _id
      clockedIn
    }
  }
`;

export const REQUEST_TIME_OFF = gql`
  mutation requestTimeOff($userId: ID!, $startDate: String!, $endDate: String!) {
    requestTimeOff(userId: $userId, startDate: $startDate, endDate: $endDate) {
      _id
      startDate
      endDate
      status
      createdAt
    }
  }
`;

export const UPDATE_TIME_OFF_REQUEST_STATUS = gql`
  mutation updateTimeOffRequestStatus($requestId: ID!, $status: String!) {
    updateTimeOffRequestStatus(requestId: $requestId, status: $status) {
      _id
      status
    }
  }
`;

